export class Message {
    id?: string;
    conversationId: string;
    createdBy?: string;
    createdTs?: number;
    ts?: number;
    content: string;
    outbound: boolean;
    lastUpdatedTs?: number;
}