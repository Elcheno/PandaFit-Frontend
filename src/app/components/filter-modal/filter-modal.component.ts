import { Component, EventEmitter, Output, Input, ViewChild, inject } from '@angular/core';
import { InstitutionSelectorComponent } from '../filter/institution-selector/institution-selector.component';
import { FormSelectorComponent } from '../filter/form-selector/form-selector.component';
import { SchoolyearSelectorComponent } from '../filter/schoolyear-selector/schoolyear-selector.component';
import { RangeFilterComponent } from '../range-filter/range-filter.component';
import { SelectorFilterComponent } from '../selector-filter/selector-filter.component';
import { FilterService } from '../../services/filter/filter.service';

@Component({
  selector: 'app-filter-modal',
  standalone: true,
  imports: [InstitutionSelectorComponent, FormSelectorComponent, SchoolyearSelectorComponent, RangeFilterComponent, SelectorFilterComponent],
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss']
})

export class FilterModalComponent {
  @Input() selectedSizes: { id: string, name: string }[] = [];
  @Output() closeModal = new EventEmitter<void>();
  @Output() updateSelectedSizes = new EventEmitter<{ id: string, name: string }[]>();
  @ViewChild(InstitutionSelectorComponent) institutionSelector!: InstitutionSelectorComponent;

  institutionJson: any = {};
  schoolyearJson: any = {};
  formJson: any = {};
  selectedInstitutions: { id: string, name: string }[] = [];
  filters: any[] = [];

  private readonly filterService = inject(FilterService);

  close() {
    this.closeModal.emit();
  }

  preventSubmit(event: Event) {
    event.preventDefault();
  }

  handleInstitutionJson(json: any) {
    this.institutionJson = json;
  }

  handleSchoolyearJson(json: any) {
    this.schoolyearJson = json;
  }

  handleFormJson(json: any) {
    this.formJson = json;
  }

  updateSelectedInstitutions(institutions: any) {
    this.selectedInstitutions = institutions;
  }

  applyFilters() {
    this.filterService.filter(this.filters).subscribe((res: any) => {
      console.log(res);
    })
  }

  handleFilterChange(filter: any) {
    const existingFilterIndex = this.filters.findIndex(f => f.field === filter.field);
    if (existingFilterIndex !== -1) {
      if (filter.body.length === 0 || filter.body[0] === '' && filter.body[1] === '') {
        console.log('Eliminando filtro:', filter.field);
        this.filters = this.filters.filter(f => f.field !== filter.field);
      }else{
        this.filters[existingFilterIndex] = filter;
      }
      console.log(this.filters)
    } else {
      console.log(this.filters)
      this.filters.push(filter);
    }
  }
}