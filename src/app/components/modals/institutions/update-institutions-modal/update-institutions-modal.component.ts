import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IInstitution } from '../../../../model/interfaces/i-institution';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ModalConfirmService } from '../../../../services/modal/modal-confirm.service';

@Component({
  selector: 'app-update-institutions-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-institutions-modal.component.html',
  styleUrl: './update-institutions-modal.component.scss'
})
export class UpdateInstitutionsModalComponent {
  private readonly fb = inject(FormBuilder);
  private readonly confirmService = inject(ModalConfirmService);

  public form!: FormGroup;

  constructor (
    public dialogRef: DialogRef<IInstitution>,
    @Inject(DIALOG_DATA) public data: IInstitution
  ) {
    this.form = this.fb.group({
      name: [data.name, [Validators.required]]
    });
  }

  public async submit (): Promise<void> {
    if (this.form.invalid || !this.form.dirty) return;
    (await this.confirmService.open('¿Estas seguro de actualizar este instituto?')).closed.subscribe((res: boolean) => {
      if (!res) return;
      const newInstitution: IInstitution = {
        ...this.data,
        name: this.form.value.name
      };
      this.dialogRef.close(newInstitution);
    });
  }

  public closeModal (): void {
    this.dialogRef.close();
  }
}
