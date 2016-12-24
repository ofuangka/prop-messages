import { Component, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';

const DEFAULT_SIZE = 50;

@Component({
  selector: 'anonymous',
  template: '<canvas #anonymousCanvas class="anonymous" [attr.width]="size" [attr.height]="size"></canvas>',
  styleUrls: ['./anonymous.component.css']
})
export class AnonymousComponent implements AfterViewInit {

  @ViewChild('anonymousCanvas')
  canvas: ElementRef;

  @Input()
  size = DEFAULT_SIZE;

  constructor() { }

  ngAfterViewInit() {
    let context = this.canvas.nativeElement.getContext('2d'),
      centerX = this.size / 2,
      centerY = this.size / 2,
      radius = centerX,
      grayGradient = context.createLinearGradient(0, 0, 0, this.size);
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    grayGradient.addColorStop(0, 'rgb(164, 170, 182)');
    grayGradient.addColorStop(1, 'rgb(132, 137, 148)');
    context.fillStyle = grayGradient;
    context.fill();
  }

}
