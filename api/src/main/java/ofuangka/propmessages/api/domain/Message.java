package ofuangka.propmessages.api.domain;

import java.util.Date;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import ofuangka.propmessages.api.support.HasId;

public class Message extends HasId {

	@NotNull
	@NotBlank
	private String conversationId;
	private String createdBy;
	private Date createdTs;
	private Date ts;
	
	@NotNull
	@NotBlank
	@Length(min = 1, max = 160)
	private String content;
	private boolean outbound;
	private Date lastUpdatedTs;

	public String getConversationId() {
		return conversationId;
	}

	public void setConversationId(String conversationId) {
		this.conversationId = conversationId;
	}
	
	public String getCreatedBy() {
		return createdBy;
	}
	
	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public Date getCreatedTs() {
		return createdTs;
	}

	public void setCreatedTs(Date createdTs) {
		this.createdTs = createdTs;
	}

	public Date getTs() {
		return ts;
	}

	public void setTs(Date ts) {
		this.ts = ts;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public boolean isOutbound() {
		return outbound;
	}

	public void setOutbound(boolean outbound) {
		this.outbound = outbound;
	}
	
	public Date getLastUpdatedTs() {
		return lastUpdatedTs;
	}
	
	public void setLastUpdatedTs(Date lastUpdatedTs) {
		this.lastUpdatedTs = lastUpdatedTs;
	}

}
