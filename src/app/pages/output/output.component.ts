import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormGeneratorComponent } from '../../components/output/form-generator/form-generator.component';

@Component({
  selector: 'app-output',
  standalone: true,
  imports: [ReactiveFormsModule, FormGeneratorComponent],
  templateUrl: './output.component.html',
  styleUrl: './output.component.scss'
})
export class OutputComponent {

  private readonly fb = inject(FormBuilder);

  public form!: FormGroup;

  constructor() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      calculation: ['']
    });
  }

  public create(): void { }

  public setCalculation(data: any): void { }
}
