import { Component, inject, Input, type OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { type IUser } from '../../../model/interfaces/i-user';
import { type IPageable } from '../../../model/interfaces/i-pageable';

@Component({
  selector: 'app-table-users',
  standalone: true,
  imports: [],
  templateUrl: './table-users.component.html',
  styleUrl: './table-users.component.scss'
})
export class TableUsersComponent implements OnInit {
  @Input() public data!: any[];

  private readonly userService = inject(UserService);

  public pageable: IPageable<IUser> = {
    page: 0,
    size: 10,
    sort: ['email'],
    totalElements: 0,
    totalPages: 0,
    content: []
  };

  public async ngOnInit (): Promise<void> {
  }

  public async delete (user: IUser): Promise<void> {
    await this.userService.delete(user)
      .then(() => {
        console.log('User deleted');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
