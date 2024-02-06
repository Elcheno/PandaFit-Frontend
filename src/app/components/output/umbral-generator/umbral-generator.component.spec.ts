import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UmbralGeneratorComponent } from './umbral-generator.component';

describe('UmbralGeneratorComponent', () => {
  let component: UmbralGeneratorComponent;
  let fixture: ComponentFixture<UmbralGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UmbralGeneratorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UmbralGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
