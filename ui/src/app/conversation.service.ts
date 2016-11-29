import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Conversation } from './domain/conversation';

import 'rxjs/add/operator/toPromise';

const TODAY = new Date();
const YESTERDAY = new Date();
const THREE_DAYS_AGO = new Date();
const LAST_WEEK = new Date();
const LAST_MONTH = new Date();
const LAST_YEAR = new Date();
YESTERDAY.setDate(YESTERDAY.getDate() - 1);
THREE_DAYS_AGO.setDate(THREE_DAYS_AGO.getDate() - 3);
LAST_WEEK.setDate(LAST_WEEK.getDate() - 7);
LAST_MONTH.setMonth(LAST_MONTH.getMonth() - 1);
LAST_YEAR.setFullYear(LAST_YEAR.getFullYear() - 1);

const CONVERSATIONS: Conversation[] = [
	{ id: '1', to: 'Osha, Tracy, Kristina, Sam, Chris, Jim', lastUpdatedTs: TODAY.getTime(), createdBy: 'ofuangka', createdTs: TODAY.getTime(), protocol: 'imessage' },
	{ id: '1', to: 'Tracy', lastUpdatedTs: YESTERDAY.getTime(), createdBy: 'ofuangka', createdTs: TODAY.getTime(), protocol: 'sms' },
	{ id: '1', to: 'Kristina', lastUpdatedTs: THREE_DAYS_AGO.getTime(), createdBy: 'ofuangka', createdTs: TODAY.getTime(), protocol: 'imessage' },
	{ id: '1', to: 'Sam', lastUpdatedTs: LAST_WEEK.getTime(), createdBy: 'ofuangka', createdTs: TODAY.getTime(), protocol: 'sms' },
	{ id: '1', to: 'Chris', lastUpdatedTs: LAST_MONTH.getTime(), createdBy: 'ofuangka', createdTs: TODAY.getTime(), protocol: 'imessage' },
	{ id: '1', to: 'Jim', lastUpdatedTs: LAST_YEAR.getTime(), createdBy: 'ofuangka', createdTs: TODAY.getTime(), protocol: 'sms' }
];

@Injectable()
export class ConversationService {

	constructor(private http: Http) { }

	list(): Promise<Conversation[]> {
		return this.http.get('/api/conversations?own=true').toPromise().then((response) => response.json());
	}

	get(conversationId: string): Promise<Conversation> {
		return this.http.get(`/api/conversations/${conversationId}`).toPromise().then((response) => response.json());
	}

	create(to: string, protocol: string): Promise<Conversation> {
		return this.http.post('/api/conversations', { to: to, protocol: protocol }).toPromise().then((response) => response.json());
	}

}
