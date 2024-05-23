import { Component, Input, OnInit, ViewChild, effect, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SchoolyearService } from '../../services/schoolyear/schoolyear.service';
import { IPageable } from '../../model/interfaces/i-pageable';
import { ISchoolYear } from '../../model/interfaces/i-school-year';
import { SearchEntityComponent } from '../../components/search-entity/search-entity.component';
import { IPage } from '../../model/interfaces/i-page';
import { IInstitution } from '../../model/interfaces/i-institution';
import { ModalService } from '../../services/modal/modal.service';
import { CreateSchoolYearModalComponent } from '../../components/modals/schoolYears/create-school-year-modal/create-school-year-modal.component';
import { ButtonComponent } from '../../components/button/button.component';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';
import { IDropdownData } from '../../model/interfaces/i-dropdown';
import { ModalConfirmService } from '../../services/modal/modal-confirm.service';
import { UpdateSchoolYearModalComponent } from '../../components/modals/schoolYears/update-school-year-modal/update-school-year-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../services/modal/toast.service';
import { StoreService } from '../../services/store/store.service';

/** Component for managing school years */
@Component({
  selector: 'app-school-year',
  standalone: true,
  imports: [SearchEntityComponent, ButtonComponent, CdkMenuTrigger, CdkMenu, CdkMenuItem, DropdownComponent],
  templateUrl: './school-year.component.html',
  styleUrl: './school-year.component.scss'
})
export class SchoolYearComponent implements OnInit {

  /** Form group for school year */
  public form!: FormGroup;

  /** Instance of SchoolyearService for interacting with school year data */
  private readonly schoolYearService = inject(SchoolyearService);

  /** Instance of ModalService for managing modals */
  private readonly modalService = inject(ModalService);

  /** Instance of ModalConfirmService for confirmation modals */
  private readonly confirmService = inject(ModalConfirmService);

  /** Instance of ActivatedRoute for getting route parameters */
  private readonly router = inject(ActivatedRoute);

  /** Instance of ToastService for displaying toast notifications */
  private readonly toastService = inject(ToastService);

  /** Instance of Router for navigation */
  private readonly routerService = inject(Router);

  private readonly fb = inject(FormBuilder);

  private readonly storeService = inject(StoreService);

  // public data: ISchoolYear[] = [];

  /** Holds the data for school years */
  public data!: IPageable<ISchoolYear>;

  /** Holds the institution ID */
  private institutionId!: string;

  private filteringString: string = '';

  /** Initializes the component and form */
  constructor() {
    effect(() => {
      const reload = this.storeService.institutionStore.reload;
      if (reload) this.getAll({ page: 0, size: 10, sort: ['name'] });
    });
    this.form = this.fb.group({
      name: ''
    });
  }

  public ngOnInit(): void {
    this.router.queryParams.subscribe((params) => {
      this.institutionId = params['id'] ?? '';
      if (this.institutionId) {
        this.getAll({ 
          page: this.pageable.page, 
          size: this.pageable.size, 
          sort: this.pageable.sort 
        } as IPage, );
      }
    });
  }

  /** 
   * Pageable object for pagination 
   */
  public pageable: IPageable<ISchoolYear> = {
    page: 0,
    size: 10,
    sort: ['name'],
    totalElements: 0,
    totalPages: 0,
    content: []
  };

  public getAll (page: IPage): void {
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
      console.log(res);
      
      if (!res) return;
      this.data = res;
    });
  }

  /** 
   * Opens the modal to create a new school year 
   */
  public async create(): Promise<void> {
    (await this.modalService.open(CreateSchoolYearModalComponent)).closed.subscribe((schoolYear: ISchoolYear) => {
        if (!schoolYear) return;
      
      this.schoolYearService.create(schoolYear, this.institutionId).subscribe((res: ISchoolYear) => {
        this.data.content.splice(0, 0, res);
        this.data.totalElements += 1;
        this.storeService.institutionStore.revalidate();
        this.toastService.showToast('Curso creado', 'success');
      });
    });
  }

  /**
   * Deletes a school year.
   * 
   * @param schoolYear The school year to be deleted.
   * @returns A promise that resolves when the deletion is successful.
   */
  public async delete(schoolYear: ISchoolYear): Promise<void> {
      if (!schoolYear) return;

    this.schoolYearService.delete(schoolYear).subscribe((res: boolean) => {
      if (!res) return;
      this.data.content = this.data.content.filter((item) => item.id !== schoolYear.id);
      this.data.totalElements -= 1;
      this.storeService.institutionStore.revalidate();
      this.toastService.showToast('Curso eliminado', 'success');
    })
  }

  /**
   * Updates a school year.
   * 
   * @param schoolYear The school year to be updated.
   * @returns A promise that resolves when the update is successful.
   */
  public async update(schoolYear: ISchoolYear): Promise<void> {
    (await this.modalService.open(UpdateSchoolYearModalComponent, schoolYear)).closed.subscribe(async (res: ISchoolYear) => {
      if (!res) return;
      
      this.schoolYearService.update(res).subscribe((response: ISchoolYear) => {
        this.data.content = this.data.content.map((item) => item.id === response.id ? response : item);
        this.storeService.institutionStore.revalidate();
        this.toastService.showToast('Curso actualizado', 'success');
      });
    });
  }

  /**
   * Searches for a value.
   * 
   * @param searchValue The value to search for.
   * @returns A promise that resolves when the search is completed.
   */
  public search (searchValue: string, page?: number): void {
    if (searchValue) {
      this.filteringString = searchValue;
      this.getAllFiltering({ page: page ? page : 0, size: 10, sort: ['name'] }, searchValue);
    } else {
      this.filteringString = '';
      this.getAll({ page: page ? page : 0, size: 10, sort: ['name'] });
    }
  }

  /**
   * Handles the activation of a form for a school year.
   * 
   * @param data The school year data.
   * @returns A promise that resolves when the activation is completed.
   */
  public async handlerFormActive (data: ISchoolYear): Promise<void> {
    this.routerService.navigate(['/dashboard/formactive'], { queryParams: {id: this.institutionId, schoolyear: data.id}});
  }

  public dropdownRows: IDropdownData<ISchoolYear> = {
    header: 'Curso',
    button: {
      icon: '<svg class="w-[28px] h-[28px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="3" d="M6 12h0m6 0h0m6 0h0" />/svg>'
    },
    rows: [
      {
        title: 'Editar',
        disabled: false,
        fnc: (data: any) => {
          if (data == null) return;
          this.update(data);
        },
        icon: '<svg class="w-6 h-6 inline mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.3 4.8 2.9 2.9M7 7H4a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h11c.6 0 1-.4 1-1v-4.5m2.4-10a2 2 0 0 1 0 3l-6.8 6.8L8 14l.7-3.6 6.9-6.8a2 2 0 0 1 2.8 0Z" /></svg>'
      },
      {
        title: 'Eliminar',
        fnc: async (data: any) => {
          if (data == null) return;
          (await (this.confirmService.open('Estas seguro de eliminar este usuario'))).closed.subscribe((res: boolean) => {
            if (!res) return;
            this.delete(data);
          });
        },
        icon: '<svg class="w-6 h-6 inline mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" /></svg>'
      }
    ]
  };
}
