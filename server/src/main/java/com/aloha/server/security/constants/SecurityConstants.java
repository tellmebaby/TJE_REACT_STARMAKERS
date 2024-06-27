package com.aloha.server.security.constants;

public final class SecurityConstants {

	// 🔗 로그인 경로
	public static final String AUTH_LOGIN_URL = "/login";
	
	// 🎫 인증 요청 헤더 
	// Authorization : "Bearer " + 💍(JWT)
	public static final String TOKEN_HEADER = "Authorization";
	public static final String TOKEN_PREFIX = "Bearer ";
	public static final String TOKEN_TYPE = "JWT";
	
}
