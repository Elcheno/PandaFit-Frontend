import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInputModalComponent } from './update-input-modal.component';

describe('UpdateInputModalComponent', () => {
  let component: UpdateInputModalComponent;
  let fixture: ComponentFixture<UpdateInputModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateInputModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateInputModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
