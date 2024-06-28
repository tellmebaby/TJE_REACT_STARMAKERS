package com.aloha.server.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aloha.server.dto.Users;
import com.aloha.server.service.UserService;

import lombok.extern.slf4j.Slf4j;




@Slf4j
@RestController
@RequestMapping("/")
public class HomeController {

    @Autowired
    private UserService userService;
    

    @GetMapping("/exception")
    public ResponseEntity<?> exception(Authentication auth) {
        log.info("인증 예외 처리...");
        log.info("auth :" + auth.toString());
        String exception = "인증 거부 : "+auth.toString();
        return new ResponseEntity<>(exception, HttpStatus.OK);
    }

    /**
     * 회원가입처리
     * @param user
     * @param request
     * @return
     * @throws Exception
     */
    @PostMapping("/join")
    public ResponseEntity<?> joinPro( Users user, HttpServletRequest request ) throws Exception{
        
        int result = userService.join(user);
        if(result > 0){
            userService.login(user, request);
            return new ResponseEntity<> (HttpStatus.OK);
        }
        
        return new ResponseEntity<> (HttpStatus.INTERNAL_SERVER_ERROR);
    }
    

    /**
     * 가입여부확인
     * @param user
     * @param model
     * @return
     * @throws Exception
     */
    @PostMapping("/page/recoverId")
    public ResponseEntity<?> recoverId( Users user ) throws Exception{
        
        int result = userService.selectEmail(user);

        if( result > 0 ) {
            // model.addAttribute("user", user);
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    

    @PostMapping("/checkUserId")
    public ResponseEntity<Boolean> checkUserId(@RequestBody Users user) throws Exception {
        boolean isTaken = userService.selectId(user) > 0;
        return ResponseEntity.ok(isTaken);
    }


    /**
     * 회원 프로필 이미지 불러오기
     * @param session
     * @return
     */
    @GetMapping("/get-user-img-id")
    public ResponseEntity<?> getUserImgId(HttpSession session) {
        Map<String, String> response = new HashMap<>();
        Users user = (Users) session.getAttribute("user");
        if (user != null) {
            response.put("userImgId", Integer.toString(user.getUserImgId()));
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            response.put("error", "No user image ID found in session");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    

}
