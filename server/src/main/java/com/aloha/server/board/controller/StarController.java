package com.aloha.server.board.controller;

import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.aloha.server.board.dto.Files;
import com.aloha.server.board.dto.Option;
import com.aloha.server.board.dto.Page;
import com.aloha.server.board.dto.StarBoard;
import com.aloha.server.board.service.FileService;
import com.aloha.server.board.service.LikeService;
import com.aloha.server.board.service.ReplyService;
import com.aloha.server.board.service.StarService;
import com.aloha.server.user.dto.CustomUser;
import com.aloha.server.user.dto.StarUser;
import com.aloha.server.user.dto.Users;

import com.aloha.server.user.service.UserService;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;


@Slf4j
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/page")
public class StarController {

    @Autowired
    private StarService starService;

    @Autowired
    private FileService fileService;

    @Autowired
    private LikeService likeService;

    @Autowired
    private UserService userService;

    @Autowired
    private ReplyService replyService;


    @GetMapping("/starCard/starCalendar")
    public String starCalendarList() {
        // public String starCalendarList(@RequestParam(value = "type", defaultValue =
        // "starCard") String type, Model model,
        // Page page, HttpSession session, Option option) throws Exception {

        // Users user = (Users) session.getAttribute("user");

        // List<StarBoard> starList = null;

        // page.setRows(5);

        // if (user != null) {
        // int userNo = user.getUserNo();
        // starList = starService.getStarList(type, page, option, userNo);
        // } else {
        // log.info("::::::::::찾았다 요놈!");
        // starList = starService.list(type, page, option);
        // }

        // starList.forEach(star -> {
        // if (star.getCategory1() != null) {
        // List<String> icons = Arrays.stream(star.getCategory1().split(","))
        // .collect(Collectors.toList());
        // star.setIcons(icons); // star 객체에 아이콘 리스트를 설정
        // }
        // });

        // // ObjectMapper mapper = new ObjectMapper();
        // // String starListJson = mapper.writeValueAsString(starList);
        // model.addAttribute("starList", starList);

        return "/page/starCard/starCalendar";
    }

    /**
     * 홍보 달력 가져오기
     * @param type
     * @param page
     * @param session
     * @param option
     * @return
     */
    @GetMapping("/getStarCalendar")
    public List<StarBoard> getStarCalendarList(
            @RequestParam(value = "type", defaultValue = "starCard") String type,
            Page page,
            HttpSession session,
            Option option) {
        Users user = (Users) session.getAttribute("user");
        List<StarBoard> starList = null;
        page.setRows(5);

        try {
            if (user != null) {
                int userNo = user.getUserNo();
                starList = starService.getStarList(type, page, option, userNo);
            } else {
                log.info("사용자 정보를 찾을 수 없습니다.");
                starList = starService.list(type, page, option);
            }

            starList.forEach(star -> {
                if (star.getCategory1() != null) {
                    List<String> icons = Arrays.stream(star.getCategory1().split(","))
                            .collect(Collectors.toList());
                    star.setIcons(icons); // star 객체에 아이콘 리스트를 설정
                }
            });
        } catch (Exception e) {
            log.error("별 리스트를 가져오는 중 오류가 발생했습니다.", e);
            // 예외 처리를 수행하거나 사용자에게 적절한 오류 페이지를 보여줄 수 있습니다.
            // 예: return "errorPage";
        }

        return starList;
    }

