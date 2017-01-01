import { Component, OnInit } from '@angular/core';
import { PhoneCallStagingService } from '../phone-call-staging.service';

@Component({
	selector: 'phone-call',
	templateUrl: './phone-call.component.html',
	styleUrls: ['./phone-call.component.css']
})
export class PhoneCallComponent implements OnInit {
	elapsedTime = 0;
	caller = '';
	isSpeaking = false;
	
	constructor(private phoneCallStagingService: PhoneCallStagingService) { }

	ngOnInit() {
		this.caller = this.phoneCallStagingService.from;
	}

	goBack() {
		
	}

}
