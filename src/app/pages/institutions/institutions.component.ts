import { Component, inject } from '@angular/core';
import { TableInstitutionComponent } from '../../components/institutions/table-institution/table-institution.component';
import { InstitutionService } from '../../services/institution/institution.service';
import { type IInstitution } from '../../model/interfaces/i-institution';
import { SearchEntityComponent } from '../../components/search-entity/search-entity.component';
import { ModalService } from '../../services/modal/modal.service';
import { CreateInstitutionModalComponent } from '../../components/modals/institutions/create-institution-modal/create-institution-modal.component';
import { UpdateInstitutionsModalComponent } from '../../components/modals/institutions/update-institutions-modal/update-institutions-modal.component';
import { IPageable } from '../../model/interfaces/i-pageable';

@Component({
  selector: 'app-institutions',
  standalone: true,
  imports: [TableInstitutionComponent, SearchEntityComponent],
  templateUrl: './institutions.component.html',
  styleUrl: './institutions.component.scss'
})
export class InstitutionsComponent {
  private readonly institutionService = inject(InstitutionService);
  private readonly modalService = inject(ModalService);

  public data!: IPageable<IInstitution>;

  public async ngOnInit (): Promise<void> {
    this.data = await this.institutionService.getAllMock();
  }

  public search (value: string): void {
    console.log(value);
  }

  public async create (): Promise<void> {
    (await this.modalService.open(CreateInstitutionModalComponent)).closed.subscribe((institution: IInstitution) => {
      if (!institution) return;
      this.institutionService.create(institution)
        .then((res) => {
          if (!res) return;
          this.data.content.push(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }); 
  }

  public async update (institution: IInstitution): Promise<void> {
    if (!institution) return;
    (await this.modalService.open(UpdateInstitutionsModalComponent, institution)).closed.subscribe((res: IInstitution) => {
      if (!res) return;
      this.institutionService.update(res)
        .then((response) => {
          if (!response) return;
          this.data.content = this.data.content.map((item) => item.id === response.id ? response : item);
        });
    });
  }

  public async delete (institution: IInstitution): Promise<void> {
    if (!institution) return;
  }
}
