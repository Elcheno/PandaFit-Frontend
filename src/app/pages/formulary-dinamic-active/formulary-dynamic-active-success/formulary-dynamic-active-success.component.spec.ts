import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularyDynamicActiveSuccessComponent } from './formulary-dynamic-active-success.component';

describe('FormularyDynamicActiveSuccessComponent', () => {
  let component: FormularyDynamicActiveSuccessComponent;
  let fixture: ComponentFixture<FormularyDynamicActiveSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularyDynamicActiveSuccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularyDynamicActiveSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
