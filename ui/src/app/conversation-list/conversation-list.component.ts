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

  conversations: Conversation[];

  constructor(private conversationService: ConversationService, private router: Router) { }

  ngOnInit() {
    this.conversationService.list().then((conversations) => this.conversations = conversations);
  }

  showCreateConversation() {

  }

  getIconHref(iconId: string) {
    return iconId;
  }

  getSummary(conversation: Conversation) {
    return 'Hello, world!';
  }

  showMessages(conversation: Conversation) {
    this.router.navigate(['/conversations/:conversationId', conversation.id]);
  }

}
