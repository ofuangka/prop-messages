/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PhoneCallService } from './phone-call.service';

describe('Service: PhoneCall', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhoneCallService]
    });
  });

  it('should ...', inject([PhoneCallService], (service: PhoneCallService) => {
    expect(service).toBeTruthy();
  }));
});
