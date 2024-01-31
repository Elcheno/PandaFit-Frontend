import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUsersModalComponent } from './create-users-modal.component';

describe('CreateUsersModalComponent', () => {
  let component: CreateUsersModalComponent;
  let fixture: ComponentFixture<CreateUsersModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUsersModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateUsersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
