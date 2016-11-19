import { Injectable } from '@angular/core';
import { Conversation } from './domain/conversation';

const CONVERSATIONS: Conversation[] = [
  { id: '1', to: 'Osha', lastUpdatedTs: new Date().getTime(), createdBy: 'ofuangka', createdTs: new Date().getTime(), iconId: '1' },
  { id: '1', to: 'Tracy', lastUpdatedTs: new Date().getTime(), createdBy: 'ofuangka', createdTs: new Date().getTime(), iconId: '1' },
  { id: '1', to: 'Kristina', lastUpdatedTs: new Date().getTime(), createdBy: 'ofuangka', createdTs: new Date().getTime(), iconId: '1' },
  { id: '1', to: 'Sam', lastUpdatedTs: new Date().getTime(), createdBy: 'ofuangka', createdTs: new Date().getTime(), iconId: '1' },
  { id: '1', to: 'Chris', lastUpdatedTs: new Date().getTime(), createdBy: 'ofuangka', createdTs: new Date().getTime(), iconId: '1' },
  { id: '1', to: 'Jim', lastUpdatedTs: new Date().getTime(), createdBy: 'ofuangka', createdTs: new Date().getTime(), iconId: '1' }
];

@Injectable()
export class ConversationService {

	constructor() { }

	list(): Promise<Conversation[]> {
		return new Promise<Conversation[]>((resolve, reject) => {
			resolve(CONVERSATIONS);
		});
	}

}
