import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, WritableSignal, inject, signal } from '@angular/core';
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
}

@Component({
  selector: 'app-form-generator',
  standalone: true,
  imports: [CommonModule, DragDropModule,CdkDropList, CdkDrag,OverlayModule, ButtonComponent, DropdownComponent],
  templateUrl: './form-generator.component.html',
  styleUrl: './form-generator.component.scss'
})
export class FormGeneratorComponent {
  @Output() changed = new EventEmitter();

  private inputService = inject(InputService);

  private inputBufferSubject = new Subject<string>();

  public status: WritableSignal<any> = signal({
    error: false,
    inputs: []
  });

  private selectedItemId: number | null = null;

  private itemsid: number = 0;

  public inputBuffer: string = '';

  public inputData!: any;
  
  public items: Item[] = [];

  private dropdownRows!: IDropdownRow<any>[];
  
  public dropdownData: IDropdownData<any> = {
    button: {
      title: 'Inputs',
    },
    rows: []
  };

  ngOnInit() {
    this.inputBufferSubject
      .pipe(debounceTime(1000))
      .subscribe(() => {
        this.handleInputBuffer();
      });

    this.inputData = this.inputService.mockData;

    this.dropdownRows = this.inputData.map((input: IInputData) => {
      if (input.type === 1 || input.type === 2) {
        console.log(input.type);
        return {
          title: input.name,
          fnc: () => this.insertInput(input)
        };
      }
      return
    });

    this.dropdownData = {
      button: {
        title: 'Inputs',
      },
      rows: this.dropdownRows
    };
    console.log(this.dropdownRows);
  }

  handleInputBuffer() {
    if (this.inputBuffer) {
      this.insertElement(this.inputBuffer);
      this.inputBuffer = '';
    }
  }

  onDrop(event: any) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    
    //const draggedItemId = event.item.data.id;
    this.evaluateFormulas();
  }

  insertInput(input: IInputData) {
    if(input && input.name)
      this.insertElement('#'+input?.id+'{'+input?.name+'}');
  }

  insertElement(newText: string) {
    const newItem: Item = { id: this.itemsid++, text: newText, selected: false };
    this.items.push(newItem);
    this.evaluateFormulas();
    
    //this.evaluateFormulas();
  }

  selectItem(item: any) {
    if (!item.selected) {
      this.items = this.items.map(i => { return { ...i, selected : false } });
      this.items = this.items.map(i => { return { ...i, selected : i.id === item.id } });
      this.selectedItemId = item.id;
    } else {
      console.log(item);
      this.items = this.items.map(i => { return { ...i, selected : false } });
      this.selectedItemId = null;
    }
  }

  deleteItem(itemId: number) {
    this.items = this.items.filter(item => item.id !== itemId);
    this.selectedItemId = null;
    this.evaluateFormulas();
  }

  handleKeyNumber(key: string) {
    this.inputBuffer += key;
    this.inputBufferSubject.next('');
  }

  handleKey(...key: string[]) {
    for(const k of key){
      this.insertElement(k)
    }  
  }

  evaluateFormulas() {
    const concatenatedFormula = this.emulateInputsToValidate();
    this.changed.emit(concatenatedFormula);

    try { // Intenta evaluar la fórmula completa
      const result = eval(concatenatedFormula);
      console.log('Resultado de la fórmula completa:', result);
      
      if (result) {
        this.status.update(()=>{
          return {
            error: false,
            inputs: this.items
          }
        });
      } else {
        this.status.update(()=>{
          return {
            error:true,
            inputs:this.items
          }
        });
      }
    } catch (error) {
      // Si hay un error al evaluar la fórmula, puedes manejarlo aquí
      //console.error('Error al evaluar la fórmula completa:', error);
      this.status.update(()=>{
        return {
          error:true,
          inputs:this.items
        }
      });
    }
  }

  /**
   * Elimina de items el item seleccionado o no hace nada si no hay ninguno
   */
  public removeItem() {
    if (this.selectedItemId) {
      this.items = this.items.filter(item => item.id !== this.selectedItemId);
      this.evaluateFormulas();
    }
  }

  private emulateInputsToValidate() {
    const concatenatedFormula = this.items.map(item => item.text).join('');
    const patronRegex = /#(\d+){([^}]+)}/g;
    return concatenatedFormula.replaceAll(patronRegex, '1');
  }

  public checkSintaxis() {
    const concatenatedFormula = this.items.map(item => item.text).join('');
    let newconcatenatedFormula =concatenatedFormula;
    const patronRegex = /#(\d+){([^}]+)}/gi;
    const inputs = [...concatenatedFormula.matchAll(patronRegex)];
    const inputsValues = [];
    for (const input of inputs) {
      const id = input[1];
      const name = input[2];
      let inputData = this.inputService.searchInput(+id);
      const v = prompt(`Inserte valor para la variable ${name} en ${inputData?.unit}`);
      const regex = RegExp(`#${id}{${name}}`, 'gi')
      console.log(newconcatenatedFormula)
      newconcatenatedFormula = newconcatenatedFormula.replace(regex,v+"");
    }
    let output=undefined;
    try{
      output=eval(newconcatenatedFormula)
    }catch(err){
      console.error(err);
    }
    if(output){
      alert("La salida es :" + output);
    }else{
      alert("Existe un error en la fórmula");
    }
    
  }
}
