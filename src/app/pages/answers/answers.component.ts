import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchoolyearService } from '../../services/schoolyear/schoolyear.service';
import { ISchoolYear } from '../../model/interfaces/i-school-year';
import { AnswerService } from '../../services/answer/answer.service';
import { SearchEntityComponent } from '../../components/search-entity/search-entity.component';
import { TableAnswerComponent } from '../../components/answers/table-answer/table-answer.component';
import { IPage } from '../../model/interfaces/i-page';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-answers',
  standalone: true,
  imports: [SearchEntityComponent, TableAnswerComponent, DropdownComponent, FormsModule],
  templateUrl: './answers.component.html',
  styleUrl: './answers.component.scss'
})
export class AnswersComponent implements OnInit {

  private readonly routerActivatedService = inject(ActivatedRoute);
  private readonly schoolYearService = inject(SchoolyearService);
  private readonly answerService = inject(AnswerService);

  public data!: any;
  public schoolyearId!: string;
  public schoolyear!: ISchoolYear;
  public filtering: string = '';

  public selectState: string = 'all';

  constructor() {
    this.schoolyearId = this.routerActivatedService.snapshot.params['schoolyear'] ?? '';    
  }

  ngOnInit(): void {
    this.getSchoolYear();
    this.getResponsesBySchoolYear();    
  }

  private getSchoolYear(): any {
    if (!this.schoolyearId) return;
    this.schoolYearService.getById(this.schoolyearId).subscribe((res) => {
      if (!res) return;      
      this.schoolyear = res;
    });
  }

  public getResponsesBySchoolYear(page: IPage = { page: 0, size: 10, sort: [''] }): any {
    if (!this.schoolyearId) return;

    

    if (this.filtering === '') {
      this.answerService.getBySchoolYear(page, this.schoolyearId).subscribe((res) => {        
        if (!res) {
          this.data = null;
          return;
        }
        this.data = res;
      });
    } else {
      this.getFilteringResponsesBySchoolYear(page);
    }
      
  }

  public getFilteringResponsesBySchoolYear(pageParams: IPage): void {
  
        if (this.filtering.startsWith('@')) {
        // Llamar a getAllFilterByUUID si el término comienza con '@'
          const uuid = this.filtering.substring(1); // Eliminar el '@' del término
          this.answerService.getAllFilterByUUID(uuid, pageParams, this.schoolyearId).subscribe((res) => {
              if (!res) {
                  this.data = null;
                  return;
              }
              this.data = res;
          }, (error) => {
              console.error('Error al buscar por UUID:', error);
          });
        } else {
          // Llamar a getAllFilterByNameFormulary si el término no contiene '@'
          this.answerService.getAllFilterByNameFormulary(this.filtering, pageParams, this.schoolyearId).subscribe((res) => {
              if (!res) {
                  this.data = null;
                  return;
              }
              this.data = res;
          }, (error) => {
              console.error('Error al buscar por nombre de formulario:', error);
          });
        }
  }

  public search(term: string): void {
    // Define los parámetros de la página si es necesario
    const pageParams: IPage = { page: 0, size: 10, sort: [''] };
    if (term) {
      this.filtering = term;

      this.getFilteringResponsesBySchoolYear(pageParams);

      }else{
        this.filtering = '';
        this.getResponsesBySchoolYear();
    }

    
}

  public onChangeStateOrPage(): void {
    console.log(this.selectState);
    
  }

}
