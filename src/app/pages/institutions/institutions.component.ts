import { Component, ViewChild, inject } from '@angular/core';
import { TableInstitutionComponent } from '../../components/institutions/table-institution/table-institution.component';
import { InstitutionService } from '../../services/institution/institution.service';
import { type IInstitution } from '../../model/interfaces/i-institution';
import { SearchEntityComponent } from '../../components/search-entity/search-entity.component';
import { ModalService } from '../../services/modal/modal.service';
import { CreateInstitutionModalComponent } from '../../components/modals/institutions/create-institution-modal/create-institution-modal.component';
import { UpdateInstitutionsModalComponent } from '../../components/modals/institutions/update-institutions-modal/update-institutions-modal.component';
import { IPageable } from '../../model/interfaces/i-pageable';
import { IPage } from '../../model/interfaces/i-page';
import { ButtonComponent } from '../../components/button/button.component';
import { ToastService } from '../../services/modal/toast.service';

/** Component for managing institutions */
@Component({
  selector: 'app-institutions',
  standalone: true,
  imports: [TableInstitutionComponent, SearchEntityComponent, ButtonComponent],
  templateUrl: './institutions.component.html',
  styleUrl: './institutions.component.scss'
})
export class InstitutionsComponent {
  @ViewChild(TableInstitutionComponent) table!: TableInstitutionComponent;

  /** Instance of InstitutionService for interacting with institution data */
  private readonly institutionService = inject(InstitutionService);

  /** Instance of ModalService for managing modals */
  private readonly modalService = inject(ModalService);

  /** Instance of ToastService for displaying toast notifications */
  private readonly toastService = inject(ToastService);

  /** Holds the data for institutions */
  public data!: IPageable<IInstitution>;

  /** Initializes the component */
  public async ngOnInit (): Promise<void> {
      this.institutionService.getAll({ page: 0, size: 10, sort: ['name'] }).subscribe((res) => {
        this.data = res;
      });
  }

  /**
   * Fetches all institutions based on the provided page information
   * @param page The page object
   */
  public async getAll (page: IPage): Promise<void> {
    this.institutionService.getAll(page).subscribe((res) => {
      this.data = res;
    });
  }

  /**
   * Opens the modal for creating a new institution
   */
  public async create (): Promise<void> {
    (await this.modalService.open(CreateInstitutionModalComponent)).closed.subscribe((institution: IInstitution) => {
      if (!institution) return;

      this.institutionService.create(institution).subscribe((res: IInstitution) => {
        this.data.content.splice(0, 0, res);
        this.data.totalElements += 1;
        this.toastService.showToast('Instituto creado', 'success');
      });
    });
  }

  /**
   * Opens the modal for updating an existing institution
   * @param institution The institution data
   */
  public async update (institution: IInstitution): Promise<void> {
    if (!institution) return;

    (await this.modalService.open(UpdateInstitutionsModalComponent, institution)).closed.subscribe((res: IInstitution) => {
      this.institutionService.update(res).subscribe((response: IInstitution) => {
        this.data.content = this.data.content.map((item) => item.id === response.id ? response : item);
        this.toastService.showToast('Instituto actualizado', 'success');
      });
    });
  }

  /**
   * Deletes an institution
   * @param institution The institution data
   */
  public async delete (institution: IInstitution): Promise<void> {
    if (!institution) return;
    
    this.institutionService.delete(institution).subscribe((res: IInstitution) => {
      this.data.content = this.data.content.filter((item) => item.id !== institution.id);
      this.data.totalElements -= 1;
      this.toastService.showToast('Instituto eliminado', 'success');
    })
  }

  /**
   * Performs search
   * @param value The search value
   */
  public search (value: string): void {
    console.log(value);
  }
}
