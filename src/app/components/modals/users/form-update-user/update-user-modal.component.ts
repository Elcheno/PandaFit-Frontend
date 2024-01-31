/* eslint-disable @typescript-eslint/unbound-method */
import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, type FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { type IUser } from '../../../../model/interfaces/i-user';
import { type DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';

@Component({
  selector: 'app-update-user-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-user-modal.component.html',
  styleUrl: './update-user-modal.component.scss'
})
export class UpdateUserComponent {
  @Inject(DIALOG_DATA) public data!: IUser;

  private readonly fb = inject(FormBuilder);

  public dialogRef!: DialogRef<string>;
  public form!: FormGroup;

  constructor () {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit (): void {
    setTimeout(() => {
      console.log(this.dialogRef);
    }, 1000);
  }

  public submit (): void {
    if (this.form.invalid) return;
    console.log(this.form.value);
  }
}
