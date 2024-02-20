import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { IInputData } from '../../../model/interfaces/i-input-data';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ISchoolYear } from '../../../model/interfaces/i-school-year';
import { FormService } from '../../../services/form/form.service';
import { IFormData } from '../../../model/interfaces/i-form-data';

@Component({
  selector: 'app-form-active',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-active.component.html',
  styleUrl: './form-active.component.scss'
})
export class FormActiveComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly formService = inject(FormService);

  public form!: FormGroup;
  public formList!: IFormData[];

  constructor (
    public dialogRef: DialogRef<IInputData>,
    @Inject(DIALOG_DATA) public schoolYear: ISchoolYear
  ) { }

  ngOnInit (): void {
    this.form = this.fb.group({
      startDate: [''],
      expirationDate: [''],
      formId: ['', [Validators.required]],
      schoolYearId: [this.schoolYear?.id, [Validators.required]]
    });

    this.formService.getAll({page: 0, size: 100, sort: ['name']}).subscribe((data: any) => {
      this.formList = data.content;
    })
  }

  public onSubmit (): void {
    console.log(this.form)
    if (!this.form.valid) return;
  }

  public closeModal (): void {
    this.dialogRef.close();
  }

}
