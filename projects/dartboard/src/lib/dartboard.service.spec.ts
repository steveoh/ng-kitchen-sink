import { TestBed } from '@angular/core/testing';

import { DartboardService } from './dartboard.service';

describe('DartboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DartboardService = TestBed.get(DartboardService);
    expect(service).toBeTruthy();
  });
});
