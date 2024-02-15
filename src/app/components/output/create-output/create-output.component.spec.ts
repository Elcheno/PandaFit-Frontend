import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOutputComponent } from './create-output.component';

describe('CreateOutputComponent', () => {
  let component: CreateOutputComponent;
  let fixture: ComponentFixture<CreateOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOutputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
