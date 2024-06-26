package com.aloha.server.controller;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.aloha.server.board.dto.Files;
import com.aloha.server.board.dto.Option;
import com.aloha.server.board.dto.Page;
import com.aloha.server.board.dto.QnaBoard;
import com.aloha.server.board.dto.StarBoard;
import com.aloha.server.board.service.FileService;
import com.aloha.server.board.service.QnaService;
import com.aloha.server.board.service.ReplyService;
import com.aloha.server.board.service.StarService;
import com.aloha.server.pay.dto.Pay;
import com.aloha.server.pay.service.PayService;
import com.aloha.server.user.dto.Users;
import com.aloha.server.user.service.UserService;

import lombok.extern.slf4j.Slf4j;






@Slf4j
@Controller
@RequestMapping("/page")
public class PageController {

    @Autowired
    private UserService userService;

    @Autowired
    private QnaService qnaService;

    @Autowired
    private StarService starService;

    @Autowired
    private FileService fileService;

    @Autowired
    private PayService payService;

    @Autowired
    private ReplyService replyService;

    // @GetMapping("mypage/{path}")
    // public String getMethodName2(@PathVariable("path") String path, HttpSession session, Model model) {    
    //     Users user = (Users) session.getAttribute("user");   
    //     model.addAttribute("user", user); 
    //     return "page/mypage/"+path;
    // } 
    
    @GetMapping("/mypage/profile")
    // public String read(@RequestParam("userNo") int userNo, Model model) throws Exception {
    public String read(Principal principal
                      ,HttpSession session
                      ,Model model) throws Exception {
        // Princiapl 로 유저 가져오기
        // CustomUser loginUser = (CustomUser) principal;
        // int userNo = loginUser.getUser().getUserNo();
        // session 으로 가져오기
        Users user = (Users) session.getAttribute("user");
        int userNo = user.getUserNo();
        String email = user.getEmail();
        log.info("email : " + email);
        user = userService.read(email);

        
       
        Integer fileNo = fileService.profileSelect(userNo);
        if( fileNo > 0 ){
            Files file = fileService.select(fileNo);
            model.addAttribute("file", file);
            log.info("file : " + file);

        } else {
            Files file = new Files();
            file.setFileNo(-1);
            model.addAttribute("file", file);
        }

        model.addAttribute("user", user);
        return "page/mypage/profile";
    }

    @GetMapping("/mypage/profileUpdate")
    // public String read(@RequestParam("userNo") int userNo, Model model) throws Exception {
    public String update(Principal principal
                      ,HttpSession session
                      , Model model) throws Exception {
        // Princiapl 로 유저 가져오기
        // CustomUser loginUser = (CustomUser) principal;
        // int userNo = loginUser.getUser().getUserNo();
        // session 으로 가져오기
        Users user = (Users) session.getAttribute("user");
        String email = user.getEmail();
        log.info("email : " + email);
        user = userService.read(email);
        model.addAttribute("user", user);
        return "page/mypage/profileUpdate";
    }

    @PostMapping("/mypage/profileUpdate")
    public String updatePro( Users user ) throws Exception {
        int result = userService.update(user);
        log.info("수정 : " + user);
        if(result > 0){
            log.info("수정성공");
            return "redirect:/page/mypage/profile";
        }
        log.info("수정 실패");
        return "redirect:/page/mypage/profileUpdate?error";
    }


    @GetMapping("/mypage/userDelete")
    public String delete(Principal principal
                      ,HttpSession session
                      , Model model) throws Exception {
        // Princiapl 로 유저 가져오기
        // CustomUser loginUser = (CustomUser) principal;
        // int userNo = loginUser.getUser().getUserNo();
        // session 으로 가져오기
        Users user = (Users) session.getAttribute("user");
        String email = user.getEmail();
        log.info("email : " + email);
        user = userService.read(email);
        log.info("user : " + user);
        model.addAttribute("user", user);
        return "page/mypage/userDelete";
    }

    @PostMapping("/mypage/userDelete")
    public String deletePro(Users user, HttpServletRequest request, HttpSession session) throws Exception {
        
        int result = userService.delete(user);
        log.info("번호 : " + user);
        if ( result > 0) {
            session.invalidate();
            log.info("번호 : " + user);
            return "redirect:/";
        }
        return "redirect:/page/mypage/userDelete?error";
    }

    /* ----------------------------------------------------------------------------- */
    /* 1:1 문의 */

    /**
     * 게시글 조회
     * @param model
     * @return
     * @throws Exception
     */
    @GetMapping("/mypage/inquiry")
    public String qnaList(Model model, Page page, Option option, HttpSession session) throws Exception {
        log.info("qna 목록");

        List<QnaBoard> qnaList = qnaService.list(page, option);
        Users user = (Users) session.getAttribute("user");
        model.addAttribute("qnaList", qnaList);
        model.addAttribute("user", user);
        return "/page/mypage/inquiry";
    }

