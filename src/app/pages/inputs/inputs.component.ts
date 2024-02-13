import { Component, ViewChild, inject, input } from '@angular/core';
import { SearchEntityComponent } from '../../components/search-entity/search-entity.component';
import { TableInputComponent } from '../../inputs/table-input/table-input.component';
import { InputService } from '../../services/input/input.service';
import { ModalService } from '../../services/modal/modal.service';
import { IPageable } from '../../model/interfaces/i-pageable';
import { IInputData } from '../../model/interfaces/i-input-data';
import { IPage } from '../../model/interfaces/i-page';
import { CreateInputModalComponent } from '../../components/modals/input/create-input-modal/create-input-modal.component';
import { UpdateInputModalComponent } from '../../components/modals/input/update-input-modal/update-input-modal.component';

@Component({
  selector: 'app-inputs',
  standalone: true,
  imports: [TableInputComponent, SearchEntityComponent],
  templateUrl: './inputs.component.html',
  styleUrl: './inputs.component.scss'
})
export class InputsComponent {
  @ViewChild(TableInputComponent) table!: TableInputComponent;

  private readonly inputService = inject(InputService);
  private readonly modalService = inject(ModalService);

  public data!: IPageable<IInputData>;

  public async ngOnInit (): Promise<void> {
    this.inputService.getAll({ page: 0, size: 10, sort: ['name'] }).subscribe((res) => {
      this.data = res;
    });
  }

  public async getAll (page: IPage): Promise<void> {
    this.inputService.getAll(page).subscribe((res) => {
      this.data = res;
    });
  }

  public async create (): Promise<void> {
    (await this.modalService.open(CreateInputModalComponent)).closed.subscribe((input: IInputData) => {
      if(!input) return;

      this.inputService.create(input).subscribe((res: IInputData) => {
        this.data.content.splice(0,0, res);
        this.data.totalElements += 1;
      });
    });
  }

  public async update (input: IInputData): Promise<void> {
    (await this.modalService.open(UpdateInputModalComponent, input)).closed.subscribe((res: IInputData) => {
      this.inputService.update(res).subscribe((response: IInputData) => {
        this.data.content = this.data.content.map((item) => item.id === response.id ? response : item);
      });
    });
  }

  public async delete (input: IInputData): Promise<void> {
    if(!input) return;

    this.inputService.delete(input).subscribe((res: IInputData) => {
      this.data.content = this.data.content.filter((item) => item.id !== input.id);
      this.data.totalElements -= 1;
    })
  }

  public search (value: string): void {
    console.log(value);
  }
}
