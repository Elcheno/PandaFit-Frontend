import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, WritableSignal, inject, signal } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { CdkDrag, CdkDropList, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import {OverlayModule} from '@angular/cdk/overlay';
import { IInputData } from '../../../model/interfaces/i-input-data';
import { InputService } from '../../../services/input/input.service';
import { ButtonComponent } from '../../button/button.component';
import { DropdownComponent } from '../../dropdown/dropdown.component';
import { IDropdownData, IDropdownRow } from '../../../model/interfaces/i-dropdown';

interface Item {
  id: number;
  text: string;
  selected:boolean;
  input?: IInputData;
  value?: string
}

/**
 * Component for generating a form dynamically.
 */
@Component({
  selector: 'app-form-generator',
  standalone: true,
  imports: [CommonModule, DragDropModule,CdkDropList, CdkDrag,OverlayModule, ButtonComponent, DropdownComponent],
  templateUrl: './form-generator.component.html',
  styleUrl: './form-generator.component.scss'
})
export class FormGeneratorComponent {
  /**
   * Event emitter for notifying changes in the form.
   */
  @Output() changed = new EventEmitter<any>();

  private inputService = inject(InputService);

  private inputBufferSubject = new Subject<string>();

  /**
   * Status signal indicating error and input status.
   */
  public status: WritableSignal<any> = signal({
    error: false,
    inputs: []
  });

  public inputBuffer: string = '';

  public inputData!: any;
  
  public items: Item[] = [];

  private dropdownRows!: IDropdownRow<any>[];
  
  /**
   * Dropdown data for input selection.
   */
  public dropdownData: IDropdownData<any> = {
    button: {
      title: 'Inputs',
    },
    rows: []
  };

  private formula!: any;

  private patronRegex = /#{([^}]+)}/g;

  ngOnInit () {
    this.inputBufferSubject
      .pipe(debounceTime(1000))
      .subscribe(() => {
        this.handleInputBuffer();
      });

    this.inputService.getAll({ page: 0, size: 100, sort: ['name'] }).subscribe((res: any) => {
      this.inputData = res.content;
      this.generateDropdown();
    });

  }

  /**
   * Generates dropdown options based on input data.
   */
  private generateDropdown (): void {
    this.dropdownRows = this.inputData.map((input: IInputData) => {
      return {
        title: input.name,
        fnc: () => this.insertInput(input)
      };
    });

    this.dropdownData = {
      button: {
        title: 'Campos',
      },
      rows: this.dropdownRows
    };
  }

  /**
   * Handles the input buffer to insert elements.
   */
  handleInputBuffer () {
    if (this.inputBuffer) {
      this.insertElement(this.inputBuffer);
      this.inputBuffer = '';
    }
  }

  /**
   * Handles drop event for reordering items.
   * @param event - Drag drop event.
   */
  onDrop (event: any) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    this.evaluateFormulas();
  }

  /**
   * Inserts input element into the form.
   * @param input - Input data to be inserted.
   */
  insertInput (input: IInputData) {
    if(input && input.name)
      this.insertElement(`#{${input?.name}}`, input);
  }

  /**
   * Inserts a new element into the form.
   * @param newText - Text to be inserted.
   * @param input - Input data associated with the element.
   */
  insertElement(newText: string, input?: IInputData) {
    const newItem: Item = { id: Math.round((Math.random() * 9000) + 1000), text: newText, selected: false, input: input, value:`#{${input?.id}}` };
    this.items.push(newItem);
    this.evaluateFormulas();
  }

  /**
   * Selects an item in the form.
   * @param item - Item to be selected.
   */
  selectItem (item: Item) {
    if (!item.selected) {
      this.items = this.items.map(i => { return { ...i, selected : false } });
      this.items = this.items.map(i => { return { ...i, selected : i.id === item.id } });
    } else {
      this.items = this.items.map(i => { return { ...i, selected : false } });
    }
  }

  /**
   * Deletes an item from the form.
   * @param data - Item data to be deleted.
   */
  deleteItem (data: Item) {
    this.items = this.items.filter(item => item.id !== data.id);
    this.evaluateFormulas();
  }

  /**
   * Handles number key input.
   * @param key - Key pressed.
   */
  handleKeyNumber (key: string) {
    this.inputBuffer += key;
    this.inputBufferSubject.next('');
  }

  /**
   * Handles key input.
   * @param key - Keys pressed.
   */
  handleKey (...key: string[]) { 
    for(const k of key){
      this.insertElement(k)
    }  
  }

  /**
   * Evaluates formulas in the form.
   */
  evaluateFormulas () {
    const concatenatedFormula = this.items.map(item => item.input ? item.value : item.text).join('');

    this.formula = { 
      concatenatedFormula,
      inputs: this.items.filter(item => item.input).map(item => item.input)
    }

    this.changed.emit(this.formula);

    try { // Intenta evaluar la fórmula completa 
      const result = eval(this.emulateInputsToValidate(concatenatedFormula));
      
      if (result) {
        this.status.update(() => {
          return {
            error: false,
            inputs: this.items
          }
        });
      } else {
        this.status.update(() => {
          return {
            error:true,
            inputs:this.items
          }
        });
      }
    } catch (error) {
      // Si hay un error al evaluar la fórmula, puedes manejarlo aquí
      //console.error('Error al evaluar la fórmula completa:', error);
      this.status.update(() => {
        return {
          error:true,
          inputs:this.items
        }
      });
    }
  }

  /**
   * Emulates input values for formula validation.
   * @param concatenatedFormula - Formula to be validated.
   */
  private emulateInputsToValidate(concatenatedFormula: string): string {
    return concatenatedFormula.replaceAll(this.patronRegex, "1");
  }

  /**
   * Checks syntax and evaluates the formula.
   */
  public async checkSintaxis() {
    const concatenatedFormula = this.items.map(item => item.input ? item.value : item.text).join('');
    let newconcatenatedFormula = concatenatedFormula;

    const inputs = [...concatenatedFormula.matchAll(this.patronRegex)];

    inputs.map(input => {
      const id = input[1];

      this.inputService.getById(id).subscribe((res: IInputData) => {
        const v = prompt(`Inserte valor para la variable ${res.name} en ${res?.unit}`);
        newconcatenatedFormula = newconcatenatedFormula.replace(`#{${id}}`, String(v));

        if (!newconcatenatedFormula.matchAll(this.patronRegex).next().value) {
          let output = undefined;
      
          try{
            output = eval(newconcatenatedFormula)
      
          }catch (err) {
            console.error(err);
      
          }
        
          if (output) {
            alert("La salida es :" + output);
      
          } else {
            alert("Existe un error en la fórmula");
      
          }
        }

      });
    });
  }

}