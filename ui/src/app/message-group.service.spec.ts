/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MessageGroupService } from './message-group.service';

describe('Service: MessageGroup', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageGroupService]
    });
  });

  it('should ...', inject([MessageGroupService], (service: MessageGroupService) => {
    expect(service).toBeTruthy();
  }));
});
