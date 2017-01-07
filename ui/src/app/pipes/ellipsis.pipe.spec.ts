/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { EllipsisPipe } from './ellipsis.pipe';
import { SlicePipe } from '@angular/common';

describe('Pipe: Ellipsis', () => {
  it('create an instance', () => {
    let pipe = new EllipsisPipe(new SlicePipe());
    expect(pipe).toBeTruthy();
  });
});
