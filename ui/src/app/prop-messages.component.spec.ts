/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { PropMessagesComponent } from './prop-messages.component';

describe('App: Ui', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				PropMessagesComponent
			],
		});
	});

	it('should create the app', async(() => {
		let fixture = TestBed.createComponent(PropMessagesComponent);
		let app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	}));
});