    @GetMapping("/mypage/qnaPost")
    public String read(@RequestParam("qnaNo") int qnaNo, Model model) throws Exception {
        QnaBoard qnaBoard = qnaService.select(qnaNo);

        // 모델 등록
        model.addAttribute("qnaBoard", qnaBoard);

        starService.views(qnaNo);

        // 뷰페이지 지정
        return "/page/mypage/qnaPost";
    }

    @GetMapping("/mypage/qnaUpdate")
    public String update(@RequestParam("qnaNo") int qnaNo, Model model) throws Exception {
        QnaBoard qnaBoard = qnaService.select(qnaNo);

        // 모델 등록
        model.addAttribute("qnaBoard", qnaBoard);

        // 뷰페이지 지정
        return "/page/mypage/qnaUpdate";
    }

    @PostMapping("/mypage/qnaUpdate")
    public String updatePro(QnaBoard qnaBoard) throws Exception {

        int result = qnaService.update(qnaBoard);
        if ( result > 0) {
            return "redirect:/page/mypage/inquiry";
        }
        int qnaNo = qnaBoard.getQnaNo();
        
        return "redirect:/page/mypage/qnaUpdate?qnaNo=" + qnaNo + "$error";
    }

    /* ------------------------------------------------------------- */
    /* 결제내역 */
    @GetMapping("/mypage/payment")
    public String payList(Model model, HttpSession session) throws Exception {

        Users user = (Users) session.getAttribute("user");

        int userNo = user.getUserNo();
        List<Pay> payList = payService.userList(userNo);

        model.addAttribute("user", user);
        model.addAttribute("payList", payList);
        log.info("userNo : " + userNo);
        return "/page/mypage/payment";
    }

    /* 내가 쓴 글 */
    @GetMapping("/mypage/promotion")
    public String promotionList(Model model, HttpSession session, Page page, Option option) throws Exception {

        Users user = (Users) session.getAttribute("user");
        int userNo = user.getUserNo();

        List<StarBoard> promotionList = starService.promotionList(userNo, page, option);

        model.addAttribute("user", user);
        model.addAttribute("promotionList", promotionList);
        model.addAttribute("page", page);
        model.addAttribute("option", option);
        log.info("userNo : " + userNo);
        return "/page/mypage/promotion";
    }
    
    /* 내가 쓴 글 */
    @GetMapping("/mypage/event")
    public String reviewList(@RequestParam(value = "type", defaultValue = "review") String type
                                    ,Model model, Page page
                                    ,Option option
                                    ,HttpSession session) throws Exception {

        List<StarBoard> starList = starService.list(type, page, option);
        model.addAttribute("starList", starList);
        model.addAttribute("page", page);
        model.addAttribute("option", option);
        Users user = (Users) session.getAttribute("user");
        model.addAttribute("user", user);
        

        return "/page/mypage/event";
    }

    @PostMapping("/mypage/eventDelete")
    public String reviewDelete(@RequestParam("starNos") String starNos) throws Exception {
       
        int result = 0;
        result = starService.delete(starNos);

        if (result > 0) {
            return "redirect:/page/mypage/event";
        }
        
        return "redirect:/page/mypage/event?error";  // 삭제 실패시에도 같은 페이지로 리디렉션
    }

    @GetMapping("/mypage/reviewPost")
    public String reviewRead(@RequestParam("starNo") int starNo, Model model) throws Exception {

        StarBoard starBoard = starService.select(starNo);
        int commentCount = replyService.countByStarNo(starBoard.getStarNo());
        starBoard.setCommentCount(commentCount);
        // 모델 등록
        model.addAttribute("starBoard", starBoard);
        starService.views(starNo);

        // 뷰페이지 지정
        return "/page/mypage/reviewPost";
    }

    @GetMapping("/mypage/reviewUpdate")
    public String reviewUpdate(@RequestParam("starNo") int starNo, Model model) throws Exception {
        StarBoard starBoard = starService.select(starNo);

        // 모델 등록
        model.addAttribute("starBoard", starBoard);

        // 뷰페이지 지정
        return "/page/mypage/reviewUpdate";
    }

    @PostMapping("/mypage/reviewUpdate")
    public String reviewUpdatePro(StarBoard starBoard) throws Exception {

        int result = starService.update(starBoard);
        if ( result > 0) {
            return "redirect:/page/mypage/event";
        }
        int starNo = starBoard.getStarNo();
        
        return "redirect:/page/mypage/reviewUpdate?qnaNo=" + starNo + "$error";
    }

    @GetMapping("/mypage/archive")
    public String archive(StarBoard starBoard) throws Exception {
        return "/page/mypage/archive";
    }

    @GetMapping("/mypage/archive2")
    public String archive2(StarBoard starBoard) throws Exception {
        return "/page/mypage/archive2";
    }
    


}