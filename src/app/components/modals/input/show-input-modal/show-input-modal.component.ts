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

  constructor (
    public dialogRef: DialogRef<IInputData>,
    @Inject(DIALOG_DATA) public input: IInputData,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      name: input.name,
      description: input.description,
      selectType: (this.input.type === 2) ? 'Text' : this.input.type.toString(), // Modificado
      decimal: input.decimal,
      decimals: input.decimals,
      unit: input.unit
    });
    this.form.disable();
  }

  public closeModal(): void {
    this.dialogRef.close();
  }
}
