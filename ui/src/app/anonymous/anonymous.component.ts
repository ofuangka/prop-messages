import { Component, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';

const DEFAULT_SIZE = 50;

@Component({
	selector: 'anonymous',
	template: '<div #canvas [attr.width]="size" [attr.height]="size">{{ initials }}</div>',
	styleUrls: ['./anonymous.component.css']
})
export class AnonymousComponent implements AfterViewInit {

	@ViewChild("canvas")
	canvas: ElementRef;

	@Input()
	size = DEFAULT_SIZE;

	@Input()
	initials: string;

	constructor(private element: ElementRef) { }

	ngAfterViewInit() {
		this.canvas.nativeElement.style.height = this.canvas.nativeElement.style.width = this.size + 'px';
	}

}
