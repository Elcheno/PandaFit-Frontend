import { Component, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { PaginationComponent } from '../../../../components/pagination/pagination.component';
import { DropdownComponent } from '../../../../components/dropdown/dropdown.component';
import { LoaderSpinnerComponent } from '../../../../components/loader-spinner/loader-spinner.component';
import { ISchoolYear } from '../../../../model/interfaces/i-school-year';
import { IPageable } from '../../../../model/interfaces/i-pageable';
import { ModalConfirmService } from '../../../../services/modal/modal-confirm.service';
import { StoreService } from '../../../../services/store/store.service';
import { IDropdownData } from '../../../../model/interfaces/i-dropdown';
import { IPage } from '../../../../model/interfaces/i-page';
import { Router } from '@angular/router';
import { IInstitution } from '../../../../model/interfaces/i-institution';

@Component({
  selector: 'app-table-school-year',
  standalone: true,
  imports: [PaginationComponent, DropdownComponent, LoaderSpinnerComponent],
  templateUrl: './table-school-year.component.html',
  styleUrl: './table-school-year.component.scss'
})
export class TableSchoolYearComponent {
  @ViewChild('tableLoaderPage') public tableLoader!: any;

  @Input() public data!: IPageable<ISchoolYear>;

  @Input() public institution!: IInstitution;

    /**
   * Event emitter for delete action.
   */
  @Output() public onDelete = new EventEmitter<ISchoolYear>();

    /**
     * Event emitter for update action.
     */
  @Output() public onUpdate = new EventEmitter<ISchoolYear>();
  
    /**
     * Event emitter for page change action.
     */
  @Output() public onChangePage = new EventEmitter<IPage>();

  private readonly confirmService = inject(ModalConfirmService);
  private readonly storeService = inject(StoreService);
  private readonly routerService = inject(Router);

  public dropdownRows: IDropdownData<ISchoolYear> = {
    header: 'Curso',
    button: {
      icon: '<svg class="w-[28px] h-[28px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="3" d="M6 12h0m6 0h0m6 0h0" />/svg>'
    },
    rows: [
      {
        title: 'Gestión de Respuestas',
        fnc: async (data: any) => {
          if (data == null) return;
          this.routerService.navigate(['/dashboard/answers', data.id]);
        },
        icon: '<svg class="w-6 h-6 inline mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>'
      },
      {
        title: 'Gestión de Formularios',
        fnc: async (data: any) => {
          if (data == null) return;
          this.routerService.navigate(['/dashboard/formactive'], { queryParams: {id: this.institution.id, schoolyear: data.id}});
        },
        icon: '<svg class="w-6 h-6 inline mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>'
      },
      {
        title: 'Editar',
        disabled: false,
        fnc: (data: any) => {
          if (data == null) return;
          this.onUpdate.emit(data);
        },
        icon: '<svg class="w-6 h-6 inline mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.3 4.8 2.9 2.9M7 7H4a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h11c.6 0 1-.4 1-1v-4.5m2.4-10a2 2 0 0 1 0 3l-6.8 6.8L8 14l.7-3.6 6.9-6.8a2 2 0 0 1 2.8 0Z" /></svg>'
      },
      {
        title: 'Eliminar',
        fnc: async (data: any) => {
          if (data == null) return;
          (await (this.confirmService.open('Estas seguro de eliminar este usuario'))).closed.subscribe((res: boolean) => {
            if (!res) return;
            this.onDelete.emit(data);
          });
        },
        icon: '<svg class="w-6 h-6 inline mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" /></svg>'
      }
    ]
  };

  /**
   * Navigates to the next page.
   */
  public nextPage (): void {     
    if ((this.data.page + 1) > this.data.totalPages) return;
    this.toggleTableLoader();
    const page: IPage = {  
      page: this.data.page + 1,
      size: this.data.size,
      sort: this.data.sort 
    };
    this.storeService.schoolYearStore.revalidate();
    this.onChangePage.emit(page);
  }
  
  /**
   * Navigates to the previous page.
   */
  public previousPage (): void {
    if (this.data.page === 0) return;
    this.toggleTableLoader();
    const page: IPage = {  
      page: this.data.page - 1,
      size: this.data.size,
      sort: this.data.sort 
    };
    this.storeService.schoolYearStore.revalidate();
    this.onChangePage.emit(page);
  }

  /**
   * Toggles table loader visibility.
   */
  public toggleTableLoader (): void {
    this.tableLoader.nativeElement.classList.toggle('flex');
    this.tableLoader.nativeElement.classList.toggle('hidden');
  }
}
