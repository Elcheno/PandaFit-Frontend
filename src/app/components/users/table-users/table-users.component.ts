import { Component, Input, Output, EventEmitter, inject, ViewChild } from '@angular/core';
import { type IUser } from '../../../model/interfaces/i-user';
import { type IPageable } from '../../../model/interfaces/i-pageable';
import { ModalConfirmService } from '../../../services/modal/modal-confirm.service';
import { DropdownComponent } from '../../dropdown/dropdown.component';
import { type IDropdownData } from '../../../model/interfaces/i-dropdown';
import { LoaderSpinnerComponent } from '../../loader-spinner/loader-spinner.component';
import { IPage } from '../../../model/interfaces/i-page';
import { PaginationComponent } from '../../pagination/pagination.component';
import { RolePipe } from '../../../pipes/role.pipe';

@Component({
  selector: 'app-table-users',
  standalone: true,
  imports: [DropdownComponent, LoaderSpinnerComponent, PaginationComponent, RolePipe],
  templateUrl: './table-users.component.html',
  styleUrl: './table-users.component.scss'
})
export class TableUsersComponent {
  @ViewChild('tableLoaderPage') public tableLoader!: any;

  /**
   * Input data containing pageable user information.
   */
  @Input() public data!: IPageable<IUser>;


  /**
   * Event emitter for delete action.
   */
  @Output() public onDelete = new EventEmitter<IUser>();

  /**
   * Event emitter for update action.
   */
  @Output() public onUpdate = new EventEmitter<IUser>();

  /**
   * Event emitter for page change action.
   */
  @Output() public onChangePage = new EventEmitter<IPage>();

  private readonly confirmService = inject(ModalConfirmService);

  /**
   * Dropdown data for user actions.
   */
  public dropdownRows: IDropdownData<IUser> = {
    header: 'Usuario',
    button: {
      icon: '<svg class="w-[28px] h-[28px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="3" d="M6 12h0m6 0h0m6 0h0" />/svg>'
    },
    rows: [
      {
        title: 'Update',
        fnc: (data: any) => {
          if (data == null) return;
          console.log(data);
          this.onUpdate.emit(data);
        },
        icon: '<svg class="w-6 h-6 inline mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.3 4.8 2.9 2.9M7 7H4a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h11c.6 0 1-.4 1-1v-4.5m2.4-10a2 2 0 0 1 0 3l-6.8 6.8L8 14l.7-3.6 6.9-6.8a2 2 0 0 1 2.8 0Z" /></svg>'
      },
      {
        title: 'Delete',
        fnc: async (data: any) => {
          if (data == null) return;
          (await (this.confirmService.open('Estas seguro de eliminar este usuario'))).closed.subscribe((res: boolean) => {
            if (!res) return;
            this.onDelete.emit(data);
          });
        },
        icon: '<svg class="w-6 h-6 inline mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" /></svg>'
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
