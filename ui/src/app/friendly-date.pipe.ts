import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

const DAY_MS = 1000 * 60 * 60 * 24;
const DAY_2X_MS = DAY_MS * 2;
const DAY_6X_MS = DAY_MS * 6;

@Pipe({
  name: 'friendlyDate'
})
export class FriendlyDatePipe implements PipeTransform {

  constructor(private datePipe: DatePipe) { }

  transform(value: any, inMessages: boolean): any {

    let today = new Date();
    let date = new Date(value);
    let difference = today.getTime() - date.getTime();
    if (difference <= DAY_MS) {
      return (inMessages) ? 'Today' : this.datePipe.transform(value, 'h:mm a');
    } else if (difference <= DAY_2X_MS) {
      return 'Yesterday';
    } else if (inMessages) {
      return this.datePipe.transform(value, 'EEE, MMM d,');
    } else if (difference <= DAY_6X_MS) {
      return this.datePipe.transform(value, 'EEEE');
    } else {
      return this.datePipe.transform(value, 'M/d/yy');
    }
  }

}
