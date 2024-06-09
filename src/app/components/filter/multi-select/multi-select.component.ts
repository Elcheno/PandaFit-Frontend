import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-multi-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent {
  @Input() options: string[] = [];
  @Input() selectedOptions: string[] = [];
  @Input() placeholder: string = 'Select';
  @Input() field: string = '';
  @Output() selectedOptionsUpdated = new EventEmitter<string[]>();
  @Output() jsonGenerated = new EventEmitter<any>();
  isOpen = false;

  toggleDropdown(event: Event) {
    event.preventDefault(); 
    event.stopPropagation();
    this.isOpen = !this.isOpen;
    console.log('Dropdown toggled', this.isOpen);
  }

  toggleOption(option: string, event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const index = this.selectedOptions.indexOf(option);
    if (index >= 0) {
      this.selectedOptions.splice(index, 1);
    } else {
      this.selectedOptions.push(option);
    }

    this.selectedOptionsUpdated.emit([...this.selectedOptions]);
    this.generateJson();
  }

  generateJson() {
    const json = {
      input: {
        field: this.field,
        type: 'multiple',
        body: [...this.selectedOptions]
      }
    };
    this.jsonGenerated.emit(json);
  }
}



