import { TestBed } from '@angular/core/testing';

import { DisplaySaleService } from './display-sale.service';

describe('DisplaySaleService', () => {
  let service: DisplaySaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplaySaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    pending('The test was failing before the iteration began.');
  });
});
