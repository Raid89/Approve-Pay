import { TestBed } from '@angular/core/testing';

import { BnplService } from './bnpl.service';

describe('BnplService', () => {
  let service: BnplService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BnplService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
