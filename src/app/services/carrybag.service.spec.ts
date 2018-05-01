import { TestBed, inject } from '@angular/core/testing';

import { CarrybagService } from './carrybag.service';

describe('CarrybagService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarrybagService]
    });
  });

  it('should be created', inject([CarrybagService], (service: CarrybagService) => {
    expect(service).toBeTruthy();
  }));
});
