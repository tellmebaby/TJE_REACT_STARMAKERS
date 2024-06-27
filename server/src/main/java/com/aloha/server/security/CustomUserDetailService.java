package com.aloha.server.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.aloha.server.dto.CustomUser;
import com.aloha.server.dto.Users;
import com.aloha.server.mapper.UserMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class CustomUserDetailService implements UserDetailsService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public UserDetails loadUserByUsername(String username)  {
        log.info("login - loadUserByUsername : " + username);
        // MyBatis를 사용하여 데이터베이스에서 사용자 세부 정보를 가져옵니다.
        Users user = null;
        try {
            user = userMapper.login(username);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        if (user == null) {
            log.info("사용자 없음...");
            throw new UsernameNotFoundException("사용자를 찾을 수 없습니다: " + username);
        }
        log.info("user :::::");
        log.info(user.toString());
        // 🟢🟡🔴 CustomUser (➡User) 사용
        CustomUser customUser = new CustomUser(user);

        log.info("customuser :::::");
        log.info(customUser.toString());
        return customUser;

    }
}