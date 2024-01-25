import { Component, inject } from '@angular/core';
import { TableInstitutionComponent } from '../../components/table-institution/table-institution.component';
import { InstitutionService } from '../../services/institution/institution.service';
import { type FormBuilder, type FormGroup, ReactiveFormsModule } from '@angular/forms';
import { type IInstitution } from '../../model/interfaces/i-institution';

@Component({
  selector: 'app-institutions',
  standalone: true,
  imports: [TableInstitutionComponent, ReactiveFormsModule],
  templateUrl: './institutions.component.html',
  styleUrl: './institutions.component.scss'
})
export class InstitutionsComponent {
  public form!: FormGroup;
  private readonly institutionService = inject(InstitutionService);

  constructor (private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      name: ''
    });
  }

  async submit (): Promise<void> {
    if (this.form.invalid) return;

    const newInstitution: IInstitution = {
      name: this.form.value.name
    };
    await this.institutionService.create(newInstitution)
      .then(() => {
        console.log('Institution created');
      })
      .catch((error) => {
        console.log(error);
      });
    this.form.reset();
  }
}
