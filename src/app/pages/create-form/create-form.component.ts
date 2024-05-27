import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, ElementRef, HostListener, ViewChild, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { InputService } from '../../services/input/input.service';
import { IInputData } from '../../model/interfaces/i-input-data';
import { OutputService } from '../../services/output/output.service';
import { FormService } from '../../services/form/form.service';
import { IFormData } from '../../model/interfaces/i-form-data';
import { ButtonComponent } from '../../components/button/button.component';
import { SearchEntityComponent } from '../../components/search-entity/search-entity.component';
import { ModalService } from '../../services/modal/modal.service';
import { ShowInputModalComponent } from '../../components/modals/input/show-input-modal/show-input-modal.component';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { LoaderSpinnerComponent } from '../../components/loader-spinner/loader-spinner.component';
import { ToastService } from '../../services/modal/toast.service';
import { StoreService } from '../../services/store/store.service';


/** Component for creating a new form */
@Component({
  selector: 'app-create-form',
  standalone: true,
  imports: [CdkDrag,CdkDropList,CdkDropListGroup,ReactiveFormsModule, ButtonComponent, SearchEntityComponent, LoaderSpinnerComponent],
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.scss'
})
export class CreateFormComponent {
  formBuilder = inject(FormBuilder);
  formGroup!:FormGroup;
  inputsAvailable:IInputData[]=[];
  inputsSelected:IInputData[]=[];
  outputService = inject(OutputService);
  formService = inject(FormService);
  inputService = inject(InputService);
  chargingInputs = false;
  private readonly modalService = inject(ModalService);
  private readonly router = inject(Router);
  public outputsRelated = signal<any>({state:true, value:[]});
  private readonly toastService = inject(ToastService);
  private readonly storeService = inject(StoreService);

  totalInputsPages: number = 0; 
  currentPage: number = 0;
  itemsPerPage: number = 10;
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  constructor(){
    this.formGroup=this.formBuilder.group({
      name:['',Validators.required],
      outputsSelected:new FormArray([]),
      description:['']
    })
    this.storeService.inputStore.reloadData();
    this.getInputs();
  }

  /**
   * Performs search
   * @param value The search value
   */
  public search (value: string): void {
    
  }

  /**
   * Handles item drop event
   * @param event The drop event
   */
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

  /**
   * Changes the activation of checkbox
   * @param item The checkbox item
   */
  changeCheckBoxActivate(item:any){
    const checkbox = document.getElementById(item.id);
    checkbox?.click();
  }

  /**
   * Handles checkbox change event
   * @param event The change event
   */
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

  /**
   * Submits the form data
   */
  async onSubmit(){  
    const form:IFormData = {
      name:this.formGroup.get('name')?.value,
      description:this.formGroup.get('description')?.value,
      outputIdList:this.formGroup.get('outputsSelected')?.value,
      inputIdList:this.inputsSelected.map(item => item.id) as any
    };
    // console.log(form)
    await lastValueFrom(this.formService.create(form))
    this.formGroup.reset();
    this.storeService.formStore.revalidate();
    this.toastService.showToast('Formulario creado', 'success');
    await this.router.navigateByUrl('/dashboard/formulary/forms')
  }

  /**
   * Removes the selected input
   * @param input The input to be removed
   */
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

  /**
   * Adds the selected input
   * @param input The input to be added
   */
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

  /**
   * Opens the info modal for the input
   * @param input The input for which info modal is opened
   */
  openInfoModal(input: IInputData): void {
    this.modalService.open(ShowInputModalComponent, input);
  }

  /**
   * Checks the availability of outputs based on selected inputs
   */
  private checkOutputsDisponibility(): void {
    if(this.inputsAvailable.length === 7){
      this.loadMoreItems();
    }
    this.outputsRelated.set({state:false, value:[]});
    setTimeout(async () => {
      
      const inputsId = this.inputsSelected.map(item => item.id);
      
      await this.outputService.getOutputsWithInputsId(inputsId as any).then(res => {
        this.outputsRelated.set({state:true, value:res});
      });
    }, 150)
    

  }

  /**
   * Handles scroll event
   * @param event The scroll event
   */
  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
    const scrollElement = this.scrollContainer.nativeElement;
    // Verificar si el usuario ha llegado al final del scroll del div
    if (scrollElement.scrollHeight - scrollElement.scrollTop === scrollElement.clientHeight) { 
      this.loadMoreItems(); // Cargar más elementos cuando el usuario llega al final
    }
  }


  getInputs() {
    this.inputService.getAll({ page: this.currentPage, size: this.itemsPerPage, sort: ['name'] }).subscribe((res) => {
      this.inputsAvailable.push(...res.content);
      this.totalInputsPages = res.totalPages;
      this.chargingInputs = false;
    });
  }

  /**
   * Loads more items when user scrolls to the bottom
   */
  loadMoreItems() {
    this.nextPage();
  }


  public nextPage (): void { 
    if ((this.currentPage + 1) == this.totalInputsPages) return;
    
    this.chargingInputs = true;

    this.currentPage++;
    setTimeout(() => {   
      this.getInputs();
    }, 500);
  }
}