/* eslint-disable @typescript-eslint/array-type */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/unbound-method */
import { Component, type OnInit, inject } from '@angular/core';
import { FormBuilder, type FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TableUsersComponent } from '../../components/users/table-users/table-users.component';
import { UserService } from '../../services/user/user.service';
import { type IUser } from '../../model/interfaces/i-user';
import { ITypeRole } from '../../model/type/i-type-role';
import { InstitutionService } from '../../services/institution/institution.service';
import { type IInstitution } from '../../model/interfaces/i-institution';
import { SearchEntityComponent } from '../../components/search-entity/search-entity.component';
import { UpdateUserComponent } from '../../components/modals/users/update-user-modal/update-user-modal.component';
import { ModalService } from '../../services/modal/modal.service';
import { CreateUsersModalComponent } from '../../components/modals/users/create-users-modal/create-users-modal.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [TableUsersComponent, SearchEntityComponent, ReactiveFormsModule, CreateUsersModalComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  private readonly userService = inject(UserService);
  private readonly institutionService = inject(InstitutionService);
  private readonly fb = inject(FormBuilder);
  private readonly modalService = inject(ModalService);

  public form!: FormGroup;
  public institutionList!: IInstitution[];
  public data: any[] = [];

  public usuario: IUser = {
    id: '',
    email: '',
    password: '',
    role: [],
    institutionId: ''
  };

  constructor () {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      checkboxUser: [true],
      checkboxAdmin: [false],
      selectInstitution: ['', [Validators.required]]
    });
  }

  public async ngOnInit (): Promise <void> {
    // this.data = (await this.userService.getAll({ page: 0, size: 10, sort: ['email'] })).content;
    this.data = (await this.userService.getAllMock()).content;
    this.institutionList = (await this.institutionService.getAll({ page: 0, size: 10, sort: ['name'] })).content;
  }

  public async openModalCreateUser (): Promise < void> {
    await this.modalService.open(CreateUsersModalComponent, this.institutionList);
  }

  public async create (): Promise <void> {
    (await this.modalService.open(CreateUsersModalComponent, this.institutionList)).closed.subscribe((user: IUser) => {
      if (!user) return;

      this.userService.create(user)
        .then((user: IUser) => {
          console.log('User created');
          this.data.push(user);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  public async delete (user: IUser): Promise < void> {
    await this.userService.delete(user)
      .then(() => {
        console.log('User deleted');
        this.data = this.data.filter((item) => item.id !== user.id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public async update (user: IUser): Promise < void> {
    (await this.modalService.open(UpdateUserComponent, user)).closed.subscribe(async (res: IUser) => {
      if (!res) return;
      await this.userService.update(res)
        .then((response) => {
          this.data = this.data.map((item) => item.id === response.id ? response : item);
        });
    });
  }

  public async search (searchValue: string): Promise < void> {
    return await new Promise((resolve, _reject) => {
      console.log(searchValue);
      resolve();
    });
  }
}
