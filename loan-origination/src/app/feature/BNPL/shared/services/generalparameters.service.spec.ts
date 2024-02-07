import { TestBed } from '@angular/core/testing';

import { GeneralparametersService } from './generalparameters.service';

describe('GeneralparametersService', () => {
  let service: GeneralparametersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralparametersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
