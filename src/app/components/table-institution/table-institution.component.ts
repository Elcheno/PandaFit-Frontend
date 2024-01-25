import { Component, inject } from '@angular/core';
import { InstitutionService } from '../../services/institution/institution.service';
import { IInstitution } from '../../model/interfaces/i-institution';
import { IPageable } from '../../model/interfaces/i-pageable';
import { IPage } from '../../model/interfaces/i-page';

@Component({
  selector: 'app-table-institution',
  standalone: true,
  imports: [],
  templateUrl: './table-institution.component.html',
  styleUrl: './table-institution.component.scss'
})
export class TableInstitutionComponent {

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

  public data!: any[];

  public pageable:IPageable<IInstitution> = {
    page: 0,
    size: 10,
    sort: ['name'],
    totalElements: 0,
    totalPages: 0,
    content: []
  }


  private readonly institutionService = inject(InstitutionService);

  public async ngOnInit (): Promise<void> {
    this.loadTable();
  }

  public async delete (id: string): Promise<void> {
    await this.institutionService.delete(id);
    this.loadTable();
  }

  public async loadTable (): Promise<void> {
    this.pageable = await this.institutionService.getAll({
      page: this.pageable.page,
      size: this.pageable.size,
      sort: this.pageable.sort
    });
    this.data = this.pageable.content;
  }
}