import { Component, ViewChild, inject } from '@angular/core';
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

@Component({
  selector: 'app-school-year',
  standalone: true,
  imports: [SearchEntityComponent, ButtonComponent, CdkMenuTrigger, CdkMenu, CdkMenuItem, DropdownComponent],
  templateUrl: './school-year.component.html',
  styleUrl: './school-year.component.scss'
})
export class SchoolYearComponent {
  public form!: FormGroup;
  private readonly shoolyearService = inject(SchoolyearService);
  private readonly modalService = inject(ModalService);
  private readonly confirmService = inject(ModalConfirmService);
  private readonly router = inject(ActivatedRoute);

  public data: ISchoolYear[] = [];
  private route = this.router.snapshot.paramMap.get('institutionId');

  constructor(private readonly fb: FormBuilder) {
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

  public async ngOnInit(): Promise<void> {
    // await this.loadTable();
    await this.loadTable();
  }

  public async loadTable(): Promise<void> {
    this.shoolyearService.getAllByInstitution(
      { 
        page: this.pageable.page, 
        size: this.pageable.size, 
        sort: this.pageable.sort 
      } as IPage, 
    this.route
    ).subscribe((res) => {
      this.data = res.content;
    });
  }
  public async create(): Promise<void> {
    (await this.modalService.open(CreateSchoolYearModalComponent)).closed.subscribe((schoolYear: ISchoolYear) => {
      if (!schoolYear) return;

      this.shoolyearService.create(schoolYear, this.route).subscribe((res: ISchoolYear) => {
        this.data.push(schoolYear);
      });
    });
  }

  public delete(schoolYear: ISchoolYear): void {
    this.shoolyearService.delete(schoolYear).subscribe((res: boolean) => {
      if (!res) return;
      this.data = this.data.filter((item) => item.id !== schoolYear.id);
    });
  }

  public async update(schoolYear: ISchoolYear): Promise<void> {
    console.log(schoolYear);
    (await this.modalService.open(UpdateSchoolYearModalComponent, schoolYear)).closed.subscribe((schoolYear: ISchoolYear) => {
      if (!schoolYear) return;
      
      this.shoolyearService.update(schoolYear).subscribe((response: ISchoolYear) => {
        this.data = this.data.map((item) => item.id === response.id ? response : item);

      });
    });
  }

  public async search (searchValue: string): Promise <void> {
    return await new Promise((resolve, _reject) => {
      console.log(searchValue);
      resolve();
    });
  }

  public async getMock(): Promise<void> {
    this.data = await this.shoolyearService.getAllMock();
  }

  public dropdownRows: IDropdownData<ISchoolYear> = {
    header: 'Curso',
    button: {
      icon: '<svg class="w-[28px] h-[28px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="3" d="M6 12h0m6 0h0m6 0h0" />/svg>'
    },
    rows: [
      {
        title: 'Update',
        disabled: false,
        fnc: (data: any) => {
          if (data == null) return;
          console.log(data);
          this.update(data);
        },
        icon: '<svg class="w-6 h-6 inline mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.3 4.8 2.9 2.9M7 7H4a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h11c.6 0 1-.4 1-1v-4.5m2.4-10a2 2 0 0 1 0 3l-6.8 6.8L8 14l.7-3.6 6.9-6.8a2 2 0 0 1 2.8 0Z" /></svg>'
      },
      {
        title: 'Delete',
        fnc: async (data: any) => {
          if (data == null) return;
          (await (this.confirmService.open('Estas seguro de eliminar este usuario'))).closed.subscribe((res: boolean) => {
            if (!res) return;
            this.delete(data);
          });
        },
        icon: '<svg class="w-6 h-6 inline mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" /></svg>'
      }
    ]
  };
}
