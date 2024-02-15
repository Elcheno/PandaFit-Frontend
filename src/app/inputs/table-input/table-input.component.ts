import { Component, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';
import { LoaderSpinnerComponent } from '../../components/loader-spinner/loader-spinner.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { IPageable } from '../../model/interfaces/i-pageable';
import { IInputData } from '../../model/interfaces/i-input-data';
import { IPage } from '../../model/interfaces/i-page';
import { ModalConfirmService } from '../../services/modal/modal-confirm.service';
import { Router } from '@angular/router';
import { IDropdownData } from '../../model/interfaces/i-dropdown';

@Component({
  selector: 'app-table-input',
  standalone: true,
  imports: [DropdownComponent, LoaderSpinnerComponent, PaginationComponent],
  templateUrl: './table-input.component.html',
  styleUrl: './table-input.component.scss'
})
export class TableInputComponent {
  @ViewChild('tableLoaderPage') public tableLoader!: any;

  @Input() public data!: IPageable<IInputData>;

  @Output() public onShow = new EventEmitter<IInputData>();
  @Output() public onDelete = new EventEmitter<IInputData>();
  @Output() public onUpdate = new EventEmitter<IInputData>();
  @Output() public onChangePage = new EventEmitter<IPage>();

  private readonly confirmService = inject(ModalConfirmService);
  private readonly router = inject(Router);

  public dropdownData: IDropdownData<IInputData> = {
    header: 'Input',
    button: {
      icon: '<svg class="w-[28px] h-[28px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="3" d="M6 12h0m6 0h0m6 0h0" />/svg>'
    },
    rows: [
      {
        title: 'Show',
        icon: '<svg class="w-6 h-6 text-gray-800 mr-4  dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4 6-9 6s-9-4.8-9-6c0-1.2 4-6 9-6s9 4.8 9 6Z"/><path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg>',
        fnc: (data: any) => {
          if (data == null) return;
          this.onShow.emit(data);
        }
      },
      {
        title: 'Update',
        icon: '<svg class="w-6 h-6 inline mr-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.3 4.8 2.9 2.9M7 7H4a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h11c.6 0 1-.4 1-1v-4.5m2.4-10a2 2 0 0 1 0 3l-6.8 6.8L8 14l.7-3.6 6.9-6.8a2 2 0 0 1 2.8 0Z" /></svg>',
        fnc: (data: any) => { 
          if (data == null) return;
          this.onUpdate.emit(data);
        }
      },
      {
        title: 'Delete',
        icon: '<svg class="w-6 h-6 inline mr-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" /></svg>',
        fnc: async (data: any) => {
          if (data == null) return;
          (await this.confirmService.open('¿Estas seguro de eliminar este input?')).closed.subscribe((res: boolean) => {
            if (res) this.onDelete.emit(data);
          });
        }
      }
    ]
  };

  public handleNextPage(): void {
    const nextPage: IPage = {
      page: this.data.page + 1,
      size: this.data.size,
      sort: this.data.sort
    };
    this.onChangePage.emit(nextPage);
  }

  public handlePreviousPage(): void {
    const previousPage: IPage = {
      page: this.data.page - 1,
      size: this.data.size,
      sort: this.data.sort
    };
    this.onChangePage.emit(previousPage);
  }

  public toggleTableLoader (): void {
    this.tableLoader.nativeElement.classList.toggle('flex');
    this.tableLoader.nativeElement.classList.toggle('hidden');
  }

}
