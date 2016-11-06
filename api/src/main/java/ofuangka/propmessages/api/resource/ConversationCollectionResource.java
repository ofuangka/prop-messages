package ofuangka.propmessages.api.resource;

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
import ofuangka.propmessages.api.service.SecureConversationService;

@Consumes({ MediaType.APPLICATION_JSON })
@Produces({ MediaType.APPLICATION_JSON })
public class ConversationCollectionResource {

	@Inject
	private SecureConversationService secureConversationService;

	@Context
	private ResourceContext context;

	@GET
	public List<Conversation> list(@QueryParam("own") boolean isOwn) {
		if (isOwn) {
			return secureConversationService.getOwn();
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
