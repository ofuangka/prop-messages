import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PhoneCallStagingService } from '../phone-call-staging.service';
import { ConversationService } from '../conversation.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
	selector: 'phone-call',
	templateUrl: './phone-call.component.html',
	styleUrls: ['./phone-call.component.css']
})
export class PhoneCallComponent implements OnInit {
	caller: string;
	isAccepted = false;

	constructor(
		private conversationService: ConversationService, 
		private phoneCallStagingService: PhoneCallStagingService, 
		private route: ActivatedRoute, 
		private location: Location
	) { }

	ngOnInit() {
		/* we may have gotten here from the regular application actions, 
		or through a bookmark, so we have to handle both cases */

		/* get from cache first (application actions) */
		this.caller = this.phoneCallStagingService.from || '...';

		/* fall back on the service (bookmark) */
		this.route.params.forEach((params: Params) => {
			this.conversationService.get(params['conversationId']).then((conversation) => {
				this.caller = conversation.to;
			});
		});
	}

	goBack() {
		this.location.back();
	}

}
