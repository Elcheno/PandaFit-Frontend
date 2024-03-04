import { Component, Input, ViewChild, inject } from '@angular/core';
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
import { FormActiveComponent } from '../../components/modals/form-active/form-active.component';

@Component({
  selector: 'app-school-year',
  standalone: true,
  imports: [SearchEntityComponent, ButtonComponent, CdkMenuTrigger, CdkMenu, CdkMenuItem, DropdownComponent],
  templateUrl: './school-year.component.html',
  styleUrl: './school-year.component.scss'
})
export class SchoolYearComponent {
  public form!: FormGroup;
  private readonly schoolYearService = inject(SchoolyearService);
  private readonly modalService = inject(ModalService);
  private readonly confirmService = inject(ModalConfirmService);
  private readonly router = inject(ActivatedRoute);
  private readonly toastService = inject(ToastService);
  private readonly routerService = inject(Router);

  // public data: ISchoolYear[] = [];
  public data!: IPageable<ISchoolYear>;
  private institutionId!: string;

  constructor(private readonly fb: FormBuilder) {
    this.router.queryParams.subscribe((params) => {
      this.institutionId = params['id'] ?? '';
      if (this.institutionId) {
        this.loadTable();
      }
    })
    this.form = this.fb.group({
      name: ''
    });
  }

  public pageable: IPageable<ISchoolYear> = {
    page: 0,
    size: 10,
    sort: ['name'],
    totalElements: 0,
    totalPages: 0,
    content: []
  };

  public ngOnInit(): void {
    this.loadTable();
  }

  public loadTable(): void {
    this.schoolYearService.getAllByInstitution(
      { 
        page: this.pageable.page, 
        size: this.pageable.size, 
        sort: this.pageable.sort 
      } as IPage, 
    this.institutionId
    ).subscribe((res) => {
      this.data = res;
    });
  }
  public async create(): Promise<void> {
    (await this.modalService.open(CreateSchoolYearModalComponent)).closed.subscribe((schoolYear: ISchoolYear) => {
        if (!schoolYear) return;
      
      this.schoolYearService.create(schoolYear, this.institutionId).subscribe((res: ISchoolYear) => {
        this.data.content.splice(0, 0, res);
        this.data.totalElements += 1;
        this.toastService.showToast('Curso creado', 'success');
      });
    });
  }

  public async delete(schoolYear: ISchoolYear): Promise<void> {
      if (!schoolYear) return;

    this.schoolYearService.delete(schoolYear).subscribe((res: boolean) => {
      if (!res) return;
      this.data.content = this.data.content.filter((item) => item.id !== schoolYear.id);
      this.data.totalElements -= 1;
      this.toastService.showToast('Curso eliminado', 'success');
    })
  }

  public async update(schoolYear: ISchoolYear): Promise<void> {
    (await this.modalService.open(UpdateSchoolYearModalComponent, schoolYear)).closed.subscribe(async (res: ISchoolYear) => {
      if (!res) return;
      
      this.schoolYearService.update(res).subscribe((response: ISchoolYear) => {
        this.data.content = this.data.content.map((item) => item.id === response.id ? response : item);
        this.toastService.showToast('Curso actualizado', 'success');
      });
    });
  }

  public async search (searchValue: string): Promise <void> {
    return await new Promise((resolve, _reject) => {
      console.log(searchValue);
      resolve();
    });
  }

  public async handlerFormActive (data: ISchoolYear): Promise<void> {
    this.routerService.navigate(['/formactive'], { queryParams: {id: this.institutionId, schoolyear: data.id}});
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
