import { TestBed } from '@angular/core/testing';

import { TollsService } from './tolls.service';

describe('TollsService', () => {
  let service: TollsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TollsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
