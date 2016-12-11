package ofuangka.propmessages.api.resource;

import java.util.List;

import javax.inject.Inject;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.POST;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.container.ResourceContext;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import org.hibernate.validator.constraints.NotBlank;

import ofuangka.propmessages.api.domain.Message;
import ofuangka.propmessages.api.service.SecureMessageService;

@Consumes({ MediaType.APPLICATION_JSON })
@Produces({ MediaType.APPLICATION_JSON })
public class MessageCollectionResource {

	@Context
	private ResourceContext context;

	@Inject
	private SecureMessageService secureMessageService;

	@GET
	public List<Message> list(@NotBlank @NotNull @QueryParam("cid") String conversationId) {
		return secureMessageService.getByConversationId(conversationId);
	}

	@POST
	public Message create(@Valid Message message) {
		try {
			return secureMessageService.tryCreate(message);
		} catch (SecurityException e) {

			/*
			 * we don't want the users to know if the conversationId that they
			 * used exists or not
			 */
			throw new NotFoundException();
		}
	}

	public MessageInstanceResource getMessageInstanceResource() {
		return context.getResource(MessageInstanceResource.class);
	}

}
