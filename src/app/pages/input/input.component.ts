import { Component, WritableSignal, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IInputType } from '../../model/interfaces/i-input-type';
import { CommonModule } from '@angular/common';
import { InputService } from '../../services/input/input.service';


@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  inputService = inject(InputService);
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

  formBuilder = inject(FormBuilder);
  formGroup!:FormGroup;
  status:WritableSignal<any>=signal({
    loading:false,
    error:false,
    inputs:[]
  });
  constructor(){
    /**
     *  id?:string;
    name?:string;
    description?:string;
    type:InputType;
    validators?:InputValidator[];
     */
    this.formGroup=this.formBuilder.group({
      name:['',Validators.required],
      description:[''],
      type:['',Validators.required],
      decimal:[''],
      decimals:[1],
      unit:['',Validators.required]
    })
  }

  onSubmit(){
    const newInput = {
      id:Math.floor(1000 + Math.random() * 9000),
      name:this.formGroup.get('name')?.value,
      description:this.formGroup.get('description')?.value,
      type:this.formGroup.get('type')?.value,
      decimal:this.formGroup.get('decimal')?.value,
      decimals:this.formGroup.get('decimals')?.value,
      unit:this.formGroup.get('unit')?.value
    };
    this.inputService.addInput(newInput);
    this.formGroup.reset();
  }
}
