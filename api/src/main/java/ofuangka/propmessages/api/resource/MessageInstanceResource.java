package ofuangka.propmessages.api.resource;

import javax.inject.Inject;
import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.PUT;
import javax.ws.rs.core.MediaType;

import ofuangka.propmessages.api.domain.Message;
import ofuangka.propmessages.api.service.SecureMessageService;

@Consumes({ MediaType.APPLICATION_JSON })
public class MessageInstanceResource {

	@Inject
	private SecureMessageService secureMessageService;

	@PUT
	public Message update(@Valid Message message) {
		Message ret = secureMessageService.tryUpdate(message);
		if (ret == null) {
			throw new NotFoundException();
		}
		return ret;
	}

}
