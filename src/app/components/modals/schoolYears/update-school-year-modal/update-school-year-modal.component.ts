import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ISchoolYear } from '../../../../model/interfaces/i-school-year';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-update-school-year-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-school-year-modal.component.html',
  styleUrl: './update-school-year-modal.component.scss'
})
export class UpdateSchoolYearModalComponent {
  private readonly fb = inject(FormBuilder);

  public form!: FormGroup;

  constructor (
    public dialogRef: DialogRef<ISchoolYear>,
    @Inject(DIALOG_DATA) public schoolYear: ISchoolYear
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
    });
  }

  public submit (): void {
    if (!this.form.valid) return;

    const newSchoolYear: ISchoolYear = {
      id: this.schoolYear.id,
      name: this.form.value.name,
    };

    this.dialogRef.close(newSchoolYear);
  }

  public closeModal (): void {
    this.dialogRef.close();
  }

}
