import { Component, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { type IInstitution } from '../../../model/interfaces/i-institution';
import { DropdownComponent } from '../../dropdown/dropdown.component';
import { type IDropdownData } from '../../../model/interfaces/i-dropdown';
import { ModalConfirmService } from '../../../services/modal/modal-confirm.service';
import { Router } from '@angular/router';
import { LoaderSpinnerComponent } from '../../loader-spinner/loader-spinner.component';
import { IPageable } from '../../../model/interfaces/i-pageable';
import { IPage } from '../../../model/interfaces/i-page';

@Component({
  selector: 'app-table-institution',
  standalone: true,
  imports: [DropdownComponent, LoaderSpinnerComponent],
  templateUrl: './table-institution.component.html',
  styleUrl: './table-institution.component.scss'
})
export class TableInstitutionComponent {
  @ViewChild('tableLoaderPage') public tableLoader!: any;

  @Input() public data!: IPageable<IInstitution>;

  @Output() public onDelete = new EventEmitter<IInstitution>();
  @Output() public onUpdate = new EventEmitter<IInstitution>(); 
  @Output() public onChangePage = new EventEmitter<IPage>();

  private readonly confirmService = inject(ModalConfirmService);
  private readonly router = inject(Router);

  public dropdownData: IDropdownData<IInstitution> = {
    header: 'Instituto',
    button: {
      icon: '<svg class="w-[28px] h-[28px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="3" d="M6 12h0m6 0h0m6 0h0" />/svg>',
    },
    rows: [
      {
        title: 'Cursos',
        icon: '<svg class="w-6 h-6 inline mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M20 10H4v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8ZM9 13v-1h6v1c0 .6-.4 1-1 1h-4a1 1 0 0 1-1-1Z" clip-rule="evenodd"/><path d="M2 6c0-1.1.9-2 2-2h16a2 2 0 1 1 0 4H4a2 2 0 0 1-2-2Z"/></svg>',
        fnc: (data: any) => { 
          if (data == null) return;
          this.router.navigateByUrl('/institutions/schoolyear');
        }
      },
      {
        title: 'Update',
        icon: '<svg class="w-6 h-6 inline mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.3 4.8 2.9 2.9M7 7H4a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h11c.6 0 1-.4 1-1v-4.5m2.4-10a2 2 0 0 1 0 3l-6.8 6.8L8 14l.7-3.6 6.9-6.8a2 2 0 0 1 2.8 0Z" /></svg>',
        fnc: (data: any) => { 
          if (data == null) return;
          this.onUpdate.emit(data);
        }
      },
      {
        title: 'Delete',
        icon: '<svg class="w-6 h-6 inline mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" /></svg>',
        fnc: async (data: any) => {
          if (data == null) return;
          (await this.confirmService.open('¿Estas seguro de eliminar este instituto?')).closed.subscribe((res: boolean) => {
            if (res) this.onDelete.emit(data);
          });
        }
      }
    ]
  };

  public nextPage (): void { 
    if ((this.data.page + 1) > this.data.totalPages) return;
    this.toggleTableLoader();
    const page: IPage = {  
      page: this.data.page + 1,
      size: this.data.size,
      sort: this.data.sort 
    };

    this.onChangePage.emit(page);
  }

  public previousPage (): void {
    if (this.data.page === 0) return;
    this.toggleTableLoader();
    const page: IPage = {  
      page: this.data.page - 1,
      size: this.data.size,
      sort: this.data.sort 
    };

    this.onChangePage.emit(page);
  }

  public toggleTableLoader (): void {
    this.tableLoader.nativeElement.classList.toggle('flex');
    this.tableLoader.nativeElement.classList.toggle('hidden');
  }
}
