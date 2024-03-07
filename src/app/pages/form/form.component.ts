import { Component, OnInit, inject } from '@angular/core';
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
  private readonly formService = inject(FormService);
  private readonly toastService = inject(ToastService);

  public data!: IPageable<IFormData>;

  ngOnInit (): void {
    this.formService.getAll({ page: 0, size: 10, sort: ['name'] }).subscribe((res) => {
      this.data = res;
    });
  }

  public async getAll (page: IPage): Promise<void> {
    this.formService.getAll(page).subscribe((res) => {
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

  public search (value: string): void {
    
  }
}


