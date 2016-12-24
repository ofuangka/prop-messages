import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ConversationService } from '../conversation.service';
import { Conversation } from '../domain/conversation';
import { MessageService } from '../message.service';
import { Message } from '../domain/message';

const FIVE_MINUTES_MS = 5 * 60 * 1000;

@Component({
	selector: 'prop-messages-messages',
	templateUrl: './messages.component.html',
	styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
	showConversationSettings = false;
	conversation: Conversation;
	playbackIndex = -1;
	selectedMessage: Message = null;
	groupThreshold = FIVE_MINUTES_MS;
	realMessages: Message[] = [];
	messages: Message[] = [];
	isReceivingMessage = false;
	minKeyMs = 100;
	maxKeyMs = 200;
	minReadMessageMs = 1000;
	maxReadMessageMs = 2000;
	constructor(
		private messageService: MessageService,
		private route: ActivatedRoute,
		private conversationService: ConversationService,
	) { }

	ngOnInit() {
		this.route.params.forEach((params: Params) => {
			let conversationId = params['conversationId'];
			this.conversationService.get(conversationId).then(conversation => this.conversation = conversation);
			this.messageService.list(conversationId).then(messages => {

				/* the component should always start out in recording mode 
				with no temporary messages, which is how we initialize it here */

				/* sort the incoming messages by date */
				this.realMessages = messages.sort((a, b) => a.createdTs - b.createdTs);

				/* generate the messages array */
				this.messages = [].concat(this.realMessages);
			});
		});
	}

	/**
	 * toggleOutbound toggles a message's outbound property. it only works on real messages
	 */
	toggleOutbound(message: Message) {
		if (this.isRealMessage(message)) {
			this.messageService.update(Object.assign({}, message, { outbound: !(message.outbound) })).then(updatedMessage => {
				message.outbound = updatedMessage.outbound;
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
			this.playbackIndex = this.findRealMessage(message);
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
			this.messageService.delete(message).then(() => {
				this.realMessages.splice(index, 1);
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
			this.playbackIndex = -1;
			this.messages = [].concat(this.realMessages);
			this.selectedMessage = null;
		}
	}

	sendMessage(messageContent) {

		if (this.isRecording()) {
			this.messageService.create(messageContent, this.conversation.id, true).then(message => {
				this.realMessages.push(message);
				this.messages.push(message);
			});
		} else {
			/* we're in playback mode */
			this.messages.splice(++this.playbackIndex, 1, { conversationId: this.conversation.id, content: messageContent, outbound: true });
			this.playback();
		}
	}

	findRealMessage(message): number {
		return this.realMessages.indexOf(message);
	}

	isRecording(): boolean {
		return this.playbackIndex === -1;
	}

	isPlayback(): boolean {
		return this.playbackIndex !== -1;
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
				setTimeout(() => {
					this.isReceivingMessage = true;
					setTimeout(() => {
						this.messages.push(nextMessage);
						this.isReceivingMessage = false;
						this.playbackIndex++;
						this.playback();
					}, this.randomWaitTime(this.minKeyMs, this.maxKeyMs) * nextMessage.content.length);
				}, this.randomWaitTime(this.minReadMessageMs, this.maxReadMessageMs));
			}
		}
	}

	randomWaitTime(minMs: number, maxMs: number): number {
		return Math.max(Math.random() * maxMs, minMs);
	}

}
