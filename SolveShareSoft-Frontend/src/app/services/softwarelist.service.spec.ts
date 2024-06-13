import { TestBed } from '@angular/core/testing';

import { SoftwarelistService } from './softwarelist.service';

describe('SoftwarelistService', () => {
  let service: SoftwarelistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoftwarelistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
