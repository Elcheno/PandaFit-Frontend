import { Component, ViewChild, inject } from '@angular/core';
import { ModalTemplateComponent } from '../../components/modal-template/modal-template.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SchoolyearService } from '../../services/schoolyear/schoolyear.service';
import { IPageable } from '../../model/interfaces/i-pageable';
import { ISchoolYear } from '../../model/interfaces/i-school-year';
import { SearchEntityComponent } from '../../components/search-entity/search-entity.component';

@Component({
  selector: 'app-school-year',
  standalone: true,
  imports: [SearchEntityComponent],
  templateUrl: './school-year.component.html',
  styleUrl: './school-year.component.scss'
})
export class SchoolYearComponent {
  public items: any[] = [1,2,3,4,5,6,7,8,9];
  @ViewChild(ModalTemplateComponent) modal!: ModalTemplateComponent;
  public form!: FormGroup;
  private readonly shoolyearService = inject(SchoolyearService);

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

  // public async ngOnInit (): Promise<void> {
  //   await this.loadTable();
  // }

  // public async delete (institution: IInstitution): Promise<void> {
  //   await this.institutionService.delete(institution).then(() => {
  //     this.data = this.data.filter((item) => item.id !== institution.id);
  //     console.log('Institution deleted');
  //   });
  // }

  // public async loadTable (): Promise<void> {
  //   this.pageable = await this.institutionService.getAll({
  //     page: this.pageable.page,
  //     size: this.pageable.size,
  //     sort: this.pageable.sort
  //   });
  //   this.data = this.pageable.content;
  // }
  // openModal (): void {
  //   this.modal.openModal(CreateInstitutionModalComponent);
  // }
}
