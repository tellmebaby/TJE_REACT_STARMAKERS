package com.aloha.server.controller;

import java.text.NumberFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.aloha.server.dto.CustomUser;
import com.aloha.server.dto.Files;
import com.aloha.server.dto.Option;
import com.aloha.server.dto.Page;
import com.aloha.server.dto.QnaBoard;
import com.aloha.server.dto.StarBoard;
import com.aloha.server.dto.StarUser;
import com.aloha.server.dto.Users;
import com.aloha.server.service.FileService;
import com.aloha.server.service.LikeService;
import com.aloha.server.service.ReplyService;
import com.aloha.server.service.StarService;
import com.aloha.server.service.UserService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin(origins = "*")
@RestController
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

    // -------------- (select, put, delete) 게시판 공통 사용 --------------

    /**
     * 글 1개 조회 (select)
     * 
     * @param starNo
     * @param model
     * @return
     * @throws Exception
     */
    @GetMapping("/{no}")
    public ResponseEntity<?> select(@AuthenticationPrincipal CustomUser customUser,
            @PathVariable("no") Integer starNo) throws Exception {

        log.info("starNo ? " + starNo);
        Users user = new Users();
        StarBoard starBoard = null;
        if (customUser != null) {
            user = customUser.getUser();
            // StarBoard starBoard = starService.select(starNo);
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

        log.info("게시글 정보 : " + starBoard.toString());
        // 값 넘겨주기
        Map<String, Object> response = new HashMap<>();
        response.put("starBoard", starBoard);

        return new ResponseEntity<> (response, HttpStatus.OK);
    }

    /**
     * 게시글 수정(update)
     * 
     * @param starBoard
     * @param customUser
     * @param file
     * @return
     * @throws Exception
     */
    @PutMapping("/updateBoard")
    public ResponseEntity<?> update(StarBoard starBoard,
            @AuthenticationPrincipal CustomUser customUser,
            MultipartFile file) throws Exception {

        // Users user = customUser.getUser();
        // int userNo = user.getUserNo();
        int starNo = starBoard.getStarNo();
        int result = starService.update(starBoard);
        log.info("수정 결과 :" + result);

        // 데이터 처리 성공
        if (result > 0) {
            // 파일 처리 로직

            if (file != null && !file.isEmpty()) { // file이 있을 경우 실행
                // 기존에 올라간 파일 삭제
                // 1. starNo로 기존에 올라가있는 파일 있는지 확인하고 있으면 파일 값 가져오기
                // 2. starNo로 등록 된 파일 삭제
                // 3. starNo로 새로운 파일 등록
                log.info("새로 등록된 파일 있음");
                Files file2 = new Files();
                file2.setStarNo(starNo);
                fileService.deleteByParent(file2); // 기존 파일 삭제

                fileService.upload(file, starNo, 1); // file 등록
            } else {
                log.info("새로 등록된 파일 없음");
            }

            return new ResponseEntity<>("게시글 수정 완료", HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    /**
     * 글 1개 삭제 (delete)
     * 
     * @param starNo
     * @return
     * @throws Exception
     */
    // @PostMapping("/board/eventBoard/delete")
    @DeleteMapping("/{no}")
    public ResponseEntity<?> delete(@PathVariable("no") Integer starNo) throws Exception {
        String starNos = starNo + "";
        int result = starService.delete(starNos);
        if (result > 0) {
            log.info("게시글 삭제 완료");
            Files file = new Files();
            file.setStarNo(starNo);
            fileService.deleteByParent(file);
        } else {
            log.info("삭제 실패");
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 게시물 조회 통합
    @GetMapping("/starCard/List")
    public ResponseEntity<?> List(
            @RequestParam(value = "type", required = false) String type,
            Page page,
            Option option) throws Exception {

        try {
            List<StarBoard> starList = starService.list(type, page, option);

            Map<String, Object> response = new HashMap<>();
            response.put("starList", starList);
            response.put("page", page);
            response.put("option", option);

            List<Option> optionList = new ArrayList<Option>();
            optionList.add(new Option("제목+내용", 0));
            optionList.add(new Option("제목", 1));
            optionList.add(new Option("내용", 2));
            optionList.add(new Option("작성자", 3));
            response.put("optionList", optionList);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // --------------------------------------------------------------------------

    /**
     * 홍보 달력 가져오기
     * 
     * @param type
     * @param page
     * @param session
     * @param option
     * @return
     */
    @GetMapping("/getStarCalendar")
    public ResponseEntity<?> getStarCalendarList(Page page,
            @AuthenticationPrincipal CustomUser customUser,
            Option option) {
        Users user = customUser.getUser();
        // Users user = new Users();
        String type = "starCard";
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

        return new ResponseEntity<>(starList, HttpStatus.OK);
    }

    /**
     * 글 등록 요청(insert)
     * 
     * @param model
     * @param starBoard
     * @param username
     * @return
     * @throws Exception
     */
    @PostMapping("/starCard")
    public ResponseEntity<?> insertPro(StarBoard starBoard,
            @RequestParam(value = "image", required = false) MultipartFile file)
            throws Exception {

        StarBoard newBoard = starService.insert(starBoard); // starBoard 등록
        int starNo = newBoard.getStarNo();
        // 파일 처리
        // if (file != null) {
        // for (MultipartFile file : files) {
        // fileService.upload(file, starNo, userNo); // file 등록
        // }
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

    /**
     * 홍보 게시판 목록 조회(list)
     * 
     * @param type
     * @param keyword
     * @param params
     * @param page
     * @param model
     * @param session
     * @param option
     * @return
     * @throws Exception
     */
    @GetMapping("/starCard")
    public ResponseEntity<?> cardList(
            @RequestParam(value = "keyword", required = false) String keyword,
            @RequestParam Map<String, String> params, // 모든 요청 파라미터를 받아오기 위한 Map
            @AuthenticationPrincipal CustomUser customUser,
            Page page,
            Option option) throws Exception {
        Users user = customUser.getUser();
        // Users user = new Users();
        // List<StarBoard> starList = null;
        // List<StarBoard> starList = starService.list("starCard", page, option);
        page.setRows(12 * 4);

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
        List<StarBoard> starList;
        if (user != null) {
            int userNo = user.getUserNo();
            starList = starService.list("starCard", page, option, userNo);
        } else {
            starList = starService.list("starCard", page, option);
        }

        starList.forEach(star -> {
            if (star.getCategory1() != null) {
                List<String> icons = Arrays.stream(star.getCategory1().split(","))
                        .collect(Collectors.toList());
                star.setIcons(icons); // star 객체에 아이콘 리스트를 설정
            }
        });

        Map<String, Object> response = new HashMap<>();
        response.put("starList", starList);
        response.put("starList", starList);
        response.put("page", page);
        response.put("option", option);

        return new ResponseEntity<>(response, HttpStatus.OK);
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

        return new ResponseEntity<>(starList, HttpStatus.OK);
    }

    /**
     * 결제 버튼 클릭 시
     * 
     * @param starNo
     * @param model
     * @return
     * @throws Exception
     */
    @GetMapping("/starPayment/{no}")
    public ResponseEntity<?> payment(@PathVariable("no") Integer starNo, @AuthenticationPrincipal CustomUser customUser)
            throws Exception {
        Map<String, Object> response = new HashMap<>();
        Users user = customUser.getUser();

        if (user != null) {
            response.put("user", user);
        }
        StarBoard starBoard = starService.select(starNo);

        Date strDate = starBoard.getStartDate();
        Date endDate = starBoard.getEndDate();
        int dif = (int) ((endDate.getTime() - strDate.getTime()) / (24 * 60 * 60 * 1000));
        int price = dif * 1000; // 결제 금액
        response.put("dif", dif);
        response.put("price", price);

        price = (int) (dif * 1000); // 결제 금액
        NumberFormat format = NumberFormat.getInstance();
        String formattedPrice = format.format(price);
        response.put("formattedPrice", formattedPrice);

        response.put("starBoard", starBoard);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/starPayment")
    public ResponseEntity<?> paymentPro(StarBoard starBoard,
            @RequestParam(value = "image", required = false) MultipartFile file,
            @AuthenticationPrincipal CustomUser customUser) throws Exception {
        // 결제 버튼 클릭 시,
        // 홍보글 정보 insert로 db등록
        // 등록한 정보에서 날짜 출력하여 홍보 일수 계산

        // StarBoard starBoard1 = starBoard;
        StarBoard newBoard;
        // if (newBoard != null) {
        // starBoard.setCard("유료홍보");
        // newBoard = starService.insert(starBoard);
        // }

        Date strDate = starBoard.getStartDate();
        Date endDate = starBoard.getEndDate();
        int dif = (int) ((endDate.getTime() - strDate.getTime()) / (24 * 60 * 60 * 1000));
        int price = dif * 1000; // 결제 금액
        Map<String, Object> response = new HashMap<>();
        response.put("dif", dif);
        response.put("price", price);

        Users user = customUser.getUser();
        int userNo = user.getUserNo();
        String userName = user.getName();
        response.put("userName", userName);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * 홍보 글 1개 조회
     * 
     * @param starNo
     * @param model
     * @return
     * @throws Exception
     */
    @GetMapping("/starCard/{no}")
    public ResponseEntity<?> select(@PathVariable("no") Integer starNo) throws Exception {
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

        return new ResponseEntity<>(starBoard, HttpStatus.OK);
    }

    /**
     * 홍보 글 수정.. 없어도 될 것 같기도
     * 
     * @param starBoard
     * @param file
     * @param customUser
     * @return
     * @throws Exception
     */
    @PutMapping("/starCard")
    public ResponseEntity<?> updatePro(StarBoard starBoard,
            @RequestParam(value = "image", required = false) MultipartFile file,
            @AuthenticationPrincipal CustomUser customUser) throws Exception {

        int result = starService.update(starBoard);
        int starNo = starBoard.getStarNo();

        Users user = customUser.getUser();
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
                log.info("새로 등록된 파일 없음");
            }
            return new ResponseEntity<>("게시글 수정 성공", HttpStatus.OK);
        }

        return new ResponseEntity<>("게시글 수정 실패", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // 아래부터 event 게시판 ---------------------------------------------------------

    /**
     * 이벤트 게시판 목록 조회
     * 
     * @param page
     * @param option
     * @return
     * @throws Exception
     */
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

    /**
     * 글 작성
     * 
     * @param starBoard
     * @param file
     * @param customUser
     * @return
     * @throws Exception
     */
    @PostMapping("/event")
    public ResponseEntity<?> eventInsertPro(StarBoard starBoard,
            @RequestParam(value = "image", required = false) MultipartFile file,
            @AuthenticationPrincipal CustomUser customUser)
            throws Exception {
        // 타입 추가 - 게시판에서 insert할 때 추가하기
        starBoard.setType("event");
        // Users user = customUser.getUser();
        Users user = new Users(); // 커스텀 유저 되기 전에 임시로 해놓은 유저
        user.setUserNo(1);
        int userNo = user.getUserNo();
        starBoard.setUserNo(userNo);
        StarBoard newBoard = starService.insert(starBoard); // starBoard 등록
        int starNo = newBoard.getStarNo();

        if (starNo > 0) {
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

    // 아래부터 review 게시판 ---------------------------------------------------------

    /**
     * review 게시판 List 조회
     * 
     * @param page
     * @param option
     * @return
     * @throws Exception
     */
    @GetMapping("/review")
    public ResponseEntity<?> reviewList(Page page, Option option) throws Exception {

        List<StarBoard> starList = starService.list("review", page, option);
        Map<String, Object> response = new HashMap<>();
        response.put("starList", starList);
        for (StarBoard starBoard : starList) {
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

    /**
     * 후기 글 작성(insert)
     * 
     * @param starBoard
     * @return
     * @throws Exception
     */
    @PostMapping("/review")
    public ResponseEntity<?> reviewInsert(StarBoard starBoard) throws Exception {
        starBoard.setType("review");
        StarBoard newBoard = starService.insert(starBoard);
        // 리다이렉트
        // 데이터 처리 성공
        if (newBoard != null) {
            return new ResponseEntity<>(newBoard, HttpStatus.CREATED);
        }

        // 데이터 처리 실패
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // 아래부터 공지게시판

    /**
     * 공지 게시판 목록 조회
     * 
     * @param page
     * @param option
     * @return
     * @throws Exception
     */
    @GetMapping("/an")
    public ResponseEntity<?> anList(Page page, Option option) throws Exception {

        List<StarBoard> starList = starService.list("an", page, option);
        Map<String, Object> response = new HashMap<>();
        response.put("starList", starList);
        for (StarBoard starBoard : starList) {
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

    /**
     * 글 작성(insert)
     * 
     * @param starBoard
     * @return
     * @throws Exception
     */
    @PostMapping("/insertBoard")
    public ResponseEntity<?> anInsertPro(StarBoard starBoard) throws Exception {
        StarBoard newBoard = starService.insert(starBoard);
        // 리다이렉트
        // 데이터 처리 성공
        if (newBoard != null) {
            log.info("글 정보" + newBoard.toString());
            return new ResponseEntity<>(newBoard, HttpStatus.CREATED);
        }

        // 데이터 처리 실패
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
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
    public ResponseEntity<?> getMainStarList(@AuthenticationPrincipal CustomUser customUser) throws Exception {
        log.info("시작이야");
        String type = "starCard";
        if (customUser != null) {
            Users user = customUser.getUser();
            if (user != null) {
                log.info("유저정보가 있어" + user);
                int userNo = user.getUserNo();
                List<StarBoard> starCardList = starService.getMainCardListForLoggedInUser(userNo, type);
                return new ResponseEntity<>(starCardList, HttpStatus.OK);
            }
        }
        // 로그인 안했잖아 그래도 줄게 카드리스트
        List<StarBoard> starCardList = starService.mainCardList(type);
        log.info("성공했어 데이터를 가져왔어 : " + starCardList.size());
        return new ResponseEntity<>(starCardList, HttpStatus.OK);
    }

    // @GetMapping("/starMember")
    // @ResponseBody
    // public List<StarUser> starMember() throws Exception {
    // return userService.starMemberList();
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
    // return userService.newMemberList();
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
    public ResponseEntity<?> getMypageStarList(@AuthenticationPrincipal CustomUser customUser) throws Exception {
        Users user = customUser.getUser();
        if (user != null) {
            log.info("유저정보가 있어" + user);
            int userNo = user.getUserNo();
            List<StarBoard> myStar = starService.getStarCardsByUserNo(userNo);
            return new ResponseEntity<>(myStar, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

}