import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormActComponent } from './form-act.component';

describe('FormActComponent', () => {
  let component: FormActComponent;
  let fixture: ComponentFixture<FormActComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormActComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
