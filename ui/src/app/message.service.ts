import { Injectable } from '@angular/core';
import { Message } from './domain/message';

const TODAY = new Date();
const MESSAGES: Message[] = [
  { id: '1', conversationId: '1', createdBy: 'ofuangka', createdTs: TODAY.getTime(), ts: TODAY.getTime(), content: 'This is a test message', outbound: true, lastUpdatedTs: TODAY.getTime() },
  { id: '1', conversationId: '1', createdBy: 'ofuangka', createdTs: TODAY.getTime(), ts: TODAY.getTime(), content: 'This is another message', outbound: false, lastUpdatedTs: TODAY.getTime() }
];

@Injectable()
export class MessageService {

  constructor() { }

  list(conversationId: string): Promise<Message[]> {
    return new Promise((resolve, reject) => resolve(MESSAGES));
  }

}
