import { Component, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { IPageable } from '../../../model/interfaces/i-pageable';
import { DatePipe } from '@angular/common';
import { IDropdownData } from '../../../model/interfaces/i-dropdown';
import { ModalConfirmService } from '../../../services/modal/modal-confirm.service';
import { IPage } from '../../../model/interfaces/i-page';
import { PaginationComponent } from '../../pagination/pagination.component';
import { LoaderSpinnerComponent } from '../../loader-spinner/loader-spinner.component';
import { DropdownComponent } from '../../dropdown/dropdown.component';
import { GeneratePdfService } from '../../../services/pdf/generate-pdf.service';

@Component({
  selector: 'app-table-responses',
  standalone: true,
  imports: [DatePipe, PaginationComponent, LoaderSpinnerComponent, DropdownComponent],
  templateUrl: './table-responses.component.html',
  styleUrl: './table-responses.component.scss'
})
export class TableResponsesComponent {
  @ViewChild('tableLoaderPage') public tableLoader!: any;

  @Input() data!: IPageable<any>;

  @Output() public onChangePage = new EventEmitter<IPage>();

  private readonly confirmService = inject(ModalConfirmService);

  private readonly generatePdfS = inject(GeneratePdfService);

  constructor () {}


  public dropdownRows: IDropdownData<any> = {
    header: 'Usuario',
    button: {
      icon: '<svg class="w-[28px] h-[28px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="3" d="M6 12h0m6 0h0m6 0h0" />/svg>'
    },
    rows: [
      {
        title: 'Generar Informe',
        disabled: false,
        fnc: (data: any) => {
          this.generatePdfS.generatePdf(data.id);
          if (data == null) return;
          
        },
        icon: '<svg class="w-6 h-6 inline mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.3 4.8 2.9 2.9M7 7H4a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h11c.6 0 1-.4 1-1v-4.5m2.4-10a2 2 0 0 1 0 3l-6.8 6.8L8 14l.7-3.6 6.9-6.8a2 2 0 0 1 2.8 0Z" /></svg>'
      },
      {
        title: 'Eliminar Respuesta',
        disabled: true,
        fnc: async (data: any) => {
          if (data == null) return;
          (await (this.confirmService.open('Estas seguro de eliminar este usuario'))).closed.subscribe((res: boolean) => {
            if (!res) return;

          });
        },
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

  public toggleTableLoader (): void {
    this.tableLoader.nativeElement.classList.toggle('flex');
    this.tableLoader.nativeElement.classList.toggle('hidden');
  }
}
