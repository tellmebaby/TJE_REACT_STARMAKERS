package com.aloha.server.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.aloha.server.security.CustomUserDetailService;
import com.aloha.server.security.filter.JwtAuthenticationFilter;
import com.aloha.server.security.filter.JwtRequestFilter;
import com.aloha.server.security.provider.JwtTokenProvider;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true) //어노테이션에 prePostEnabled = true를 추가하면 AuthenticationManager를 자동으로 구성합니다.
public class SecurityConfig  {

	@Autowired
	private CustomUserDetailService customUserDetailService;

    @Autowired 
    private JwtTokenProvider jwtTokenProvider;

    private AuthenticationManager authenticationManager;


    @Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        this.authenticationManager = authenticationConfiguration.getAuthenticationManager();
		return authenticationManager;
	}


    @Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        log.info("securityFilterChain...");

        // 폼 기반 로그인 비활성화
        http.formLogin( login -> login.disable() );

        // HTTP 기본 인증 비활성화
        http.httpBasic( basic -> basic.disable() );

        // CSRF(Cross-Site Request Forgery) 공격 방어 기능 비활성화
        http.csrf( csrf -> csrf.disable() );

        // 필터 설정
        // ✅ JWT 요청 필터 1️⃣
        // ✅ JWT 인증 필터 2️⃣
        http.addFilterAt(new JwtAuthenticationFilter(authenticationManager, jwtTokenProvider), UsernamePasswordAuthenticationFilter.class)
            .addFilterBefore(new JwtRequestFilter(authenticationManager, jwtTokenProvider), UsernamePasswordAuthenticationFilter.class)
            ;

        // 인가 설정
        http.authorizeHttpRequests()
                .requestMatchers(PathRequest.toStaticResources().atCommonLocations()).permitAll()
                .antMatchers("/").permitAll()
                .antMatchers("/login").permitAll()
                .antMatchers("/user/**").hasAnyRole("USER" , "ADMIN")
                .antMatchers("/admin/**").hasRole("ADMIN")
                // .anyRequest().authenticated()
                ;
						
        // 사용자 정보를 불러오는 서비스 설정
        http.userDetailsService(customUserDetailService);

     http.csrf().disable();  // CSRF 방지 비활성화
		return http.build();
	}


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


	

	

}

// import javax.sql.DataSource;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.jdbc.BadSqlGrammarException;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.web.access.AccessDeniedHandler;
// import org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl;
// import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;
// import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

// import com.aloha.server.security.CustomAccessDeniedHandler;
// import com.aloha.server.security.LoginFailureHandler;
// import com.aloha.server.security.LoginSuccessHandler;
// import com.aloha.server.user.service.CustomOAuth2UserService;
// import com.aloha.server.user.service.UserDetailServiceImpl;

// import lombok.extern.slf4j.Slf4j;

// @Slf4j
// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {

//     @Autowired
//     private DataSource dataSource;

//     @Autowired
//     private UserDetailServiceImpl userDetailServiceImpl;

//     @Autowired
//     private LoginSuccessHandler loginSuccessHandler;

//     @Autowired
//     private LoginFailureHandler loginFailureHandler;

//     @Autowired
//     private CustomOAuth2UserService customOAuth2UserService;

//     // 스프링 시큐리티 설정 메소드
//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

//         // ✅ 인가 설정
//         http.authorizeRequests(requests -> requests
//         // .antMatchers("/**").permitAll()
//         // .antMatchers("/", "/**").hasAnyRole("ADMIN", "USER")
//         .antMatchers("/css/**", "/js/**", "/img/**").permitAll()
//         .antMatchers("/admin", "/admin/**").hasRole("ADMIN")
//         // .anyRequest().permitAll()
//         );

//         // 🔐 폼 로그인 설정
//         // ✅ 커스텀 로그인 페이지
//         http.formLogin(login -> login.loginPage("/login")
//                 .loginProcessingUrl("/login")
//                 .usernameParameter("email")
//                 .passwordParameter("password")
//                 .successHandler(loginSuccessHandler));

//         // ✅ 사용자 정의 인증 설정
//         http.userDetailsService(userDetailServiceImpl);

//         // 🔄 자동 로그인 설정
//         http.rememberMe(me -> me.key("aloha")
//                 .tokenRepository(tokenRepository())
//                 .tokenValiditySeconds(60 * 60 * 24 * 7)
//                 .authenticationSuccessHandler(loginSuccessHandler));

//         // OAuth 로그인 설정
//         http.oauth2Login(login -> login
//                 .loginPage("/login")
//                 .userInfoEndpoint()
//                 .userService(customOAuth2UserService)
//                 .and()
//                 .successHandler(loginSuccessHandler)
//                 .failureHandler(loginFailureHandler));

//         // CSRF 토큰을 쿠키에 저장하고, /message/** 경로에 대한 요청이 인증된 사용자만 접근할 수 있도록 설정
//         // http.csrf(csrf ->
//         // csrf.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()))
//         // .authorizeRequests(requests -> requests
//         // .antMatchers("/message/**").authenticated()
//         // .anyRequest().permitAll());

//         // CSRF 토큰을 쿠키에 저장하고, /payments/** 경로에 대한 요청이 인증된 사용자만 접근할 수 있도록 설정
//         // http.csrf(csrf ->
//         // csrf.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()));
//         http.csrf().disable();  // CSRF 방지 비활성화

//         return http.build();
//     }

//     /**
//      * 🍃 자동 로그인 저장소 빈 등록
//      * ✅ 데이터 소스
//      * ⭐ persistent_logins 테이블 생성
//      * create table persistent_logins (
//      * username varchar(64) not null
//      * , series varchar(64) primary key
//      * , token varchar(64) not null
//      * , last_used timestamp not null
//      * );
//      * 🔄 자동 로그인 프로세스
//      * ✅ 로그인 시
//      * ➡ 👩‍💼(ID, 시리즈, 토큰) 저장
//      * ✅ 로그아웃 시,
//      * ➡ 👩‍💼(ID, 시리즈, 토큰) 삭제
//      * 
//      * @return
//      */
//     @Bean
//     public PersistentTokenRepository tokenRepository() {
//         // JdbcTokenRepositoryImpl : 토큰 저장 데이터 베이스를 등록하는 객체
//         JdbcTokenRepositoryImpl repositoryImpl = new JdbcTokenRepositoryImpl();
//         // ✅ 토큰 저장소를 사용하는 데이터 소스 지정
//         // - 시큐리티가 자동 로그인 프로세스를 처리하기 위한 DB를 지정합니다.
//         repositoryImpl.setDataSource(dataSource);
//         // persistent_logins 테이블 생성
//         try {
//             repositoryImpl.getJdbcTemplate().execute(JdbcTokenRepositoryImpl.CREATE_TABLE_SQL);
//         } catch (BadSqlGrammarException e) {
//             log.error("persistent_logins 테이블이 이미 존재합니다.");
//         } catch (Exception e) {
//             log.error("자동 로그인 테이블 생성 중 , 예외 발생");
//         }
//         return repositoryImpl;
//     }

//     // 🫛 접근 거부 에러 처리 빈 등록
//     @Bean
//     public AccessDeniedHandler accessDeniedHandler() {
//         return new CustomAccessDeniedHandler();
//     }

// }
