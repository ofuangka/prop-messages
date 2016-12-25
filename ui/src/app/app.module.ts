import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { PropMessagesComponent } from './prop-messages.component';
import { ConversationListComponent } from './conversation-list/conversation-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ConversationService } from './conversation.service';
import { AppRoutingModule } from './app-routing.module';
import { DatePipe, SlicePipe } from '@angular/common';
import { AnonymousComponent } from './anonymous/anonymous.component';
import { MessageService } from './message.service';
import { ArrowComponent } from './arrow/arrow.component';
import { CalloutComponent } from './callout/callout.component';

import { BeforePipe, EllipsisPipe, FriendlyDatePipe, WhomPipe, InitialsPipe } from './pipes';


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
		BeforePipe,
		CalloutComponent,
		InitialsPipe
	],
	providers: [ConversationService, DatePipe, SlicePipe, MessageService],
	bootstrap: [PropMessagesComponent]
})
export class AppModule { }
