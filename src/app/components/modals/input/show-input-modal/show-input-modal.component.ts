import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { IInputData } from '../../../../model/interfaces/i-input-data';
import { IInputType } from '../../../../model/interfaces/i-input-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-input-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './show-input-modal.component.html',
  styleUrls: ['./show-input-modal.component.scss']
})
export class ShowInputModalComponent {
  form: FormGroup;
  inputType = [
    { name: 'Number', value: IInputType.NUMBER },
    { name: 'Boolean', value: IInputType.BOOLEAN },
    { name: 'Text', value: '2' }
  ];

  private inputTypeNames: { [key: number]: string } = {
    [IInputType.NUMBER]: 'NUMBER',
    [IInputType.BOOLEAN]: 'BOOLEAN',
    [IInputType.STRING]: 'STRING'
  };

  constructor (
    public dialogRef: DialogRef<IInputData>,
    @Inject(DIALOG_DATA) public input: IInputData,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      name: input.name,
      description: input.description,
      /*selectType: (this.input.type === 2) ? 'Text' : this.input.type.toString(),*/ // Modificado
      selectType: [this.getInputTypeName(this.input.type), Validators.required],
      decimal: input.decimal,
      decimals: input.decimals,
      unit: input.unit
    });
    this.form.disable();
  }

  private getInputTypeName(type: number): string {
    // Obtiene el nombre del tipo del objeto inputTypeNames
    const typeName = this.inputTypeNames[type];
  
    // Retorna el nombre del tipo si es STRING, de lo contrario, devuelve el valor numérico como string
    return type === IInputType.STRING ? "Text" : type.toString();
  }

  public closeModal(): void {
    this.dialogRef.close();
  }
}
