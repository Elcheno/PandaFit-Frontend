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

  verDetalleCurso(schoolYearId: string) {
    // Aquí puedes implementar la lógica para mostrar el detalle del curso escolar
    // Puedes acceder al ID del año escolar seleccionado a través del parámetro schoolYearId
    console.log('Detalle del curso escolar con ID:', schoolYearId);
    // Por ejemplo, podrías abrir un modal o cargar más información sobre el curso seleccionado
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
