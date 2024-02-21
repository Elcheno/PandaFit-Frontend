import { FormBuilder, type FormGroup, Validators } from '@angular/forms';
import { TableUsersComponent } from '../../components/users/table-users/table-users.component';
import { UserService } from '../../services/user/user.service';
import { type IUser } from '../../model/interfaces/i-user';
import { InstitutionService } from '../../services/institution/institution.service';
import { type IInstitution } from '../../model/interfaces/i-institution';
import { SearchEntityComponent } from '../../components/search-entity/search-entity.component';
import { UpdateUserComponent } from '../../components/modals/users/update-user-modal/update-user-modal.component';
import { ModalService } from '../../services/modal/modal.service';
import { CreateUsersModalComponent } from '../../components/modals/users/create-users-modal/create-users-modal.component';
import { ButtonComponent } from '../../components/button/button.component';
import { IPageable } from '../../model/interfaces/i-pageable';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { IPage } from '../../model/interfaces/i-page';
import { ToastService } from '../../services/modal/toast.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [TableUsersComponent, SearchEntityComponent, ButtonComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  @ViewChild(TableUsersComponent) table!: TableUsersComponent;

  private readonly userService = inject(UserService);
  private readonly institutionService = inject(InstitutionService);
  private readonly modalService = inject(ModalService);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(ActivatedRoute);

  public institutionId!: string;

  public institutionList!: IPageable<IInstitution>;
  public data!: IPageable<IUser>;

  public async ngOnInit (): Promise<void> {
    this.router.queryParams.subscribe((param) => {
      this.institutionId = param['id'] ?? '';
      if (this.institutionId) {
        this.userService.getAllByInstitution(this.institutionId, { page: 0, size: 10, sort: ['email'] }).subscribe((res) => {
          this.data = res;
        });
        this.institutionService.getById(this.institutionId).subscribe((res) => {
          this.institutionList = {
            page: 0,
            size: 10,
            sort: ['name'],
            totalElements: 0,
            totalPages: 0,
            content: [res]
          }; 
        });
      } else {
        this.userService.getAll({ page: 0, size: 10, sort: ['email'] }).subscribe((res) => {
          this.data = res;
        });
        this.institutionService.getAll({ page: 0, size: 10, sort: ['name'] }).subscribe((res) => {
          this.institutionList = res;
        });
      }
    });
  }

  public async getAll (page: IPage): Promise<void> {
    this.userService.getAll(page).subscribe((res) => {
      this.data = res;
      this.table.toggleTableLoader(); 
    });
  }

  public async create (): Promise<void> {
    (await this.modalService.open(CreateUsersModalComponent, this.institutionList.content)).closed.subscribe((user: IUser) => {
      if (!user) return;

      this.userService.create(user).subscribe((res: IUser) => {
        this.data.content.splice(0, 0, res);
        this.data.totalElements += 1;
        this.toastService.showToast('Usuario creado', 'success');
      });
    });
  }

  public async delete (user: IUser): Promise<void> {
    if (!user) return;

    this.userService.delete(user).subscribe((res: boolean) => {
      if (!res) return;
      this.data.content = this.data.content.filter((item) => item.id !== user.id);
      this.data.totalElements -= 1;
      this.toastService.showToast('Usuario eliminado', 'success');
    })
  }

  public async update (user: IUser): Promise<void> {
    (await this.modalService.open(UpdateUserComponent, user)).closed.subscribe(async (res: IUser) => {
      if (!res) return;
      
      this.userService.update(res).subscribe((response: IUser) => {
        this.data.content = this.data.content.map((item) => item.id === response.id ? response : item);
        this.toastService.showToast('Usuario actualizado', 'success');
      });
    });
  }

  public search (searchValue: string): void {
    console.log(searchValue);
  }
}
