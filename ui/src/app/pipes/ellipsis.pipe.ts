import { Pipe, PipeTransform } from '@angular/core';
import { SlicePipe } from '@angular/common';

const DEFAULT_LENGTH = 50;

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {

  constructor(private slicePipe: SlicePipe) {

  }

  transform(value: any, lengthString: string): any {
    if (typeof(value) === 'string') {

      let length = parseInt(lengthString);
      length = isNaN(length) ? DEFAULT_LENGTH : length;
      if (value.length > length) {
        return this.slicePipe.transform(value, 0, length) + '...';
      } 
    }
    return value;
  }

}
