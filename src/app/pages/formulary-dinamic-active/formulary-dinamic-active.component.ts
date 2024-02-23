import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormActiveService } from '../../services/form/form-active.service';
import { FormService } from '../../services/form/form.service';
import { IFormData } from '../../model/interfaces/i-form-data';
import { IInputData } from '../../model/interfaces/i-input-data';
import { InputService } from '../../services/input/input.service';
import { IInputField, InputComponent } from '../../components/formularyDynamicActive/input/input.component';
import { IInputType } from '../../model/interfaces/i-input-type';

@Component({
  selector: 'app-formulary-dinamic-active',
  standalone: true,
  imports: [InputComponent],
  templateUrl: './formulary-dinamic-active.component.html',
  styleUrl: './formulary-dinamic-active.component.scss'
})
export class FormularyDinamicActiveComponent implements OnInit {
  private readonly routerService = inject(ActivatedRoute);
  private readonly formActiveService = inject(FormActiveService);
  private readonly formService = inject(FormService);
  private readonly inputService = inject(InputService);

  public formularyActive!: any;
  public formulary!: IFormData;
  public inputList!: IInputData[];

  constructor() {
    this.inputList = [];
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
              this.inputList.push({ ...res, inputField  });
            });
          });
        });
      });
    });
  }

}
