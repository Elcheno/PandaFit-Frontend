import { Component } from '@angular/core';
import { ButtonComponent } from '../../button/button.component';
import { DialogRef } from '@angular/cdk/dialog';
import { IUmbral } from '../../../model/interfaces/i-output-data';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-umbral-generator',
  standalone: true,
  imports: [ButtonComponent, FormsModule],
  templateUrl: './umbral-generator.component.html',
  styleUrl: './umbral-generator.component.scss'
})
export class UmbralGeneratorComponent {

  public umbralList: IUmbral[] = [
    {
      text: '',
      value: 0,
      type: '='
    }
  ];
  

  constructor(
    public dialogRef: DialogRef<any>,
  ) { }

  public closeModal(): void {
    console.log(this.umbralList);
    this.dialogRef.close();
  }

  public addUmbral(): void {
    this.umbralList.push({
      text: '',
      value: 0,
      type: '=='
    })
  }
}
