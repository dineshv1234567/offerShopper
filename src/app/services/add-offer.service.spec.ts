import { TestBed, inject } from '@angular/core/testing';

import { AddOfferService } from './add-offer.service';

describe('AddOfferService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddOfferService]
    });
  });

  it('should be created', inject([AddOfferService], (service: AddOfferService) => {
    expect(service).toBeTruthy();
  }));
});
