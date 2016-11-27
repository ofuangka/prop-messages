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

	showCreateConversation = false;

	conversations: Conversation[];

	constructor(private conversationService: ConversationService, private router: Router) { }

	ngOnInit() {
		this.conversationService.list().then((conversations) => this.conversations = conversations);
	}

	getIconHref(iconId: string) {
		return iconId;
	}

	getSummary(conversation: Conversation) {
		return 'This is a long summary of a long conversation that may be very long and it will be too long to fit in a single line hopefully I hope that it will just end up working but it probably won\'t';
	}

	showMessages(conversation: Conversation) {
		this.router.navigate(['/conversations', conversation.id]);
	}

	saveConversation(to, imessage) {
		console.log(to);
		console.log(imessage);
	}

}
