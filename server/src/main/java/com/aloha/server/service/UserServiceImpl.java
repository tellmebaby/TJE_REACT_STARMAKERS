package com.aloha.server.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Service;

import com.aloha.server.dto.Files;
import com.aloha.server.dto.PasswordResetToken;
import com.aloha.server.dto.StarUser;
import com.aloha.server.dto.UserAuth;
import com.aloha.server.dto.Users;
import com.aloha.server.mapper.PasswordResetTokenMapper;
import com.aloha.server.mapper.UserMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private FileService fileService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordResetTokenMapper PasswordResetTokenMapper;



    @Override
    public boolean login(Users user, HttpServletRequest request) throws Exception {
        // // 💍 토큰 생성
        String username = user.getEmail();    // 아이디 (✅ 이메일)
        String password = user.getConfirmPassword();    // 암호화되지 않은 비밀번호
        UsernamePasswordAuthenticationToken token 
            = new UsernamePasswordAuthenticationToken(username, password);
        
        // 토큰에 요청 정보 등록 (바로로그인)
        token.setDetails( new WebAuthenticationDetails(request));

        // 토큰을 이용하여 인증
        Authentication authentication = authenticationManager.authenticate(token);

        // 인증 여부 확인
        boolean result = authentication.isAuthenticated();

        // 시큐리티 컨텍스트에 등록
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        // 세션의 정보 등록
        user = userMapper.select(username);
        Files file = fileService.selectByUserNoAndStarNo(user.getUserNo());
        if ( file != null ){
            log.info(":::::::::::::fileno : " + file.getFileNo() );
            user.setUserImgId(file.getFileNo());
        }else{
            log.info(":::::::::::::파일이 없어요");
            user.setUserImgId(0);
        }
        HttpSession session = request.getSession();
        session.setAttribute("user", user);

        return result;
    }

    @Override
    public Users select(String username) throws Exception {
        Users user = userMapper.select(username);
        return user;
    }

    @Override
    public int join(Users user) throws Exception {
        String email = user.getEmail();
        String password = user.getPassword();
        String encodedPassword = passwordEncoder.encode(password);  // 🔒 비밀번호 암호화
        user.setPassword(encodedPassword);

        // 회원 등록
        int result = userMapper.join(user);

        if( result > 0 ) {
            // 회원 기본 권한 등록
            UserAuth userAuth = new UserAuth();
            userAuth.setUserId(email);              // ✅ 아이디(이메일)
            userAuth.setAuth("ROLE_USER");
            int result2 = userMapper.insertAuth(userAuth);
            if(result2>0){

            }
        }
        return user.getUserNo();
    }

    @Override
    public int update(Users user) throws Exception {
        log.info("유저 정보 넘어오니 : " + user);
        int result = userMapper.update(user);
        return result;
    }

    @Override
    public int insertAuth(UserAuth userAuth) throws Exception {
        int result = userMapper.insertAuth(userAuth);
        return result;
    }

    @Override
    public int delete(Users user) throws Exception {

        int result = userMapper.delete(user);
        Integer fileNo = fileService.profileSelect(user.getUserNo());
        if ( fileNo != null && fileNo > 0) {
            // 파일 삭제
            fileService.delete(fileNo);
        }
        return result;
    }

    @Override
    public Users read(String email) throws Exception {

        Users user = userMapper.read(email);
        return user;
    }

    // 가입 여부 확인
    @Override
    public int selectEmail(Users user) throws Exception {
        int result = userMapper.selectEmail(user);
        
        return result;
    }

    // 아이디 중복 확인
    @Override
    public int selectId(Users user) throws Exception {
        int result = userMapper.selectId(user);
        return result;
    }

    public void createPasswordResetTokenForUser(String email, String token) {
        PasswordResetToken myToken = new PasswordResetToken(token, email);
        PasswordResetTokenMapper.save(myToken);
    }

    public PasswordResetToken getPasswordResetToken(String token) {
        return PasswordResetTokenMapper.findByToken(token);
    }

    public void updatePassword(String email, String newPassword) {
        // Logic to update user's password in the database
        // For example, userRepository.updatePassword(email, newPassword);
    }

    @Override
    public List<StarUser> starMemberList() throws Exception {
        return userMapper.starMemberList();
    }

    @Override
    public List<StarUser> newMemberList() throws Exception {
        
        return userMapper.newMemberList();
    }

    @Override
    public List<Users> list() throws Exception {
        List<Users> userList = userMapper.list();
        return userList;
    }

    @Override
    public Users selectUserNo(int userNo) throws Exception {
        Users user = userMapper.selectUserNo(userNo);
        return user;

    }

    @Override
    public int authUpdate(Users user) throws Exception {
        int result = userMapper.authUpdate(user);
        return result;
    }

    @Override
    public Users selectcocd(Users user) throws Exception {
        Users uesr2 = userMapper.selectcocd(user);
        if(uesr2==null){
            int result = userMapper.join(user);
            if(result>0){
                Users user3 = userMapper.selectUserNo(user.getUserNo());
                return user3;
            }
        }
        return uesr2;
    }

}