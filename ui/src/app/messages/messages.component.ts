import { Component, OnInit } from '@angular/core';
import { MessageGroupService } from '../message-group.service';
import { MessageGroup } from '../domain/message-group';
import { ActivatedRoute, Params } from '@angular/router';
import { ConversationService } from '../conversation.service';
import { Conversation } from '../domain/conversation';


@Component({
	selector: 'prop-messages-messages',
	templateUrl: './messages.component.html',
	styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
	showConversationSettings = false;
	conversation: Conversation;
	messageGroups: MessageGroup[] = [];

	constructor(
		private messageGroupService: MessageGroupService,
		private route: ActivatedRoute,
		private conversationService: ConversationService
	) { }

	ngOnInit() {
		this.route.params.forEach((params: Params) => {
			let conversationId = params['conversationId'];
			this.conversationService.get(conversationId).then((conversation) => this.conversation = conversation);
			this.messageGroupService.list(conversationId).then((messageGroups) => this.messageGroups = messageGroups);
		});
	}

}
