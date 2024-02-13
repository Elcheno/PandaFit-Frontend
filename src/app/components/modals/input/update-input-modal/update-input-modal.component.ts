import { CommonModule } from '@angular/common';
import { Component, Inject, WritableSignal, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IInputType } from '../../../../model/interfaces/i-input-type';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { IInputData } from '../../../../model/interfaces/i-input-data';
import { IInstitution } from '../../../../model/interfaces/i-institution';
import { ModalConfirmService } from '../../../../services/modal/modal-confirm.service';

@Component({
  selector: 'app-update-input-modal',
  standalone: true,
  imports: [UpdateInputModalComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './update-input-modal.component.html',
  styleUrl: './update-input-modal.component.scss'
})
export class UpdateInputModalComponent {
  private readonly fb = inject(FormBuilder);
  private readonly confirmService = inject(ModalConfirmService);

  formBuilder = inject(FormBuilder);

  status:WritableSignal<any>=signal({
    loading:false,
    error:false,
    inputs:[]
  });

  form!:FormGroup;
  /*inputType:any[]=[
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
  ];*/

  inputType: any[] = [
    {
      name: 'Number',
      value: '0'  // Utiliza la misma representación de cadena que se encuentra en los datos del frontend
    },
    {
      name: 'Boolean',
      value: '1'  // Representación de cadena para booleanos
    },
    {
      name: 'Text',
      value: '2'  // Representación de cadena para texto
    }
];


  constructor (
    public dialogRef: DialogRef<IInputData>,
    @Inject(DIALOG_DATA) public input: IInputData 
) {

    this.initializeForm();
}

/*private initializeForm(): void {
    if (this.input) {
        this.form = this.formBuilder.group({
            name: [this.input.name, Validators.required],
            description: [this.input.description],
            selectType: [this.input.type.toString(), Validators.required],
            decimal: [this.input.decimal],
            decimals: [this.input.decimals],
            unit: [this.input.unit]
        });
    } else {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            description: [''],
            selectType: ['', Validators.required],
            decimal: [false],
            decimals: [0],
            unit: ['']
        });
    }

    console.log(this.input.type);
}*/

private initializeForm(): void {
  let typeValue = ''; 
  
  if (typeof this.input.type === 'string') {
    switch (this.input.type) {
      case 'NUMBER':
        typeValue = '0';
        break;
      case 'BOOLEAN':
        typeValue = '1';
        break;
      case 'STRING':
        typeValue = '2';
        break;
      default:
        typeValue = ''; 
    }
  }

  this.form = this.formBuilder.group({
    name: [this.input.name, Validators.required],
    description: [this.input.description],
    selectType: [typeValue, Validators.required], // Usar el tipo de valor convertido
    decimal: [this.input.decimal],
    decimals: [this.input.decimals],
    unit: [this.input.unit]
  });
}

  

  /*public submit (): void {
    if (!this.form.valid) return;

    const newInput = {
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

  }*/

  public async submit(): Promise<void> {
    if (!this.form.valid || !this.form.dirty) return;

    (await this.confirmService.open('¿Estás seguro de actualizar este input?')).closed.subscribe((res: boolean) => {
        if (!res) return;

        const updateInput = {
            id: this.input.id,
            name: this.form.get('name')?.value,
            description: this.form.get('description')?.value,
            type: this.form.get('selectType')?.value,
            decimal: this.form.get('decimal')?.value,
            decimals: this.form.get('decimals')?.value,
            unit: this.form.get('unit')?.value
        };

        this.form.reset();
        this.dialogRef.close(updateInput);
    });
}


  public closeModal (): void {
    this.dialogRef.close();
  }
}
