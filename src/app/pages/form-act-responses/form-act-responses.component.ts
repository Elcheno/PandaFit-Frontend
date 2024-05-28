import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormActiveService } from '../../services/form/form-active.service';
import { AnswerService } from '../../services/answer/answer.service';
import { IPageable } from '../../model/interfaces/i-pageable';
import { TableResponsesComponent } from '../../components/responses/table-responses/table-responses.component';
import { SearchEntityComponent } from '../../components/search-entity/search-entity.component';

@Component({
  selector: 'app-form-act-responses',
  standalone: true,
  imports: [TableResponsesComponent, SearchEntityComponent],
  templateUrl: './form-act-responses.component.html',
  styleUrl: './form-act-responses.component.scss'
})
export class FormActResponsesComponent implements OnInit {

  private routeActiveService = inject(ActivatedRoute);
  private formActiveService = inject(FormActiveService);
  private answerService = inject(AnswerService);

  public formularyActive!: any;
  public data!: IPageable<any>;

  constructor () {}

  ngOnInit() {
    this.routeActiveService.params.subscribe((params) => {
      const id = params['id'];
      if (!id) return;

      this.formActiveService.getById(id).subscribe((res) => {
        this.formularyActive = res;
      });

      this.getData(id);

    });
  }

  private getData(id: string) {
    this.answerService.getByFormAct({ page: 0, size: 10, sort: [''] }, id).subscribe((res) => {
      this.data = res;
    });
  }

  public search(query: string) {
  }
}
