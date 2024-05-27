import { Component, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { PaginationComponent } from '../components/pagination/pagination.component';
import { DropdownComponent } from '../components/dropdown/dropdown.component';
import { LoaderSpinnerComponent } from '../components/loader-spinner/loader-spinner.component';
import { IPageable } from '../model/interfaces/i-pageable';
import { ISchoolYear } from '../model/interfaces/i-school-year';
import { IPage } from '../model/interfaces/i-page';
import { ModalConfirmService } from '../services/modal/modal-confirm.service';
import { Router } from '@angular/router';
import { IDropdownData } from '../model/interfaces/i-dropdown';

@Component({
  selector: 'app-table-school-year-answers',
  standalone: true,
  imports: [PaginationComponent, DropdownComponent, LoaderSpinnerComponent],
  templateUrl: './table-school-year-answers.component.html',
  styleUrl: './table-school-year-answers.component.scss'
})
export class TableSchoolYearAnswersComponent {

  @ViewChild('tableLoaderPage') public tableLoader!: any;

  @Input() public data!: IPageable<ISchoolYear>;

  @Output() public onDelete = new EventEmitter<ISchoolYear>();
  @Output() public onUpdate = new EventEmitter<ISchoolYear>(); 
  @Output() public onChangePage = new EventEmitter<IPage>();

  private readonly confirmService = inject(ModalConfirmService);
  private readonly router = inject(Router);

  /**
   * Dropdown data for schoolyear actions.
   */
    public dropdownRows: IDropdownData<any> = {
      header: 'Curso',
      button: {
        icon: '<svg class="w-[28px] h-[28px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="3" d="M6 12h0m6 0h0m6 0h0" />/svg>'
      },
      rows: [
        {
          title: 'Ver Respuestas',
          fnc: async (data: any) => {
            if (data == null) return;
              this.router.navigateByUrl(`/dashboard/answers/${data.id}`);
          },
          icon: '<svg class="w-6 h-6 inline mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" /></svg>'
        }
      ]
    };

  verDetalleCurso(schoolYearId: string) {

  }

  /**
   * Handles going to the next page.
   */
  public handleNextPage(): void {
    const nextPage: IPage = {
      page: this.data.page + 1,
      size: this.data.size,
      sort: this.data.sort
    };
    this.onChangePage.emit(nextPage);
  }

  /**
   * Handles going to the previous page.
   */
  public handlePreviousPage(): void {
    const previousPage: IPage = {
      page: this.data.page - 1,
      size: this.data.size,
      sort: this.data.sort
    };
    this.onChangePage.emit(previousPage);
  }

  /**
   * Toggles the table loader visibility.
   */
  public toggleTableLoader (): void {
    this.tableLoader.nativeElement.classList.toggle('flex');
    this.tableLoader.nativeElement.classList.toggle('hidden');
  }

}
