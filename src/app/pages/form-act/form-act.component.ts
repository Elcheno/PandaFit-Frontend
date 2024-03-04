import { Component, OnInit, inject, ViewChild, OnChanges, signal } from '@angular/core';
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

  /** Instance of ModalService for managing modals */
  private readonly modalService = inject(ModalService);

    /** Instance of ActivatedRoute for accessing route parameters */
  private readonly routeActive = inject(ActivatedRoute);

  /** Instance of SchoolyearService for fetching school year data */
  private readonly schoolYearService = inject(SchoolyearService);

  /** Instance of FormActiveService for interacting with active form data */
  private readonly formActiveService = inject(FormActiveService);

  /** Instance of ToastService for displaying toast notifications */
  private readonly toastService = inject(ToastService);

  /** Holds the currently selected school year */
  public schoolyear!: ISchoolYear;

  /** Holds the data for the active forms */
  public data!: IPageable<any>;

  /** Represents the selected state (active, inactive, all) */
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
        console.log(res);
        this.data = res;
      });
    });
  }

  /**
   * Handles state or page change event
   * @param page The page object
   */
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

  /**
   * Fetches active forms after the specified page
   * @param page The page object
   */
  public getAllBySchoolYearAfter (page: IPage): void {
    this.formActiveService.getAllBySchoolYearAfter(this.schoolyear.id, page).subscribe((res) => {
      this.data = res;
      this.table.toggleTableLoader(); 
    });
  }

  /**
   * Fetches inactive forms before the specified page
   * @param page The page object
   */
  public getAllBySchoolYearBefore (page: IPage): void {
    this.formActiveService.getAllBySchoolYearBefore(this.schoolyear.id, page).subscribe((res) => {
      this.data = res;
      this.table.toggleTableLoader(); 
    });
  }

  /**
   * Fetches all forms for the specified school year
   * @param page The page object
   */
  public getAllBySchoolYear (page: IPage): void {
    this.formActiveService.getAllBySchoolYear(this.schoolyear.id, page).subscribe((res) => {
      this.data = res;
      this.table.toggleTableLoader(); 
    });
  }

  /**
   * Performs search
   * @param value The search value
   */
  public search (value: string): void {
    console.log(value);
  }

  /**
   * Opens the form modal
   */
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

  /**
   * Closes the form
   * @param formAct The form to be closed
   */
  public close(formAct: any): void {
    const currentDate = new Date(); 
    formAct.expirationDate = currentDate.toISOString();
    
    this.formActiveService.close(formAct).subscribe(() => {
      this.toastService.showToast('Formulario cerrado', 'success');
      this.data.content = this.data.content.filter((item) => item.id !== formAct.id);
    });
    
  }
  

}
