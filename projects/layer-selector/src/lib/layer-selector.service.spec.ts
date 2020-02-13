import { TestBed } from '@angular/core/testing';

import { LayerSelectorService } from './layer-selector.service';

describe('LayerSelectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LayerSelectorService = TestBed.get(LayerSelectorService);
    expect(service).toBeTruthy();
  });
});
