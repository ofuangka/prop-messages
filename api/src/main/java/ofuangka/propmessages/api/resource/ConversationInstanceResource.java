package ofuangka.propmessages.api.resource;

import javax.inject.Inject;
import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.PUT;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import ofuangka.propmessages.api.domain.Conversation;
import ofuangka.propmessages.api.service.SecureConversationService;

@Consumes({ MediaType.APPLICATION_JSON })
@Produces({ MediaType.APPLICATION_JSON })
public class ConversationInstanceResource {

	@Inject
	private SecureConversationService secureConversationService;

	@GET
	public Conversation read(@PathParam("conversationId") final String conversationId) {
		Conversation ret = secureConversationService.tryRead(conversationId);
		if (ret == null) {
			throw new NotFoundException();
		}
		return ret;
	}

	@PUT
	public Conversation update(@Valid Conversation conversation) {
		Conversation ret = secureConversationService.tryUpdate(conversation);
		if (ret == null) {
			throw new NotFoundException();
		}
		return ret;
	}
}
