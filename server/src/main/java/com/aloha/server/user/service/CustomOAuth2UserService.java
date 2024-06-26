package com.aloha.server.user.service;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.aloha.server.security.LoginFailureHandler;
import com.aloha.server.user.dto.CustomOAuth2User;
import com.aloha.server.user.dto.OAuthAttributes;
import com.aloha.server.user.dto.UserAuth;
import com.aloha.server.user.dto.Users;
import com.aloha.server.user.mapper.UserMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final DefaultOAuth2UserService delegate = new DefaultOAuth2UserService();

    @Autowired
    UserMapper userMapper;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        // 여기에서 Users 객체를 로드하는 방법은 데이터베이스나 다른 서비스에서 사용자 정보를 가져오는 방식입니다.

        log.info("++=+==+====++========");
        // log.info(oAuth2User.getAttributes().toString());
        Users user = new Users();

        Map<String, Object> attributes = oAuth2User.getAttributes();

        log.info("++=+==+====++========");
        log.info(attributes.toString());
        log.info("++=+==+====++========");

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails()
                .getUserInfoEndpoint().getUserNameAttributeName();

        log.info("★★★★★ 주요 정보 ★★★★★");
        log.info("****** registrationId : " + registrationId);
        log.info("****** userNameAttributeName : " + userNameAttributeName);
        log.info("****** attributes : " + attributes);

        OAuthAttributes oAuthAttributes = OAuthAttributes.of(registrationId, userNameAttributeName, attributes);

        // 일원화된 정보 확인
        log.info("****** oAuthAttributes : " + oAuthAttributes);
        String nameAttributeKey = oAuthAttributes.getNameAttributeKey();
        String name = oAuthAttributes.getName();
        String email = oAuthAttributes.getEmail();
        String picture = oAuthAttributes.getPicture();
        String id = oAuthAttributes.getId();
        String provider = "";
        name = name == null ? "" : name;
        email = email == null ? "" : email;

        if ("kakao".equals(registrationId))
            provider = "kakao";
        if ("naver".equals(registrationId))
            provider = "naver";
        if ("google".equals(registrationId))
            provider = "google";

        log.info(":::::::::::::::::::::::::::::::::::::::::::::");
        log.info(provider + "로 로그인 합니다.");
        log.info(":::::::::::::::::::::::::::::::::::::::::::::");

        user.setSociaCode(id);
        user.setName(name);
        user.setEmail(id + "@" + provider + ".com");

        log.info("++=+==+==소셜 로그인 회원정보==++========");
        // log.info(user.toString());

        try {
            user = loadUserFromDatabase(user);
            log.info(user.toString());
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new CustomOAuth2User(user, oAuthAttributes);
        // return new CustomOAuth2User(oAuth2User.getAuthorities(),
        // oAuth2User.getAttributes(), provider, user);
    }

    private Users loadUserFromDatabase(Users user) throws Exception {

        Users uesr2 = userMapper.selectcocd(user);
        if (uesr2 == null) {
            int result = userMapper.join(user);
            if (result > 0) {

                // 회원 기본 권한 등록
                UserAuth userAuth = new UserAuth();
                userAuth.setUserId(user.getEmail());
                userAuth.setAuth("ROLE_USER");
                int result2 = userMapper.insertAuth(userAuth);
                if (result2 > 0) {
                    Users user3 = userMapper.selectUserNo(user.getUserNo());
                    return user3;
                }                
            }
        }
        return uesr2;
    }

}
