import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, ElementRef, HostListener, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { InputService } from '../../services/input/input.service';
import { IInputData } from '../../model/interfaces/i-input-data';
import { IOutputData } from '../../model/interfaces/i-output-data';
import { OutputService } from '../../services/output/output.service';
import { FormService } from '../../services/form/form.service';
import { IFormData } from '../../model/interfaces/i-form-data';
import { ButtonComponent } from '../../components/button/button.component';
import { SearchEntityComponent } from '../../components/search-entity/search-entity.component';
import { ModalService } from '../../services/modal/modal.service';
import { ShowInputModalComponent } from '../../components/modals/input/show-input-modal/show-input-modal.component';
import { CreateInputModalComponent } from '../../components/modals/input/create-input-modal/create-input-modal.component';
import { IPageable } from '../../model/interfaces/i-pageable';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-form',
  standalone: true,
  imports: [CdkDrag,CdkDropList,CdkDropListGroup,ReactiveFormsModule, ButtonComponent, SearchEntityComponent],
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.scss'
})
export class CreateFormComponent {
  formBuilder = inject(FormBuilder);
  formGroup!:FormGroup;
  inputsAvailable:IInputData[]=[];
  inputsSelected:IInputData[]=[];
  outputsRelated:IOutputData[]=[];
  outputService = inject(OutputService);
  formService = inject(FormService);
  institutionService = inject(InputService);
  private readonly modalService = inject(ModalService);
  private readonly router = inject(Router);

  totalInputs: number = 0; 
  currentPage: number = 1; // Página actual de elementos cargados
  itemsPerPage: number = 10;
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  constructor(){
    this.formGroup=this.formBuilder.group({
      name:['',Validators.required],
      outputsSelected:new FormArray([]),
      description:['']
    })
    this.loadMoreItems();
  }

  ngOnInit(): void {
    this.institutionService.getAll({ page: 0, size: 10, sort: ['name'] }).subscribe((res) => {
      this.inputsAvailable.push(...res.content);
    });
  }

  public search (value: string): void {
    console.log(value);
  }

  drop(event: CdkDragDrop<IInputData[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.checkOutputsDisponibility();
    }
  }
  onCheckChange(event:any) {
    const formArray: FormArray = this.formGroup.get('outputsSelected') as FormArray;
  
    /* Selected */
    if(event.target.checked){
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));
    }
    /* unselected */
    else{
      // find the unselected element
      let i: number = 0;
  
      formArray.controls.forEach((ctrl: AbstractControl) => {
        if(ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }
  
        i++;
      });
    }
  }
  onSubmit(){
    //https://stackoverflow.com/questions/40927167/angular-reactiveforms-producing-an-array-of-checkbox-values
  
    const form:IFormData = {
      name:this.formGroup.get('name')?.value,
      description:this.formGroup.get('description')?.value,
      outputIdList:this.formGroup.get('outputsSelected')?.value,
      inputIdList:this.inputsSelected.map(item => item.id) as any
    };
    // console.log(form)
    this.formService.create(form).subscribe((res: any ) => { });
    //this.formGroup.reset();
    this.router.navigateByUrl('/formulary/forms')
  }

  removeInput(input: IInputData): void {
    const index = this.inputsSelected.indexOf(input);
    // if(this.inputsAvailable.length > 9){
    //   this.inputsSelected.splice(index, 1);
    // }
    if (index >= 0) {
      const index = this.inputsSelected.findIndex(selectedInput => selectedInput === input);
      transferArrayItem(
        this.inputsSelected,
        this.inputsAvailable,
        index,
        0,
      );
      this.checkOutputsDisponibility();
    }
  }

  addInput(input: IInputData): void {
    const index = this.inputsAvailable.indexOf(input);
    if (index >= 0) {
      const index = this.inputsAvailable.findIndex(availableInput => availableInput === input);
      transferArrayItem(
        this.inputsAvailable,
        this.inputsSelected,
        index,
        this.inputsSelected.length,
      );
      this.checkOutputsDisponibility();
    }
  }

  openInfoModal(input: IInputData): void {
    this.modalService.open(ShowInputModalComponent, input);
  }

  private checkOutputsDisponibility(): void {
    const inputsId = this.inputsSelected.map(item => item.id);
    this.outputsRelated=this.outputService.getOutputsWithInputsId(inputsId as any);
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
    const scrollElement = this.scrollContainer.nativeElement;
    // Verificar si el usuario ha llegado al final del scroll del div
    if (scrollElement.scrollHeight - scrollElement.scrollTop === scrollElement.clientHeight) { 
      this.loadMoreItems(); // Cargar más elementos cuando el usuario llega al final
    }
  }

  loadMoreItems() {
    // Simulación de carga de datos desde una fuente externa (por ejemplo, una API)
    // Aquí deberías hacer una llamada HTTP para obtener más elementos
    // Simulamos una carga de datos
    // setTimeout(() => {
      // Suponiendo que 'moreItems' es la lista de elementos obtenida de tu fuente de datos
      console.log("Cargando más inputs");
      
      const moreItems = this.getMoreItems();
      this.inputsAvailable = this.inputsAvailable.concat(moreItems);
    // }, 500); // Retardo simulado para simular la carga de datos desde una fuente externa
  }

  getMoreItems(): any[] {
    // Simulación de obtención de más elementos
    // En una aplicación real, esto debería obtener los datos de tu fuente de datos (por ejemplo, una API)
    const moreItems: any[] = [];
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    for (let i = startIndex; i < endIndex; i++) {
      if (i < this.totalInputs) {
        // Suponiendo que 'fetchData' es una función que obtiene datos de tu fuente de datos
        // Debes modificar esto según tu lógica para obtener más elementos
        moreItems.push({ id: i, name: 'Item ' + i });
      }
    }
    this.currentPage++;
    return moreItems;
  }


  private readonly inputService = inject(InputService);

  public data!: IPageable<IInputData>;
  public async createInput (): Promise<void> {
    (await this.modalService.open(CreateInputModalComponent)).closed.subscribe((institution: IInputData) => {
      if (!institution) return;
      institution.userOwnerId = '15ab7221-f8c2-4492-866e-2cf5594c3110';    
      this.inputService.create(institution).subscribe((res: IInputData) => { });
    });
  }
}