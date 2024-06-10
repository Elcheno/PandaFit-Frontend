import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-range-filter',
  standalone: true,
  imports: [],
  templateUrl: './range-filter.component.html',
  styleUrl: './range-filter.component.scss'
})
export class RangeFilterComponent {
  @Input() public text!: string;
  @Input() public field!: string;
  @Input() public date: boolean = false;

  @ViewChild('from') public from!: any;
  @ViewChild('to') public to!: any;

  @Output() public filterChange = new EventEmitter<any>();

  // ngAfterViewInit() {
  //   this.emitFilterChange();
  // }
  
  public emitFilterChange() {
    this.filterChange.emit(this.getJson());
  }

  public getJson() {
    return {
      field: this.field,
      type: "range",
      body: [this.from.nativeElement.value, this.to.nativeElement.value]
    };
  }
}
