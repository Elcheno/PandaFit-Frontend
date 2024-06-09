import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MultiSelectComponent } from '../multi-select/multi-select.component';
import { IFormData } from '../../../model/interfaces/i-form-data';
import { FormService } from '../../../services/form/form.service';

@Component({
  selector: 'app-form-selector',
  standalone: true,
  imports: [MultiSelectComponent],
  templateUrl: './form-selector.component.html',
  styleUrl: './form-selector.component.scss'
})
export class FormSelectorComponent implements OnInit {

  @Input() selectedSizes: string[] = [];
  @Output() selectedSizesUpdated = new EventEmitter<string[]>();
  @Output() jsonGenerated = new EventEmitter<any>();
  forms: IFormData[] = [];
  options: string[] = [];

  constructor(private formService: FormService) {}

  ngOnInit() {
    this.loadForms();
  }

    loadForms(): void {
      this.formService.getAll().subscribe(response => {
        this.forms = response.content;
        // Filtramos los elementos para asegurarnos de que solo asignamos strings
        this.options = this.forms
          .map(inst => inst.name)
          .filter(name => name !== undefined) as string[];
        console.log(this.forms);
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
        field: 'formulario',
        type: 'multiple',
        body: this.selectedSizes
      }
    };
    this.jsonGenerated.emit(json);
    console.log('Generated JSON:', json);
  }

}
