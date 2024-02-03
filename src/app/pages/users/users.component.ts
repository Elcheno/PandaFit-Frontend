import { FormBuilder, type FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { Component, OnInit, inject } from '@angular/core';
import { IPage } from '../../model/interfaces/i-page';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [TableUsersComponent, SearchEntityComponent, ReactiveFormsModule, ButtonComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  private readonly userService = inject(UserService);
  private readonly institutionService = inject(InstitutionService);
  private readonly fb = inject(FormBuilder);
  private readonly modalService = inject(ModalService);

  public form!: FormGroup;
  public institutionList!: IPageable<IInstitution>;
  public data!: IPageable<IUser>;

  public page: IPage = {
    page: 0,
    size: 10,
    sort: ['email']
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
    // MOCK USER DATA AND INSTITUTION DATA
    this.data = (await this.userService.getAllMock(0));
    this.institutionList = (await this.institutionService.getAllMock());


    // await this.userService.getAll(this.page)
    //   .then((res: IPageable<IUser>) => {
    //     if (!res) return;
    //     this.data = res;
    //   })
    //   .catch((error: any) => {
    //     console.log(error);
    //     this.data = {
    //       page: 0,
    //       size: 0,
    //       sort: ['email'],
    //       totalElements: 0,
    //       totalPages: 0,
    //       content: []
    //     };
    //   });

      
    // await this.institutionService.getAll({ page: 0, size: 10, sort: ['name'] })
    //   .then((res: IPageable<IInstitution>) => {
    //     if (res === null) return;
    //     this.institutionList = res;
    //   })
    //   .catch((error: any) => {
    //     console.log(error);
    //     this.institutionList = {
    //       page: 0,
    //       size: 10,
    //       sort: ['name'],
    //       totalElements: 0,
    //       totalPages: 0,
    //       content: []
    //     };
    //   });
  }

  public async getAll (page: IPage): Promise<void> {
    // console.log(page);
    // MOCK USER DATA
    await this.userService.getAllMock(page.page)
      .then((res: IPageable<IUser>) => {
        if (!res) return;
        this.data = res;
      }
    );


    // this.userService.getAll(page)
    //   .then((res: IPageable<IUser>) => {
    //     if (!res) return;
    //     this.data = res;
    //   })
    //   .catch((error: any) => {
    //     console.log(error);
    //   }
    // );
  }

  public async create (): Promise <void> {
    (await this.modalService.open(CreateUsersModalComponent, this.institutionList.content)).closed.subscribe((user: IUser) => {
      if (!user) return;

      this.userService.create(user)
        .then((user: IUser) => {
          console.log('User created');
          this.data.content.push(user);
        })
        .catch((error: any) => {
          console.log(error);
        });
    });
  }

  public async delete (user: IUser): Promise < void> {
    await this.userService.delete(user)
      .then(() => {
        console.log('User deleted');
        this.data.content = this.data.content.filter((item) => item.id !== user.id);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  public async update (user: IUser): Promise < void> {
    (await this.modalService.open(UpdateUserComponent, user)).closed.subscribe(async (res: IUser) => {
      if (!res) return;
      await this.userService.update(res)
        .then((response: IUser) => {
          this.data.content = this.data.content.map((item) => item.id === response.id ? response : item);
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
