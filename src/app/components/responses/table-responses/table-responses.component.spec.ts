import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableResponsesComponent } from './table-responses.component';

describe('TableResponsesComponent', () => {
  let component: TableResponsesComponent;
  let fixture: ComponentFixture<TableResponsesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableResponsesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableResponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
