import { TestBed, inject } from '@angular/core/testing';

import { VerifyEmailService } from './verify-email.service';

describe('VerifyEmailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VerifyEmailService]
    });
  });

  it('should be created', inject([VerifyEmailService], (service: VerifyEmailService) => {
    expect(service).toBeTruthy();
  }));
});
