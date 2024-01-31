/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, type FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-entity',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search-entity.component.html',
  styleUrl: './search-entity.component.scss'
})
export class SearchEntityComponent {
  @Output() public onSearch = new EventEmitter<string>();

  private readonly fb = inject(FormBuilder);

  public form!: FormGroup;

  constructor () {
    this.form = this.fb.group({
      search: ['']
    });
  }

  public submit (): void {
    if (this.form.invalid) return;
    this.onSearch.emit(this.form.value.search);
  }
}
