import { TestBed, inject } from '@angular/core/testing';

import { AddImageService } from './add-image.service';

describe('AddImageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddImageService]
    });
  });

  it('should be created', inject([AddImageService], (service: AddImageService) => {
    expect(service).toBeTruthy();
  }));
});
