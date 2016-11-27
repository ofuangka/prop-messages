import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { MessageGroup } from './domain/message-group';

@Injectable()
export class MessageGroupService {

  constructor(private messageService: MessageService) { }

  list(conversationId: string): Promise<MessageGroup[]> {
    return this.messageService.list(conversationId).then((messages) => [{
      ts: new Date().getTime(),
      messages: messages
    }]);
  }

}
