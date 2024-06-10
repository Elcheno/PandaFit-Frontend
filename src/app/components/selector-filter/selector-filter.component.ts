import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-selector-filter',
  standalone: true,
  imports: [],
  templateUrl: './selector-filter.component.html',
  styleUrl: './selector-filter.component.scss'
})
export class SelectorFilterComponent {
[x: string]: any;
  @Input() public question!: string;
  @Input() public options!: Array<{ checked?: boolean, label: string }>;
  @Input() public field!: string;
  @Output() public onSelect = new EventEmitter<any>();

  public selectOption(value: string[]) {
    const eventPayload = {
      input: {
        field: this.field,
        type: 'unico',
        body: value
      }
    };
    this.onSelect.emit(eventPayload);
  }
}
