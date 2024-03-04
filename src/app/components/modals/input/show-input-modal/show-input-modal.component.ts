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
    { name: 'Numero', value: IInputType.NUMBER },
    { name: 'Verdadero o Falso', value: IInputType.BOOLEAN },
    { name: 'Texto', value: '2' }
  ];

  private inputTypeNames: { [key: number]: string } = {
    [IInputType.NUMBER]: 'Number',
    [IInputType.BOOLEAN]: 'Boolean',
    [IInputType.STRING]: 'Text'
  };

  constructor (
    public dialogRef: DialogRef<IInputData>,
    @Inject(DIALOG_DATA) public input: IInputData,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      name: input.name,
      description: input.description,
      selectType: [this.input.type, Validators.required],
      decimal: input.decimal,
      decimals: input.decimals,
      unit: input.unit
    });
    this.form.disable();
  }

  /**
   * Gets the name of the input type
   * @param type The input type
   * @returns The name of the input type
   */
  private getInputTypeName(type: number): string {
    const typeName = this.inputTypeNames[type];
    return type === IInputType.STRING ? "Texto" : type.toString();
  }

  /**
   * Closes the dialog
   */
  public closeModal(): void {
    this.dialogRef.close();
  }
}
