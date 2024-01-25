import { Component, type OnInit, inject } from '@angular/core';
import { type IPageable } from '../../../model/interfaces/i-pageable';
import { UserService } from '../../../services/user/user.service';
import { type IUser } from '../../../model/interfaces/i-user';

@Component({
  selector: 'app-table-users',
  standalone: true,
  imports: [],
  templateUrl: './table-users.component.html',
  styleUrl: './table-users.component.scss'
})
export class TableUsersComponent implements OnInit {
  public data!: any[];

  public pageable: IPageable<IUser> = {
    page: 0,
    size: 10,
    sort: ['email'],
    totalElements: 0,
    totalPages: 0,
    content: []
  };

  private readonly userService = inject(UserService);

  public async ngOnInit (): Promise<void> {
    await this.loadTable();
  }

  public async delete (user: IUser): Promise<void> {
    await this.userService.delete(user)
      .then(() => {
        console.log('User deleted');
      })
      .catch((error) => {
        console.log(error);
      });
    // this.loadTable();
  }

  public async loadTable (): Promise<void> {
    this.pageable = await this.userService.getAll({
      page: this.pageable.page,
      size: this.pageable.size,
      sort: this.pageable.sort
    });
    this.data = this.pageable.content;
  }
}
