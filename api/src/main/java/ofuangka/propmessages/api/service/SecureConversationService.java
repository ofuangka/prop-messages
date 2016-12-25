package ofuangka.propmessages.api.service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.commons.codec.binary.StringUtils;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.collections4.Predicate;

import ofuangka.propmessages.api.dao.ConversationDao;
import ofuangka.propmessages.api.dao.MessageDao;
import ofuangka.propmessages.api.domain.Conversation;
import ofuangka.propmessages.api.domain.Message;
import ofuangka.propmessages.api.security.SecurityService;

/**
 * Checks if the user has access to view a {@link Conversation} during reads
 * 
 * @author ofuangka
 *
 */
@Named
public class SecureConversationService {

	@Inject
	private ConversationDao conversationDao;

	@Inject
	private MessageDao messageDao;

	@Inject
	private SecurityService securityService;

	/**
	 * Returns a {@link Conversation} if it exists and the user has access to
	 * view it. Otherwise returns null
	 * 
	 * @param conversationId
	 * @return
	 */
	public Conversation tryRead(final String conversationId) {
		List<Conversation> userConversations = conversationDao.getByUserId(securityService.getUserId());
		CollectionUtils.filter(userConversations, new Predicate<Conversation>() {

			@Override
			public boolean evaluate(Conversation c) {
				return StringUtils.equals(conversationId, c.getId());
			}
		});
		return (userConversations.isEmpty()) ? null : userConversations.get(0);
	}

	public boolean userCanView(String conversationId) {
		return tryRead(conversationId) != null;
	}

	/**
	 * Attempts to update the {@link Conversation} without changing secure
	 * properties, making sure the user has the appropriate access
	 * 
	 * @param conversation
	 * @return The updated conversation, or null if the user does not have
	 *         access or the {@link Conversation} does not exist
	 */
	public Conversation tryUpdate(Conversation conversation) {
		Conversation toUpdate = tryRead(conversation.getId());
		if (toUpdate != null) {
			Date now = Calendar.getInstance().getTime();

			/* only update writable properties */
			toUpdate.setIconId(conversation.getIconId());
			toUpdate.setTo(conversation.getTo());
			toUpdate.setProtocol(conversation.getProtocol());
			toUpdate.setLastUpdatedTs(now);
		}
		return toUpdate;
	}

	/**
	 * Returns the {@link List} of {@link Conversation} that the user owns
	 * 
	 * @return
	 */
	public List<Conversation> getOwn() {
		return conversationDao.getByUserId(securityService.getUserId());
	}

	/**
	 * Creates the {@link Conversation}, overriding any secure properties
	 * 
	 * @param conversation
	 * @return
	 */
	public Conversation create(Conversation conversation) {
		Date now = Calendar.getInstance().getTime();
		conversation.setCreatedBy(securityService.getUserId());
		conversation.setCreatedTs(now);
		conversation.setLastUpdatedTs(now);
		return conversationDao.create(conversation);
	}

	public Conversation tryDelete(String conversationId) {
		Conversation candidate = conversationDao.get(conversationId);
		if (candidate != null) {
			String userId = securityService.getUserId();
			if (StringUtils.equals(userId, candidate.getCreatedBy())) {
				List<Message> messages = messageDao.getByConversationIdAndUserId(conversationId, userId);
				for (Message message : messages) {
					messageDao.delete(message.getId());
				}
				return conversationDao.delete(conversationId);
			} else {
				throw new SecurityException();
			}
		}
		return null;
	}

}
