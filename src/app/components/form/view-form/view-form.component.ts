import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IInputData } from '../../../model/interfaces/i-input-data';
import { IOutputData } from '../../../model/interfaces/i-output-data';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonComponent } from '../../button/button.component';
import { IFormData } from '../../../model/interfaces/i-form-data';
import { InputService } from '../../../services/input/input.service';
import { OutputService } from '../../../services/output/output.service';
import { ShowInputModalComponent } from '../../modals/input/show-input-modal/show-input-modal.component';
import { ModalService } from '../../../services/modal/modal.service';
import { FormService } from '../../../services/form/form.service';

/**
 * Component representing the view form page.
 */
@Component({
  selector: 'app-view-form',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent],
  templateUrl: './view-form.component.html',
  styleUrl: './view-form.component.scss'
})
export class ViewFormComponent {
  private readonly router = inject(Router);
  private readonly inputService = inject(InputService);
  private readonly outputService = inject(OutputService);
  private readonly modalService = inject(ModalService);
  private readonly routerParam = inject(ActivatedRoute);
  private readonly formService = inject(FormService);
  private formId = this.routerParam.snapshot.paramMap.get('formId');
  formBuilder = inject(FormBuilder);
  formGroup: FormGroup;
  form!: IFormData;
  inputs: IInputData[] = [];
  outputs: IOutputData[] = [];

  constructor() {
    this.formGroup = this.formBuilder.group({
      name: [''],
      description: [''],
    })
    this.formService.getById(this.formId!).subscribe((res) => {
      
      
      this.form = res
      this.formGroup = this.formBuilder.group({
        name: [this.form.name],
        description: [this.form.description],
      })
      this.formGroup.disable();
      this.form.inputIdList?.map((input) => {
        return this.inputService.getById(input).subscribe((res) => {
          this.inputs.push(res)
        })
      })
      this.form.outputIdList?.map((output) => {
        return this.outputService.getById(output).subscribe((res) => {
          this.outputs.push(res)
        })
      })
    });
  }

  /**
   * Opens the information modal for the given input.
   * @param input The input data to display in the modal.
   */
  openInfoModal(input: IInputData): void {
    this.modalService.open(ShowInputModalComponent, input);
  }
}
