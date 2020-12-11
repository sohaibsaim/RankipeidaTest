import { TestBed } from '@angular/core/testing';

import { GenericApiCallingService } from './generic-api-calling.service';

describe('GenericApiCallingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenericApiCallingService = TestBed.get(GenericApiCallingService);
    expect(service).toBeTruthy();
  });
});
