import { Component, ViewChild, inject } from '@angular/core';
import { TableInstitutionComponent } from '../components/institutions/table-institution/table-institution.component';
import { SearchEntityComponent } from '../components/search-entity/search-entity.component';
import { ButtonComponent } from '../components/button/button.component';
import { IInstitution } from '../model/interfaces/i-institution';
import { IPage } from '../model/interfaces/i-page';
import { InstitutionService } from '../services/institution/institution.service';
import { IPageable } from '../model/interfaces/i-pageable';
import { TableInstitutionAnswersComponent } from '../table-institution-answers/table-institution-answers.component';

@Component({
  selector: 'app-answers-institutions',
  standalone: true,
  imports: [TableInstitutionAnswersComponent, SearchEntityComponent, ButtonComponent],
  templateUrl: './answers-institutions.component.html',
  styleUrl: './answers-institutions.component.scss'
})
export class AnswersInstitutionsComponent {
  @ViewChild(TableInstitutionComponent) table!: TableInstitutionComponent;

  /** Instance of InstitutionService for interacting with institution data */
  private readonly institutionService = inject(InstitutionService);

  /** Holds the data for institutions */
  public data!: IPageable<IInstitution>;
  
  public filteringString: string = '';

  public async ngOnInit(): Promise<void> {
    this.institutionService.getAll({ page: 0, size: 10, sort: ['name'] })
    .subscribe((res) => {
      this.data = res;
    });
  }

  /**
   * Fetches all institutions based on the provided page information
   * @param page The page object
   */
  public getAll (page: IPage): void {
    if (!this.filteringString) {
      this.institutionService.getAll(page).subscribe((res) => {
        this.data = res;
      });
    } else {
      this.getAllFiltering(page, this.filteringString);
    }
  }

  public getAllFiltering (page: IPage, term: string) {
    this.institutionService.filterByName(term, page).subscribe((res) => {
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
