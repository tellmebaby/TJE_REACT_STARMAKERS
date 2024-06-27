package com.aloha.server.security.filter;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.aloha.server.dto.CustomUser;
import com.aloha.server.security.constants.SecurityConstants;
import com.aloha.server.security.provider.JwtTokenProvider;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    // 생성자
    public JwtAuthenticationFilter( AuthenticationManager authenticationManager,  JwtTokenProvider jwtTokenProvider ) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        // 🔗 필터 URL 경로 설정 : /login
        setFilterProcessesUrl(SecurityConstants.AUTH_LOGIN_URL);
    }


    /**
     * 🔐 인증 시도 메소드
     * : /login 경로로 (username, password) 를 요청하면 이 필터에서 걸려 인증을 시도합니다.
     * ✅ Authentication 인증 시도한 사용자 인증 객체를 반환하여, 시큐리티가 인증 성공 여부를 판단하게 합니다.
     * @param request
     * @param response
     * @return
     * @throws AuthenticationException
     */
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {
        
        String email = request.getParameter("email");
        String password = request.getParameter("password");

        log.info("email : " + email);
        log.info("password : " + password);

        // 사용자 인증정보 객체 생성
        Authentication authentication = new UsernamePasswordAuthenticationToken(email, password);

         // // 사용자 인증정보 객체 생성
        // Authentication authentication = new UsernamePasswordAuthenticationToken(email, password);

        // try {
        //     // 사용자 인증 (로그인)
        //     authentication = authenticationManager.authenticate(authentication);
        // } catch (Exception e) {
        //     log.info("error" + e);
        // }

        // 사용자 인증 (로그인)
        authentication = authenticationManager.authenticate(authentication);
        /*
            🔐 authenticate() 인증 처리 프로세스
            1️⃣ 주어진 Authentication 객체에서 사용자의 아이디를 추출합니다.
            2️⃣ UserDetailsService를 사용하여 해당 아이디에 대한 UserDetails 객체를 가져옵니다.
            3️⃣ 가져온 UserDetails 객체에서 저장된 비밀번호를 확인하기 위해 PasswordEncoder를 사용합니다.
            4️⃣ 사용자가 제공한 비밀번호와 저장된 비밀번호가 일치하는지 확인합니다.
            5️⃣ 인증이 성공하면, 새로운 Authentication 객체를 생성하여 반환합니다.
            ✅ 인증 여부를, isAuthenticated() ➡ true 로 확인할 수 있습니다.
         */

        log.info("authenticationManager : " + authenticationManager);
        log.info("authentication : " + authentication);
        log.info("인증 여부(isAuthenticated) : " + authentication.isAuthenticated());

        // 인증 실패 (username, password 불일치)
        if( !authentication.isAuthenticated() ) {
            log.info("인증 실패 : 아이디와 비밀번호가 일치하지 않습니다.");
            response.setStatus(401);
        }

        return authentication;
    }


    /**
     * ⭕ 인증 성공 메소드
     * : attemptAuthentication() 호출 후, 반환된 Authentication - 사용자 인증 객체가 인증된 것이 확인되면, 호출됩니다.
     * 
     * ➡ 🔐 JWT
     * : 로그인 인증에 성공했으므로, JWT 토큰을 생성하여 
     *   응답(response) 헤더에 jwt 토큰을 담아 응답합니다.
     *   💍 { Authorization : Bearer + {jwt} } 
     * @param request
     * @param response
     * @param chain
     * @param authentication
     * @throws IOException
     * @throws ServletException
     */
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
            Authentication authentication) throws IOException, ServletException {
        log.info("인증 성공 (auth SUCCESS) : ");

        CustomUser user = ((CustomUser) authentication.getPrincipal());
        int userNo = user.getUser().getUserNo();
        String email = user.getUser().getEmail();

        List<String> roles = user.getAuthorities()
                                .stream()
                                .map(GrantedAuthority::getAuthority)
                                .collect(Collectors.toList());

        // 🔐 JWT
        String token = jwtTokenProvider.createToken(userNo, email, roles);

        // 💍 { Authorization : Bearer + {jwt} } 
        response.addHeader(SecurityConstants.TOKEN_HEADER, SecurityConstants.TOKEN_PREFIX + token);
        response.setStatus(200);
    }



    

    



    
    
}
