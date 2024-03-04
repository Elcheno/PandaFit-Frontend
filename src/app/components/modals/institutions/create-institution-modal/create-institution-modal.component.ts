import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TableInstitutionComponent } from '../../../institutions/table-institution/table-institution.component';
import { IInstitution } from '../../../../model/interfaces/i-institution';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-create-institution-modal',
  standalone: true,
  imports: [TableInstitutionComponent, ReactiveFormsModule],
  templateUrl: './create-institution-modal.component.html',
  styleUrl: './create-institution-modal.component.scss'
})
export class CreateInstitutionModalComponent {
  public form!: FormGroup;
  private readonly fb = inject(FormBuilder);

  constructor (
    public dialogRef: DialogRef<IInstitution>,
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  /**
   * Submits the form data
   */
  public async submit (): Promise<void> {
    if (this.form.invalid) return;
    const newInstitution: IInstitution = {
      name: this.form.value.name
    };
    this.dialogRef.close(newInstitution);
  }

  /**
   * Closes the dialog
   */
  public closeModal (): void {
    this.dialogRef.close();
  }
}
