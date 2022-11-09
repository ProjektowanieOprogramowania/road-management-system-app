import { TestBed } from '@angular/core/testing';

import { Old_penaltiesService } from './penalties.service';

describe('PenaltiesService', () => {
  let service: Old_penaltiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Old_penaltiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
