import { Component, OnInit, inject } from '@angular/core';
import { TableSchoolYearAnswersComponent } from '../table-school-year-answers/table-school-year-answers.component';
import { SearchEntityComponent } from '../components/search-entity/search-entity.component';
import { SchoolyearService } from '../services/schoolyear/schoolyear.service';
import { IPageable } from '../model/interfaces/i-pageable';
import { ISchoolYear } from '../model/interfaces/i-school-year';
import { IPage } from '../model/interfaces/i-page';
import { AuthService } from '../services/auth/auth.service';
import { InstitutionService } from '../services/institution/institution.service';
import { IInstitution } from '../model/interfaces/i-institution';

@Component({
  selector: 'app-answers-school-year',
  standalone: true,
  imports: [TableSchoolYearAnswersComponent, SearchEntityComponent],
  templateUrl: './answers-school-year.component.html',
  styleUrl: './answers-school-year.component.scss'
})
export class AnswersSchoolYearComponent implements OnInit {

  //@ViewChild(TableInstitutionComponent) table!: TableInstitutionComponent;

  /** Instance of InstitutionService for interacting with institution data */
  private readonly schoolYearService = inject(SchoolyearService);
  private readonly institutionService = inject(InstitutionService);
  private readonly authService = inject(AuthService);

  /** Holds the data for institutions */
  public data!: IPageable<ISchoolYear>;
  public institution!: IInstitution;
  
  public filteringString: string = '';
  private institutionId!: string;
  
  ngOnInit(): void {
    this.getInstitutionId();
    this.getInstitution();
    this.getAll();    
  }

  getInstitutionId(): void {
    const id = this.authService.getInstitutionId();
    if (id) this.institutionId = id;
  }
  
  public getInstitution(): void {
    this.institutionService.getById(this.institutionId).subscribe((res) => {
      if (!res) return;
      this.institution = res;
    });
  }

  public getAll(page: IPage = { page: 0, size: 10, sort: ['name'] }): void {
    if (!this.filteringString) {
      this.schoolYearService.getAllByInstitution(page ,this.institutionId).subscribe((res) => {
        if (!res) return;
        this.data = res;        
      });
    } else {
      this.getAllFiltering (page, this.filteringString);
    }
  }
  

  public getAllFiltering (page: IPage, term: string) {
    this.schoolYearService.getAllInstitutionsFilteringByName(page, term, this.institutionId).subscribe((res) => {
      if (!res) return;
      this.data = res;
    });
  }

  public search (term: string, page?: number): void {
      if (term) {
        this.filteringString = term;
        this.getAllFiltering({ page: page ? page : 0, size: 10, sort: ['name'] }, term);

      } else {
        this.filteringString = '';
        this.getAll({ page: page ? page : 0, size: 10, sort: ['name'] });
        
      }
  }
}
