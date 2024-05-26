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
    this.schoolYearService.getById("665f701c-5a6b-43c6-9f8b-fed703afc74c").subscribe((res) => {
      if (!res) return;      
      this.schoolyear = res;
    });
  }

  public getResponsesBySchoolYear(page: IPage = { page: 0, size: 10, sort: [''] }): any {
    if (!this.schoolyearId) return;

    this.answerService.getBySchoolYear(page, this.schoolyearId).subscribe((res) => {
      console.log(res);
      
      if (!res) {
        this.data = null;
        return;
      }
      this.data = res;
    });
  }

  public search (term: string): void {

  }

  public onChangeStateOrPage(): void {
    console.log(this.selectState);
    
  }

}
