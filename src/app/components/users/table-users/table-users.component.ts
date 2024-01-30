import { Component, inject, Input, Output, type OnInit, EventEmitter } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { type IUser } from '../../../model/interfaces/i-user';
import { type IPageable } from '../../../model/interfaces/i-pageable';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';

@Component({
  selector: 'app-table-users',
  standalone: true,
  imports: [CdkMenuTrigger, CdkMenu, CdkMenuItem],
  templateUrl: './table-users.component.html',
  styleUrl: './table-users.component.scss'
})
export class TableUsersComponent implements OnInit {
  @Input() public data!: any[];

  @Output() public onDelete = new EventEmitter<IUser>();

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

  public delete (user: IUser): void {
    if (user == null) return;
    this.onDelete.emit(user);
  }
}
