import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstitutionService } from '../../../services/institution/institution.service';
import { IInstitution } from '../../../model/interfaces/i-institution';
import { MultiSelectComponent } from '../multi-select/multi-select.component';

@Component({
  selector: 'app-institution-selector',
  standalone: true,
  imports: [CommonModule, MultiSelectComponent],
  templateUrl: './institution-selector.component.html',
  styleUrls: ['./institution-selector.component.scss']
})
/*export class InstitutionSelectorComponent implements OnInit {
  @Input() selectedSizes: string[] = [];
  @Output() selectedSizesUpdated = new EventEmitter<string[]>();
  isOpen = false;
  institutions: IInstitution[] = [];

  constructor(private institutionService: InstitutionService) {}

  ngOnInit() {
    this.loadInstitutions();
  }

  toggleDropdown(event: Event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado
    event.stopPropagation();
    this.isOpen = !this.isOpen;
    console.log('Dropdown toggled', this.isOpen);
  }

 

  toggleSize(size: string, event: Event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado
    event.stopPropagation();

    const index = this.selectedSizes.indexOf(size);
    if (index >= 0) {
      this.selectedSizes.splice(index, 1);
    } else {
      this.selectedSizes.push(size);
    }

    this.selectedSizesUpdated.emit([...this.selectedSizes]); // Emitir un nuevo arreglo para asegurar la detección de cambios
  }

  loadInstitutions(): void {
    this.institutionService.getAll().subscribe(response => {
      this.institutions = response.content;
      console.log(this.institutions);
    });
  }
}*/

/*export class InstitutionSelectorComponent implements OnInit {
  @Input() selectedSizes: string[] = [];
  @Output() selectedSizesUpdated = new EventEmitter<string[]>();
  institutions: IInstitution[] = [];
  options: string[] = [];

  constructor(private institutionService: InstitutionService) {}

  ngOnInit() {
    this.loadInstitutions();
  }

  loadInstitutions(): void {
    this.institutionService.getAll().subscribe(response => {
      this.institutions = response.content;
      this.options = this.institutions.map(inst => inst.name);
      console.log(this.institutions);
    });
  }
}*/

export class InstitutionSelectorComponent implements OnInit {
  @Input() selectedSizes: string[] = [];
  @Output() selectedSizesUpdated = new EventEmitter<string[]>();
  @Output() jsonGenerated = new EventEmitter<any>();
  institutions: IInstitution[] = [];
  options: string[] = [];

  constructor(private institutionService: InstitutionService) {}

  ngOnInit() {
    this.loadInstitutions();
  }

  loadInstitutions(): void {
    this.institutionService.getAll().subscribe(response => {
      this.institutions = response.content;
      this.options = this.institutions.map(inst => inst.name);
      console.log(this.institutions);
    });
  }

  handleJsonGenerated(json: any) {
    this.jsonGenerated.emit(json);
    console.log('Generated JSON:', json);
  }

  toggleSize(size: string, event: Event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado
    event.stopPropagation();

    const index = this.selectedSizes.indexOf(size);
    if (index >= 0) {
      this.selectedSizes.splice(index, 1);
    } else {
      this.selectedSizes.push(size);
    }

    this.selectedSizesUpdated.emit([...this.selectedSizes]); // Emitir un nuevo arreglo para asegurar la detección de cambios
    this.emitJson(); // Emitir el JSON actualizado
  }

  emitJson() {
    const json = {
      input: {
        field: 'instituto',
        type: 'multiple',
        body: this.selectedSizes
      }
    };
    this.jsonGenerated.emit(json);
    console.log('Generated JSON:', json);
  }
}