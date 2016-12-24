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
			this.conversations = conversations;
			this.showConversationListLoading = false;
		});
	}

	getIconHref(iconId: string) {
		return iconId;
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
