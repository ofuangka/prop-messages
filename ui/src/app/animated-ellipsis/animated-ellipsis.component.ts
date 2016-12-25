import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
	selector: 'animated-ellipsis',
	templateUrl: './animated-ellipsis.component.html',
	styleUrls: ['./animated-ellipsis.component.css']
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
