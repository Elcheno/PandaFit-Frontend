import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowInputModalComponent } from './show-input-modal.component';

describe('ShowInputModalComponent', () => {
  let component: ShowInputModalComponent;
  let fixture: ComponentFixture<ShowInputModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowInputModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowInputModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
