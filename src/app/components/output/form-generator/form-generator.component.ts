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

@Component({
  selector: 'app-form-generator',
  standalone: true,
  imports: [CommonModule, DragDropModule,CdkDropList, CdkDrag,OverlayModule, ButtonComponent, DropdownComponent],
  templateUrl: './form-generator.component.html',
  styleUrl: './form-generator.component.scss'
})
export class FormGeneratorComponent {
  @Output() changed = new EventEmitter<any>();

  private inputService = inject(InputService);

  private inputBufferSubject = new Subject<string>();

  public status: WritableSignal<any> = signal({
    error: false,
    inputs: []
  });

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

  private generateDropdown (): void {
    this.dropdownRows = this.inputData.map((input: IInputData) => {
      return {
        title: input.name,
        fnc: () => this.insertInput(input)
      };
    });

    this.dropdownData = {
      button: {
        title: 'Inputs',
      },
      rows: this.dropdownRows
    };
  }

  handleInputBuffer () {
    if (this.inputBuffer) {
      this.insertElement(this.inputBuffer);
      this.inputBuffer = '';
    }
  }

  onDrop (event: any) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    this.evaluateFormulas();
  }

  insertInput (input: IInputData) {
    if(input && input.name)
      this.insertElement(`#{${input?.name}}`, input);
  }

  insertElement(newText: string, input?: IInputData) {
    const newItem: Item = { id: Math.round((Math.random() * 9000) + 1000), text: newText, selected: false, input: input, value:`#{${input?.id}}` };
    this.items.push(newItem);
    this.evaluateFormulas();
  }

  selectItem (item: Item) {
    if (!item.selected) {
      this.items = this.items.map(i => { return { ...i, selected : false } });
      this.items = this.items.map(i => { return { ...i, selected : i.id === item.id } });
    } else {
      this.items = this.items.map(i => { return { ...i, selected : false } });
    }
  }

  deleteItem (data: Item) {
    this.items = this.items.filter(item => item.id !== data.id);
    this.evaluateFormulas();
  }

  handleKeyNumber (key: string) {
    this.inputBuffer += key;
    this.inputBufferSubject.next('');
  }

  handleKey (...key: string[]) { 
    for(const k of key){
      this.insertElement(k)
    }  
  }

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

  private emulateInputsToValidate(concatenatedFormula: string): string {
    return concatenatedFormula.replaceAll(this.patronRegex, "1");
  }

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