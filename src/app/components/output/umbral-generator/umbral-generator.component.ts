import { Component, Inject, inject } from '@angular/core';
import { ButtonComponent } from '../../button/button.component';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUmbral } from '../../../model/interfaces/i-output-data';

@Component({
  selector: 'app-umbral-generator',
  standalone: true,
  imports: [ButtonComponent, FormsModule, ReactiveFormsModule, ],
  templateUrl: './umbral-generator.component.html',
  styleUrl: './umbral-generator.component.scss'
})
export class UmbralGeneratorComponent {

  private readonly fb = inject(FormBuilder);

  public form!: FormGroup;

  private umbralListResponse: IUmbral[] = [];
  
  constructor(
    public dialogRef: DialogRef<any>,
    @Inject(DIALOG_DATA) public umbrals: IUmbral[]
  ) {
    this.form = this.fb.group({
      umbralList: this.fb.array([])
    });

    if (this.umbrals.length === 0) {
      this.addUmbral();

    } else{
      for (const u of this.umbrals) {
        this.addUmbral(u.text,u.value,u.type);
      }
    }

  }

  get umbralList (): FormArray {
    return this.form.get('umbralList') as FormArray;
  }

  public addUmbral (text='',value=0,type='='): void {
    this.umbralList.push(
      this.fb.group({
        text: [text, [Validators.required, Validators.minLength(1)]],
        value: [value, [Validators.required, Validators.min(0)]],
        type: [type, [Validators.required]]
      })
    );
  }

  public deleteUmbral (index: number): void {
    this.umbralList.removeAt(index);
  }

  public checkUmbrals (): boolean {
    if (this.umbralList.length === 0) return false;
    this.umbralListResponse = this.umbralList.value;
    this.umbralListResponse.sort((a: IUmbral, b: IUmbral) => this.sortByType(a, b));
    return true;
  }

  public closeModal (): void {
    this.dialogRef.close();
  }

  public onSubmit (): void {
    if (this.form.invalid) return;
    if (this.checkUmbrals()) this.dialogRef.close(this.umbralListResponse);
  }

  private sortByType (a: IUmbral, b: IUmbral): number  {
    if (a.type === "=" && b.type !== "=") {
      return -1;
    }
    if (a.type !== "=" && b.type === "=") {
        return 1;
    }
    if (a.type === ">" && b.type === "<") {
        return -1;
    }
    if (a.type === "<" && b.type === ">") {
        return 1;
    }
    if (a.type === ">") {
        return b.value - a.value; // Ordenar de mayor a menor
    }
    if (a.type === "<") {
        return a.value - b.value; // Ordenar de menor a mayor
    }
    return 0;
  }

}
