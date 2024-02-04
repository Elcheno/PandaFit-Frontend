import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSchoolYearModalComponent } from './update-school-year-modal.component';

describe('UpdateSchoolYearModalComponent', () => {
  let component: UpdateSchoolYearModalComponent;
  let fixture: ComponentFixture<UpdateSchoolYearModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateSchoolYearModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateSchoolYearModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
