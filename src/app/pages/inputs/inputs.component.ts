import { Component, ViewChild, inject, input } from '@angular/core';
import { SearchEntityComponent } from '../../components/search-entity/search-entity.component';
import { TableInputComponent } from '../../components/inputs/table-input/table-input.component';
import { InputService } from '../../services/input/input.service';
import { ModalService } from '../../services/modal/modal.service';
import { IPageable } from '../../model/interfaces/i-pageable';
import { IInputData } from '../../model/interfaces/i-input-data';
import { IPage } from '../../model/interfaces/i-page';
import { CreateInputModalComponent } from '../../components/modals/input/create-input-modal/create-input-modal.component';
import { UpdateInputModalComponent } from '../../components/modals/input/update-input-modal/update-input-modal.component';
import { ShowInputModalComponent } from '../../components/modals/input/show-input-modal/show-input-modal.component';
import { ToastService } from '../../services/modal/toast.service';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-inputs',
  standalone: true,
  imports: [TableInputComponent, SearchEntityComponent, ShowInputModalComponent, ButtonComponent],
  templateUrl: './inputs.component.html',
  styleUrl: './inputs.component.scss'
})
export class InputsComponent {
  @ViewChild(TableInputComponent) table!: TableInputComponent;

  private readonly inputService = inject(InputService);
  private readonly modalService = inject(ModalService);
  private readonly toastService = inject(ToastService);

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

  public async show(input: IInputData): Promise<void> {
    if (!input || !input.id) {
      console.error("El input no es válido.");
      return;
    }
  
    try {
      // Obtener los detalles del input usando su ID
      const inputDetails: IInputData | undefined = await this.inputService.getById(input.id).toPromise();
      
      if (!inputDetails) {
        console.error("No se encontraron detalles para el input.");
        return;
      }
      
      // Abrir el modal para mostrar los detalles del input
      const modalRef = await this.modalService.open(ShowInputModalComponent, inputDetails);
      // Escuchar cualquier evento de cierre del modal si es necesario
      modalRef.closed.subscribe((result: any) => {
        console.log("Modal cerrado con resultado:", result);
      });
    } catch (error) {
      console.error("Error al obtener los detalles del input:", error);
    }
  }
  
  



  public async create (): Promise<void> {
    (await this.modalService.open(CreateInputModalComponent)).closed.subscribe((input: IInputData) => {
      if(!input) return;

      /*this.inputService.create(input).subscribe((res: IInputData) => {
        this.data.content.splice(0,0, res);
        this.data.totalElements += 1;
      });*/

      input.userOwnerId = 'f92e0e1c-17d0-4396-a012-26826952a441';    
      this.inputService.create(input).subscribe((res: IInputData) => { 
        this.data.content.unshift(res); 
        this.data.totalElements++
        this.toastService.showToast('Campo creado', 'success');
      });
    });
  }

  

  /*public async update (input: IInputData): Promise<void> {
    (await this.modalService.open(UpdateInputModalComponent, input)).closed.subscribe((res: IInputData) => {
      this.inputService.update(res).subscribe((response: IInputData) => {
        this.data.content = this.data.content.map((item) => item.id === response.id ? response : item);
      });
    });
  }*/

  public async update(input: IInputData): Promise<void> {
    if (!input) {
      console.error("El input es inválido.");
      return;
    }
    const modalRef = await this.modalService.open(UpdateInputModalComponent, input);
    modalRef.closed.subscribe((res: IInputData) => {
      if (res) {
        this.inputService.update(res).subscribe((response: IInputData) => {
          this.data.content = this.data.content.map((item) => item.id === response.id ? response : item);
          this.toastService.showToast('Campo actualizado', 'success');
        });
      }
    });
  }
 

  public async delete (input: IInputData): Promise<void> {
    if(!input) return;

    this.inputService.delete(input).subscribe((res: IInputData) => {
      this.data.content = this.data.content.filter((item) => item.id !== input.id);
      this.data.totalElements -= 1;
      this.toastService.showToast('Campo eliminado', 'success');
    })
  }

  public search (value: string): void {
    console.log(value);
  }
}
