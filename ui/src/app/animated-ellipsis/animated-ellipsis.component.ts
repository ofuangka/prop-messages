import { Component, OnInit, OnDestroy, trigger, state, style, transition, animate } from '@angular/core';

@Component({
	selector: 'animated-ellipsis',
	templateUrl: './animated-ellipsis.component.html',
	styleUrls: ['./animated-ellipsis.component.css'],
	animations: [
		trigger('activeState', [
			state('inactive', style({
				backgroundColor: 'rgb(190, 190, 196)'
			})),
			state('active', style({
			    backgroundColor: 'rgb(155, 155, 160)'
			})),
			transition('inactive <=> active', animate('300ms'))
		])
	]
})
export class AnimatedEllipsisComponent implements OnInit, OnDestroy {

	active = 0;
	intervalMs = 300;
	intervalId: NodeJS.Timer;

	constructor() { }

	ngOnInit() {
		this.intervalId = setInterval(() => this.active = (this.active + 1) % 3, this.intervalMs);
	}

	ngOnDestroy() {
		clearInterval(this.intervalId);
	}



}
