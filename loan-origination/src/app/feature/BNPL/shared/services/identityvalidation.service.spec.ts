import { TestBed } from '@angular/core/testing';

import { IdentityvalidationService } from './identityvalidation.service';

describe('IdentityvalidationService', () => {
  let service: IdentityvalidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdentityvalidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
