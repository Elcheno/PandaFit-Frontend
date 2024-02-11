import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { InputService } from '../../services/input/input.service';
import { IInputData } from '../../model/interfaces/i-input-data';
import { OutputData } from '../../model/interfaces/i-output-data';
import { OutputService } from '../../services/output/output.service';
import { FormService } from '../../services/form/form.service';
import { IFormData } from '../../model/interfaces/i-form-data';
import { ButtonComponent } from '../../components/button/button.component';
import { SearchEntityComponent } from '../../components/search-entity/search-entity.component';
import { ModalService } from '../../services/modal/modal.service';
import { ShowInputModalComponent } from '../../components/modals/input/show-input-modal/show-input-modal.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CdkDrag,CdkDropList,CdkDropListGroup,ReactiveFormsModule, ButtonComponent, SearchEntityComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  formBuilder = inject(FormBuilder);
  formGroup!:FormGroup;
  inputsAvailable:IInputData[]=inject(InputService).mockData;
  inputsSelected:IInputData[]=[];
  outputsRelated:OutputData[]=[];
  outputService = inject(OutputService);
  formService = inject(FormService);
  private readonly modalService = inject(ModalService);

  constructor(){
    this.formGroup=this.formBuilder.group({
      name:['',Validators.required],
      outputsSelected:new FormArray([]),
      description:['']
    })
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
      id:Math.floor(1000 + Math.random() * 9000)+"",
      name:this.formGroup.get('name')?.value,
      description:this.formGroup.get('description')?.value,
      outputs:this.formGroup.get('outputsSelected')?.value,
      inputs:this.inputsSelected.map(item => item.id) as any
    };
    console.log(form)
    this.formService.addForm(form);
    //this.formGroup.reset();
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
        this.inputsAvailable.length,
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
}

