import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Conversation } from './domain/conversation';

@Injectable()
export class PhoneCallStagingService {

	from = '';
	timer: NodeJS.Timer;

	constructor(private router: Router) { }

	stagePhoneCall(conversation: Conversation, ms: number) {
		clearTimeout(this.timer);
		this.from = conversation.to;
		this.timer = setTimeout(() => this.router.navigate(['/phone-call', conversation.id]), ms);
	}

}
