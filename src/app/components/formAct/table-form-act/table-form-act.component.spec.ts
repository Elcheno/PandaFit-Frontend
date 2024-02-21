import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFormActComponent } from './table-form-act.component';

describe('TableFormActComponent', () => {
  let component: TableFormActComponent;
  let fixture: ComponentFixture<TableFormActComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableFormActComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableFormActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
