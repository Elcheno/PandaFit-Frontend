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

  /**
   * Event emitter for search action.
   */
  @Output() public onSearch = new EventEmitter<string>();

  searchTerm: string = '';

  private readonly fb = inject(FormBuilder);

  /**
   * Form group for search input.
   */
  public form!: FormGroup;

  constructor () {
    this.form = this.fb.group({
      search: ['']
    });
  }

  /**
   * Submits the search query.
   */
  public submit (): void {
    //if (this.form.invalid) return;
    this.onSearch.emit(this.form.value.search);
  }
}
