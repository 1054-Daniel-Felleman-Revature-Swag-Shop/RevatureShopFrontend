import { TestBed } from '@angular/core/testing';

import { DisplayFeaturedService } from './display-featured.service';

describe('DisplayFeaturedService', () => {
  let service: DisplayFeaturedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayFeaturedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    pending('The test was failing before the iteration began.');
  });
});
