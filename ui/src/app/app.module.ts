import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { PropMessagesComponent } from './prop-messages.component';
import { ConversationListComponent } from './conversation-list/conversation-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ConversationService } from './conversation.service';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    PropMessagesComponent,
    ConversationListComponent,
    MessagesComponent
  ],
  providers: [ConversationService],
  bootstrap: [PropMessagesComponent]
})
export class AppModule { }
