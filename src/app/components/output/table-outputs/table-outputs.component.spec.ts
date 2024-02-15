import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOutputsComponent } from './table-outputs.component';

describe('TableOutputsComponent', () => {
  let component: TableOutputsComponent;
  let fixture: ComponentFixture<TableOutputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableOutputsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableOutputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
