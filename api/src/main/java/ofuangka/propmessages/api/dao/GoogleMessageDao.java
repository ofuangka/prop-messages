package ofuangka.propmessages.api.dao;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.inject.Named;

import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.CompositeFilterOperator;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.FilterPredicate;

import ofuangka.propmessages.api.domain.Message;
import ofuangka.propmessages.api.support.GoogleDatastoreDao;
import ofuangka.propmessages.api.support.GoogleDatastoreEntityMapper;

@Named
public class GoogleMessageDao extends GoogleDatastoreDao<Message> implements MessageDao {

	private static final String KIND_MESSAGE = "Message";
	private static final String KEY_CONTENT = "content";
	private static final String KEY_CONVERSATION_ID = "conversationId";
	private static final String KEY_CREATED_BY = "createdBy";
	private static final String KEY_CREATED_TS = "createdTs";
	private static final String KEY_OUTBOUND = "outbound";
	private static final String KEY_TS = "ts";
	private static final String KEY_LAST_UPDATED_TS = "lastUpdatedTs";

	private static final GoogleDatastoreEntityMapper<Message> mapper = new GoogleDatastoreEntityMapper<Message>() {

		@Override
		public Message map(Entity e) {
			Message ret = new Message();
			ret.setId(KeyFactory.keyToString(e.getKey()));
			ret.setContent((String) e.getProperty(KEY_CONTENT));
			ret.setConversationId((String) e.getProperty(KEY_CONVERSATION_ID));
			ret.setCreatedBy((String) e.getProperty(KEY_CREATED_BY));
			ret.setCreatedTs((Date) e.getProperty(KEY_CREATED_TS));
			ret.setOutbound((boolean) e.getProperty(KEY_OUTBOUND));
			ret.setTs((Date) e.getProperty(KEY_TS));
			ret.setLastUpdatedTs((Date) e.getProperty(KEY_LAST_UPDATED_TS));
			return ret;
		}

		@Override
		public void map(Message from, Entity to) {
			to.setProperty(KEY_CONTENT, from.getContent());
			to.setProperty(KEY_CONVERSATION_ID, from.getConversationId());
			to.setProperty(KEY_CREATED_BY, from.getCreatedBy());
			to.setProperty(KEY_CREATED_TS, from.getCreatedTs());
			to.setProperty(KEY_OUTBOUND, from.isOutbound());
			to.setProperty(KEY_TS, from.getTs());
			to.setProperty(KEY_LAST_UPDATED_TS, from.getLastUpdatedTs());
		}

	};

	@Override
	public List<Message> getByConversationIdAndUserId(String conversationId, String userId) {
		Query q = new Query(KIND_MESSAGE);
		q.setFilter(CompositeFilterOperator.and(
				new FilterPredicate(KEY_CONVERSATION_ID, FilterOperator.EQUAL, conversationId),
				new FilterPredicate(KEY_CREATED_BY, FilterOperator.EQUAL, userId)));
		return mapper.map(getDatastore().prepare(q).asIterable());
	}

	@Override
	protected GoogleDatastoreEntityMapper<Message> getMapper() {
		return mapper;
	}

	@Override
	protected String getKind() {
		return KIND_MESSAGE;
	}

	@Override
	public void delete(List<String> messageIds) {
		List<Key> keys = new ArrayList<Key>();
		for (String messageId : messageIds) {
			keys.add(KeyFactory.stringToKey(messageId));
		}
		getDatastore().delete(keys);
	}

}
