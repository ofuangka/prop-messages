import { Component, AfterViewInit, Input, ElementRef, ViewChild } from '@angular/core';

const DEFAULT_WIDTH = 5,
	DEFAULT_HEIGHT = 10,
	DEFAULT_THICKNESS = 2,
	DEFAULT_COLOR = '#999999';

@Component({
	selector: 'arrow',
	template: '<canvas #arrowCanvas></canvas>',
	styleUrls: ['./arrow.component.css']
})
export class ArrowComponent implements AfterViewInit {

	@ViewChild('arrowCanvas')
	canvas: ElementRef;

	@Input()
	dir = "right";

	@Input()
	width = DEFAULT_WIDTH;

	@Input()
	height = DEFAULT_HEIGHT;

	@Input()
	thickness = DEFAULT_THICKNESS;

	@Input()
	color = DEFAULT_COLOR;

	constructor(private element: ElementRef) { }

	ngAfterViewInit() {
		var context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d'),
			numericWidth = Number(this.width),
			numericHeight = Number(this.height),
			numericThickness = Number(this.thickness),
			topLeft = [numericThickness, numericThickness],
			topRight = [numericThickness + numericWidth, numericThickness],
			bottomLeft = [numericThickness, numericThickness + numericHeight],
			bottomRight = [numericThickness + numericWidth, numericThickness + numericHeight],
			centerX = (numericWidth + 2 * numericThickness) / 2,
			centerY = (numericHeight + 2 * numericThickness) / 2,
			centerTop = [centerX, numericThickness],
			centerRight = [numericThickness + numericWidth, centerY],
			centerBottom = [centerX, numericThickness + numericHeight],
			centerLeft = [numericThickness, centerY],
			totalWidth = this.canvas.nativeElement.width = numericWidth + 2 * numericThickness,
			totalHeight = this.canvas.nativeElement.height = numericHeight + 2 * numericThickness;
		context.beginPath();
		switch (this.dir) {
			case 'up':
				context.moveTo(bottomLeft[0], bottomLeft[1]);
				context.lineTo(centerTop[0], centerTop[1]);
				context.lineTo(bottomRight[0], bottomRight[1]);
				break;
			case 'right':
				context.moveTo(topLeft[0], topLeft[1]);
				context.lineTo(centerRight[0], centerRight[1]);
				context.lineTo(bottomLeft[0], bottomLeft[1]);
				break;
			case 'bottom':
				context.moveTo(topLeft[0], topLeft[1]);
				context.lineTo(centerBottom[0], centerBottom[1]);
				context.lineTo(topRight[0], topRight[1]);
				break;
			case 'left':
				context.moveTo(topRight[0], topRight[1]);
				context.lineTo(centerLeft[0], centerLeft[1]);
				context.lineTo(bottomRight[0], bottomRight[1]);
				break;
		}
		context.lineWidth = this.thickness;
		context.strokeStyle = this.color;
		context.stroke();
	}
}
