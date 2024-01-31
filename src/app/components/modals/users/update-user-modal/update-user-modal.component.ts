/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/unbound-method */
import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, type FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { type IUser } from '../../../../model/interfaces/i-user';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { ModalConfirmService } from '../../../../services/modal/modal-confirm.service';

@Component({
  selector: 'app-update-user-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-user-modal.component.html',
  styleUrl: './update-user-modal.component.scss'
})
export class UpdateUserComponent {
  private readonly fb = inject(FormBuilder);
  private readonly confirmService = inject(ModalConfirmService);

  public form!: FormGroup;

  constructor (
    public dialogRef: DialogRef<IUser>,
    @Inject(DIALOG_DATA) public data: IUser
  ) {
    this.form = this.fb.group({
      email: [this.data.email, [Validators.required, Validators.email]]
    });
  }

  ngOnInit (): void {
    // console.log(this.dialogRef);
  }

  public async submit (): Promise<void> {
    if (this.form.invalid) return;
    (await this.confirmService.open('¿Estas seguro de actualizar este usuario?')).closed.subscribe((res: boolean) => {
      if (!res) return;
      const user: IUser = {
        id: this.data.id,
        email: this.form.value.email,
        role: this.data.role,
        password: this.data.password,
        institutionId: this.data.institutionId
      };
      this.dialogRef.close(user);
    });
  }

  public closeModal (): void {
    this.dialogRef.close();
  }
}
