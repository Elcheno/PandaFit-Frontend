import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableInstitutionAnswersComponent } from './table-institution-answers.component';

describe('TableInstitutionAnswersComponent', () => {
  let component: TableInstitutionAnswersComponent;
  let fixture: ComponentFixture<TableInstitutionAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableInstitutionAnswersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableInstitutionAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
