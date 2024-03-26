import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormActResponsesComponent } from './form-act-responses.component';

describe('FormActResponsesComponent', () => {
  let component: FormActResponsesComponent;
  let fixture: ComponentFixture<FormActResponsesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormActResponsesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormActResponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
