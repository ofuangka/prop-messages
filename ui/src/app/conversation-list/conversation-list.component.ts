import { Component, OnInit } from '@angular/core';
import { Conversation } from '../domain/conversation';
import { ConversationService } from '../conversation.service';
import { Router } from '@angular/router';

@Component({
	selector: 'prop-messages-conversation-list',
	templateUrl: './conversation-list.component.html',
	styleUrls: ['./conversation-list.component.css']
})
export class ConversationListComponent implements OnInit {
	showConversationListLoading = true;
	showNewMessage = false;
	showNewMessageLoading = false;

	conversations: Conversation[];

	constructor(private conversationService: ConversationService, private router: Router) { }

	ngOnInit() {
		this.conversationService.list().then((conversations) => {
			console.log(conversations);
			this.conversations = conversations;
			this.showConversationListLoading = false;
		});
	}

	getIconHref(iconId: string) {
		return iconId;
	}

	getSummary(conversation: Conversation) {
		return 'This is a long summary of a long conversation that may be very long and it will be too long to fit in a single line hopefully I hope that it will just end up working but it probably won\'t';
	}

	showConversationDetail(conversation: Conversation) {
		this.router.navigate(['/conversations', conversation.id]);
	}

	saveNewMessage(to, imessage) {
		this.showNewMessageLoading = true;
		this.conversationService.create(to, (imessage ? 'imessage' : 'sms')).then(conversation => {
			this.showNewMessageLoading = false;
			this.router.navigate(['/conversations', conversation.id]);
		}, error => {
			this.showNewMessageLoading = false;
			this.showErrorMessage(error.message);
		});
	}

	showErrorMessage(message) {
		// TODO: implement
	}

}
