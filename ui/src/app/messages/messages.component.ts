import { Component, OnInit } from '@angular/core';
import { MessageGroupService } from '../message-group.service';
import { MessageGroup } from '../domain/message-group';
import { ActivatedRoute, Params } from '@angular/router';
import { ConversationService } from '../conversation.service';
import { Conversation } from '../domain/conversation';
import { MessageService } from '../message.service';
import { Message } from '../domain/message';

const FIVE_MINUTES_MS = 5 * 60 * 1000;

@Component({
	selector: 'prop-messages-messages',
	templateUrl: './messages.component.html',
	styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
	showConversationSettings = false;
	conversation: Conversation;
	messageGroups: MessageGroup[] = [];
	groupCursor = -1;
	messageCursor = -1;
	selectedMessage: Message = null;
	groupThreshold = FIVE_MINUTES_MS;

	constructor(
		private messageService: MessageService,
		private messageGroupService: MessageGroupService,
		private route: ActivatedRoute,
		private conversationService: ConversationService,
	) { }

	ngOnInit() {
		this.route.params.forEach((params: Params) => {
			let conversationId = params['conversationId'];
			this.conversationService.get(conversationId).then(conversation => this.conversation = conversation);
			this.messageService.list(conversationId).then(messages => this.messageGroups = this.messageGroupService.group(messages, this.groupThreshold));
		});
	}

	toggleOutbound(message: Message) {
		message.outbound = !(message.outbound);
	}

	rewind(message: Message) {
		var indexes = this.find(message);
		this.groupCursor = indexes[0];
		this.messageCursor = indexes[1];
	}

	deleteMessage(message: Message) {

		/* first, we delete the message by calling the service. once that is successful, 
		we can delete it from memory, making sure to clean up the cursors that may 
		need to be updated */
		this.messageService.delete(message).then(() => {

			/* get the original indexes for the deleted message */
			var indexes = this.find(message);

			/* remove the message from memory */
			this.messageGroups[indexes[0]].messages.splice(indexes[1], 1);

			/* the messageCursor might need to be updated if the groupCursor matches the deleted's group */
			if (this.groupCursor === indexes[0]) {
				if (this.messageCursor >= indexes[1]) {
					this.messageCursor--;
				}
			}

			/* clean up the group if there are no more messages in there */
			if (this.messageGroups[indexes[0]].messages.length === 0) {
				this.messageGroups.splice(indexes[0], 1);
				if (this.groupCursor >= indexes[0]) {
					this.groupCursor--;
				}
			}
		});
	}

	fastForward() {
		this.groupCursor = -1;
		this.messageCursor = -1;
	}

	save() {

	}

	sendMessage(messageContent) {

		this.messageService.create(messageContent, this.conversation.id).then(message => {
			var lastGroup, lastMessage, newGroup: MessageGroup = {
				ts: message.ts,
				messages: [message]
			};
			if (this.messageGroups && this.messageGroups.length > 0) {
				lastGroup = this.messageGroups[this.messageGroups.length - 1];
				lastMessage = lastGroup.messages[lastGroup.messages.length - 1];
				if (message.ts - lastMessage.ts > this.groupThreshold) {
					this.messageGroups.push(newGroup);
				} else {
					lastGroup.messages.push(message);
				}
			} else {
				this.messageGroups.push(newGroup);
			}
		});
	}

	find(message) {
		var i, j, notFound = [-1, -1];
		for (i = 0; i < this.messageGroups.length; i++) {
			for (j = 0; j < this.messageGroups[i].messages.length; j++) {
				if (message === this.messageGroups[i].messages[j]) {
					return [i, j];
				}
			}
		}
		return notFound;
	}

}
