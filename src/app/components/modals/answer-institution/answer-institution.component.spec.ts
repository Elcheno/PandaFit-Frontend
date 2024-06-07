import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerInstitutionComponent } from './answer-institution.component';

describe('AnswerInstitutionComponent', () => {
  let component: AnswerInstitutionComponent;
  let fixture: ComponentFixture<AnswerInstitutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnswerInstitutionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnswerInstitutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
