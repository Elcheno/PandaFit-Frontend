/* eslint-disable @typescript-eslint/lines-between-class-members */
import { Component, Input, ViewChild, inject } from '@angular/core';
import { InstitutionService } from '../../services/institution/institution.service';
import { type IInstitution } from '../../model/interfaces/i-institution';
import { type IPageable } from '../../model/interfaces/i-pageable';
import { ModalTemplateComponent } from '../modal-template/modal-template.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CreateInstitutionModalComponent } from '../modals/create-institution-modal/create-institution-modal.component';

@Component({
  selector: 'app-table-institution',
  standalone: true,
  imports: [ModalTemplateComponent],
  templateUrl: './table-institution.component.html',
  styleUrl: './table-institution.component.scss'
})
export class TableInstitutionComponent {
  @ViewChild(ModalTemplateComponent) modal!: ModalTemplateComponent;
  // public data: any[] = [
  //   {
  //     id: 1,
  //     name: 'test',
  //     userList: []
  //   },
  //   {
  //     id: 2,
  //     name: 'test2',
  //     userList: []
  //   },
  //   {
  //     id: 3,
  //     name: 'test3',
  //     userList: []
  //   }
  // ]

  // public data!: any[];
  @Input() public data!: any[];

  public pageable: IPageable<IInstitution> = {
    page: 0,
    size: 10,
    sort: ['name'],
    totalElements: 0,
    totalPages: 0,
    content: []
  };

  private readonly institutionService = inject(InstitutionService);

  public async ngOnInit (): Promise<void> {
    await this.loadTable();
  }

  public async delete (institution: IInstitution): Promise<void> {
    await this.institutionService.delete(institution).then(() => {
      this.data = this.data.filter((item) => item.id !== institution.id);
      console.log('Institution deleted');
    });
  }

  public async loadTable (): Promise<void> {
    this.pageable = await this.institutionService.getAll({
      page: this.pageable.page,
      size: this.pageable.size,
      sort: this.pageable.sort
    });
    this.data = this.pageable.content;
  }
  openModal (): void {
    this.modal.openModal(CreateInstitutionModalComponent);
  }
}
