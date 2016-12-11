import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'before'
})
export class BeforePipe implements PipeTransform {

	transform(value: any, beforeIndex: number): any {
		var arr;
		if (value && value.length && beforeIndex >= 0) {
			arr = [];
			for (let i = 0; i < value.length; i++) {
				if (i <= beforeIndex) {
					arr.push(value[i]);
				} else {
					break;
				}
			}
			return arr;
		}
		return value;
	}

}
