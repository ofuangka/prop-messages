package ofuangka.propmessages.api.dao;

import java.util.List;

import ofuangka.propmessages.api.domain.Conversation;

public interface ConversationDao {

	Conversation get(String conversationId);
	List<Conversation> getByUserId(String userId);
	Conversation create(Conversation c);
	Conversation update(Conversation c);
}
