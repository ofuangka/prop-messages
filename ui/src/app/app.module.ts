import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { PropMessagesComponent } from './prop-messages.component';
import { ConversationListComponent } from './conversation-list/conversation-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ConversationService } from './conversation.service';
import { AppRoutingModule } from './app-routing.module';
import { FriendlyDatePipe } from './friendly-date.pipe';
import { DatePipe, SlicePipe } from '@angular/common';
import { AnonymousComponent } from './anonymous/anonymous.component';
import { EllipsisPipe } from './ellipsis.pipe';
import { MessageService } from './message.service';
import { MessageGroupService } from './message-group.service';
import { WhomPipe } from './whom.pipe';
import { ArrowComponent } from './arrow/arrow.component';
import { BeforePipe } from './before.pipe';

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
    MessagesComponent,
    FriendlyDatePipe,
    AnonymousComponent,
    EllipsisPipe,
    WhomPipe,
    ArrowComponent,
    BeforePipe
  ],
  providers: [ConversationService, DatePipe, SlicePipe, MessageService, MessageGroupService],
  bootstrap: [PropMessagesComponent]
})
export class AppModule { }
