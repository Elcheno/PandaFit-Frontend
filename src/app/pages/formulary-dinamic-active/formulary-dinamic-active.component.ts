import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormActiveService } from '../../services/form/form-active.service';
import { IFormData } from '../../model/interfaces/i-form-data';
import { IInputData } from '../../model/interfaces/i-input-data';
import { IInputField, InputComponent } from '../../components/formularyDynamicActive/input/input.component';
import { ButtonComponent } from '../../components/button/button.component';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../services/modal/toast.service';
import { AnswerService } from '../../services/answer/answer.service';

@Component({
  selector: 'app-formulary-dinamic-active',
  standalone: true,
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './formulary-dinamic-active.component.html',
  styleUrl: './formulary-dinamic-active.component.scss'
})
export class FormularyDinamicActiveComponent implements OnInit {
  private readonly routerActiveService = inject(ActivatedRoute);
  private readonly formActiveService = inject(FormActiveService);
  private readonly fb = inject(FormBuilder);
  private readonly toastService = inject(ToastService);
  private readonly answerService = inject(AnswerService);
  private readonly routerService = inject(Router);

  public formularyActive!: any;
  public formulary!: IFormData;
  public inputList!: IInputData[];
  public form!: FormGroup;

  public state = signal<boolean>(false);

  public inputName: IInputField<any> = {
    type: 'text',
    unit: '',
    text: 'Nombre Completo',
  }

  constructor() {
    this.inputList = [];

    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      surname1: ['', [Validators.required, Validators.minLength(3)]],
      surname2: ['', [Validators.required, Validators.minLength(3)]],
      birthdate: ['', [Validators.required]],
      answers: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.routerActiveService.params.subscribe((params) => {
      const id = params['id'];
      if (!id) return;

      this.formActiveService.getFormDetailById(id).subscribe((res) => {
        console.log(res);
        if (!res) return;
        
        this.formulary = res.formDetails;
        
        this.formularyActive = {
          id: id,
          startDate: res.startDate,
          expirationDate: res.expirationDate
        };
        
        res.inputs?.map((input: any) => {
          this.answers.push(
            this.fb.group({
              id: [input.id],
              type: [input.type.toLowerCase() ?? 'text'],
              unit: [input.unit ?? ''],
              text: [input.name ?? ''],
              decimal: [input.decimal],
              value: ['', [Validators.required]]
            })
          );
        });

        this.state.set(true);
      });
    });
  }

  public onSubmit (): void {
    console.log(this.form);
    if (this.form.invalid) {
      this.toastService.showToast('Todos los campos son obligatorios', 'error');
      return;
    }

    const response = {
      date: new Date(Date.now()).toISOString(),
      uuid: this.generateUuid(),
      formActId: this.formularyActive.id,
      response: this.answers.value.map((answer: any) => {
        return {
          inputId: answer.id,
          value: answer.value
        }
      })
    };

    this.answerService.post(response).subscribe((res) => {
      console.log(res);
      if (!res) return;
      this.toastService.showToast('Respuesta enviada', 'success');
      this.routerService.navigateByUrl('/active/success/' + res.id);
    });

  }

  public generateUuid (): string {
    let result = '';
    
    const name = this.form.get('name')?.value.toLowerCase().trim();
    const surname1 = this.form.get('surname1')?.value.toLowerCase().trim();
    const surname2 = this.form.get('surname2')?.value.toLowerCase().trim();

    const birthdate = new Date(this.form.get('birthdate')?.value);

    result = `${name.substring(0, 2)}${surname1.substring(0, 2)}${surname2.substring(0, 2)}${birthdate.getMonth() + 1}${birthdate.getFullYear()}`

    return result;
  }

  get answers (): FormArray {
    return this.form.get('answers') as FormArray;
  }

}
