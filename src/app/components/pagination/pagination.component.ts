import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IPageable } from '../../model/interfaces/i-pageable';

/**
 * Component for pagination functionality.
 */
@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {

  /**
   * Input data containing the pageable information.
   */
  @Input() public data!: IPageable<any>;

  /**
   * Event emitter for navigating to the next page.
   */
  @Output() nextPageEvent = new EventEmitter<void>();

  /**
   * Event emitter for navigating to the previous page.
   */
  @Output() previousPageEvent = new EventEmitter<void>();


  /**
   * Emits an event to navigate to the next page.
   */
  nextPage(): void {
    this.nextPageEvent.emit();
  }

  /**
   * Emits an event to navigate to the previous page.
   */
  previousPage(): void {
    this.previousPageEvent.emit();
  }
}