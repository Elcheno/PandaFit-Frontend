import { Component, Inject } from '@angular/core';
import { IInputData } from '../../../../model/interfaces/i-input-data';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IOutputData, IUmbral } from '../../../../model/interfaces/i-output-data';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../button/button.component';
import { InputService } from '../../../../services/input/input.service';


@Component({
  selector: 'app-output-info',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, ButtonComponent],
  templateUrl: './output-info.component.html',
  styleUrl: './output-info.component.scss'
})
export class OutputInfoComponent {

  form: FormGroup;
  showUmbralList: boolean = false;
  inputsMap: Map<string, string> = new Map();

  constructor(public dialogRef: DialogRef<IOutputData>, 
    @Inject(DIALOG_DATA) public output: IOutputData,
    private formBuilder: FormBuilder,
    private inputService: InputService
    ) {
    this.form = this.formBuilder.group({
      name: output.name,
      description: output.description,
      formula: output.formula,
      unit: output.unit,
      umbralList: this.formBuilder.array([])
    });

    this.inputService.getAll().subscribe(inputsPage => {
      inputsPage.content.forEach((input: IInputData) => {
        const id: string = input.id ?? ''; // Utiliza el operador ?? para manejar el posible valor undefined
        const name: string = input.name ?? ''; // Utiliza el operador ?? para manejar el posible valor undefined
        this.inputsMap.set(id, name);
      });
    });

    this.output.umbralList.forEach(umbral => {
      this.addUmbral(umbral); // Add each umbral to the FormArray
    });

    this.form.disable();
  }

  /**
   * Method to replace IDs with names in the formula
   * @returns Formatted formula string
   */  
  getFormattedFormula(): string {
    let formula: string | null = this.form?.get('formula')?.value ?? '';
    if (formula !== null) {
        this.inputsMap.forEach((name, id) => {
            if (formula !== null) {
                formula = formula.replace(new RegExp(`#{${id}}`, 'g'), `#{${name}}`);
            }
        });
        return formula ?? ''; // Return formula or empty string if it's null or undefined
    } else {
        return '';
    }
}


  /**
   * Toggle umbral list visibility
   */
  toggleUmbralList() {
    this.showUmbralList = !this.showUmbralList;
  }

  /**
   * Getter for umbralList FormArray
   * @returns UmbralList FormArray
   */
  get umbralList(): FormArray {
    return this.form.get('umbralList') as FormArray;
  }

  /**
   * Method to add a new umbral to the FormArray
   * @param umbral Umbral to be added
   */  
  addUmbral(umbral: IUmbral): void {
    this.umbralList.push(this.formBuilder.group({
      value: [umbral.value],
      text: [umbral.text],
      type: [umbral.type]
    }));
  }

  /**
   * Close the dialog
   */
  public closeModal (): void {
    this.dialogRef.close();
  }

}
