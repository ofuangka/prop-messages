package ofuangka.propmessages.api.security;

public interface SecurityService {

	String getUserId();

	String getUsername();

	String getLogoutUrl(String afterUrl);
}
