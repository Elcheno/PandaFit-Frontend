import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { SearchEntityComponent } from '../../components/search-entity/search-entity.component';
import { IPageable } from '../../model/interfaces/i-pageable';
import { IPage } from '../../model/interfaces/i-page';
import { RouterLink, Router } from '@angular/router';
import { ToastService } from '../../services/modal/toast.service';
import { FormService } from '../../services/form/form.service';
import { IFormData } from '../../model/interfaces/i-form-data';
import { TableFormComponent } from '../../components/form/table-form/table-form.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ButtonComponent, SearchEntityComponent, TableFormComponent, RouterLink],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  @ViewChild(TableFormComponent) table!: TableFormComponent;
  
  private readonly formService = inject(FormService);
  private readonly toastService = inject(ToastService);

  public data!: IPageable<IFormData>;
  private filteringString: string = '';

  ngOnInit (): void {
    this.formService.getAll({ page: 0, size: 10, sort: ['name'] }).subscribe((res) => {
      this.data = res;
    });
  }

  public async getAll (page: IPage): Promise<void> {
    if (!this.filteringString) {
      this.formService.getAll(page).subscribe((res) => {
        this.data = res;
        this.table.toggleTableLoader();
      });
    } else {
      this.getAllFiltering(page, this.filteringString);
    }
  }

  public getAllFiltering (page: IPage, term: string) {
    this.formService.getAllFilteringByName(page, term).subscribe((res) => {
      this.table.toggleTableLoader();
      if (!res) return;
      this.data = res;
    });
  }

  public async update (form: IFormData): Promise<void> {
    if (!form) return;

    // (await this.modalService.open(UpdateInstitutionsModalComponent, institution)).closed.subscribe((res: IInstitution) => {
    //   this.institutionService.update(res).subscribe((response: IInstitution) => {
    //     this.data.content = this.data.content.map((item) => item.id === response.id ? response : item);
    //   });
    // });
  }

  public async delete (form: IFormData): Promise<void> {
    if (!form) return;
    
    this.formService.delete(form).subscribe((res: IFormData) => {
      this.data.content = this.data.content.filter((item) => item.id !== form.id);
      this.data.totalElements -= 1;
      this.toastService.showToast('Formulario eliminado', 'success');
    })
  }

  public search (term: string, page?: number): void {
    this.table.toggleTableLoader();    

    if (term) {
      this.filteringString = term;
      this.getAllFiltering({ page: page ?? 0, size: 10, sort: ['name'] }, term);
    } else {
      this.filteringString = '';
      this.getAll({ page: page ?? 0, size: 10, sort: ['name'] });
    }
  }
}


