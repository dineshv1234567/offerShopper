import { TestBed, inject } from '@angular/core/testing';

import { UpdatePasswordService } from './update-password.service';

describe('UpdatePasswordService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdatePasswordService]
    });
  });

  it('should be created', inject([UpdatePasswordService], (service: UpdatePasswordService) => {
    expect(service).toBeTruthy();
  }));
});
