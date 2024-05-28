import { Component, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { DropdownComponent } from '../components/dropdown/dropdown.component';
import { LoaderSpinnerComponent } from '../components/loader-spinner/loader-spinner.component';
import { PaginationComponent } from '../components/pagination/pagination.component';
import { IPage } from '../model/interfaces/i-page';
import { IPageable } from '../model/interfaces/i-pageable';
import { IInstitution } from '../model/interfaces/i-institution';
import { ModalConfirmService } from '../services/modal/modal-confirm.service';
import { Router } from '@angular/router';
import { IDropdownData } from '../model/interfaces/i-dropdown';
import { CdkAccordion, CdkAccordionItem, CdkAccordionModule } from '@angular/cdk/accordion';
import { CommonModule } from '@angular/common';
import { ISchoolYear } from '../model/interfaces/i-school-year';
import { SchoolyearService } from '../services/schoolyear/schoolyear.service';
import { Subscription } from 'rxjs';
import { ModalService } from '../services/modal/modal.service';
import { AnswerInstitutionComponent } from '../components/modals/answer-institution/answer-institution.component';

@Component({
  selector: 'app-table-institution-answers',
  standalone: true,
  imports: [DropdownComponent, LoaderSpinnerComponent, PaginationComponent, CommonModule, CdkAccordion,CdkAccordionItem],
  templateUrl: './table-institution-answers.component.html',
  styleUrl: './table-institution-answers.component.scss'
})
export class TableInstitutionAnswersComponent {
  @ViewChild('tableLoaderPage') public tableLoader!: any;

  @Input() public data!: IPageable<IInstitution>;
  @Input() public schoolYears!: IPageable<ISchoolYear>;

  @Output() public onDelete = new EventEmitter<IInstitution>();
  @Output() public onUpdate = new EventEmitter<IInstitution>(); 
  @Output() public onChangePage = new EventEmitter<IPage>();

  private readonly confirmService = inject(ModalConfirmService);
  private readonly router = inject(Router);
  private readonly modalService = inject(ModalService);

  private schoolYearsSubscription: Subscription | undefined;
  //private readonly schoolyearService!: SchoolyearService
  
  // Variable para almacenar los IDs de las instituciones con el acordeón abierto
  public openAccordionId: string | null = null;
  
  constructor(private readonly schoolyearService: SchoolyearService) {}

  /**
   * Carga los años escolares asociados a una institución.
   * @param institutionId ID de la institución.
   */
  loadSchoolYears(institutionId: string): void {
    const pageParams: IPage = { page: 0, size: 10 }; // Define los parámetros de paginación según sea necesario
  
    this.schoolYearsSubscription = this.schoolyearService.getAllByInstitution(pageParams, institutionId)
      .subscribe({
        next: (res: IPageable<ISchoolYear>) => {
          // Filtra los años escolares que pertenecen a la institución seleccionada
          this.schoolYears = {
            ...res,
            content: res.content.filter(schoolYear => schoolYear.institutionId === institutionId)
          };
        },
        error: (error) => {
          console.error("Error fetching school years:", error);
          // Maneja los errores aquí
        }
      });
  }

  /**
   * Cambia el estado del acordeón y carga los años escolares correspondientes.
   * @param institutionId ID de la institución.
   */
  toggleAccordion(institutionId: string): void {
    // Si el ID de la institución es igual al ID del acordeón abierto, cierra el acordeón
    if (this.openAccordionId === institutionId) {
      this.openAccordionId = null;
      this.schoolYears = {
        page: 0,
        size: 10,
        sort: [],
        totalElements: 0,
        totalPages: 0,
        content: []
    }; // Limpia los años escolares
    } else {
      this.openAccordionId = institutionId;
      this.loadSchoolYears(institutionId);
    }
  }

  navigateToSchoolYear(item: any) {
    if (!item || !item.id) return;
    this.router.navigate(['/institutions/schoolyear'], { queryParams: { id: item.id } });
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

  /**
   * Handles viewing an institution.
   * @param institution The institution to view.
   */
  public handleViewInstitution (institution: IInstitution): void {
    this.router.navigate(['/dashboard/institutions/schoolyear'], { queryParams: { id: institution.id } });
  }

  public async showInstitutionSchoolYear(item: IInstitution): Promise<any> {
    ( await this.modalService.open(AnswerInstitutionComponent, item) ).closed.subscribe((res: any) => {
      this.router.navigateByUrl('/dashboard/answers/'+ res.id);
    })
  }

}