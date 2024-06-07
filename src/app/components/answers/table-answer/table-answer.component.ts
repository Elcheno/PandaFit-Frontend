import { Component, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { DropdownComponent } from '../../dropdown/dropdown.component';
import { LoaderSpinnerComponent } from '../../loader-spinner/loader-spinner.component';
import { PaginationComponent } from '../../pagination/pagination.component';
import { IPageable } from '../../../model/interfaces/i-pageable';
import { IDropdownData } from '../../../model/interfaces/i-dropdown';
import { IPage } from '../../../model/interfaces/i-page';
import { DatePipe } from '@angular/common';
import { FormatUUIDPipe } from '../../../pipes/format-uuid.pipe';
import { GeneratePdfService } from '../../../services/pdf/generate-pdf.service';


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

  private readonly pdfService = inject(GeneratePdfService);

  public dropdownRows: IDropdownData<any> = {
    header: 'Respuesta',
    button: {
      icon: '<svg class="w-[28px] h-[28px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="3" d="M6 12h0m6 0h0m6 0h0" />/svg>'
    },
    rows: [
      {
        title: 'Descargar Informe',
        fnc: async (data: any) => {
          if (!data) return;
          this.pdfService.generatePdf(data.id);
        },
        icon: '<svg class="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M13 11.15V4a1 1 0 1 0-2 0v7.15L8.78 8.374a1 1 0 1 0-1.56 1.25l4 5a1 1 0 0 0 1.56 0l4-5a1 1 0 1 0-1.56-1.25L13 11.15Z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M9.657 15.874 7.358 13H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2.358l-2.3 2.874a3 3 0 0 1-4.685 0ZM17 16a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z" clip-rule="evenodd"/></svg>'
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
