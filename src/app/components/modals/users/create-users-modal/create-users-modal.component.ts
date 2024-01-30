/* eslint-disable @typescript-eslint/unbound-method */
import { Component, inject } from '@angular/core';
import { FormBuilder, type FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-users-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-users-modal.component.html',
  styleUrl: './create-users-modal.component.scss'
})
export class CreateUsersModalComponent {
  private readonly fb = inject(FormBuilder);

  public form!: FormGroup;

  constructor () {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      checkboxUser: [true],
      checkboxAdmin: [false],
      selectInstitution: ['', [Validators.required]]
    });
  }
}
