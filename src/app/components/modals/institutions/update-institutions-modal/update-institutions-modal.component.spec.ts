import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInstitutionsModalComponent } from './update-institutions-modal.component';

describe('UpdateInstitutionsModalComponent', () => {
  let component: UpdateInstitutionsModalComponent;
  let fixture: ComponentFixture<UpdateInstitutionsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateInstitutionsModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateInstitutionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
