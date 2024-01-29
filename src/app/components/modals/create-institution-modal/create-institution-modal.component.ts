import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TableInstitutionComponent } from '../../table-institution/table-institution.component';
import { IInstitution } from '../../../model/interfaces/i-institution';

@Component({
  selector: 'app-create-institution-modal',
  standalone: true,
  imports: [TableInstitutionComponent, ReactiveFormsModule],
  templateUrl: './create-institution-modal.component.html',
  styleUrl: './create-institution-modal.component.scss'
})
export class CreateInstitutionModalComponent {
  public form!: FormGroup;
  public data: any[] = [];
  private readonly fb = inject(FormBuilder);

  constructor () {
    this.form = this.fb.group({
      name: ''
    });
  }

  async submit (): Promise<void> {
    if (this.form.invalid) return;

    const newInstitution: IInstitution = {
      name: this.form.value.name
    };

    this.form.reset();
  }
}
