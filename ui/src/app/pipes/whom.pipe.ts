import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'whom'
})
export class WhomPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (typeof value === 'string') {
      let s = value as string,
        people = s.split(','),
        delimPosition = s.indexOf(' ');
      if (people.length > 1) {
        return people.length + ' People';
      } else if (delimPosition >= 0) {
        return s.substring(0, delimPosition);
      }
    }
    return value;
  }

}
