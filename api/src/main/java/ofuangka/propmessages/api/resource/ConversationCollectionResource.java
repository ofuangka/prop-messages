package ofuangka.propmessages.api.resource;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import javax.inject.Inject;
import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.container.ResourceContext;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import ofuangka.propmessages.api.domain.Conversation;
import ofuangka.propmessages.api.domain.Message;
import ofuangka.propmessages.api.service.SecureConversationService;
import ofuangka.propmessages.api.service.SecureMessageService;

@Consumes({ MediaType.APPLICATION_JSON })
@Produces({ MediaType.APPLICATION_JSON })
public class ConversationCollectionResource {

	@Inject
	private SecureConversationService secureConversationService;

	@Inject
	private SecureMessageService secureMessageService;

	@Context
	private ResourceContext context;

	@GET
	public List<Conversation> list(@QueryParam("own") boolean isOwn) {
		if (isOwn) {
			List<Conversation> ret = secureConversationService.getOwn();
			for (Conversation conversation : ret) {
				List<Message> messages = secureMessageService.getByConversationId(conversation.getId());
				if (!messages.isEmpty()) {
					Collections.sort(messages, new Comparator<Message>() {

						@Override
						public int compare(Message m1, Message m2) {
							return (int) (m1.getCreatedTs().getTime() - m2.getCreatedTs().getTime());
						}
					});
					conversation.setSummary(messages.get(messages.size() - 1).getContent());
				}
			}
			return ret;
		} else {
			throw new UnsupportedOperationException("Can only request own conversations");
		}
	}

	@POST
	public Conversation create(@Valid Conversation conversation) {
		return secureConversationService.create(conversation);
	}

	@Path("/{conversationId}")
	public ConversationInstanceResource getConversationInstanceResource() {
		return context.getResource(ConversationInstanceResource.class);
	}

}
