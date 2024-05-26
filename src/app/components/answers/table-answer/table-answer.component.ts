import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DropdownComponent } from '../../dropdown/dropdown.component';
import { LoaderSpinnerComponent } from '../../loader-spinner/loader-spinner.component';
import { PaginationComponent } from '../../pagination/pagination.component';
import { IPageable } from '../../../model/interfaces/i-pageable';
import { IDropdownData } from '../../../model/interfaces/i-dropdown';
import { IPage } from '../../../model/interfaces/i-page';
import { DatePipe } from '@angular/common';
import { FormatUUIDPipe } from '../../../pipes/format-uuid.pipe';

@Component({
  selector: 'app-table-answer',
  standalone: true,
  imports: [DropdownComponent, LoaderSpinnerComponent, PaginationComponent, DatePipe, FormatUUIDPipe],
  templateUrl: './table-answer.component.html',
  styleUrl: './table-answer.component.scss'
})
export class TableAnswerComponent {
  @ViewChild('tableLoaderPage') public tableLoader!: any;

  @Input() public data!: IPageable<any>;

  @Output() public onChangePage = new EventEmitter<IPage>();


  public dropdownRows: IDropdownData<any> = {
    header: 'Respuesta',
    button: {
      icon: '<svg class="w-[28px] h-[28px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="3" d="M6 12h0m6 0h0m6 0h0" />/svg>'
    },
    rows: [
      {
        title: 'Eliminar',
        disabled: true,
        fnc: async (data: any) => {},
        icon: '<svg class="w-6 h-6 inline mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" /></svg>'
      }
    ]
  };

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
  
    public toggleTableLoader (): void {
      this.tableLoader.nativeElement.classList.toggle('flex');
      this.tableLoader.nativeElement.classList.toggle('hidden');
    }

}
