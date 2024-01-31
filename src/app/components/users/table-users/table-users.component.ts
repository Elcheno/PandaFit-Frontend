import { Component, Input, Output, type OnInit, EventEmitter, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { type IUser } from '../../../model/interfaces/i-user';
import { type IPageable } from '../../../model/interfaces/i-pageable';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { ModalConfirmService } from '../../../services/modal/modal-confirm.service';

@Component({
  selector: 'app-table-users',
  standalone: true,
  imports: [CdkMenuTrigger, CdkMenu, CdkMenuItem, NgFor],
  templateUrl: './table-users.component.html',
  styleUrl: './table-users.component.scss'
})
export class TableUsersComponent implements OnInit {
  @Input() public data!: any[];

  @Output() public onDelete = new EventEmitter<IUser>();
  @Output() public onUpdate = new EventEmitter<IUser>();

  private readonly confirmService = inject(ModalConfirmService);

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
    if (user == null) return;
    (await this.confirmService.open('Estas seguro de eliminar este usuario')).closed.subscribe((res: boolean) => {
      if (!res) return;
      this.onDelete.emit(user);
    });
  }

  public async update (user: IUser): Promise<void> {
    if (user == null) return;
    this.onUpdate.emit(user);
  }
}
