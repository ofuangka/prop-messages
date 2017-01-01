import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class PhoneCallStagingService {

	from = '';
	timer: NodeJS.Timer;

	constructor(private router: Router) { }

	stagePhoneCall(from: string, ms: number) {
		clearTimeout(this.timer);
		this.from = from;
		this.timer = setTimeout(() => this.router.navigate(['/phone-call']), ms);
	}

}
