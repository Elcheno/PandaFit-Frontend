import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, Inject, WritableSignal, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IInputData } from '../../../../model/interfaces/i-input-data';
import { IInputType } from '../../../../model/interfaces/i-input-type';
import { IInstitution } from '../../../../model/interfaces/i-institution';
import { CreateInputModalComponent } from '../create-input-modal/create-input-modal.component';

@Component({
  selector: 'app-show-input-modal',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,CreateInputModalComponent],
  templateUrl: './show-input-modal.component.html',
  styleUrl: './show-input-modal.component.scss'
})
export class ShowInputModalComponent {
  private readonly fb = inject(FormBuilder);
  formBuilder = inject(FormBuilder);

  status:WritableSignal<any>=signal({
    loading:false,
    error:false,
    inputs:[]
  });

  form!:FormGroup;
  inputType:any[]=[
    {
      name:'Number',
      value:IInputType.NUMBER
    },
    {
      name:'Boolean',
      value:IInputType.BOOLEAN
    },
    {
      name:'Text',
      value:IInputType.TEXT
    }
  ];

  constructor (
    public dialogRef: DialogRef<IInputData>,
    @Inject(DIALOG_DATA) public input: IInputData
  ) {
    this.form=this.formBuilder.group({
      name:input.name,
      description:input.description,
      selectType:input.type,
      decimal:input.decimal,
      decimals:input.decimals,
      unit:input.unit
    })
    this.form.disable();
  }

  public closeModal (): void {
    this.dialogRef.close();
  }
}
