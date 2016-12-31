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
	isLoading = true;
	showNewConversation = false;
	isSavingConversation = false;
	conversationsToDelete: Conversation[] = [];
	conversations: Conversation[];
	isEditing = false;

	constructor(private conversationService: ConversationService, private router: Router) { }

	ngOnInit() {
		this.conversationService.list().then((conversations) => {
			this.conversations = conversations.sort((a, b) => b.lastUpdatedTs - a.lastUpdatedTs);
			this.isLoading = false;
		});
	}

	getIconHref(iconId: string) {
		return iconId;
	}

	goToMessages(conversation: Conversation) {
		this.router.navigate(['/conversations', conversation.id]);
	}

	saveConversation(to, imessage) {
		this.isSavingConversation = true;
		this.conversationService.create(to, (imessage ? 'imessage' : 'sms')).then(conversation => {
			this.isSavingConversation = false;
			this.router.navigate(['/conversations', conversation.id]);
		}, error => {
			this.isSavingConversation = false;
			this.showErrorMessage(error.message);
		});
	}

	delete(conversation: Conversation) {
		this.conversationsToDelete.push(conversation);
		this.conversationService.delete(conversation).then(() => {
			this.conversations.splice(this.conversations.indexOf(conversation), 1);
			this.conversationsToDelete.splice(this.conversationsToDelete.indexOf(conversation), 1);
		});
	}

	showErrorMessage(message) {
		// TODO: implement
	}

	isDeletingConversation(conversation: Conversation): boolean {
		return this.conversationsToDelete.indexOf(conversation) !== -1;
	}

}
