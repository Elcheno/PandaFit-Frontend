import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAnswerComponent } from './table-answer.component';

describe('TableAnswerComponent', () => {
  let component: TableAnswerComponent;
  let fixture: ComponentFixture<TableAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableAnswerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
