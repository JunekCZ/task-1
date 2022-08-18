import { TestBed } from '@angular/core/testing';

import { IndividualDataService } from './individual-data.service';

describe('IndividualDataService', () => {
  let service: IndividualDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndividualDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
