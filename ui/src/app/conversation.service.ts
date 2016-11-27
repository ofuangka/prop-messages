import { Injectable } from '@angular/core';
import { Conversation } from './domain/conversation';

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
  { id: '1', to: 'Osha, Tracy, Kristina, Sam, Chris, Jim', lastUpdatedTs: TODAY.getTime(), createdBy: 'ofuangka', createdTs: TODAY.getTime() },
  { id: '1', to: 'Tracy', lastUpdatedTs: YESTERDAY.getTime(), createdBy: 'ofuangka', createdTs: TODAY.getTime() },
  { id: '1', to: 'Kristina', lastUpdatedTs: THREE_DAYS_AGO.getTime(), createdBy: 'ofuangka', createdTs: TODAY.getTime() },
  { id: '1', to: 'Sam', lastUpdatedTs: LAST_WEEK.getTime(), createdBy: 'ofuangka', createdTs: TODAY.getTime() },
  { id: '1', to: 'Chris', lastUpdatedTs: LAST_MONTH.getTime(), createdBy: 'ofuangka', createdTs: TODAY.getTime() },
  { id: '1', to: 'Jim', lastUpdatedTs: LAST_YEAR.getTime(), createdBy: 'ofuangka', createdTs: TODAY.getTime() }
];

@Injectable()
export class ConversationService {

  constructor() { }

  list(): Promise<Conversation[]> {
    return new Promise<Conversation[]>((resolve, reject) => {
      resolve(CONVERSATIONS);
    });
  }

  get(conversationId: string): Promise<Conversation> {
    return new Promise<Conversation>((resolve, reject) => resolve(CONVERSATIONS[0]));
  }

}
