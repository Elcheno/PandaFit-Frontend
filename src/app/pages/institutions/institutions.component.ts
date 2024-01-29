import { Component, inject } from '@angular/core';
import { TableInstitutionComponent } from '../../components/table-institution/table-institution.component';
import { InstitutionService } from '../../services/institution/institution.service';
import { FormBuilder, type FormGroup, ReactiveFormsModule } from '@angular/forms';
import { type IInstitution } from '../../model/interfaces/i-institution';
import { ModalService } from '../../services/modal/modal.service';
import { CreateInstitutionModalComponent } from '../../components/modals/create-institution-modal/create-institution-modal.component';

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
  private readonly modalS = inject(ModalService);

  public data: any[] = [];

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
      .then((res) => {
        console.log(res);
        this.data.push(res);
      })
      .catch((error) => {
        console.log(error);
      });
    this.form.reset();
  }

  open() {
    this.modalS.openModal(CreateInstitutionModalComponent);
  }
}
