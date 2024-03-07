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

/** Component for managing inputs */
@Component({
  selector: 'app-inputs',
  standalone: true,
  imports: [TableInputComponent, SearchEntityComponent, ShowInputModalComponent, ButtonComponent],
  templateUrl: './inputs.component.html',
  styleUrl: './inputs.component.scss'
})
export class InputsComponent {
  @ViewChild(TableInputComponent) table!: TableInputComponent;

  /** Instance of InputService for interacting with input data */
  private readonly inputService = inject(InputService);

  /** Instance of ModalService for managing modals */
  private readonly modalService = inject(ModalService);

  /** Instance of ToastService for displaying toast notifications */
  private readonly toastService = inject(ToastService);

  /** Holds the data for inputs */
  public data!: IPageable<IInputData>;

  /** Initializes the component */
  public async ngOnInit (): Promise<void> {
    this.inputService.getAll({ page: 0, size: 10, sort: ['name'] }).subscribe((res) => {
      this.data = res;
    });
  }

  /**
   * Fetches all inputs based on the provided page information
   * @param page The page object
   */
  public async getAll (page: IPage): Promise<void> {
    this.inputService.getAll(page).subscribe((res) => {
      this.data = res;
    });
  }

  /**
   * Displays details of a specific input
   * @param input The input data
   */
  public async show(input: IInputData): Promise<void> {
    if (!input || !input.id) {
      console.error("El input no es válido.");
      return;
    }
  
    try {
      const inputDetails: IInputData | undefined = await this.inputService.getById(input.id).toPromise();
      
      if (!inputDetails) {
        console.error("No se encontraron detalles para el input.");
        return;
      }
      
      await this.modalService.open(ShowInputModalComponent, inputDetails);

    } catch (error) {
      console.error("Error al obtener los detalles del input:", error);
    }
  }
  
  /**
   * Opens the modal for creating a new input
   */
  public async create (): Promise<void> {
    (await this.modalService.open(CreateInputModalComponent)).closed.subscribe((input: IInputData) => {
      if(!input) return;

      this.inputService.create(input).subscribe((res: IInputData) => { 
        this.data.content.unshift(res); 
        this.data.totalElements++
        this.toastService.showToast('Campo creado', 'success');
      });
    });
  }

  /**
   * Opens the modal for updating an existing input
   * @param input The input data
   */
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
 
  /**
   * Deletes an input
   * @param input The input data
   */
  public async delete (input: IInputData): Promise<void> {
    if(!input) return;

    this.inputService.delete(input).subscribe((res: IInputData) => {
      this.data.content = this.data.content.filter((item) => item.id !== input.id);
      this.data.totalElements -= 1;
      this.toastService.showToast('Campo eliminado', 'success');
    })
  }

  /**
   * Performs search
   * @param value The search value
   */
  public search (value: string): void {
    
  }
}
