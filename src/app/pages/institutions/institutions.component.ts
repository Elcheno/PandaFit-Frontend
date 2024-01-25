import { Component, inject } from '@angular/core';
import { TableInstitutionComponent } from '../../components/table-institution/table-institution.component';
import { InstitutionService } from '../../services/institution/institution.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IInstitution } from '../../model/interfaces/i-institution';

@Component({
  selector: 'app-institutions',
  standalone: true,
  imports: [TableInstitutionComponent, ReactiveFormsModule],
  templateUrl: './institutions.component.html',
  styleUrl: './institutions.component.scss'
})
export class InstitutionsComponent {
  public form!:FormGroup;
  private institutionService = inject(InstitutionService)

  constructor(private fb:FormBuilder){
    this.form = this.fb.group({
      name: ''
    })
  }
  submit() {
    let newInstitution:IInstitution = {
      id: '',
      name: this.form.value.name,
      userList: []
    }
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(newInstitution))
    this.institutionService.create(newInstitution)
    this.form.reset();
  }

}
