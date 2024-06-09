import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolyearSelectorComponent } from './schoolyear-selector.component';

describe('SchoolyearSelectorComponent', () => {
  let component: SchoolyearSelectorComponent;
  let fixture: ComponentFixture<SchoolyearSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolyearSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SchoolyearSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
