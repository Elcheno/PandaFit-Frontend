import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInputModalComponent } from './create-input-modal.component';

describe('CreateInputModalComponent', () => {
  let component: CreateInputModalComponent;
  let fixture: ComponentFixture<CreateInputModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateInputModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateInputModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
