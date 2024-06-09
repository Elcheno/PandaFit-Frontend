import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-selector-filter',
  standalone: true,
  imports: [],
  templateUrl: './selector-filter.component.html',
  styleUrl: './selector-filter.component.scss'
})
export class SelectorFilterComponent {
  @Input() public question!: string;
  @Input() public options!: Array<{ checked?: boolean, label: string }>;
  @Input() public name!: string;
  @Output() public onSelect = new EventEmitter<any>();

  public selectOption(value: string) {
    const eventPayload = {
      input: {
        campo: this.name,
        tipo: 'unico',
        cuerpo: value
      }
    };
    this.onSelect.emit(eventPayload);
  }
}
