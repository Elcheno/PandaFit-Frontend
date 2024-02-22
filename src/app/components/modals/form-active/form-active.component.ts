import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { IInputData } from '../../../model/interfaces/i-input-data';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ISchoolYear } from '../../../model/interfaces/i-school-year';
import { FormService } from '../../../services/form/form.service';
import { IFormData } from '../../../model/interfaces/i-form-data';
import { ButtonComponent } from '../../button/button.component';
import { ModalService } from '../../../services/modal/modal.service';
import { SelectFormComponent } from './select-form/select-form.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-form-active',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, DatePipe],
  templateUrl: './form-active.component.html',
  styleUrl: './form-active.component.scss'
})
export class FormActiveComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly formService = inject(FormService);
  private readonly modalService = inject(ModalService);

  public formulary!: IFormData;
  public form!: FormGroup;
  public formList!: IFormData[];

  constructor (
    public dialogRef: DialogRef<any>,
    @Inject(DIALOG_DATA) public schoolYear: ISchoolYear
  ) { }

  ngOnInit (): void {
    this.form = this.fb.group({
      startDate: ['', [Validators.required]],
      expirationDate: ['', [Validators.required]],
      formId: ['', [Validators.required]],
      schoolYearId: [this.schoolYear?.id, [Validators.required]]
    });

    this.formService.getAll({page: 0, size: 100, sort: ['name']}).subscribe((data: any) => {
      this.formList = data.content;
    });
  }

  public async handlerSelectForm (): Promise<void> {
    (await this.modalService.open(SelectFormComponent)).closed.subscribe((res: IFormData) => {
      if (!res) return;
      this.form.controls['formId'].setValue(res.id);
      this.formulary = res;
    })
  }

  public onSubmit (): void {
    if (!this.form.valid) return;

    const formActive: any = {
      startDate: this.form.get('startDate')?.value,
      expirationDate: this.form.get('expirationDate')?.value,
      formId: this.form.get('formId')?.value,
      schoolYearId: this.form.get('schoolYearId')?.value
    }

    this.dialogRef.close(formActive);
  }

  public closeModal (): void {
    this.dialogRef.close();
  }

}
