import { TestBed } from '@angular/core/testing';

import { RedactorService } from './redactor.service';

describe('RedactorService', () => {
  let service: RedactorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RedactorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
