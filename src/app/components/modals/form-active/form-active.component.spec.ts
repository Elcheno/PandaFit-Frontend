import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormActiveComponent } from './form-active.component';

describe('FormActiveComponent', () => {
  let component: FormActiveComponent;
  let fixture: ComponentFixture<FormActiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormActiveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
