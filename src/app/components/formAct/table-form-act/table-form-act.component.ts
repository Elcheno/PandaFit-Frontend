import { Component, Input, ViewChild, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { DropdownComponent } from '../../dropdown/dropdown.component';
import { LoaderSpinnerComponent } from '../../loader-spinner/loader-spinner.component';
import { PaginationComponent } from '../../pagination/pagination.component';
import { IPageable } from '../../../model/interfaces/i-pageable';
import { ModalConfirmService } from '../../../services/modal/modal-confirm.service';
import { type IDropdownData } from '../../../model/interfaces/i-dropdown';
import { IPage } from '../../../model/interfaces/i-page';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ISchoolYear } from '../../../model/interfaces/i-school-year';
import { SchoolyearService } from '../../../services/schoolyear/schoolyear.service';
import { StateFormActPipe } from '../../../pipes/state-form-act.pipe';

/**
 * Component representing a table for form activities.
 */
@Component({
  selector: 'app-table-form-act',
  standalone: true,
  imports: [DropdownComponent, LoaderSpinnerComponent, PaginationComponent, DatePipe, StateFormActPipe],
  templateUrl: './table-form-act.component.html',
  styleUrl: './table-form-act.component.scss'
})
export class TableFormActComponent implements OnInit {
  @ViewChild('tableLoaderPage') public tableLoader!: any;

  @Input() data!: IPageable<any>;

  @Output() public onDelete = new EventEmitter<any>();
  @Output() public onUpdate = new EventEmitter<any>();
  @Output() public onChangePage = new EventEmitter<any>();

  private readonly confirmService = inject(ModalConfirmService);
  private readonly routerActiveService = inject(ActivatedRoute);
  private readonly routerService = inject(Router);
  private readonly schoolYearService = inject(SchoolyearService);

  public schoolYear!: ISchoolYear;

  ngOnInit(): void {
    this.routerActiveService.queryParams.subscribe((res) => {
      const id = res['schoolyear'];
      this.schoolYearService.getById(id).subscribe((res) => {
        if (!res) return;
        this.schoolYear = res;
      });
    })
  }

  /**
   * Dropdown data for inactive form rows.
   */
  public dropdownRowsInactive: IDropdownData<any> = {
    header: 'Formulario',
    button: {
      icon: '<svg class="w-[28px] h-[28px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="3" d="M6 12h0m6 0h0m6 0h0" />/svg>'
    },
    rows: [
      {
        title: 'Ver Respuestas',
        fnc: (data: any) => {
          if (data == null) return;
          this.routerService.navigateByUrl(`/formactive/${data.id}/responses`);
        },
        icon: '<svg class="w-6 h-6 inline mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.6 8.5h8m-8 3.5H12m7.1-7H5c-.2 0-.5 0-.6.3-.2.1-.3.3-.3.6V15c0 .3 0 .5.3.6.1.2.4.3.6.3h4l3 4 3-4h4.1c.2 0 .5 0 .6-.3.2-.1.3-.3.3-.6V6c0-.3 0-.5-.3-.6a.9.9 0 0 0-.6-.3Z"/></svg>'
      },
    ]
  };

  /**
   * Dropdown data for active form rows.
   */
  public dropdownRowsActive: IDropdownData<any> = {
    header: 'Formulario',
    button: {
      icon: '<svg class="w-[28px] h-[28px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="3" d="M6 12h0m6 0h0m6 0h0" />/svg>'
    },
    rows: [
      {
        title: 'Rellenar Formulario',
        icon: '<svg class="w-6 h-6 inline mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 14v4.8a1.2 1.2 0 0 1-1.2 1.2H5.2A1.2 1.2 0 0 1 4 18.8V7.2A1.2 1.2 0 0 1 5.2 6h4.6m4.4-2H20v5.8m-7.9 2L20 4.2"/></svg>',
        fnc: (data: any) => {
          
          this.routerService.navigateByUrl(`/active/${data.id}`);
        }
      },
      {
        title: 'Ver Respuestas',
        fnc: (data: any) => {
          if (data == null) return;
          this.routerService.navigateByUrl(`/formactive/${data.id}/responses`);
        },
        icon: '<svg class="w-6 h-6 inline mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.6 8.5h8m-8 3.5H12m7.1-7H5c-.2 0-.5 0-.6.3-.2.1-.3.3-.3.6V15c0 .3 0 .5.3.6.1.2.4.3.6.3h4l3 4 3-4h4.1c.2 0 .5 0 .6-.3.2-.1.3-.3.3-.6V6c0-.3 0-.5-.3-.6a.9.9 0 0 0-.6-.3Z"/></svg>'
      },
      {
        title: 'Cerrar Formulario',
        fnc: async (data: any) => {
          if (data == null) return;
          (await (this.confirmService.open('Estas seguro de cerra este formulario'))).closed.subscribe((res: boolean) => {
            if (!res) return;
             this.onDelete.emit(data);
          });
        },
        icon: '<svg class="w-6 h-6 inline mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" /></svg>'
      }
    ]
  };

  /**
   * Handles going to the next page.
   */
  public nextPage (): void { 
    if ((this.data.page + 1) > this.data.totalPages) return;
    this.toggleTableLoader();
    const page: IPage = {  
      page: this.data.page + 1,
      size: this.data.size,
      sort: this.data.sort 
    };

    this.onChangePage.emit(page);
  }

  /**
   * Handles going to the previous page.
   */
  public previousPage (): void {
    if (this.data.page === 0) return;
    this.toggleTableLoader();
    const page: IPage = {  
      page: this.data.page - 1,
      size: this.data.size,
      sort: this.data.sort 
    };

    this.onChangePage.emit(page);
  }

  /**
   * Toggles the table loader visibility.
   */
  public toggleTableLoader (): void {
    this.tableLoader.nativeElement.classList.toggle('flex');
    this.tableLoader.nativeElement.classList.toggle('hidden');
  }
}
