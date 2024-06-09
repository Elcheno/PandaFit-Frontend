import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { DropdownService } from '../../../services/dropdown/dropdown.service';

@Component({
  selector: 'app-multi-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})

export class MultiSelectComponent {
  @Input() options: { id: string, name: string, institutionName?: string }[] = [];
  @Input() selectedOptions: { id: string, name: string }[] = [];
  @Input() placeholder: string = 'Select';
  @Input() field: string = '';
  @Output() selectedOptionsUpdated = new EventEmitter<{ id: string, name: string }[]>();
  @Output() jsonGenerated = new EventEmitter();
  isOpen = false;
  private subscription!: Subscription;

  constructor(private dropdownService: DropdownService, private eRef: ElementRef) {}

  ngOnInit() {
    this.subscription = this.dropdownService.getDropdownState().subscribe(except => {
      if (except !== this.field) {
        this.isOpen = false;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toggleDropdown(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.dropdownService.closeAllDropdowns(this.field);
    }
    console.log('Dropdown toggled', this.isOpen);
  }

  getSelectedOptionNames(): string {
    return this.selectedOptions.length > 0 ? this.selectedOptions.map(o => o.name).join(', ') : '';
  }

  toggleOption(option: { id: string, name: string }, event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const index = this.selectedOptions.findIndex(o => o.id === option.id);
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
        body: this.selectedOptions.map(o => o.id)
      }
    };
    this.jsonGenerated.emit(json);
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
      console.log('Clicked outside, dropdown closed');
    }
  }
}



