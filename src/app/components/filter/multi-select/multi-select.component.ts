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
    this.selectedOptions = [];
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
    this.jsonGenerated.emit(this.createJson());
  }

  createJson() {
    return {
      field: this.field,
      type: "multiple",
      body: this.selectedOptions.map(o => o.id)
    };
  }

  get groupedOptions() {
    const groups: { [key: string]: { institutionName: string, options: { id: string, name: string, institutionName?: string }[] } } = {};
    this.options.forEach(option => {
      if (!groups[option.institutionName!]) {
        groups[option.institutionName!] = { institutionName: option.institutionName!, options: [] };
      }
      groups[option.institutionName!].options.push(option);
    });
    return Object.values(groups);
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}




