import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Conversation } from './domain/conversation';

import 'rxjs/add/operator/toPromise';

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

	delete(conversation: Conversation): Promise<Conversation> {
		return this.http.delete(`/api/conversations/${conversation.id}`).toPromise().then((response) => response.json());
	}

	update(conversation: Conversation): Promise<Conversation> {
		return this.http.put(`/api/conversations/${conversation.id}`, conversation).toPromise().then((response) => response.json());
	}

}
