import { TestBed } from '@angular/core/testing';

import { FormActiveService } from './form-active.service';

describe('FormActiveService', () => {
  let service: FormActiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormActiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
