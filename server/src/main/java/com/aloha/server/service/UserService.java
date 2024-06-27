package com.aloha.server.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.aloha.server.dto.PasswordResetToken;
import com.aloha.server.dto.StarUser;
import com.aloha.server.dto.UserAuth;
import com.aloha.server.dto.Users;

public interface UserService {

    // 로그인
    public boolean login(Users user, HttpServletRequest request) throws Exception;

    // 조회
    public Users select(String username) throws Exception;
    
    // 회원 조회 - userNo
    public Users selectUserNo(int userNo) throws Exception;

    // 회원 가입
    public int join(Users user) throws Exception;

    // 회원 수정
    public int update(Users user) throws Exception;

    // 회원 권한 수정
    public int authUpdate(Users user) throws Exception;

    // 마이페이지

    // 회원 조회
    public Users read(String email) throws Exception; 

    // 회원 탈퇴
    public int delete(Users user) throws Exception;

    // 회원 권한 등록
    public int insertAuth(UserAuth userAuth) throws Exception;

    // 가입여부확인
    public int selectEmail( Users user ) throws Exception;

    // 아이디 중복 확인
    public int selectId( Users user ) throws Exception;

    // 이메일 인증 관련
    public void createPasswordResetTokenForUser( String email, String token );

    public PasswordResetToken getPasswordResetToken(String token);

    public void updatePassword(String email, String newPassword);


    // 인기 회원 조회
    public List<StarUser> starMemberList() throws Exception;

    // 최근 회원 조회
    public List<StarUser> newMemberList() throws Exception;

    // 관리자 회원 리스트
    public List<Users> list() throws Exception;

    //소셜로그인시 회원검색
    public Users selectcocd(Users user) throws Exception;

    
}