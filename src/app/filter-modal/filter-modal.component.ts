import { Component, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { InstitutionSelectorComponent } from '../components/filter/institution-selector/institution-selector.component';
import { FormSelectorComponent } from '../components/filter/form-selector/form-selector.component';
import { SchoolyearSelectorComponent } from '../components/filter/schoolyear-selector/schoolyear-selector.component';

@Component({
  selector: 'app-filter-modal',
  standalone: true,
  imports: [InstitutionSelectorComponent, FormSelectorComponent, SchoolyearSelectorComponent],
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
    console.log('JSON generado para Instituciones:', this.institutionJson);
    console.log('JSON generado para Cursos:', this.schoolyearJson);
    console.log('JSON generado para Formularios:', this.formJson);
  }
}