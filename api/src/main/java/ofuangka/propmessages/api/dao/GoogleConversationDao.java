package ofuangka.propmessages.api.dao;

import java.util.Date;
import java.util.List;

import javax.inject.Named;

import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.FilterPredicate;

import ofuangka.propmessages.api.domain.Conversation;
import ofuangka.propmessages.api.support.GoogleDatastoreDao;
import ofuangka.propmessages.api.support.GoogleDatastoreEntityMapper;

@Named
public class GoogleConversationDao extends GoogleDatastoreDao<Conversation> implements ConversationDao {

	private static final String KIND_CONVERSATION = "Conversation";
	private static final String KEY_CREATED_TS = "createdTs";
	private static final String KEY_TO = "to";
	private static final String KEY_CREATED_BY = "createdBy";
	private static final String KEY_ICON_ID = "iconId";
	private static final String KEY_LAST_UPDATED_TS = "lastUpdatedTs";

	private static GoogleDatastoreEntityMapper<Conversation> mapper = new GoogleDatastoreEntityMapper<Conversation>() {

		@Override
		public Conversation map(Entity e) {
			Conversation ret = new Conversation();
			ret.setId(KeyFactory.keyToString(e.getKey()));
			ret.setCreatedTs((Date) e.getProperty(KEY_CREATED_TS));
			ret.setTo((String) e.getProperty(KEY_TO));
			ret.setCreatedBy((String) e.getProperty(KEY_CREATED_BY));
			ret.setIconId((String) e.getProperty(KEY_ICON_ID));
			ret.setLastUpdatedTs((Date) e.getProperty(KEY_LAST_UPDATED_TS));
			return ret;
		}

		@Override
		public void map(Conversation from, Entity to) {
			to.setProperty(KEY_CREATED_TS, from.getCreatedTs());
			to.setProperty(KEY_TO, from.getTo());
			to.setProperty(KEY_CREATED_BY, from.getCreatedBy());
			to.setProperty(KEY_ICON_ID, from.getIconId());
			to.setProperty(KEY_LAST_UPDATED_TS, from.getLastUpdatedTs());
		}

	};

	@Override
	public List<Conversation> getByUserId(String userId) {
		Query q = new Query(KIND_CONVERSATION);
		q.setFilter(new FilterPredicate(KEY_CREATED_BY, FilterOperator.EQUAL, userId));
		return mapper.map(getDatastore().prepare(q).asIterable());
	}

	@Override
	protected GoogleDatastoreEntityMapper<Conversation> getMapper() {
		return mapper;
	}

	@Override
	protected String getKind() {
		return KIND_CONVERSATION;
	}

}
