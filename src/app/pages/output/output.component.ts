import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormGeneratorComponent } from '../../components/output/form-generator/form-generator.component';
import { ButtonComponent } from '../../components/button/button.component';
import { IUmbral, OutputData } from '../../model/interfaces/i-output-data';
import { OutputService } from '../../services/output/output.service';
import { UmbralGeneratorComponent } from '../../components/output/umbral-generator/umbral-generator.component';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-output',
  standalone: true,
  imports: [ReactiveFormsModule, FormGeneratorComponent, ButtonComponent, UmbralGeneratorComponent],
  templateUrl: './output.component.html',
  styleUrl: './output.component.scss'
})
export class OutputComponent {

  private readonly outputService = inject(OutputService);
  private readonly fb = inject(FormBuilder);
  private readonly modalService = inject(ModalService);

  public form!: FormGroup;

  ids: number[] = [];
  public umbralList: IUmbral[] = [];

  constructor() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      calculation: ['', [Validators.required]],
      calculation_valid:[false, [Validators.required]],
      text_lower:[''],
      value_lower:[0],
      text_upper:[''],
      value_upper:[0],
      unit:['', [Validators.required]]
    });
  }

  public onSubmit (): void {
    const output: OutputData = {
      id: Math.floor(1000 + Math.random() * 9000),
      name: this.form.get('name')?.value,
      description: this.form.get('description')?.value,
      inputsIds: this.getIdsFromCalculation(),
      calculations: this.form.get('calculation')?.value,
      umbrals: this.umbralList
    }
    console.log(output);
    this.outputService.addOutput(output);
    this.form.reset();
  }

  public setCalculation (data: any): void { 
    this.form.get('calculation')?.setValue(data);
  }

  /**
   * Lee el valor del textarea y valida si es una expresión matemática correcta con eval
   * @param event 
   */
    validCalculation (event: any) {
      if (event.srcElement.value.trim().length == 0) {
        this.form.get('calculation_valid')?.setValue(false);
        return;
      }
      try {
        const test = eval(event.srcElement.value);
        this.form.get('calculation_valid')?.setValue(test === undefined ? false : true);

      } catch(error) {
        this.form.get('calculation_valid')?.setValue(false)
        
      } 
    }

    getIdsFromCalculation () {
      const patronRegex = /#(\d+){([^}]+)}/gi;
      const inputs = [...this.form.get('calculation')?.value.matchAll(patronRegex)];
      const inputsValues = [];

      for (const input of inputs) {
        inputsValues.push(input[1]);
      }
      
      return inputsValues;
    }

    public async setThreshold (): Promise<void> {
      (await this.modalService.open(UmbralGeneratorComponent, this.umbralList)).closed.subscribe((umbralList: IUmbral[]) => {
        if (!umbralList) return;
        this.umbralList = umbralList;
      });
    }
}
