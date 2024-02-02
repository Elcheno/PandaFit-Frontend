import { Component, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SchoolyearService } from '../../services/schoolyear/schoolyear.service';
import { IPageable } from '../../model/interfaces/i-pageable';
import { ISchoolYear } from '../../model/interfaces/i-school-year';
import { SearchEntityComponent } from '../../components/search-entity/search-entity.component';
import { IPage } from '../../model/interfaces/i-page';
import { IInstitution } from '../../model/interfaces/i-institution';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-school-year',
  standalone: true,
  imports: [SearchEntityComponent],
  templateUrl: './school-year.component.html',
  styleUrl: './school-year.component.scss'
})
export class SchoolYearComponent {
  public items: any[] = [1,2,3,4,5,6,7,8,9];
  public form!: FormGroup;
  private readonly shoolyearService = inject(SchoolyearService);
  private readonly modalService = inject(ModalService);

  public data: ISchoolYear[] = [];

  constructor (private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      name: ''
    });
  }

  public pageable: IPageable<ISchoolYear> = {
    page: 0,
    size: 10,
    sort: ['name'],
    totalElements: 0,
    totalPages: 0,
    content: []
  };

  public async ngOnInit (): Promise<void> {
    // await this.loadTable();
    await this.getMock();
  }

  // public async delete (institution: IInstitution): Promise<void> {
  //   await this.institutionService.delete(institution).then(() => {
  //     this.data = this.data.filter((item) => item.id !== institution.id);
  //     console.log('Institution deleted');
  //   });
  // }

  public async loadTable (): Promise<void> {
    this.pageable = await this.shoolyearService.getAllByInstitution({
      page: this.pageable.page,
      size: this.pageable.size,
      sort: this.pageable.sort
    } as IPage, {} as IInstitution);
    this.data = this.pageable.content;
  }
  public async create (): Promise<void> {
    // this.modalService.open(CreateSchoolYearModalComponent);
  }

  public async getMock (): Promise<void> {
    this.data = await this.shoolyearService.getAllMock();
  }
}
