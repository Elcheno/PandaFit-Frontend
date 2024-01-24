import { TestBed } from '@angular/core/testing';

import { SchoolyearService } from './schoolyear.service';

describe('SchoolyearService', () => {
  let service: SchoolyearService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchoolyearService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
