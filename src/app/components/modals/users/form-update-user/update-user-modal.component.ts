import { Component, inject } from '@angular/core';
import { FormBuilder, type FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-user-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-user-modal.component.html',
  styleUrl: './update-user-modal.component.scss'
})
export class UpdateUserComponent {
  private readonly fb = inject(FormBuilder);

  public form!: FormGroup;

  constructor () {
    this.form = this.fb.group({
      email: ''
    });
  }

  public submit (): void {
    if (this.form.invalid) return;
    console.log(this.form.value);
  }
}
