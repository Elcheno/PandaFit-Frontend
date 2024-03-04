import { Component, OnInit, inject } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { IOutputData } from '../../model/interfaces/i-output-data';
import { OutputService } from '../../services/output/output.service';
import { SearchEntityComponent } from '../../components/search-entity/search-entity.component';
import { IPageable } from '../../model/interfaces/i-pageable';
import { IPage } from '../../model/interfaces/i-page';
import { TableOutputsComponent } from '../../components/output/table-outputs/table-outputs.component';
import { RouterLink, Router } from '@angular/router';
import { ToastService } from '../../services/modal/toast.service';
import { OutputInfoComponent } from '../../components/modals/output/output-info/output-info.component';
import { ModalService } from '../../services/modal/modal.service';

/** Component for managing outputs */
@Component({
  selector: 'app-output',
  standalone: true,
  imports: [ButtonComponent, SearchEntityComponent, TableOutputsComponent, RouterLink, OutputInfoComponent],
  templateUrl: './output.component.html',
  styleUrl: './output.component.scss'
})
export class OutputComponent implements OnInit {

  /** Instance of OutputService for interacting with output data */

  private readonly outputService = inject(OutputService);
  /** Instance of ModalService for managing modals */
  private readonly modalService = inject(ModalService);

  /** Instance of ToastService for displaying toast notifications */
  private readonly toastService = inject(ToastService);

  /** Holds the data for outputs */
  public data!: IPageable<IOutputData>;

  /** Initializes the component */
  ngOnInit (): void {
    this.outputService.getAll({ page: 0, size: 10, sort: ['name'] }).subscribe((res) => {
      this.data = res;
    });
  }

  /**
   * Fetches all outputs based on the provided page information
   * @param page The page object
   */
  public async getAll (page: IPage): Promise<void> {
    this.outputService.getAll(page).subscribe((res) => {
      this.data = res;
    });
  }

  /**
   * Opens the modal to display details of a specific output
   * @param output The output data
   */
  public async show(output: IOutputData): Promise<void> {
    if (!output || !output.id) {
      console.error("El output no es válido.");
      return;
    }
  
    try {
      // Obtener los detalles del output usando su ID
      const outputDetails: IOutputData | undefined = await this.outputService.getById(output.id).toPromise();
      
      if (!outputDetails) {
        console.error("No se encontraron detalles para el output.");
        return;
      }
      
      // Abrir el modal para mostrar los detalles del input
      const modalRef = await this.modalService.open(OutputInfoComponent, outputDetails);
      // Escuchar cualquier evento de cierre del modal si es necesario
      modalRef.closed.subscribe((result: any) => {
        console.log("Modal cerrado con resultado:", result);
      });
    } catch (error) {
      console.error("Error al obtener los detalles del output:", error);
    }
  }

  /**
   * Updates an output
   * @param output The output data
   */
  public async update (output: IOutputData): Promise<void> {
    if (!output) return;

    // (await this.modalService.open(UpdateInstitutionsModalComponent, institution)).closed.subscribe((res: IInstitution) => {
    //   this.institutionService.update(res).subscribe((response: IInstitution) => {
    //     this.data.content = this.data.content.map((item) => item.id === response.id ? response : item);
    //   });
    // });
  }

  /**
   * Deletes an output
   * @param output The output data
   */
  public async delete (output: IOutputData): Promise<void> {
    if (!output) return;
    
    this.outputService.delete(output).subscribe((res: IOutputData) => {
      this.data.content = this.data.content.filter((item) => item.id !== res.id);
      this.data.totalElements -= 1;
      this.toastService.showToast('Respuesta eliminada', 'success');
    })
  }

  /**
   * Performs search
   * @param value The search value
   */
  public search (value: string): void {
    console.log(value);
  }

}
