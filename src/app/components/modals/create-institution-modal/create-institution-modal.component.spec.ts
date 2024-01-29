import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInstitutionModalComponent } from './create-institution-modal.component';

describe('CreateInstitutionModalComponent', () => {
  let component: CreateInstitutionModalComponent;
  let fixture: ComponentFixture<CreateInstitutionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateInstitutionModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateInstitutionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
