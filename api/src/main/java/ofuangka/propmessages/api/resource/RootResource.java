package ofuangka.propmessages.api.resource;

import javax.ws.rs.Path;
import javax.ws.rs.container.ResourceContext;
import javax.ws.rs.core.Context;

@Path("/")
public class RootResource {

	@Context
	private ResourceContext context;

	@Path("/conversations")
	public ConversationCollectionResource getConversationCollectionResource() {
		return context.getResource(ConversationCollectionResource.class);
	}

	@Path("/messages")
	public MessageCollectionResource getMessageCollectionResource() {
		return context.getResource(MessageCollectionResource.class);
	}

}
