import { Component, Input, Output, type OnInit, EventEmitter } from '@angular/core';
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

  @Output() public onDelete = new EventEmitter<IUser>();

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

  public delete (user: IUser, i: any): void {
    if (user == null) return;
    const element: HTMLElement | null = document.getElementById(i + 'Button');
    if (element == null) return;
    element.click();
    this.onDelete.emit(user);
  }
}
