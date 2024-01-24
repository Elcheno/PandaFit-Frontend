import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JCCPageComponent } from './jccpage.component';

describe('JCCPageComponent', () => {
  let component: JCCPageComponent;
  let fixture: ComponentFixture<JCCPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JCCPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JCCPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
