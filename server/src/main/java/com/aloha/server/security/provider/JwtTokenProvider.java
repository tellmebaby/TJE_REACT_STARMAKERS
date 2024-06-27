package com.aloha.server.security.provider;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;


import com.aloha.server.security.constants.SecurityConstants;
import com.aloha.server.user.dto.CustomUser;
import com.aloha.server.user.dto.UserAuth;
import com.aloha.server.user.dto.Users;
import com.aloha.server.user.mapper.UserMapper;
import com.aloha.server.user.prop.JwtProps;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;


/**
 * 🔐 JWT 토큰 관련 기능을 제공해주는 클래스
 * ✅ 토큰 생성
 * ✅ 토큰 해석
 * ✅ 토큰 유효성 검사
 */
@Slf4j
@Component
public class JwtTokenProvider {


    @Autowired
    private JwtProps jwtProps;

    @Autowired
    private UserMapper userMapper;

    /*
     * 👩‍💼➡🔐 토큰 생성
     */
    public String createToken(int userNo, String userId, List<String> roles) {
        byte[] signingKey = getSigningKey();

        // JWT 토큰 생성
        String jwt = Jwts.builder()
                .signWith(Keys.hmacShaKeyFor(signingKey), Jwts.SIG.HS512)      // 서명에 사용할 키와 알고리즘 설정
                // .setHeaderParam("typ", SecurityConstants.TOKEN_TYPE)        // deprecated (version: before 1.0)
                .header()                                                      // update (version : after 1.0)
                    .add("typ", SecurityConstants.TOKEN_TYPE)              // 헤더 설정
                .and()
                .expiration(new Date(System.currentTimeMillis() + 864000000))  // 토큰 만료 시간 설정 (10일)
                .claim("uno", "" + userNo)                                // 클레임 설정: 사용자 번호
                .claim("uid", userId)                                     // 클레임 설정: 사용자 아이디
                .claim("rol", roles)                                      // 클레임 설정: 권한
                .compact();      

        log.info("jwt : " + jwt);

        return jwt;
    }


    /**
     * 🔐➡👩‍💼 토큰 해석
     * 
     * Authorization : Bearer + {jwt}  (authHeader)
     * ➡ jwt 추출 
     * ➡ UsernamePasswordAuthenticationToken
     * @param authHeader
     * @return
     * @throws Exception
     */
    public UsernamePasswordAuthenticationToken getAuthentication(String authHeader) {
        if(authHeader == null || authHeader.length() == 0 ) 
            return null;

        try {
            
            // jwt 추출 
            String jwt = authHeader.replace("Bearer ", "");

            // 🔐➡👩‍💼 JWT 파싱
            Jws<Claims> parsedToken = Jwts.parser()
                                            .verifyWith(getShaKey())
                                            .build()
                                            .parseSignedClaims(jwt);    

            log.info("parsedToken : " + parsedToken);

            // 인증된 사용자 번호
            String userNo = parsedToken.getPayload().get("uno").toString();
            int no = ( userNo == null ? 0 : Integer.parseInt(userNo) );
            log.info("userNo : " + userNo);

            // 인증된 사용자 아이디
            String userId = parsedToken.getPayload().get("uid").toString();
            log.info("userId : " + userId);

            // 인증된 사용자 권한
            Claims claims = parsedToken.getPayload();
            Object roles = claims.get("rol");
            log.info("roles : " + roles);


            // 토큰에 userId 있는지 확인
            if( userId == null || userId.length() == 0 )
                return null;


            Users user = new Users();
            user.setUserNo(no);
            user.setEmail(userId);
            // OK: 권한도 바로 Users 객체에 담아보기
            List<UserAuth> authList = ((List<?>) roles )
                                            .stream()
                                            .map(auth -> new UserAuth(userId, auth.toString()) )
                                            .collect( Collectors.toList() );
            user.setAuthList(authList);

            // OK
            // CustomeUser 에 권한 담기
            List<SimpleGrantedAuthority> authorities = ((List<?>) roles )
                                                        .stream()
                                                        .map(auth -> new SimpleGrantedAuthority( (String) auth ))
                                                        .collect( Collectors.toList() );

            // 토큰 유효하면
            // name, email 도 담아주기
            try {
                Users userInfo = userMapper.selectUserNo(no);
                if( userInfo != null ) {
                    user.setName(userInfo.getName());
                    user.setEmail(userInfo.getEmail());
                }
            } catch (Exception e) {
                log.error(e.getMessage());
                log.error("토큰 유효 -> DB 추가 정보 조회시 에러 발생...");
            }

            UserDetails userDetails = new CustomUser(user);

            // OK
            // new UsernamePasswordAuthenticationToken( 사용자정보객체, 비밀번호, 사용자의 권한(목록)  );
            return new UsernamePasswordAuthenticationToken(userDetails, null, authorities);

        } catch (ExpiredJwtException exception) {
            log.warn("Request to parse expired JWT : {} failed : {}", authHeader, exception.getMessage());
        } catch (UnsupportedJwtException exception) {
            log.warn("Request to parse unsupported JWT : {} failed : {}", authHeader, exception.getMessage());
        } catch (MalformedJwtException exception) {
            log.warn("Request to parse invalid JWT : {} failed : {}", authHeader, exception.getMessage());
        } catch (IllegalArgumentException exception) {
            log.warn("Request to parse empty or null JWT : {} failed : {}", authHeader, exception.getMessage());
        }

        return null;
    }



    // 
    /**
     * 🔐❓ 토큰 유효성 검사
     * @param jwt
     * @return
     *  ⭕ true     : 유효
     *  ❌ false    : 만료
     */
    public boolean validateToken(String jwt) {

        try {

            // 🔐➡👩‍💼 JWT 파싱
	        Jws<Claims> claims = Jwts.parser()
                                    .verifyWith(getShaKey())
                                    .build()
                                    .parseSignedClaims(jwt);    

            log.info("::::: 토큰 만료기간 :::::");
            log.info("-> " + claims.getPayload().getExpiration());
            /*
                PAYLOAD
                {
                    "exp": 1703140095,        ⬅ 만료기한 추출
                    "uid": "joeun",
                    "rol": [
                        "ROLE_USER"
                    ]   
                }
            */
	        return !claims.getPayload().getExpiration().before(new Date());
	    } catch (ExpiredJwtException exception) {
            log.error("Token Expired");                 // 토큰 만료 
            return false;
        } catch (JwtException exception) {
            log.error("Token Tampered");                // 토큰 손상
            return false;
        } catch (NullPointerException exception) {
            log.error("Token is null");                 // 토큰 없음
            return false;
        } catch (Exception e) {
	        return false;
	    }
    }


    // secretKey ➡ signingKey
    private byte[] getSigningKey() {
		return jwtProps.getSecretKey().getBytes();
	}

    // secretKey ➡ (HMAC-SHA algorithms) ➡ signingKey
    private SecretKey getShaKey() {
        return Keys.hmacShaKeyFor(getSigningKey());
    }

    
}

