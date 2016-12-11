import { Injectable } from '@angular/core';
import { MessageGroup } from './domain/message-group';
import { Message } from './domain/message';

@Injectable()
export class MessageGroupService {

	group(messages: Message[], threshold: number): MessageGroup[] {
		var ret: MessageGroup[] = [], currGroup: MessageGroup, i: number;
		for (i = 0; i < messages.length; i++) {
			if (!currGroup || (messages[i].ts - currGroup.ts > threshold)) {
				currGroup = {
					ts: messages[i].ts,
					messages: [messages[i]]
				};
				ret.push(currGroup);
			} else {
				currGroup.messages.push(messages[i]);
			}
		}
		return ret;
	}

}
