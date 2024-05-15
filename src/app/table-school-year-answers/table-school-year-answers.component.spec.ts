import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSchoolYearAnswersComponent } from './table-school-year-answers.component';

describe('TableSchoolYearAnswersComponent', () => {
  let component: TableSchoolYearAnswersComponent;
  let fixture: ComponentFixture<TableSchoolYearAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableSchoolYearAnswersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableSchoolYearAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
