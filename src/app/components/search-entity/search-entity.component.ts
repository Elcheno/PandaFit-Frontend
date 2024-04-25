import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, type FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, debounceTime } from 'rxjs';

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

  private inputBufferSubject = new Subject<string>();

  private readonly fb = inject(FormBuilder);

  /**
   * Form group for search input.
   */
  public form!: FormGroup;

  constructor () {
    this.form = this.fb.group({
      search: ['']
    });

    this.inputBufferSubject
    .pipe(debounceTime(500))
    .subscribe(() => {
      this.emit();
    });   
  }

  /**
   * Submits the search query.
   */
  public submit (): void {
    this.inputBufferSubject.next('');
  }

  public emit (): void {
    this.onSearch.emit(this.form.value.search ?? '');
  }
}
