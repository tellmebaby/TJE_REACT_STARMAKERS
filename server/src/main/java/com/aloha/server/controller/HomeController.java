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

import com.aloha.server.board.dto.Option;
import com.aloha.server.board.dto.Page;
import com.aloha.server.board.dto.StarBoard;
import com.aloha.server.board.service.ReplyService;
import com.aloha.server.board.service.StarService;
import com.aloha.server.user.dto.Users;
import com.aloha.server.user.service.UserService;

import lombok.extern.slf4j.Slf4j;




@Slf4j
@Controller
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
    @GetMapping({"", "/"})
    public String home(Principal principal
                      ,HttpSession session
                      ,Model model
                        ,Page page, Option option) throws Exception {
        // 로그인을 한 사용자 정보를 로깅합니다.
        log.info("메인 화면");
        log.info(":::::::::: principal ::::::::::");
        log.info("principal : " + principal);
        log.info("user : " + session.getAttribute("user"));
        Users user = (Users) session.getAttribute("user");
        model.addAttribute("user", user);

        // starList를 가져와서 모델에 추가합니다.
        List<StarBoard> starListReview = starService.list("review", page, option);
        for (StarBoard starBoard : starListReview) {
            int commentCount = replyService.countByStarNo(starBoard.getStarNo());
            starBoard.setCommentCount(commentCount);
        }
        
        List<StarBoard> starListAnn = starService.list("an", page, option);
        for (StarBoard starBoard : starListAnn) {
            int commentCount = replyService.countByStarNo(starBoard.getStarNo());
            starBoard.setCommentCount(commentCount);
        }

        List<StarBoard> starListEvent = starService.list("event", page, option);
        
        model.addAttribute("starListReview", starListReview.stream().limit(5).collect(Collectors.toList()));
        model.addAttribute("starListAnn", starListAnn.stream().limit(5).collect(Collectors.toList()));
        model.addAttribute("starListEvent", starListEvent);
        // index 페이지를 반환합니다.
        return "index";
    }

    
    @GetMapping("/exception")
    public String exception(Authentication auth, Model model) {
        log.info("인증 예외 처리...");
        log.info("auth :" + auth.toString());
        model.addAttribute("msg","인증 거부 : "+auth.toString());
        return "/exception";
    }

    /**
     * 로그인 화면 이동
     * @return
     */
    @GetMapping("/login")
    public String login() {
        return "/login";
    }
 

    /**
     * 회원가입 화면 이동
     * @return
     */
    @GetMapping("/join")
    public String join() {
        return "/join";
    }

    /**
     * 회원가입처리
     * @param user
     * @param request
     * @return
     * @throws Exception
     */
    @PostMapping("/join")
    public String joinPro( Users user, HttpServletRequest request ) throws Exception{
        
        int result = userService.join(user);
        if(result > 0){
            userService.login(user, request);
            return "redirect:/";
        }
        
        return "redirect:/join?error";
    }
    

    /**
     * 가입여부확인
     * @param user
     * @param model
     * @return
     * @throws Exception
     */
    @PostMapping("/page/recoverId")
    public String recoverId( Users user , Model model ) throws Exception{
        
        int result = userService.selectEmail(user);

        if( result > 0 ) {
            model.addAttribute("user", user);
            return "/page/recoverComplete";
        }
        
        return "redirect:/page/recoverId?error";
    }
    

    @PostMapping("/checkUserId")
    public ResponseEntity<Boolean> checkUserId(@RequestBody Users user) throws Exception {
        boolean isTaken = userService.selectId(user) > 0;
        return ResponseEntity.ok(isTaken);
    }

    
    @GetMapping("/page/introduce")
    public String introduce( Model model) {
        return "page/introduce";
    }
    


    // @GetMapping("/{path}")
    // public String home(@PathVariable("path") String path) {        
    //     return path;
    // }

    @GetMapping("/page/{path}")
    public String user(@PathVariable("path") String path ) {        
        return "page/" + path;
    } 

    // @GetMapping("/page/starCard/{path}")
    // public String starcard(@PathVariable("path") String path) {
    //     return "page/starCard/" + path;
    // }
    
    @GetMapping("/page/mypage/{path}")
    public String mypage(@PathVariable("path") String path) {
        return "page/mypage/" + path;
    }
   
    @GetMapping("/page/board/{path}")
    public String board(@PathVariable("path") String path) {
        return "page/board/" + path;
    }
    
    @GetMapping("/page/board/eventBoard/{path}")
    public String eventBoard(@PathVariable("path") String path) {
        return "page/board/eventBoard/" + path;
    }
    
    @GetMapping("/page/board/anBoard/{path}")
    public String anBoard(@PathVariable("path") String path) {
        return "page/board/anBoard/" + path;
    }
    @GetMapping("/page/board/qnaBoard/{path}")
    public String qnaBoard(@PathVariable("path") String path) {
        return "page/board/qnaBoard/" + path;
    }
    @GetMapping("/page/board/reviewBoard/{path}")
    public String reviewBoard(@PathVariable("path") String path) {
        return "page/board/reviewBoard/" + path;
    }

    /**
     * 회원 프로필 이미지 불러오기
     * @param session
     * @return
     */
    @GetMapping("/get-user-img-id")
    @ResponseBody
    public Map<String, String> getUserImgId(HttpSession session) {
        Map<String, String> response = new HashMap<>();
        Users user = (Users) session.getAttribute("user");
        if (user != null) {
            response.put("userImgId", Integer.toString(user.getUserImgId()));
        } else {
            response.put("error", "No user image ID found in session");
        }
        return response;
    }

    @GetMapping("/carddesign")
    public String carddesign() {
        return "carddesign";
    }

    // 메인 리뉴얼
    @GetMapping("/index2")
    public String home2(Principal principal
    ,HttpSession session
    ,Model model
      ,Page page, Option option) throws Exception {
    // 로그인을 한 사용자 정보를 로깅합니다.
    log.info("메인 화면");
    log.info(":::::::::: principal ::::::::::");
    log.info("principal : " + principal);
    log.info("user : " + session.getAttribute("user"));
    Users user = (Users) session.getAttribute("user");
    model.addAttribute("user", user);

    // starList를 가져와서 모델에 추가합니다.
    List<StarBoard> starListReview = starService.list("review", page, option);
    for (StarBoard starBoard : starListReview) {
    int commentCount = replyService.countByStarNo(starBoard.getStarNo());
    starBoard.setCommentCount(commentCount);
    }

    List<StarBoard> starListAnn = starService.list("an", page, option);
    for (StarBoard starBoard : starListAnn) {
    int commentCount = replyService.countByStarNo(starBoard.getStarNo());
    starBoard.setCommentCount(commentCount);
    }

    model.addAttribute("starListReview", starListReview.stream().limit(5).collect(Collectors.toList()));
    model.addAttribute("starListAnn", starListAnn.stream().limit(5).collect(Collectors.toList()));
    // index 페이지를 반환합니다.
    return "index2";
    }
    
    
    /**
     * 이벤트 후기 게시판 조회
     */
    @GetMapping("/board/reviewBoard/reviewPost")
    public String reviewSelect(@RequestParam("starNo") int starNo, Model model) throws Exception {
        StarBoard starBoard = starService.select(starNo);
        model.addAttribute("starBoard", starBoard);
        return "/page/board/reviewBoard/reviewPost";
    }

    @GetMapping("/test")
    public String test() {
        return "/test";
    }


}
