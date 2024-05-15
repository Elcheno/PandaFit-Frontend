import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswersInstitutionsComponent } from './answers-institutions.component';

describe('AnswersInstitutionsComponent', () => {
  let component: AnswersInstitutionsComponent;
  let fixture: ComponentFixture<AnswersInstitutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnswersInstitutionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnswersInstitutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
