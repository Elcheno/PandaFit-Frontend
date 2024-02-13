import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, WritableSignal, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IInstitution } from '../../../../model/interfaces/i-institution';
import { ITypeRole } from '../../../../model/type/i-type-role';
import { IInputType } from '../../../../model/interfaces/i-input-type';
import { CommonModule } from '@angular/common';
import { IInputData } from '../../../../model/interfaces/i-input-data';

@Component({
  selector: 'app-create-input-modal',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,CreateInputModalComponent],
  templateUrl: './create-input-modal.component.html',
  styleUrl: './create-input-modal.component.scss'
})
export class CreateInputModalComponent {
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
    @Inject(DIALOG_DATA) public institutionList: IInstitution[]
  ) {
    this.form=this.formBuilder.group({
      name:['',Validators.required],
      description:[''],
      selectType:['',Validators.required],
      decimal:[''],
      decimals:[1],
      unit:['']
    })
  }

  public submit (): void {
    if (!this.form.valid) return;

    const newInput = {
      /*id:Math.floor(1000 + Math.random() * 9000),*/
      name:this.form.get('name')?.value,
      description:this.form.get('description')?.value,
      type:this.form.get('type')?.value,
      decimal:this.form.get('decimal')?.value,
      decimals:this.form.get('decimals')?.value,
      unit:this.form.get('unit')?.value,
      userId:this.form.get('userId')?.value
    };
    this.form.reset();
    this.dialogRef.close(newInput);

  }

  public closeModal (): void {
    this.dialogRef.close();
  }
}
