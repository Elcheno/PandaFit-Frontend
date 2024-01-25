import { Component } from '@angular/core';
import { TableInstitutionComponent } from '../../components/table-institution/table-institution.component';

@Component({
  selector: 'app-institutions',
  standalone: true,
  imports: [TableInstitutionComponent],
  templateUrl: './institutions.component.html',
  styleUrl: './institutions.component.scss'
})
export class InstitutionsComponent {

}
