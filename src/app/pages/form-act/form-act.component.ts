import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { SearchEntityComponent } from '../../components/search-entity/search-entity.component';
import { ButtonComponent } from '../../components/button/button.component';
import { ModalService } from '../../services/modal/modal.service';
import { ActivatedRoute } from '@angular/router';
import { ISchoolYear } from '../../model/interfaces/i-school-year';
import { SchoolyearService } from '../../services/schoolyear/schoolyear.service';
import { FormActiveComponent } from '../../components/modals/form-active/form-active.component';
import { TableFormActComponent } from '../../components/formAct/table-form-act/table-form-act.component';
import { IPageable } from '../../model/interfaces/i-pageable';
import { FormActiveService } from '../../services/form/form-active.service';
import { IPage } from '../../model/interfaces/i-page';

@Component({
  selector: 'app-form-act',
  standalone: true,
  imports: [SearchEntityComponent, ButtonComponent, TableFormActComponent],
  templateUrl: './form-act.component.html',
  styleUrl: './form-act.component.scss'
})
export class FormActComponent implements OnInit {
  @ViewChild(TableFormActComponent) table!: TableFormActComponent;

  private readonly modalService = inject(ModalService);
  private readonly routeActive = inject(ActivatedRoute);
  private readonly schoolYearService = inject(SchoolyearService);
  private readonly formActiveService = inject(FormActiveService);

  public schoolyear!: ISchoolYear;
  public data!: IPageable<any>;

  constructor() {}

  ngOnInit (): void {
    this.routeActive.queryParams.subscribe((params) => {
      const id = params['schoolyear'];
      if (!id) return;
      this.schoolYearService.getById(id).subscribe((res) => {
        if (!res) return;
        this.schoolyear = res;
      });
      
      this.formActiveService.getAllBySchoolYear(id, { page: 0, size: 10, sort: [''] }).subscribe((res) => {
        this.data = res;
        console.log(this.data);
      });
    });

  }

  public async getAllBySchoolYear (page: IPage): Promise<void> {
    this.formActiveService.getAllBySchoolYear(this.schoolyear.id, page).subscribe((res) => {
      this.data = res;
      this.table.toggleTableLoader(); 
    });
  }

  public search (value: string): void {
    console.log(value);
  }

  public async openForm (): Promise<void> {
    (await this.modalService.open(FormActiveComponent, this.schoolyear)).closed.subscribe((res: any) => {
      console.log(res);
    })
  }

}
