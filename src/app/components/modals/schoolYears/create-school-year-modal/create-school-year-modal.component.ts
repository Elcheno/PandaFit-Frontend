import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ISchoolYear } from '../../../../model/interfaces/i-school-year';

@Component({
  selector: 'app-create-school-year-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-school-year-modal.component.html',
  styleUrl: './create-school-year-modal.component.scss'
})
export class CreateSchoolYearModalComponent {
  private readonly fb = inject(FormBuilder);

  public form!: FormGroup;

  constructor (
    public dialogRef: DialogRef<ISchoolYear>,
    @Inject(DIALOG_DATA) public schoolYearList: ISchoolYear[]
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
    });
  }

  public submit (): void {
    if (!this.form.valid) return;

    const newSchoolYear: ISchoolYear = {
      name: this.form.value.name,
      institutionId: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
    };

    this.dialogRef.close(newSchoolYear);
  }

  public closeModal (): void {
    this.dialogRef.close();
  }
}
