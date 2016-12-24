import { Component, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'callout',
  template: '<canvas #calloutCanvas width="10" height="5"></canvas>',
  styleUrls: ['./callout.component.css']
})
export class CalloutComponent implements AfterViewInit {

	@ViewChild('calloutCanvas')
	canvas: ElementRef;

  @Input()
  left: boolean;

  @Input()
  color: string;

  constructor() { }

	ngAfterViewInit() {
		let context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d')
	}

}
