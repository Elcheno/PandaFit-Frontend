import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoInstitutionComponent } from './info-institution.component';

describe('InfoInstitutionComponent', () => {
  let component: InfoInstitutionComponent;
  let fixture: ComponentFixture<InfoInstitutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoInstitutionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoInstitutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
