import { Component, OnInit, inject, ViewChild, OnChanges } from '@angular/core';
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
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../services/modal/toast.service';

@Component({
  selector: 'app-form-act',
  standalone: true,
  imports: [SearchEntityComponent, ButtonComponent, TableFormActComponent, FormsModule],
  templateUrl: './form-act.component.html',
  styleUrl: './form-act.component.scss'
})
export class FormActComponent implements OnInit {
  @ViewChild(TableFormActComponent) table!: TableFormActComponent;

  private readonly modalService = inject(ModalService);
  private readonly routeActive = inject(ActivatedRoute);
  private readonly schoolYearService = inject(SchoolyearService);
  private readonly formActiveService = inject(FormActiveService);
  private readonly toastService = inject(ToastService);

  public schoolyear!: ISchoolYear;
  public data!: IPageable<any>;
  public selectState: string = 'active';

  constructor() {}

  ngOnInit (): void {
    this.routeActive.queryParams.subscribe((params) => {
      const id = params['schoolyear'];
      if (!id) return;
      this.schoolYearService.getById(id).subscribe((res) => {
        if (!res) return;
        this.schoolyear = res;
      });
      
      this.formActiveService.getAllBySchoolYearAfter(id, { page: 0, size: 10, sort: [''] }).subscribe((res) => {
        this.data = res;
      });
    });
  }

  public onChangeStateOrPage (page?: IPage): void {
    page ? null : this.table.toggleTableLoader(); 
    if (this.selectState === 'active') {
      this.getAllBySchoolYearAfter(page ?? { page: 0, size: 10, sort: ['expirationDate'] });

    } else if (this.selectState === 'inactive') {
      this.getAllBySchoolYearBefore(page ?? { page: 0, size: 10, sort: ['expirationDate'] });

    } else {
      this.getAllBySchoolYear(page ?? { page: 0, size: 10, sort: ['expirationDate'] });

    }
  }

  public getAllBySchoolYearAfter (page: IPage): void {
    this.formActiveService.getAllBySchoolYearAfter(this.schoolyear.id, page).subscribe((res) => {
      this.data = res;
      this.table.toggleTableLoader(); 
    });
  }

  public getAllBySchoolYearBefore (page: IPage): void {
    this.formActiveService.getAllBySchoolYearBefore(this.schoolyear.id, page).subscribe((res) => {
      this.data = res;
      this.table.toggleTableLoader(); 
    });
  }

  public getAllBySchoolYear (page: IPage): void {
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
      if (!res) return;
      this.formActiveService.formActive(res).subscribe((res: any) => {
        if (!res || this.selectState === 'inactive') return;
        this.toastService.showToast('Formulario activado');
        this.data.totalElements += 1;
        this.data.content.splice(0, 0, res);
      });
    })
  }

}
