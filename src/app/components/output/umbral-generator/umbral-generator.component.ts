import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../button/button.component';
import { DialogRef } from '@angular/cdk/dialog';
import { IUmbral } from '../../../model/interfaces/i-output-data';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-umbral-generator',
  standalone: true,
  imports: [ButtonComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './umbral-generator.component.html',
  styleUrl: './umbral-generator.component.scss'
})
export class UmbralGeneratorComponent {

  private readonly fb = inject(FormBuilder);

  public form!: FormGroup;
  
  constructor(
    public dialogRef: DialogRef<any>,
  ) {
    this.form = this.fb.group({
      umbralList: this.fb.array([])
    });
    this.addUmbral();
    console.log(this.form);
  }

  get umbralList (): FormArray {
    return this.form.get('umbralList') as FormArray;
  }

  public addUmbral (): void {
    this.umbralList.push(
      this.fb.group({
        text: ['', [Validators.required, Validators.minLength(1)]],
        value: [0, [Validators.required, Validators.min(0)]],
        type: ['=', [Validators.required]]
      })
    );
  }

  public deleteUmbral (index: number): void {
    this.umbralList.removeAt(index);
  }

  public checkUmbrals (): boolean {
    return true;
  }

  public closeModal (): void {
    this.dialogRef.close();
  }

  public onSubmit (): void {
    if (this.checkUmbrals()) this.dialogRef.close(this.umbralList.value);
  }
}
