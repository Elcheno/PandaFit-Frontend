import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularyDinamicActiveComponent } from './formulary-dinamic-active.component';

describe('FormularyDinamicActiveComponent', () => {
  let component: FormularyDinamicActiveComponent;
  let fixture: ComponentFixture<FormularyDinamicActiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularyDinamicActiveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularyDinamicActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
