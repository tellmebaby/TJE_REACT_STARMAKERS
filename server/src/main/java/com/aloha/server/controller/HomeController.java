package com.aloha.server.controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.codehaus.groovy.classgen.genMathModification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.aloha.server.board.dto.Option;
import com.aloha.server.board.dto.Page;
import com.aloha.server.board.dto.StarBoard;
import com.aloha.server.board.service.ReplyService;
import com.aloha.server.board.service.StarService;
import com.aloha.server.user.dto.Users;
import com.aloha.server.user.service.UserService;

import lombok.extern.slf4j.Slf4j;




@Slf4j
@RestController
@RequestMapping("/")
public class HomeController {

    @Autowired
    private UserService userService;
    
    @Autowired
    private StarService starService;

    @Autowired
    private ReplyService replyService;

   /**
     * 메인 화면
     * @param model
     * @param Principal
     * @return
     */
    // @GetMapping({"", "/"})
    // public String home(Principal principal, HttpSession session, Model model) {
    //     log.info("메인 화면");
    //     log.info(":::::::::: principal ::::::::::");
    //     log.info("principal : " + principal);
    //     log.info("user : " + session.getAttribute("user"));
    //     Users user = (Users) session.getAttribute("user");
    //     model.addAttribute("user", user);
    //     // Principal : 현재 로그인 한 사용자 정보를 확인하는 인터페이스
    //     return "index";
    // }
    // @GetMapping({"", "/"})
    // public String home(Principal principal
    //                   ,HttpSession session
    //                   ,Page page, Option option) throws Exception {
    //     // 로그인을 한 사용자 정보를 로깅합니다.
    //     // log.info("메인 화면");
    //     // log.info(":::::::::: principal ::::::::::");
    //     // log.info("principal : " + principal);
    //     // log.info("user : " + session.getAttribute("user"));
    //     // Users user = (Users) session.getAttribute("user");
    //     // model.addAttribute("user", user);

        
        
    //     // starList를 가져와서 모델에 추가합니다.
    //     List<StarBoard> starListReview = starService.list("review", page, option);
        
    //     if(starListReview != null) {
    //         for (StarBoard starBoard : starListReview) {
    //             int commentCount = replyService.countByStarNo(starBoard.getStarNo());
    //             starBoard.setCommentCount(commentCount);
    //         }
            
    //     }
    //     List<StarBoard> starListAnn = starService.list("an", page, option);
    //     for (StarBoard starBoard : starListAnn) {
    //         int commentCount = replyService.countByStarNo(starBoard.getStarNo());
    //         starBoard.setCommentCount(commentCount);
    //     }

    //     List<StarBoard> starListEvent = starService.list("event", page, option);
        
    //     model.addAttribute("starListReview", starListReview.stream().limit(5).collect(Collectors.toList()));
    //     model.addAttribute("starListAnn", starListAnn.stream().limit(5).collect(Collectors.toList()));
    //     model.addAttribute("starListEvent", starListEvent);
    //     // index 페이지를 반환합니다.
    //     return "index";
    // }

    
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
