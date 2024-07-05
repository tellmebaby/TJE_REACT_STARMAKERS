package com.aloha.server.controller;

import java.text.NumberFormat;
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

        // 카테고리 한글화
        if (starBoard.getCategory2() != null){
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
    
            starBoard.setKoreaCategory2(String.join(",", koreanCategories));
        }

        // log.info("게시글 정보 : " + starBoard.toString());
        // 값 넘겨주기
        Map<String, Object> response = new HashMap<>();
        response.put("starBoard", starBoard);

        return new ResponseEntity<>(response, HttpStatus.OK);
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
    public ResponseEntity<?> insertPro(StarBoard starBoard)
            throws Exception {

        StarBoard newBoard = starService.insert(starBoard); // starBoard 등록
        int starNo = newBoard.getStarNo();

        if (starNo > 0) {
            return new ResponseEntity<>(newBoard, HttpStatus.CREATED);
        }

        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
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

        Users user = customUser.getUser();
        int userNo = user.getUserNo();
        int result = starService.update(starBoard);
        log.info("수정 결과 :" + result);
        log.info("수정한 게시글 : " + starBoard.toString());

        // 데이터 처리 성공
        if (result > 0) {
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
    
            // 각 게시글의 댓글 수 설정
            for (StarBoard starBoard : starList) {
                int commentCount = replyService.countByStarNo(starBoard.getStarNo());
                starBoard.setCommentCount(commentCount);
            }
    
            Map<String, Object> response = new HashMap<>();
            response.put("starList", starList);
            response.put("page", page);
            response.put("option", option);
    
            List<Option> optionList = new ArrayList<>();
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


   


      // 추가 화면 설정
    @GetMapping("/starList/api")
    public ResponseEntity<List<StarBoard>> getMoreCards(
        @RequestParam(value = "type", defaultValue = "starCard") String type,
        Page page,
        Option option, @RequestParam(value = "userNo", required = false) Integer userNo) throws Exception {

    if (option != null) {
        log.info("받아온 옵션값 :::::::::::::::: " + option);
    }

    List<StarBoard> starList;
    page.setRows(24); // 한 번에 불러올 행 수 설정


    if (userNo != null && userNo > 0) {
        starList = starService.getStarList(type, page, option, userNo);
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

    return new ResponseEntity<>(starList, HttpStatus.OK);
}
    // @GetMapping("/starList/api")
    // public ResponseEntity<List<StarBoard>> getMoreCards(
    //         @RequestParam(value = "type", defaultValue = "starCard") String type,
    //         Page page,
    //         Option option, Integer userNo) throws Exception {

    //     if ( option != null ){
    //         log.info("받아온 옵션값 :::::::::::::::: " + option);
    //     }
    //     List<StarBoard> starList;

    //     page.setRows(24); // 한 번에 불러올 행 수 설정

    //     if ( userNo > 0 ) {
    //         starList = starService.getStarList(type, page, option, userNo);
    //     } else {
    //         starList = starService.list(type, page, option);
    //     }

    //     starList.forEach(star -> {
    //         if (star.getCategory1() != null) {
    //             List<String> icons = Arrays.stream(star.getCategory1().split(","))
    //                     .collect(Collectors.toList());
    //             star.setIcons(icons); // star 객체에 아이콘 리스트를 설정
    //         }
    //     });

    //     return new ResponseEntity<>(starList, HttpStatus.OK);
    // }

    /**
     * 결제 버튼 클릭 시
     * 
     * @param starNo
     * @param model
     * @return
     * @throws Exception
     */
    // @GetMapping("/starPayment/{no}")
    // public ResponseEntity<?> payment(@PathVariable("no") Integer starNo,
    // @AuthenticationPrincipal CustomUser customUser)
    // throws Exception {
    // Map<String, Object> response = new HashMap<>();
    // Users user = customUser.getUser();

    // if (user != null) {
    // response.put("user", user);
    // }
    // StarBoard starBoard = starService.select(starNo);

    // Date strDate = starBoard.getStartDate();
    // Date endDate = starBoard.getEndDate();
    // int dif = (int) ((endDate.getTime() - strDate.getTime()) / (24 * 60 * 60 *
    // 1000));
    // int price = dif * 1000; // 결제 금액
    // response.put("dif", dif);
    // response.put("price", price);

    // price = (int) (dif * 1000); // 결제 금액
    // NumberFormat format = NumberFormat.getInstance();
    // String formattedPrice = format.format(price);
    // response.put("formattedPrice", formattedPrice);

    // response.put("starBoard", starBoard);
    // return new ResponseEntity<>(response, HttpStatus.OK);
    // }

    // @PostMapping("/starPayment")
    // public ResponseEntity<?> paymentPro(StarBoard starBoard,
    // @RequestParam(value = "image", required = false) MultipartFile file,
    // @AuthenticationPrincipal CustomUser customUser) throws Exception {
    // // 결제 버튼 클릭 시,
    // // 홍보글 정보 insert로 db등록
    // // 등록한 정보에서 날짜 출력하여 홍보 일수 계산

    // // StarBoard starBoard1 = starBoard;
    // StarBoard newBoard;
    // // if (newBoard != null) {
    // // starBoard.setCard("유료홍보");
    // // newBoard = starService.insert(starBoard);
    // // }

    // Date strDate = starBoard.getStartDate();
    // Date endDate = starBoard.getEndDate();
    // int dif = (int) ((endDate.getTime() - strDate.getTime()) / (24 * 60 * 60 *
    // 1000));
    // int price = dif * 1000; // 결제 금액
    // Map<String, Object> response = new HashMap<>();
    // response.put("dif", dif);
    // response.put("price", price);

    // Users user = customUser.getUser();
    // int userNo = user.getUserNo();
    // String userName = user.getName();
    // response.put("userName", userName);
    // return new ResponseEntity<>(response, HttpStatus.OK);
    // }

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

    @PostMapping("/Starlike")
    public ResponseEntity<String> like(@RequestParam("userNo") int userNo,
    @RequestParam("starNo") int starNo) {
    try {
    boolean liked = likeService.toggleLike(userNo, starNo);
    return ResponseEntity.ok(liked ? "Liked" : "Unliked");
    } catch (Exception e) {
    return ResponseEntity.status(500).body("An error occurred: " +
    e.getMessage());
    }
    }

    // read 페이지에서 적용되게 하려고 수정해본 것...혹시 몰라 위에 원래 코드는 주석처리 해둠요
    
    @PostMapping("/like")
    public ResponseEntity<Map<String, Object>> like(@AuthenticationPrincipal CustomUser customUser, 
                                                    @RequestBody Map<String, Integer> payload) {
        Map<String, Object> response = new HashMap<>();
        try {
            int starNo = payload.get("starNo");
            int userNo = customUser.getUser().getUserNo(); // CustomUser에서 userNo를 가져옴
            boolean liked = likeService.toggleLike(userNo, starNo);
            int likeCount = likeService.likeCount(starNo);
            response.put("liked", liked);
            response.put("likeCount", likeCount);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("error", "An error occurred: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }
    

    @PostMapping("/checkLike")
    public ResponseEntity<Integer> checkLiked(@AuthenticationPrincipal CustomUser customUser,
                                              @RequestBody Map<String, Integer> payload) throws Exception {
        int starNo = payload.get("starNo");
        Users user = customUser.getUser();
        if (user != null) {
            int result = likeService.checkLiked(user.getUserNo(), starNo);
            int likeCheck = (result > 0) ? 1 : 0;
            return ResponseEntity.ok(likeCheck);
        }
        return ResponseEntity.ok(0);
    }

    @GetMapping("/mainlist")
    public ResponseEntity<?> getMainStarList(@AuthenticationPrincipal CustomUser customUser) throws Exception {
        // log.info("시작이야");
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
        // log.info("성공했어 데이터를 가져왔어 : " + starCardList.size());
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
            // log.info("인기회원 문제없이 불러왔습니다 주인님 불러온 리스트 수: " + starMemberList.size());
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
            // log.info("신인회원 문제없이 불러왔습니다 주인님 불러온 리스트 수: " + newStarMember.size());
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

    @GetMapping("/getBanner")
    public ResponseEntity<?> getBanner() throws Exception {

        List<StarBoard> bannerList = starService.getBanner();
        if (bannerList != null) {
            List<StarBoard> filteredBannerList = new ArrayList<>();
            for (StarBoard banner : bannerList) {
                if (banner.getImgNo() != 0) {
                    filteredBannerList.add(banner);
                }
            }
            return new ResponseEntity<>(filteredBannerList, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/getFragByReview")
    public ResponseEntity<?> getFragByReview() throws Exception {

        String type = "review";
        List<StarBoard> reviewList = starService.getFragByType(type);
        if (reviewList != null) {
            List<StarBoard> filteredReviewList = new ArrayList<>();
            for (StarBoard review : reviewList) {
                if (review.getImgNo() != 0) {
                    filteredReviewList.add(review);
                }
            }
            return new ResponseEntity<>(filteredReviewList, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/getFragByEvent")
    public ResponseEntity<?> getFragByEvent() throws Exception {

        String type = "event";
        List<StarBoard> eventList = starService.getFragByType(type);
        if (eventList != null) {
            List<StarBoard> filteredEventList = new ArrayList<>();
            for (StarBoard event : eventList) {
                if (event.getImgNo() != 0) {
                    filteredEventList.add(event);
                }
            }
            return new ResponseEntity<>(filteredEventList, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

}