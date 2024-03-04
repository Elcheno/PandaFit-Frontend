import { Component, Inject, inject } from '@angular/core';
import { ButtonComponent } from '../../button/button.component';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUmbral } from '../../../model/interfaces/i-output-data';

/**
 * Component for generating umbrals dynamically.
 */
@Component({
  selector: 'app-umbral-generator',
  standalone: true,
  imports: [ButtonComponent, FormsModule, ReactiveFormsModule, ],
  templateUrl: './umbral-generator.component.html',
  styleUrl: './umbral-generator.component.scss'
})
export class UmbralGeneratorComponent {

  private readonly fb = inject(FormBuilder);

  /**
   * Form group for umbrals.
   */
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

  /**
   * Gets umbral list form array.
   */
  get umbralList (): FormArray {
    return this.form.get('umbralList') as FormArray;
  }

  /**
   * Adds a new umbral to the form.
   * @param text - Text of the umbral.
   * @param value - Value of the umbral.
   * @param type - Type of the umbral.
   */
  public addUmbral (text='',value=0,type='='): void {
    this.umbralList.push(
      this.fb.group({
        text: [text, [Validators.required, Validators.minLength(1)]],
        value: [value, [Validators.required, Validators.min(0)]],
        type: [type, [Validators.required]]
      })
    );
  }

  /**
   * Deletes an umbral from the form.
   * @param index - Index of the umbral to be deleted.
   */
  public deleteUmbral (index: number): void {
    this.umbralList.removeAt(index);
  }

  /**
   * Checks umbrals for validity and sorts them.
   * @returns True if umbrals are valid, otherwise false.
   */
  public checkUmbrals (): boolean {
    if (this.umbralList.length === 0) return false;
    this.umbralListResponse = this.umbralList.value;
    this.umbralListResponse.sort((a: IUmbral, b: IUmbral) => this.sortByType(a, b));
    return true;
  }

  /**
   * Closes the modal dialog.
   */
  public closeModal (): void {
    this.dialogRef.close();
  }

  /**
   * Submits the form data.
   */
  public onSubmit (): void {
    if (this.form.invalid) return;
    if (this.checkUmbrals()) this.dialogRef.close(this.umbralListResponse);
  }

  /**
   * Sorts umbrals by type.
   * @param a - First umbral.
   * @param b - Second umbral.
   * @returns Sorting order.
   */
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
