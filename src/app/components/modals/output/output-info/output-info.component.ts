import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { IInputData } from '../../../../model/interfaces/i-input-data';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-output-info',
  standalone: true,
  imports: [],
  templateUrl: './output-info.component.html',
  styleUrl: './output-info.component.scss'
})
export class OutputInfoComponent {

  public form!: FormGroup;

  constructor (
    public dialogRef: DialogRef<IInputData>
  ) { }

  public closeModal (): void {
    this.dialogRef.close();
  }

}
