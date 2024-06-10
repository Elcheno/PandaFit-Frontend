import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSchoolYearComponent } from './table-school-year.component';

describe('TableSchoolYearComponent', () => {
  let component: TableSchoolYearComponent;
  let fixture: ComponentFixture<TableSchoolYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableSchoolYearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableSchoolYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
