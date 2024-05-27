import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswersSchoolYearComponent } from './answers-school-year.component';

describe('AnswersSchoolYearComponent', () => {
  let component: AnswersSchoolYearComponent;
  let fixture: ComponentFixture<AnswersSchoolYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnswersSchoolYearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnswersSchoolYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
