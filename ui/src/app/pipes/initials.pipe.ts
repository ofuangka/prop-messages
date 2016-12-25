import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'initials'
})
export class InitialsPipe implements PipeTransform {

	transform(value: string, args?: any): any {
		var tokens, ret;
		if (value && value.length > 0) {
			tokens = value.split(' ');
			ret = (tokens.length > 1) ? tokens[0].charAt(0) + tokens[tokens.length - 1].charAt(0) : tokens[0].charAt(0);
			return ret.toUpperCase();
		}
		return value;
	}

}
