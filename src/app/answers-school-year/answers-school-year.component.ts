import { Component, OnInit, inject } from '@angular/core';
import { TableSchoolYearAnswersComponent } from '../table-school-year-answers/table-school-year-answers.component';
import { SearchEntityComponent } from '../components/search-entity/search-entity.component';
import { SchoolyearService } from '../services/schoolyear/schoolyear.service';
import { IPageable } from '../model/interfaces/i-pageable';
import { ISchoolYear } from '../model/interfaces/i-school-year';
import { IPage } from '../model/interfaces/i-page';
import { AuthService } from '../services/auth/auth.service';

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

  /** Holds the data for institutions */
  public data!: IPageable<ISchoolYear>;
  
  public filteringString: string = '';
  institutionName: string = '';
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Aquí puedes llamar a un método del AuthService para obtener el institutionId
    this.getInstitutionId();
    this.getInstitutionName();
  }

  /*getInstitutionId(): void {
    // Llama al método del AuthService para obtener el institutionId
    const institutionId = this.authService.getInstitutionId();
    console.log('Institution ID:', institutionId);

    this.schoolYearService.getAllByInstitution({ page: 0, size: 10, sort: ['name'] }, institutionId).subscribe((res) => {
      this.data = res;
    })
  }*/

  getInstitutionId(): void {
    const institutionId = this.authService.getInstitutionId();
    if (institutionId) {
      this.schoolYearService.getAllByInstitution({ page: 0, size: 10, sort: ['name'] }, institutionId).subscribe((res) => {
        this.data = res;
      });
    } else {
      console.error('Institution ID is not available.');
    }
  }

  getInstitutionName(): void {
    this.institutionName = this.authService.getInstitutionName() ?? ''; // Asigna el nombre del instituto a la propiedad
  }



  

  /*public getAll (page: IPage): void {
    const institutionId = this.authService.getInstitutionId();
    if (!this.filteringString) {
      this.schoolYearService.getAllByInstitution(page, institutionId).subscribe((res) => {
        this.data = res;
        console.log('this.institutionId', institutionId);
      });
    } else {
      //this.getAllFiltering(page, this.filteringString);
    }
  }*/
  public getAll(page: IPage): void {
    const institutionId = this.authService.getInstitutionId();
    if (institutionId) {
      this.schoolYearService.getAllByInstitution(page, institutionId).subscribe((res) => {
        this.data = res;
      });
    } else {
      console.error('Institution ID is not available.');
    }
  }
  

  /*public getAllFiltering (page: IPage, term: string) {
    this.schoolYearService.filterByName(term, page).subscribe((res) => {
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
  }*/
}
