import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ConversationService } from '../conversation.service';
import { Conversation } from '../domain/conversation';
import { MessageService } from '../message.service';
import { Message } from '../domain/message';
import { PhoneCallStagingService } from '../phone-call-staging.service';

const DEFAULT_PHONE_DELAY_MS = 5000;

@Component({
	selector: 'prop-messages-messages',
	templateUrl: './messages.component.html',
	styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
	conversation: Conversation = { id: '', to: '', createdTs: 0, lastUpdatedTs: 0, createdBy: '', protocol: '' };
	playbackIndex = -2;
	selectedMessage: Message = null;
	realMessages: Message[] = [];
	messages: Message[] = [];
	isThinking = false;
	minKeyMs = 50;
	maxKeyMs = 150;
	minReadMessageMs = 500;
	maxReadMessageMs = 1000;
	editTo: string;
	editImessage: boolean;
	showEditConversation = false;
	isSavingConversation = false;
	isSendingDisabled = false;
	messagesToDelete: Message[] = [];
	messagesToMove: Message[] = [];
	isLoadingMessages: boolean;
	showPhoneConfirm = false;
	phoneDelayMs = DEFAULT_PHONE_DELAY_MS;

	constructor(
		private messageService: MessageService,
		private route: ActivatedRoute,
		private conversationService: ConversationService,
		private phoneCallStagingService: PhoneCallStagingService
	) { }

	ngOnInit() {
		this.route.params.forEach((params: Params) => {
			this.isLoadingMessages = true;
			let conversationId = params['conversationId'];
			this.conversationService.get(conversationId).then(conversation => this.conversation = conversation);
			this.messageService.list(conversationId).then(messages => {

				/* the component should always start out in recording mode 
				with no temporary messages, which is how we initialize it here */

				/* sort the incoming messages by date */
				this.realMessages = messages.sort((a, b) => a.createdTs - b.createdTs);

				/* generate the messages array */
				this.messages = [].concat(this.realMessages);

				this.isLoadingMessages = false;
			});
		});
	}

	/**
	 * toggleOutbound toggles a message's outbound property. it only works on real messages
	 */
	toggleOutbound(message: Message) {
		if (this.isRealMessage(message)) {
			this.messagesToMove.push(message);
			this.messageService.update(Object.assign({}, message, { outbound: !(message.outbound) })).then(updatedMessage => {
				message.outbound = updatedMessage.outbound;
				this.messagesToMove.splice(this.messagesToMove.indexOf(message), 1);
			});
		}
	}

	/**
	 * rewind causes the component to enter playback mode, setting the playbackIndex to point 
	 * to the message argument. you can only rewind if in recording mode
	 */
	rewind(message: Message) {

		/* rewind can only be called during recording mode */
		if (this.isRecording()) {
			this.playbackIndex = this.findRealMessage(message) - 1;
			this.selectedMessage = null;
			this.playback();
		}
	}

	deleteMessage(message: Message) {

		/* first we need to delete the message from the backing arrays */
		var index = this.findRealMessage(message), i;

		if (index !== -1) {

			/* we delete the message by calling the service. once that is successful, 
			we can delete it from memory */
			this.messagesToDelete.push(message);
			this.messageService.delete(message).then(() => {
				this.realMessages.splice(index, 1);
				this.messagesToDelete.splice(this.messagesToDelete.indexOf(message), 1);
			});
		}

		/* now we can delete the message from the shown messages */
		index = this.messages.indexOf(message);
		this.messages.splice(index, 1);

		if (this.isPlayback() && this.playbackIndex >= index) {
			this.playbackIndex--;
		}

		this.selectedMessage = null;
	}

	fastForward() {
		if (this.isPlayback()) {
			this.playbackIndex = -2;
			this.messages = [].concat(this.realMessages);
			this.selectedMessage = null;
		}
	}

	sendMessage(messageContent) {

		if (this.isRecording()) {
			this.isSendingDisabled = true;
			this.messageService.create(messageContent, this.conversation.id, true).then(message => {
				this.realMessages.push(message);
				this.messages.push(message);
				this.isSendingDisabled = false;
			});
		} else {
			/* we're in playback mode */
			this.playbackIndex++;
			this.playback();
		}
	}

	findRealMessage(message): number {
		return this.realMessages.indexOf(message);
	}

	isRecording(): boolean {
		return this.playbackIndex === -2;
	}

	isPlayback(): boolean {
		return this.playbackIndex !== -2;
	}

	isRealMessage(message): boolean {
		return this.findRealMessage(message) !== -1;
	}

	playback() {

		var nextMessage: Message;

		if (this.playbackIndex === this.realMessages.length - 1) {

			/* we're done playing back */
			this.fastForward();
		} else {
			nextMessage = this.realMessages[this.playbackIndex + 1];

			/* we want to play back the next message if it's incoming */
			if (nextMessage && !nextMessage.outbound) {
				this.isSendingDisabled = true;
				setTimeout(() => {
					this.isThinking = true;
					setTimeout(() => {
						this.messages.push(nextMessage);
						this.isThinking = false;
						this.playbackIndex++;
						this.playback();
					}, this.randomWaitTime(this.minKeyMs, this.maxKeyMs) * nextMessage.content.length);
				}, this.randomWaitTime(this.minReadMessageMs, this.maxReadMessageMs));
			} else {
				this.isSendingDisabled = false;
			}
		}
	}

	randomWaitTime(minMs: number, maxMs: number): number {
		return Math.max(Math.random() * maxMs, minMs);
	}

	saveConversation(to: string, useImessage: boolean) {
		this.isSavingConversation = true;
		this.conversationService.update(Object.assign({}, this.conversation, { to: this.editTo, protocol: this.editImessage ? 'imessage' : 'sms' })).then((conversation) => {
			this.conversation = conversation;
			this.showEditConversation = false;
			this.isSavingConversation = false;
		});
	}

	isDeletingMessage(message: Message): boolean {
		return this.messagesToDelete.indexOf(message) !== -1;
	}

	isMovingMessage(message: Message): boolean {
		return this.messagesToMove.indexOf(message) !== -1;
	}

	confirmPhoneCall() {
		this.phoneCallStagingService.stagePhoneCall(this.conversation, this.phoneDelayMs);
		this.showPhoneConfirm = false;
		this.showEditConversation = false;
	}

}