    /**
     * 글 등록 요청
     * 
     * @param model
     * @param starBoard
     * @param username
     * @return
     * @throws Exception
     */
    @PostMapping("/starInsert")
    public ResponseEntity<?> insertPro(StarBoard starBoard,
            @RequestParam(value = "image", required = false) MultipartFile file)
            throws Exception {
        
        
        StarBoard newBoard = starService.insert(starBoard); // starBoard 등록
        int starNo = newBoard.getStarNo();
        // 파일 처리
        // if (file != null) {
        //     for (MultipartFile file : files) {
        //         fileService.upload(file, starNo, userNo); // file 등록
        //     }
        // }


        // Users user = (Users) session.getAttribute("user");
        // int userNo = user.getUserNo();

        // 리다이렉트
        // 데이터 처리 성공
        if (starNo > 0) {
            // 파일 처리 로직
            if (file != null && !file.isEmpty()) {
                fileService.upload(file, starNo, 1); // file 등록
            }
            return new ResponseEntity<>(newBoard, HttpStatus.CREATED);
        }

        // 데이터 처리 실패
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/starCard/starList")
    public String cardList(
            @RequestParam(value = "type", defaultValue = "starCard") String type,
            @RequestParam(value = "keyword", required = false) String keyword,
            @RequestParam Map<String, String> params, // 모든 요청 파라미터를 받아오기 위한 Map
            Page page,
            Model model,
            HttpSession session,
            Option option) throws Exception {

        Users user = (Users) session.getAttribute("user");

        List<StarBoard> starList = null;
        // page.setRows(12 * 4);

        // URL 파라미터로 받은 옵션 값 설정
        params.forEach((key, value) -> {
            if (value.equals("true")) {
                option.setCategory(key, true);
            }
        });

        // 키워드가 있을 경우 검색 조건에 추가
        if (keyword != null && !keyword.isEmpty()) {
            log.info("::::::::::검색어 들어왔다 " + keyword);
            option.setKeyword(keyword);
        }

        if (user != null) {
            int userNo = user.getUserNo();
            starList = starService.list(type, page, option, userNo);
        } else {
            starList = starService.list(type, page, option);
        }

        starList.forEach(star -> {
            if (star.getCategory1() != null) {
                List<String> icons = Arrays.stream(star.getCategory1().split(","))
                        .collect(Collectors.toList());
                star.setIcons(icons); // star 객체에 아이콘 리스트를 설정
            }
        });

        model.addAttribute("starList", starList);
        model.addAttribute("page", page);
        model.addAttribute("option", option);

        return "/page/starCard/starList";
    }

    // 추가 화면 설정
    @GetMapping("/starCard/starList/api")
    public ResponseEntity<List<StarBoard>> getMoreCards(
            @RequestParam(value = "type", defaultValue = "starCard") String type,
            Page page,
            Option option,
            HttpSession session, Model model) throws Exception {
        Users user = (Users) session.getAttribute("user");
        List<StarBoard> starList;

        page.setRows(24); // 한 번에 불러올 행 수 설정

        if (user != null) {
            int userNo = user.getUserNo();
            starList = starService.getStarList(type, page, option, userNo);
        } else {
            log.info("::::::::::찾았다 요놈!");
            starList = starService.list(type, page, option);
        }

        starList.forEach(star -> {
            if (star.getCategory1() != null) {
                List<String> icons = Arrays.stream(star.getCategory1().split(","))
                        .collect(Collectors.toList());
                star.setIcons(icons); // star 객체에 아이콘 리스트를 설정
            }
        });

        // 승인 글만 리스트로 출력
        // List<StarBoard> starList2 = new ArrayList();
        // for (StarBoard starBoard : starList) {
        // if(starBoard.getStatus() == "승인" || starBoard.getStatus().equals("승인")){
        // starList2.add(starBoard);
        // log.info(starBoard.getStatus());
        // }
        // }

        return ResponseEntity.ok(starList);
    }

    /**
     * 결제 버튼 클릭 시
     * 
     * @param starNo
     * @param model
     * @return
     * @throws Exception
     */
    @GetMapping("/starCard/starPayment")
    public String payment(@RequestParam("starNo") int starNo, Model model, HttpSession session) throws Exception {

        Users user = (Users) session.getAttribute("user");

        if (user != null) {
            model.addAttribute("user", user);
        }
        StarBoard starBoard = starService.select(starNo);

        Date strDate = starBoard.getStartDate();
        Date endDate = starBoard.getEndDate();
        int dif = (int) ((endDate.getTime() - strDate.getTime()) / (24 * 60 * 60 * 1000));
        int price = dif * 1000; // 결제 금액
        model.addAttribute("dif", dif);
        model.addAttribute("price", price);

        price = (int) (dif * 1000); // 결제 금액
        NumberFormat format = NumberFormat.getInstance();
        String formattedPrice = format.format(price);
        model.addAttribute("formattedPrice", formattedPrice);

        model.addAttribute("starBoard", starBoard);
        return "/page/starCard/starPayment";
    }

    @PostMapping("/starCard/starPayment")
    public String paymentPro(StarBoard starBoard, String username, Model model,
            @RequestParam(value = "image", required = false) MultipartFile file,
            HttpSession session) throws Exception {
        // 결제 버튼 클릭 시,
        // 홍보글 정보 insert로 db등록
        // 등록한 정보에서 날짜 출력하여 홍보 일수 계산

        // StarBoard starBoard1 = starBoard;
        StarBoard newBoard;
        // if (newBoard != null) {
        //     starBoard.setCard("유료홍보");
        //     newBoard = starService.insert(starBoard);
        // }

        Date strDate = starBoard.getStartDate();
        Date endDate = starBoard.getEndDate();
        int dif = (int) ((endDate.getTime() - strDate.getTime()) / (24 * 60 * 60 * 1000));
        int price = dif * 1000; // 결제 금액
        model.addAttribute("dif", dif);
        model.addAttribute("price", price);

        Users user = (Users) session.getAttribute("user");
        int userNo = user.getUserNo();
        String userName = user.getName();
        model.addAttribute("userName", userName);
        return userName;

        // 리다이렉트
        // 데이터 처리 성공
        // if (starNo > 0) {
        //     // 파일 처리 로직
        //     if (file != null && !file.isEmpty()) {
        //         fileService.upload(file, starNo, userNo);
        //     }
        //     return "redirect:/page/starCard/starPayment?starNo=" + starNo;
        // }

        // 데이터 처리 실패
        // int no = starBoard.getStarNo();
        // return "redirect:/page/starCard/starInsert?starNo=" + starNo + "&error";

        // model.addAttribute("starBoard1", starBoard1);

    }

    /**
     * 글 1개 조회
     * 
     * @param starNo
     * @param model
     * @return
     * @throws Exception
     */
    @GetMapping("/starCard/starRead")
    public String select(@RequestParam("starNo") int starNo, Model model) throws Exception {
        StarBoard starBoard = starService.select(starNo);
        // 조회수 증가
        starService.views(starNo);
        int commentCount;
        if (starNo > 0) {
            log.info("스타 번호 있는지 볼게요" + starNo);
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
        return "/page/starCard/starRead";
    }


    @PostMapping("/starCard/starUpdate")
    public String updatePro(StarBoard starBoard, String username,
            @RequestParam(value = "image", required = false) MultipartFile file,
            HttpSession session) throws Exception {

        int result = starService.update(starBoard);
        int starNo = starBoard.getStarNo();

        Users user = (Users) session.getAttribute("user");
        int userNo = user.getUserNo();

        // 파일 로직 추가

        // 데이터 처리 성공
        if (result > 0) {
            // 파일 처리 로직

            // log.info(file.toString()+"sadfasdfdsf");

            if (file != null && !file.isEmpty()) { // file이 있을 경우 실행
                // 기존에 올라간 파일 삭제
                // 1. starNo로 기존에 올라가있는 파일 있는지 확인하고 있으면 파일 값 가져오기
                // 2. starNo로 등록 된 파일 삭제
                // 3. starNo로 새로운 파일 등록
                log.info("새로 등록된 파일 있음");
                Files file2 = new Files();
                file2.setStarNo(starNo);
                fileService.deleteByParent(file2); // 기존 파일 삭제

                fileService.upload(file, starNo, userNo); // file 등록
            } else {
                log.info("파일 확인 안 됨");
            }
            return "redirect:/page/starCard/starRead?starNo=" + starNo;
        }

        return "redirect:/page/starCard/starRead?starNo=" + starNo;
    }

    /**
     * 글 1개 삭제
     * 
     * @param starNo
     * @return
     * @throws Exception
     */
    @PostMapping("/starBoard/delete")
    public String starDelete(@RequestParam("starNo") int starNo) throws Exception {
        String starNos = starNo + "";
        int result = starService.delete(starNos);
        if (result > 0) {
            // 첨부파일 삭제
            Files file = new Files();
            file.setStarNo(starNo);
            fileService.deleteByParent(file);
            return "redirect:/page/starCard/starList";
        } else {
            log.info("삭제 실패");
        }
        return "redirect:/page/starCard/starList";

    }

    // 아래부터 event 게시판 ---------------------------------------------------------
    @GetMapping("/event")
    public ResponseEntity<?> eventList(Page page, Option option) throws Exception {

        List<StarBoard> starListEvent = starService.list("event", page, option);
        Map<String, Object> response = new HashMap<>();
        response.put("starListEvent", starListEvent);
        for (StarBoard starBoard : starListEvent) {
            int commentCount = replyService.countByStarNo(starBoard.getStarNo());
            starBoard.setCommentCount(commentCount);
        }

        response.put("page", page);
        response.put("option", option);
        response.put("currentTime", LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        log.info("first Page: " + page.getFirst());
        log.info("List Page: " + page.getLast());
        log.info("Total : " + page.getTotal());

        List<Option> optionList = new ArrayList<Option>();
        optionList.add(new Option("제목+내용", 0));
        optionList.add(new Option("제목", 1));
        optionList.add(new Option("내용", 2));
        optionList.add(new Option("작성자", 3));

        response.put("optionList", optionList);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @PostMapping("/event")
    public ResponseEntity<?> eventInsertPro(StarBoard starBoard,@RequestParam(value = "image", required = false) MultipartFile file, @AuthenticationPrincipal CustomUser customUser)
            throws Exception {
        log.info("이벤트 등록");
        // 타입 추가
        starBoard.setType("event");
        Users user = customUser.getUser();
        int userNo = user.getUserNo();
        starBoard.setUserNo(userNo);
        StarBoard newBoard = starService.insert(starBoard); // starBoard 등록
        int starNo = newBoard.getStarNo();

        if ( starNo>0 ){
            log.info("보드 데이터" + newBoard.toString());
            return new ResponseEntity<>(newBoard, HttpStatus.CREATED);
        }
        // 리다이렉트
        // 데이터 처리 성공
        // 데이터 처리 성공
        if (starNo > 0) {
            // 파일 처리 로직
            if (file != null && !file.isEmpty()) {
                fileService.upload(file, starNo, 1); // file 등록
            }
            return new ResponseEntity<>(newBoard, HttpStatus.CREATED);
        }

        // 데이터 처리 실패
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    /**
     * 글 1개 조회
     * 
     * @param starNo
     * @param model
     * @return
     * @throws Exception
     */
    @GetMapping("/event/{no}")
    public ResponseEntity<?> eventSelect(@AuthenticationPrincipal CustomUser customUser, @PathVariable("no") Integer starNo) throws Exception {

        Users user = customUser.getUser();
        // StarBoard starBoard = starService.select(starNo);
        StarBoard starBoard = null;
        if (user != null) {
            int userNo = user.getUserNo();
            starBoard = starService.select(starNo, userNo);
        } else {
            starBoard = starService.select(starNo);
        }

        // 댓글수
        int commentCount = replyService.countByStarNo(starBoard.getStarNo());
        starBoard.setCommentCount(commentCount);
        // 조회수
        starService.views(starNo);

        // 값 넘겨주기
        Map<String, Object> response = new HashMap<>();
        response.put("starBoard", starBoard);
        
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("event")
    public String putMethodName(StarBoard starBoard) {

        int starNo = starBoard.getStarNo();
        // int result = starService.update(starBoard);
        // log.info("수정 결과 :" + result);

        // Users user = (Users) session.getAttribute("user");
        // int userNo = user.getUserNo();

        // 파일 로직 추가

        // 데이터 처리 성공
        // if (result > 0) {
        //     // 파일 처리 로직

        //     // log.info(file.toString()+"sadfasdfdsf");

        //     if (file != null && !file.isEmpty()) { // file이 있을 경우 실행
        //         // 기존에 올라간 파일 삭제
        //         // 1. starNo로 기존에 올라가있는 파일 있는지 확인하고 있으면 파일 값 가져오기
        //         // 2. starNo로 등록 된 파일 삭제
        //         // 3. starNo로 새로운 파일 등록
        //         log.info("새로 등록된 파일 있음");
        //         Files file2 = new Files();
        //         file2.setStarNo(starNo);
        //         fileService.deleteByParent(file2); // 기존 파일 삭제

        //         fileService.upload(file, starNo, userNo); // file 등록
        //     }
        //     log.info("파일 확인 안 됨");
        //     return "redirect:/page/board/eventBoard/eventPost?starNo=" + starNo;
        // }

        return "redirect:/page/board/eventBoard/eventPost?starNo=" + starNo;
    }

    @PostMapping("/board/eventBoard/eventDelete")
    public String eventDelete(@RequestParam("starNos") String starNos) throws Exception {

        int result = 0;
        result = starService.delete(starNos);

        if (result > 0) {
            return "redirect:/page/mypage/event";
        }

        return "redirect:/page/mypage/event?error"; // 삭제 실패시에도 같은 페이지로 리디렉션

    }

    /**
     * 글 1개 삭제
     * 
     * @param starNo
     * @return
     * @throws Exception
     */
    @PostMapping("/board/eventBoard/delete")
    public String eventDeletePost(@RequestParam("starNo") int starNo) throws Exception {
        String starNos = starNo + "";
        int result = starService.delete(starNos);
        if (result > 0) {
            log.info("삭제 완료");
        } else {
            log.info("삭제 실패");
        }
        return "redirect:/page/board/eventBoard/eventList";
    }

    // 아래부터 review 게시판

    // review 게시판
    /**
     * 글 삭제
     * 
     * @return
     * @throws Exception
     */
    @PostMapping("/review/delete")
    public String reviewDelete(@RequestParam("starNos") String starNos) throws Exception {
        int result = starService.delete(starNos);
        if (result > 0) {
            log.info("삭제 완료");
        } else {
            log.info("삭제 실패");
        }
        return "/page/board/reviewBoard/reviewList";
    }

    @PostMapping("/board/reviewBoard/delete")
    public String reviewDeletePost(@RequestParam("starNo") int starNo) throws Exception {
        String starNos = starNo + "";
        int result = starService.delete(starNos);
        if (result > 0) {
            log.info("삭제 완료");
        } else {
            log.info("삭제 실패");
        }
        return "redirect:/page/board/reviewBoard/reviewList";
    }

    @GetMapping("/board/reviewBoard/reviewList")
    public String reviewList(@RequestParam(value = "type", defaultValue = "review") String type, Model model, Page page,
            Option option) throws Exception {

        List<StarBoard> starListEvent = starService.list("event", page, option);
        model.addAttribute("starListEvent", starListEvent);
        List<StarBoard> starList = starService.list(type, page, option);
        for (StarBoard starBoard : starList) {
            int commentCount = replyService.countByStarNo(starBoard.getStarNo());
            starBoard.setCommentCount(commentCount);
        }
        model.addAttribute("starList", starList);
        model.addAttribute("page", page);
        model.addAttribute("option", option);

        List<Option> optionList = new ArrayList<Option>();
        optionList.add(new Option("제목+내용", 0));
        optionList.add(new Option("제목", 1));
        optionList.add(new Option("내용", 2));
        optionList.add(new Option("작성자", 3));
        model.addAttribute("optionList", optionList);
        return "/page/board/reviewBoard/reviewList";
    }

    @GetMapping("/board/reviewBoard/reviewInsert")
    public String reviewInsert() {

        return "/page/board/reviewBoard/reviewInsert";
    }

    @PostMapping("/board/reviewBoard/reviewInsert")
    public String reviewInsertPro(StarBoard starBoard) throws Exception {
        StarBoard newBoard = starService.insert(starBoard);
        // 리다이렉트
        // 데이터 처리 성공
        int no = starBoard.getStarNo();
        if (newBoard != null) {

            return "redirect:/page/board/reviewBoard/reviewList";
        }

        // 데이터 처리 실패
        return "redirect:/page/board/reviewBoard/reviewInsert?starNo=" + no + "&error";
    }

    /**
     * 글 1개 조회
     * 
     * @param starNo
     * @param model
     * @return
     * @throws Exception
     */
    @GetMapping("/board/reviewBoard/reviewPost")
    public String reviewSelect(@RequestParam("starNo") int starNo, Model model, HttpSession session) throws Exception {
        Users user = (Users) session.getAttribute("user");

        StarBoard starBoard = null;
        if (user != null) {
            int userNo = user.getUserNo();
            starBoard = starService.select(starNo, userNo);
        } else {
            starBoard = starService.select(starNo);
        }

        int commentCount = replyService.countByStarNo(starBoard.getStarNo());
        starBoard.setCommentCount(commentCount);
        starService.views(starNo);

        model.addAttribute("starBoard", starBoard);
        return "/page/board/reviewBoard/reviewPost";
    }

    /**
     * 글 수정 페이지 요청
     * 
     * @param starNo
     * @param model
     * @return
     * @throws Exception
     */
    @GetMapping("/board/reviewBoard/reviewUpdate")
    public String reviewUpdate(@RequestParam("starNo") int starNo, Model model) throws Exception {
        StarBoard starBoard = starService.select(starNo);
        model.addAttribute("starBoard", starBoard);
        return "/page/board/reviewBoard/reviewUpdate";
    }

    @PostMapping("/board/reviewBoard/reviewUpdate")
    public String reviewUpdatePro(StarBoard starBoard) throws Exception {

        int result = starService.update(starBoard);
        if (result > 0) {
            return "redirect:/page/board/reviewBoard/reviewList";
        }
        int no = starBoard.getStarNo();

        return "redirect:/page/board/reviewBoard/reviewUpdate?qnaNo=" + no + "$error";
    }

    // 아래부터 공지게시판
    @GetMapping("/board/anBoard/anList")
    public String anList(@RequestParam(value = "type", defaultValue = "an") String type, Model model, Page page,
            Option option) throws Exception {

        List<StarBoard> starListEvent = starService.list("event", page, option);
        model.addAttribute("starListEvent", starListEvent);
        List<StarBoard> starList = starService.list(type, page, option);
        for (StarBoard starBoard : starList) {
            int commentCount = replyService.countByStarNo(starBoard.getStarNo());
            starBoard.setCommentCount(commentCount);
        }
        model.addAttribute("starList", starList);
        model.addAttribute("page", page);
        model.addAttribute("option", option);

        List<Option> optionList = new ArrayList<Option>();
        optionList.add(new Option("제목+내용", 0));
        optionList.add(new Option("제목", 1));
        optionList.add(new Option("내용", 2));
        optionList.add(new Option("작성자", 3));
        model.addAttribute("optionList", optionList);
        return "/page/board/anBoard/anList";
    }

    @PostMapping("/board/anBoard/anInsert")
    public String anInsertPro(StarBoard starBoard) throws Exception {
        StarBoard newBoard = starService.insert(starBoard);
        // 리다이렉트
        // 데이터 처리 성공
        if (newBoard != null) {
            return "redirect:/page/board/anBoard/anList";
        }

        // 데이터 처리 실패
        int no = starBoard.getStarNo();
        return "redirect:/page/board/anBoard/anInsert?starNo=" + no + "&error";
    }

    /**
     * 글 1개 조회
     * 
     * @param starNo
     * @param model
     * @return
     * @throws Exception
     */
    @GetMapping("/board/anBoard/anPost")
    public String anSelect(@RequestParam("starNo") int starNo, Model model, HttpSession session) throws Exception {
        Users user = (Users) session.getAttribute("user");

        StarBoard starBoard = null;
        if (user != null) {
            int userNo = user.getUserNo();
            starBoard = starService.select(starNo, userNo);
        } else {
            starBoard = starService.select(starNo);
        }

        int commentCount = replyService.countByStarNo(starBoard.getStarNo());
        starBoard.setCommentCount(commentCount);
        starService.views(starNo);

        model.addAttribute("starBoard", starBoard);
        return "/page/board/anBoard/anPost";
    }

    /**
     * 글 수정 페이지 요청
     * 
     * @param starNo
     * @param model
     * @return
     * @throws Exception
     */
    @GetMapping("/board/anBoard/anUpdate")
    public String anUpdate(@RequestParam("starNo") int starNo, Model model) throws Exception {
        StarBoard starBoard = starService.select(starNo);
        model.addAttribute("starBoard", starBoard);
        log.info("수정왜안됨");
        log.info(starBoard.toString());
        return "/page/board/anBoard/anUpdate";
    }

    /**
     * 글 수정
     * 
     * @param starBoard
     * @return
     * @throws Exception
     */
    @PostMapping("/board/anBoard/anUpdate")
    public String anUpdatePro(StarBoard starBoard) throws Exception {

        int result = starService.update(starBoard);
        if (result > 0) {
            return "redirect:/page/board/anBoard/anList";
        }
        int no = starBoard.getStarNo();

        return "redirect:/page/board/anBoard/anUpdate?qnaNo=" + no + "$error";
    }

    /**
     * 글 1개 삭제
     * 
     * @param starNo
     * @return
     * @throws Exception
     */
    @PostMapping("/board/anBoard/delete")
    public String anDeletePost(@RequestParam("starNo") int starNo) throws Exception {
        String starNos = starNo + "";
        int result = starService.delete(starNos);
        if (result > 0) {
            log.info("삭제 완료");
        } else {
            log.info("삭제 실패");
        }
        return "redirect:/page/board/anBoard/anList";
    }

    // @PostMapping("/like")
    // public ResponseEntity<String> like(@RequestParam("userNo") int userNo,
    // @RequestParam("starNo") int starNo) {
    // try {
    // boolean liked = likeService.toggleLike(userNo, starNo);
    // return ResponseEntity.ok(liked ? "Liked" : "Unliked");
    // } catch (Exception e) {
    // return ResponseEntity.status(500).body("An error occurred: " +
    // e.getMessage());
    // }
    // }

    // read 페이지에서 적용되게 하려고 수정해본 것...혹시 몰라 위에 원래 코드는 주석처리 해둠요
    @PostMapping("/like")
    public ResponseEntity<Map<String, Object>> like(@RequestParam("userNo") int userNo,
            @RequestParam("starNo") int starNo) {
        Map<String, Object> response = new HashMap<>();
        try {
            boolean liked = likeService.toggleLike(userNo, starNo);
            response.put("liked", liked);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("error", "An error occurred: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }

    @PostMapping("/checkLike")
    public ResponseEntity<Integer> checkLiked(@RequestBody Map<String, Integer> payload, HttpSession session)
            throws Exception {
        int starNo = payload.get("starNo");
        Users user = (Users) session.getAttribute("user");
        if (user != null) {
            int result = likeService.checkLiked(user.getUserNo(), starNo);
            int likeCheck;
            if (result > 0) {
                likeCheck = 1;
            } else {
                likeCheck = 0;
            }
            // log.info("있나 유저 넘 이랑 스타 넘 : " + user.getUserNo() + "," + starNo + "=" +
            // likeCheck);
            return ResponseEntity.ok(likeCheck);
        }
        return ResponseEntity.ok(0);
    }

    @GetMapping("/mainlist")
    @ResponseBody
    public List<StarBoard> getMainStarList(HttpSession session) throws Exception {
        String type = "starCard";
        Users user = (Users) session.getAttribute("user");
        if (user != null) {
            log.info("유저정보가 있어" + user);
            int userNo = user.getUserNo();
            return starService.getMainCardListForLoggedInUser(userNo, type);
        }
        return starService.mainCardList(type);
    }

    // @GetMapping("/starMember")
    // @ResponseBody
    // public List<StarUser> starMember() throws Exception {
    //     return userService.starMemberList();
    // }

    @GetMapping("/starMember")
    public ResponseEntity<?> starMember() throws Exception {
        try {
            List<StarUser> starMemberList = userService.starMemberList();
            log.info("인기회원 문제없이 불러왔습니다 주인님 불러온 리스트 수: " + starMemberList.size());
            return new ResponseEntity<>(starMemberList, HttpStatus.OK);
        } catch (Exception e) {
            log.info("인기회원 불러오다 문제가 생겨버렸네요 히힉");
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // @GetMapping("/newStarMember")
    // @ResponseBody
    // public List<StarUser> newStarMember() throws Exception {
    //     return userService.newMemberList();
    // }
    @GetMapping("/newStarMember")
    public ResponseEntity<?> newStarMember() throws Exception {
        try {
            List<StarUser> newStarMember = userService.newMemberList();
            log.info("신인회원 문제없이 불러왔습니다 주인님 불러온 리스트 수: " + newStarMember.size());
            return new ResponseEntity<>(newStarMember, HttpStatus.OK);
        } catch (Exception e) {
            log.info("신인회원 불러오다 문제가 생겨버렸네요 히힉 여기는 starController");
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
       
    }


    @GetMapping("/mypageStarlist")
    @ResponseBody
    public List<StarBoard> getMypageStarList(HttpSession session) throws Exception {
        Users user = (Users) session.getAttribute("user");
        if (user != null) {
            log.info("유저정보가 있어" + user);
            int userNo = user.getUserNo();
            return starService.getStarCardsByUserNo(userNo);
        }
        return starService.mainCardList("starCard");
    }

}