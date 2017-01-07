/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { FriendlyDatePipe } from './friendly-date.pipe';
import { DatePipe } from '@angular/common';

describe('Pipe: FriendlyDate', () => {
  it('create an instance', () => {
    let pipe = new FriendlyDatePipe(new DatePipe('en_US'));
    expect(pipe).toBeTruthy();
  });
});
