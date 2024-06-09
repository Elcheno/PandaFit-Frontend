import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MultiSelectComponent } from '../multi-select/multi-select.component';
import { IFormData } from '../../../model/interfaces/i-form-data';
import { FormService } from '../../../services/form/form.service';

@Component({
  selector: 'app-form-selector',
  standalone: true,
  imports: [MultiSelectComponent],
  templateUrl: './form-selector.component.html',
  styleUrls: ['./form-selector.component.scss'] // Corregido: styleUrls en vez de styleUrl
})
export class FormSelectorComponent implements OnInit {

  @Input() selectedSizes: { id: string, name: string }[] = [];
  @Output() selectedSizesUpdated = new EventEmitter<{ id: string, name: string }[]>();
  @Output() jsonGenerated = new EventEmitter<any>();
  forms: IFormData[] = [];
  options: { id: string, name: string }[] = [];

  constructor(private formService: FormService) {}

  ngOnInit() {
    this.loadForms();
  }

  loadForms(): void {
    this.formService.getAll().subscribe(response => {
      this.forms = response.content;
      this.options = this.forms
      .filter(inst => inst.id !== undefined && inst.name !== undefined) // Asegurarse de que id y name no sean undefined
      .map(inst => ({ id: inst.id as string, name: inst.name || '' })); // Mapear a objetos con id y name, y si name es undefined, asignar una cadena vacía
      console.log(this.forms);
    });
  }

  handleJsonGenerated(json: any) {
    this.jsonGenerated.emit(json);
    console.log('Generated JSON:', json);
  }

  toggleSize(size: { id: string, name: string }, event: Event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado
    event.stopPropagation();

    const index = this.selectedSizes.findIndex(s => s.id === size.id);
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
        field: 'formulario',
        type: 'multiple',
        body: this.selectedSizes.map(size => size.id)
      }
    };
    this.jsonGenerated.emit(json);
    console.log('Generated JSON:', json);
  }
}
