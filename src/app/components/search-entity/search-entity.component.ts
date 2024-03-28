import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, type FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  private readonly activedRouterService = inject(ActivatedRoute);
  private readonly routerService = inject(Router);

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

    this.activedRouterService.queryParams.subscribe((res) => {
      const search = res['search'];
      if (search) {
        this.form.controls['search'].setValue(search);
        this.submit();
      }
    });
  }

  /**
   * Submits the search query.
   */
  public submit (): void {
    this.inputBufferSubject.next('');
  }

  public emit (): void {
    this.form.value.search === '' 
      ? this.routerService.navigate([]) 
      : this.routerService.navigate([], { queryParams: { search: this.form.value.search } });
    this.onSearch.emit(this.form.value.search);
  }
}
