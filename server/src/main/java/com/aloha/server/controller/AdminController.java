package com.aloha.server.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.aloha.server.board.dto.Files;
import com.aloha.server.board.dto.Option;
import com.aloha.server.board.dto.Page;
import com.aloha.server.board.dto.QnaBoard;
import com.aloha.server.board.dto.Reply;
import com.aloha.server.board.dto.StarBoard;
import com.aloha.server.board.service.FileService;
import com.aloha.server.board.service.QnaService;
import com.aloha.server.board.service.ReplyService;
import com.aloha.server.board.service.StarService;
import com.aloha.server.message.dto.Message;
import com.aloha.server.message.service.MessageService;
import com.aloha.server.pay.dto.Pay;
import com.aloha.server.pay.service.PayService;
import com.aloha.server.user.dto.UserAuth;
import com.aloha.server.user.dto.Users;
import com.aloha.server.user.service.UserService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private PayService payService;

    @Autowired
    private StarService starService;

    @Autowired
    private QnaService qnaService;

    @Autowired
    private ReplyService replyService;

    @Autowired
    private FileService fileService;

    @Autowired
    private MessageService messageService;

    @GetMapping("")

    public String index(HttpSession session, Model model) throws Exception {
        Users user = (Users) session.getAttribute("user");
        if (user != null) {
            log.info("안녕? 유저?" + user);
            model.addAttribute("user", user);
        } 

        List<Users> userList = userService.list();
        int userTotal = 0;
        if (userList != null && !userList.isEmpty()) {
            userTotal = userList.size();
        } else {
            userTotal = 0;
        }
        model.addAttribute("userTotal", userTotal);

        // 결제 금액 가져오기
        List<Pay> payList = payService.totalList();
        int totalPrice = 0;
        for (Pay pay : payList) {
            totalPrice += pay.getPrice();
        }
        model.addAttribute("totalPrice", totalPrice);

       // 작성글 정보 가져오기
       List<StarBoard> starBoard = starService.countList();
       int boardTotal = 0;
       if (starBoard != null && !starBoard.isEmpty()) {
           boardTotal = starBoard.size();
       } else {
           boardTotal = 0;
       }
        model.addAttribute("boardTotal", boardTotal);

        return "/admin/index";
    }

    @GetMapping("/pages/{path}")
    public String getMethodName2(@PathVariable("path") String path) {
        return "admin/pages/" + path;
    }

    @GetMapping("/pages/projects")
    public String userList(Model model) throws Exception {

        List<Users> userList = userService.list();

        // int pay = payService.totalPrice(userNo);

        model.addAttribute("userList", userList);
        // model.addAttribute("pay", pay);
        // model.addAttribute("pay", pay);

        return "/admin/pages/projects";
    }

    @GetMapping("/pages/mailbox")
    public String allList(String type, Model model, Page page,
            Option option) throws Exception {

        log.info(type);
        List<StarBoard> starList = starService.list(type, page, option);

        model.addAttribute("starList", starList);
        model.addAttribute("page", page);
        model.addAttribute("option", option);

        List<Option> optionList = new ArrayList<Option>();
        optionList.add(new Option("제목+내용", 0));
        optionList.add(new Option("제목", 1));
        optionList.add(new Option("내용", 2));
        optionList.add(new Option("작성자", 3));
        optionList.add(new Option("회원번호", 4));
        model.addAttribute("optionList", optionList);

        return "/admin/pages/mailbox";
    }

    @GetMapping("/pages/mailboxStar")
    public String StarList(@RequestParam(value = "type", defaultValue = "starCard") String type, Model model, Page page,
            Option option) throws Exception {

        log.info(type);
        List<StarBoard> starList = starService.list(type, page, option, 0);

        model.addAttribute("starList", starList);
        model.addAttribute("page", page);
        model.addAttribute("option", option);

        List<Option> optionList = new ArrayList<Option>();
        optionList.add(new Option("제목+내용", 0));
        optionList.add(new Option("제목", 1));
        optionList.add(new Option("내용", 2));
        optionList.add(new Option("작성자", 3));
        optionList.add(new Option("회원번호", 4));
        model.addAttribute("optionList", optionList);

        return "/admin/pages/mailboxStar";
    }

    @GetMapping("/pages/mailboxEvent")
    public String eventList(@RequestParam(value = "type", defaultValue = "event") String type, Model model, Page page,
            Option option) throws Exception {

        log.info(type);
        List<StarBoard> starList = starService.list(type, page, option);

        model.addAttribute("starList", starList);
        model.addAttribute("page", page);
        model.addAttribute("option", option);

        List<Option> optionList = new ArrayList<Option>();
        optionList.add(new Option("제목+내용", 0));
        optionList.add(new Option("제목", 1));
        optionList.add(new Option("내용", 2));
        optionList.add(new Option("작성자", 3));
        optionList.add(new Option("회원번호", 4));
        model.addAttribute("optionList", optionList);

        return "/admin/pages/mailboxEvent";
    }

    @GetMapping("/pages/mailboxReview")
    public String reviewList(@RequestParam(value = "type", defaultValue = "review") String type, Model model, Page page,
            Option option) throws Exception {

        log.info(type);
        List<StarBoard> starList = starService.list(type, page, option);

        model.addAttribute("starList", starList);
        model.addAttribute("page", page);
        model.addAttribute("option", option);

        List<Option> optionList = new ArrayList<Option>();
        optionList.add(new Option("제목+내용", 0));
        optionList.add(new Option("제목", 1));
        optionList.add(new Option("내용", 2));
        optionList.add(new Option("작성자", 3));
        optionList.add(new Option("회원번호", 4));
        model.addAttribute("optionList", optionList);

        return "/admin/pages/mailboxReview";
    }

    @GetMapping("/pages/mailboxAn")
    public String anList(@RequestParam(value = "type", defaultValue = "an") String type, Model model, Page page,
            Option option) throws Exception {

        log.info(type);
        List<StarBoard> starList = starService.list(type, page, option);

        model.addAttribute("starList", starList);
        model.addAttribute("page", page);
        model.addAttribute("option", option);

        List<Option> optionList = new ArrayList<Option>();
        optionList.add(new Option("제목+내용", 0));
        optionList.add(new Option("제목", 1));
        optionList.add(new Option("내용", 2));
        optionList.add(new Option("작성자", 3));
        optionList.add(new Option("회원번호", 4));
        model.addAttribute("optionList", optionList);

        return "/admin/pages/mailboxAn";
    }

    @GetMapping("/pages/mailboxQna")
    public String qnaList(Model model, Page page,
            Option option) throws Exception {

        List<QnaBoard> qnaList = qnaService.list(page, option);

        model.addAttribute("qnaList", qnaList);
        model.addAttribute("page", page);
        model.addAttribute("option", option);

        List<Option> optionList = new ArrayList<Option>();
        optionList.add(new Option("제목+내용", 0));
        optionList.add(new Option("제목", 1));
        optionList.add(new Option("내용", 2));
        optionList.add(new Option("작성자", 3));
        optionList.add(new Option("회원번호", 4));
        model.addAttribute("optionList", optionList);

        return "/admin/pages/mailboxQna";
    }

    @GetMapping("/pages/profile")
    public String userProfile(@RequestParam("userNo") int userNo, Model model, Page page, Option option)
            throws Exception {
        // user 정보 가져오기
        Users user = userService.selectUserNo(userNo);
        List<UserAuth> authList = user.getAuthList();
        String userAuth = "";
        for (int i = 0; i < authList.size(); i++) {
            String auth = authList.get(i).getAuth();
            if (auth.equals("ROLE_GUEST")) {
                user.setBlack(true);
            }
            userAuth += auth;
            if (i + 1 < authList.size()) {
                userAuth += ", ";
            }
        }
        user.setAuth(userAuth);
        model.addAttribute("user", user);

        // 프로필 이미지 가져오기
        Integer fileNo = fileService.profileSelect(userNo);
        if (fileNo > 0) {
            Files file = fileService.select(fileNo);
            model.addAttribute("file", file);
            log.info("file : " + file);

        } else {
            Files file = new Files();
            file.setFileNo(0);
            model.addAttribute("file", file);
        }

        // model.addAttribute("user", user);
        // return "page/mypage/profile";
        //

        // 결제 금액 가져오기
        Pay pay = payService.totalPrice(userNo);
        if (pay != null) {
            int totalPrice = pay.getTotalPrice();
            model.addAttribute("totalPrice", totalPrice);
        } else {
            int totalPrice = 0;
            model.addAttribute("totalPrice", totalPrice);
        }

        // 작성글 정보 가져오기
        List<StarBoard> starBoard = starService.promotionList(userNo, page, option);
        int boardTotal = 0;
        if (starBoard != null && !starBoard.isEmpty()) {
            boardTotal = starBoard.size();
        } else {
            boardTotal = 0;
        }
        model.addAttribute("boardTotal", boardTotal);

        // 작성 댓글 정보 가져오기
        List<Reply> replyList = replyService.selectUser(userNo);
        int replyTotal = 0;
        if (replyList != null && !replyList.isEmpty()) {
            replyTotal = replyList.size();
            model.addAttribute("replyTotal", replyTotal);
        } else {
            model.addAttribute("replyTotal", replyTotal);
        }

        // 메세지 가져오기
        List<Message> messageList = messageService.getMessageByUser(userNo);
        model.addAttribute("messageList", messageList);
        // if(messageList != null && !messageList.isEmpty()){
        // model.addAttribute("messageList", messageList);
        // } else {
        // messageList = [];
        // model.addAttribute("messageList", messageList);
        // }
        return "/admin/pages/profile";
    }

    @PostMapping("/pages/profileUpdate")
    public String profileUpdate(Users user) throws Exception {
        int result = userService.update(user);
        log.info("수정 : " + user);
        int userNo = user.getUserNo();
        String email = user.getEmail();
        String auth = user.getAuth();
        log.info("auth" + auth);
        if (auth != null) {
            user.setAuth("ROLE_GUEST");
        } else {
            user.setAuth("ROLE_USER");
        }
        int result2 = userService.authUpdate(user);
        log.info("회원 권한 수정 성공 : " + result2);
        if (result > 0) {
            log.info("수정성공");
            return "redirect:/admin/pages/profile?userNo=" + userNo;
        }
        log.info("수정 실패");
        return "redirect:/admin/pages/profile?error";
    }

    // 전체 게시판 삭제
    @PostMapping("/pages/mailbox/allDelete")
    public String allDelete(@RequestParam("starNos") String starNos, @RequestParam("page") String page)
            throws Exception {

        int result = 0;

        result = starService.delete(starNos);

        if (result > 0) {
            return "redirect:/admin/pages/" + page;
        }
        return "redirect:/admin/pages/" + page; // 삭제 실패시에도 같은 페이지로 리디렉션
    }

    // Q&A 게시판
    @PostMapping("/pages/mailbox/qnaDelete")
    public String qnaDelete(@RequestParam("qnaNos") String qnaNos) throws Exception {

        int result = 0;
        result = qnaService.delete(qnaNos);

        if (result > 0) {
            return "redirect:/admin/pages/mailboxQna";
        }
        return "redirect:/admin/pages/mailboxQna"; // 삭제 실패시에도 같은 페이지로 리디렉션
    }

    @PostMapping("/insertToAdmin")
    public ResponseEntity<String> insertPro(@RequestBody Message messageDTO, HttpSession session) {
        Users user = (Users) session.getAttribute("user");
        if (user == null) {
            return ResponseEntity.status(401).body("User not authenticated");
        }

        if (messageDTO.getContent() == null || messageDTO.getContent().isEmpty()) {
            return ResponseEntity.status(400).body("Content cannot be null or empty");
        }

        int userNo = user.getUserNo();
        Message message = new Message();
        message.setContent(messageDTO.getContent());
        message.setCode(messageDTO.getCode());
        message.setPayNo(0);
        message.setQnaNo(0);
        message.setReplyNo(0);
        message.setUserNo(userNo);

        int result = messageService.insertMessage(message);
        if (result > 0) {

            log.info("Insert successful!");
            return ResponseEntity.ok("Message saved successfully");
        }
        return ResponseEntity.status(500).body("Failed to save message");
    }

    @GetMapping("/{messageNo}")
    public Message getMessage(@PathVariable int messageNo, Model model) {

        return messageService.getMessageById(messageNo);
    }

    @PutMapping("/")
    public void updateMessage(@RequestBody Message messageDTO) {
        messageService.updateMessage(messageDTO);
    }

    @DeleteMapping("/{messageNo}")
    public void deleteMessage(@PathVariable int messageNo) {
        messageService.deleteMessage(messageNo);
    }

    @GetMapping("/getMessagesByUser")
    public ResponseEntity<List<Message>> getMessagesByUser(HttpSession session) {
        Users user = (Users) session.getAttribute("user");
        if (user == null) {
            return ResponseEntity.status(401).build();
        }

        int userNo = user.getUserNo();
        List<Message> messages = messageService.getMessageByUser(userNo);
        return ResponseEntity.ok(messages);
    }

    @GetMapping("/pages/gallery")
    public String gallery(String type, @RequestParam(value = "status", defaultValue = "0") int status, Model model,
            Page page,
            Option option) throws Exception {

        type = "starCard";
        List<StarBoard> starList = starService.adminStarCard(type, page, option, status);
        log.info("option.code : " + option.getCode());
        model.addAttribute("starList", starList);
        model.addAttribute("page", page);
        model.addAttribute("option", option);
        model.addAttribute("status", status);

        List<Option> optionList = new ArrayList<Option>();
        optionList.add(new Option("제목+내용", 0));
        optionList.add(new Option("제목", 1));
        optionList.add(new Option("내용", 2));
        optionList.add(new Option("작성자", 3));
        model.addAttribute("optionList", optionList);

        return "/admin/pages/gallery";
    }

    // 홍보 승인
    @PostMapping("/pages/gallery/approve")
    public String starApprove(@RequestParam("starNos") String starNos, @RequestParam("page") String page)
            throws Exception {

        int result = 0;

        result = starService.approve(starNos);

        if (result > 0) {
            log.info("홍보 승인---------------");
            return "redirect:/admin/pages/" + page;
        }
        return "redirect:/admin/pages/" + page; // 삭제 실패시에도 같은 페이지로 리디렉션
    }

    // 홍보 반려
    @PostMapping("/pages/gallery/companion")
    public String starCompanion(@RequestParam("starNos") String starNos, @RequestParam("page") String page)
            throws Exception {

        int result = 0;

        result = starService.companion(starNos);

        if (result > 0) {
            log.info("홍보 반려---------------");
            return "redirect:/admin/pages/" + page;
        }
        return "redirect:/admin/pages/" + page; // 삭제 실패시에도 같은 페이지로 리디렉션
    }

    @GetMapping("/pages/adminStarRead")
    public String adminStarRead(@RequestParam("starNo") int starNo, Model model) throws Exception {
        StarBoard starBoard = starService.select(starNo);
        // 조회수 증가
        // starService.views(starNo);
        int commentCount;
        if (starNo > 0) {
            commentCount = replyService.countByStarNo(starBoard.getStarNo());
        } else {
            commentCount = 0;
        }
        starBoard.setCommentCount(commentCount);
        // 카테고리 한글화
        HashMap<String, String> categoryMap = new HashMap<>();
        categoryMap.put("game", "게임");
        categoryMap.put("music", "음악");
        categoryMap.put("travel", "여행");
        categoryMap.put("food", "음식");
        categoryMap.put("animal", "동물");
        categoryMap.put("workout", "운동");
        categoryMap.put("asmr", "ASMR");
        categoryMap.put("fashion", "패션");

        // 받아온 카테고리2를 콤마로 분리하여 변환된 한글 카테고리들을 저장할 리스트
        List<String> koreanCategories = new ArrayList<>();

        // 콤마로 분리된 카테고리들을 배열로 저장
        String[] categories = starBoard.getCategory2().split(",");

        // 각 카테고리를 변환하여 리스트에 추가
        for (String category : categories) {
            // 카테고리명이 맵에 있는 경우 변환한 값을 리스트에 추가
            if (categoryMap.containsKey(category)) {
                koreanCategories.add(categoryMap.get(category));
            } else {
                // 맵에 없는 경우 그대로 추가
                koreanCategories.add(category);
            }
        }

        starBoard.setCategory2(String.join(",", koreanCategories));

        model.addAttribute("starBoard", starBoard);
        return "admin/pages/adminStarRead";
    }

    @GetMapping("/pages/design")
    public String design(String type, @RequestParam(value = "status", defaultValue = "4") int status, Model model,
            Page page,
            Option option) throws Exception {
        // int status=4;
        type = "design";
        log.info(type);
        List<StarBoard> starList = starService.list(type, page, option, 4);
        List<StarBoard> starDesign = new ArrayList<>();
        for (StarBoard starBoard : starList) {
            log.info(starBoard.getCard());
            if (starBoard.getCard().equals("디자인의뢰")) {
                starDesign.add(starBoard);
            }
        }
        model.addAttribute("starDesign", starDesign);
        model.addAttribute("page", page);
        model.addAttribute("option", option);

        List<Option> optionList = new ArrayList<Option>();
        optionList.add(new Option("제목+내용", 0));
        optionList.add(new Option("제목", 1));
        optionList.add(new Option("내용", 2));
        optionList.add(new Option("작성자", 3));
        model.addAttribute("optionList", optionList);

        return "/admin/pages/design";
    }
    
    @GetMapping("/pages/adminDesign")
    public String adminDesign(@RequestParam("starNo") int starNo, Model model, HttpSession session) throws Exception {

        Users user = (Users) session.getAttribute("user");

        StarBoard starBoard = null;
        if (user != null) {
            int userNo = user.getUserNo();
            starBoard = starService.select(starNo,userNo);
        } else {
            starBoard = starService.select(starNo);
        }
        
        int commentCount = replyService.countByStarNo(starBoard.getStarNo());
        starBoard.setCommentCount(commentCount);
        starService.views(starNo);

        model.addAttribute("starBoard", starBoard);
        return "/admin/pages/adminDesign";
    }

    
}
