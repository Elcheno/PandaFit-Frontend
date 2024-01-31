import { Component, Input, Output, type OnInit, EventEmitter, inject } from '@angular/core';
import { type IUser } from '../../../model/interfaces/i-user';
import { type IPageable } from '../../../model/interfaces/i-pageable';
import { ModalService } from '../../../services/modal/modal.service';
import { UpdateUserComponent } from '../../modals/users/form-update-user/update-user-modal.component';

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
  @Output() public onUpdate = new EventEmitter<IUser>();

  private readonly modalService = inject(ModalService);

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

  public async update (user: IUser): Promise<void> {
    if (user == null) return;
    await this.modalService.open(UpdateUserComponent, user);
    this.onUpdate.emit(user);
  }
}
