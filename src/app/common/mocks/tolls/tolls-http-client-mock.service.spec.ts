import { TestBed } from '@angular/core/testing';

import { TollsHttpClientMockService } from './tolls-http-client-mock.service';

describe('TollsHttpClientMockService', () => {
  let service: TollsHttpClientMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TollsHttpClientMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
