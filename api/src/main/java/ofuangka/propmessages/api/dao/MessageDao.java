package ofuangka.propmessages.api.dao;

import java.util.List;

import ofuangka.propmessages.api.domain.Message;

public interface MessageDao {
	List<Message> getByConversationIdAndUserId(String conversationId, String userId);
	Message create(Message m);
	Message update(Message m);
	Message delete(String messageId);
	Message get(String messageId);
	void delete(List<String> messageIds);
}
