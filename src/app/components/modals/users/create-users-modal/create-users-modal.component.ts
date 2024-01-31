/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/unbound-method */
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, type FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { type IUser } from '../../../../model/interfaces/i-user';
import { type IInstitution } from '../../../../model/interfaces/i-institution';
import { ITypeRole } from '../../../../model/type/i-type-role';

@Component({
  selector: 'app-create-users-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-users-modal.component.html',
  styleUrl: './create-users-modal.component.scss'
})
export class CreateUsersModalComponent {
  private readonly fb = inject(FormBuilder);

  public form!: FormGroup;

  constructor (
    public dialogRef: DialogRef<IUser>,
    @Inject(DIALOG_DATA) public institutionList: IInstitution[]
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      checkboxUser: [true],
      checkboxAdmin: [false],
      selectInstitution: ['', [Validators.required]]
    });
  }

  public submit (): void {
    if (this.form.invalid) return;

    const newUser: IUser = {
      email: this.form.value.email,
      password: 'Example1&',
      role: this.form.value.checkboxAdmin ? [ITypeRole.USER, ITypeRole.ADMIN] : [ITypeRole.USER],
      institutionId: this.form.value.selectInstitution
    };

    this.dialogRef.close(newUser);
  }

  public closeModal (): void {
    this.dialogRef.close();
  }
}
