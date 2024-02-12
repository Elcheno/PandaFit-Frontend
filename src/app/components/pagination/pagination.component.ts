import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IPageable } from '../../model/interfaces/i-pageable';


@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Input() public data!: IPageable<any>;
  @Output() nextPageEvent = new EventEmitter<void>();
  @Output() previousPageEvent = new EventEmitter<void>();

  nextPage(): void {
    this.nextPageEvent.emit();
  }

  previousPage(): void {
    this.previousPageEvent.emit();
  }
}