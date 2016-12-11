package ofuangka.propmessages.api.service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.commons.codec.binary.StringUtils;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.collections4.Predicate;

import ofuangka.propmessages.api.dao.MessageDao;
import ofuangka.propmessages.api.domain.Conversation;
import ofuangka.propmessages.api.domain.Message;
import ofuangka.propmessages.api.security.SecurityService;

@Named
public class SecureMessageService {

	@Inject
	private SecurityService securityService;

	@Inject
	private SecureConversationService secureConversationService;

	@Inject
	private MessageDao messageDao;

	/**
	 * Attempts to update the {@link Message}, which only succeeds if the user
	 * has access to it. Overrides any secure properties
	 * 
	 * @param message
	 * @return
	 */
	public Message tryUpdate(Message message) {

		/*
		 * we're trying not to bring any data back if the user doesn't have
		 * access to it, so we start with a filtered list and filter further
		 */
		List<Message> userMessages = messageDao.getByConversationIdAndUserId(message.getConversationId(),
				securityService.getUserId());
		final String messageId = message.getId();
		CollectionUtils.filter(userMessages, new Predicate<Message>() {

			@Override
			public boolean evaluate(Message userMessage) {
				return StringUtils.equals(messageId, userMessage.getId());
			}

		});

		if (!userMessages.isEmpty()) {

			/*
			 * if we've gotten here, it means the user has access to update the
			 * message
			 */
			Message toUpdate = userMessages.get(0);
			Date now = Calendar.getInstance().getTime();
			toUpdate.setContent(message.getContent());
			toUpdate.setOutbound(message.isOutbound());
			toUpdate.setTs(message.getTs());
			toUpdate.setLastUpdatedTs(now);
			return messageDao.update(toUpdate);
		}
		
		return null;
	}

	/**
	 * Attempts to create the {@link Message}, which succeeds only if the user
	 * has access to the {@link Conversation}. Overrides any secure properties
	 * 
	 * @param message
	 * @return
	 * @throws SecurityException
	 *             if the user does not have access to the {@link Conversation}
	 */
	public Message tryCreate(Message message) throws SecurityException {
		if (secureConversationService.userCanView(message.getConversationId())) {
			Date now = Calendar.getInstance().getTime();
			message.setCreatedBy(securityService.getUserId());
			message.setCreatedTs(now);
			return messageDao.create(message);
		} else {
			throw new SecurityException();
		}
	}

	/**
	 * Returns {@link List} of {@link Message} for the conversationId that the
	 * user is allowed to view
	 * 
	 * @param conversationId
	 * @return
	 */
	public List<Message> getByConversationId(String conversationId) {
		return messageDao.getByConversationIdAndUserId(conversationId, securityService.getUserId());
	}

}
