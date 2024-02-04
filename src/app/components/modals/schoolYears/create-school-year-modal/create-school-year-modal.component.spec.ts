import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSchoolYearModalComponent } from './create-school-year-modal.component';

describe('CreateSchoolYearModalComponent', () => {
  let component: CreateSchoolYearModalComponent;
  let fixture: ComponentFixture<CreateSchoolYearModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSchoolYearModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateSchoolYearModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
