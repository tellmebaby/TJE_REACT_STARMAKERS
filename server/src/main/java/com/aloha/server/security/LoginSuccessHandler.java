package com.aloha.server.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.aloha.server.board.dto.Files;
import com.aloha.server.board.service.FileService;
import com.aloha.server.user.dto.CustomUser;
import com.aloha.server.user.dto.Users;
import com.aloha.server.user.mapper.UserMapper;
import com.aloha.server.user.service.UserService;

import lombok.extern.slf4j.Slf4j;

/**
 * ✅ 로그인 성공 처리 클래스
 */
@Slf4j
@Component
public class LoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {
    
    @Autowired
    private FileService fileService;
    
    @Autowired 
    private UserMapper userMapper;
    
    /**
     * 인증 성공 시 실행되는 메소드
     */
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request
                                      , HttpServletResponse response
                                      , Authentication authentication) throws ServletException, IOException {
        
        log.info("로그인 인증 성공...");

        // 아이디 저장
        String rememberId = request.getParameter("remember-id");    // 아이디 저장 여부
        String username = request.getParameter("username");         // 아이디
        log.info("rememberId : " + rememberId);
        log.info("id : " + username);


        // ✅ 아이디 저장 체크
        if( rememberId != null && rememberId.equals("on") ) {
            Cookie cookie = new Cookie("remember-id", username);
            cookie.setMaxAge(60 * 60 * 24 * 7);         // 유효기간 : 7일
            cookie.setPath("/");                    // 쿠키 적용 경로 지정
            response.addCookie(cookie);                 // 응답에 쿠키 등록
        }

        // 🟩 아이디 저장 체크 ❌
        else {
            Cookie cookie = new Cookie("remember-id", "");
            cookie.setMaxAge(0);                // 유효기간 : 만료
            cookie.setPath("/");                   // 쿠키 적용 경로 지정
            response.addCookie(cookie);                // 응답에 쿠키 등록
        }





        // 인증된 사용자 정보 - (아이디/패스워드/권한)
        // User user = (User) authentication.getPrincipal();
        log.info("::::::::::::::::::::::::::::::::::::::::::::::::::::::");
        log.info("::::::::::::::::::::::::::::::::::::::::::::::::::::::");
        log.info("::::::::::::::::::::::::::::::::::::::::::::::::::::::");
        log.info("::::::::::::::::::::::::::::::::::::::::::::::::::::::");
        log.info("authentication: " + authentication);

        CustomUser user = null;
        if( authentication instanceof OAuth2AuthenticationToken ) {
            log.info("*** " + authentication.getPrincipal());
            log.info("*********************************");
            log.info("*********************************");
            log.info("*********************************");
            log.info("*** " + authentication.getDetails());
            
            
            Users socialUser = new Users();
            String id = authentication.getName();
            socialUser.setId(id);
            socialUser.setEmail(id);
            try {
                socialUser = userMapper.read(id);
            } catch (Exception e) {
                e.printStackTrace();
            }
            user = new CustomUser(socialUser);

            // 최초 소셜 로그인
            // if( socialUser.getId() == null ) {
            //     response.sendRedirect("/page/mypage/profileUpdate?first");
            // }
        }
        else {
            user = (CustomUser) authentication.getPrincipal();
        }

        log.info("아이디 : " + user.getUsername());
        log.info("패스워드 : " + user.getPassword());       // 보안상 노출❌
        // log.info("권한 : " + user.getAuthorities());    

        // 사용자 이미지 관련 수정
        Files file;
        try {
            file = fileService.selectByUserNoAndStarNo(user.getUser().getUserNo());
            log.info(":::::::::::::fileno : " + file.getFileNo() );
            user.getUser().setUserImgId(file.getFileNo());
        } catch (Exception e) {
            e.printStackTrace();
        }
        // 세션의 정보 등록
        HttpSession session = request.getSession();
        session.setAttribute("user", user.getUser());
        
        super.onAuthenticationSuccess(request, response, authentication);
    }

}