import { Component, AfterViewInit, Input, ElementRef, ViewChild } from '@angular/core';

const DEFAULT_WIDTH = 5,
	DEFAULT_HEIGHT = 10,
	DEFAULT_THICKNESS = 2,
	DEFAULT_PADDING = 1,
	DEFAULT_COLOR = '#999999';

@Component({
	selector: 'arrow',
	template: '<canvas #arrowCanvas [attr.width]="width" [attr.height]="height"></canvas>',
	styleUrls: ['./arrow.component.css']
})
export class ArrowComponent implements AfterViewInit {

	@ViewChild('arrowCanvas')
	canvas: ElementRef;

	@Input()
	left = false;

	@Input()
	padding = DEFAULT_PADDING;

	@Input()
	width = DEFAULT_WIDTH;

	@Input()
	height = DEFAULT_HEIGHT;

	@Input()
	thickness = DEFAULT_THICKNESS;

	@Input()
	color = DEFAULT_COLOR;

	constructor() { }

	ngAfterViewInit() {
		let context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d'),
			startX = (this.left) ? this.width - this.padding : this.padding,
			endX = (this.left) ? this.padding : this.width - this.padding,
			centerY = (this.height - this.padding) / 2;
		context.beginPath();
		context.moveTo(startX, this.padding);
		context.lineTo(endX, centerY);
		context.lineTo(startX, this.height - this.padding);
		context.lineWidth = this.thickness;
		context.strokeStyle = this.color;
		context.stroke();
	}
}
