import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormGeneratorComponent } from '../../output/form-generator/form-generator.component';
import { ButtonComponent } from '../../button/button.component';
import { IUmbral, IOutputData } from '../../../model/interfaces/i-output-data';
import { OutputService } from '../../../services/output/output.service';
import { UmbralGeneratorComponent } from '../../output/umbral-generator/umbral-generator.component';
import { ModalService } from '../../../services/modal/modal.service';
import { IInputData } from '../../../model/interfaces/i-input-data';
import { Router } from '@angular/router';
import { ToastService } from '../../../services/modal/toast.service';
import { StoreService } from '../../../services/store/store.service';

@Component({
  selector: 'app-create-output',
  standalone: true,
  imports: [ReactiveFormsModule, FormGeneratorComponent, ButtonComponent, UmbralGeneratorComponent],
  templateUrl: './create-output.component.html',
  styleUrl: './create-output.component.scss'
})
export class CreateOutputComponent {
  private readonly outputService = inject(OutputService);
  private readonly fb = inject(FormBuilder);
  private readonly modalService = inject(ModalService);
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);
  private readonly storeService = inject(StoreService);

  public form!: FormGroup;

  ids: number[] = [];
  public umbralList: IUmbral[] = [];

  private inputs!: IInputData[];

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

  /**
   * Method to handle form submission
   */
  public onSubmit (): void {
    if (this.form.invalid) {
      this.toastService.showToast('Todos los campos son obligatorios', 'error');
      return;
    }
    const output: IOutputData = {
      name: this.form.get('name')?.value,
      description: this.form.get('description')?.value,
      inputsId: this.getIdsFromCalculation(),
      formula: this.form.get('calculation')?.value,
      umbralList: this.umbralList,
      unit: this.form.get('unit')?.value
    }

    this.createOutput(output);
  }

  /**
   * Method to set calculation based on data
   * @param data 
   */
  public setCalculation (data: any): void { 
    this.inputs = data.inputs;
    this.form.get('calculation')?.setValue(data.concatenatedFormula);
  }

  /**
   * Method to validate calculation
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

  /**
   * Method to get IDs from calculation
   * @returns array of input IDs
   */
  getIdsFromCalculation () {
    const inputsValues = [];

    for (const input of this.inputs) {
      if (input.id) inputsValues.push(input.id);
    }
    
    return inputsValues;
  }

  /**
   * Method to set threshold
   */
  public async setThreshold (): Promise<void> {
    (await this.modalService.open(UmbralGeneratorComponent, this.umbralList)).closed.subscribe((umbralList: IUmbral[]) => {
      if (!umbralList) return;
      this.umbralList = umbralList;
      this.toastService.showToast('Umbrales guardados', 'success');
    });
  }

  /**
   * Method to create output
   * @param output 
   */
  private createOutput (output: IOutputData): void {
    this.outputService.create(output).subscribe(
      (res: IOutputData) => {
        this.form.reset();
        this.storeService.outputStore.revalidate();
        this.toastService.showToast('Respuesta guardada', 'success');
        this.router.navigateByUrl('/dashboard/formulary/outputs');
      }
    );
  }
}
