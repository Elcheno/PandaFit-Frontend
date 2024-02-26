import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormActiveService } from '../../services/form/form-active.service';
import { FormService } from '../../services/form/form.service';
import { IFormData } from '../../model/interfaces/i-form-data';
import { IInputData } from '../../model/interfaces/i-input-data';
import { InputService } from '../../services/input/input.service';
import { IInputField, InputComponent } from '../../components/formularyDynamicActive/input/input.component';
import { IInputType } from '../../model/interfaces/i-input-type';
import { ButtonComponent } from '../../components/button/button.component';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../services/modal/toast.service';

@Component({
  selector: 'app-formulary-dinamic-active',
  standalone: true,
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './formulary-dinamic-active.component.html',
  styleUrl: './formulary-dinamic-active.component.scss'
})
export class FormularyDinamicActiveComponent implements OnInit {
  private readonly routerService = inject(ActivatedRoute);
  private readonly formActiveService = inject(FormActiveService);
  private readonly formService = inject(FormService);
  private readonly inputService = inject(InputService);
  private readonly fb = inject(FormBuilder);
  private readonly toastService = inject(ToastService);

  public formularyActive!: any;
  public formulary!: IFormData;
  public inputList!: IInputData[];
  public form!: FormGroup;

  public inputName: IInputField<any> = {
    type: 'text',
    unit: '',
    text: 'Nombre Completo',
  }

  constructor() {
    this.inputList = [];

    this.form = this.fb.group({
      name: [''],
      birthdate: [''],
      answers: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.routerService.params.subscribe((params) => {
      const id = params['id'];
      if (!id) return;

      this.formActiveService.getById(id).subscribe((res) => {
        if (!res) return;
        this.formularyActive = res;

        this.formService.getById(res.formId).subscribe((res) => {
          if (!res) return;
          this.formulary = res;

          this.formulary.inputIdList?.map((inputId) => {
            this.inputService.getById(inputId).subscribe((res: IInputData) => {
              const inputField: IInputField <any> = {
                type: IInputType[res.type].toLowerCase() ?? 'text',
                unit: res.unit ?? '',
                text: res.name ?? '',
              }
              this.answers.push(
                this.fb.group({
                  type: [inputField.type],
                  unit: [inputField.unit],
                  text: [inputField.text],
                  value: ['', [Validators.required]]
                })
              );
            });
          });
        });
      });
    });
  }

  public onSubmit (): void {
    console.log(this.form);
    if (this.form.invalid) {
      this.toastService.showToast('Todos los campos son obligatorios', 'error');
      return;
    }
  }

  get answers (): FormArray {
    return this.form.get('answers') as FormArray;
  }

}
