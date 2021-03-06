import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Message } from './domain/message';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class MessageService {

	constructor(private http: Http) { }

	list(conversationId: string): Promise<Message[]> {
		return this.http.get(`/api/messages?cid=${conversationId}`).toPromise().then(response => response.json());
	}

	create(messageContent: string, conversationId: string, isOutbound: boolean): Promise<Message> {
		return this.http.post('/api/messages', { content: messageContent, conversationId: conversationId, outbound: isOutbound }).toPromise().then(response => response.json());
	}

	delete(message: Message): Promise<Message> {
		return this.http.delete(`/api/messages/${message.id}`).toPromise().then(response => response.json());
	}

	update(message: Message): Promise<Message> {
		return this.http.put(`/api/messages/${message.id}`, message).toPromise().then(response => response.json());
	}

}
