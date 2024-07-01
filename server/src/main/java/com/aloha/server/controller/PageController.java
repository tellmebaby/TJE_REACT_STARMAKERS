package com.aloha.server.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aloha.server.dto.CustomUser;
import com.aloha.server.dto.Files;
import com.aloha.server.dto.Option;
import com.aloha.server.dto.Page;
import com.aloha.server.dto.Pay;
import com.aloha.server.dto.QnaBoard;
import com.aloha.server.dto.StarBoard;
import com.aloha.server.dto.Users;
import com.aloha.server.service.FileService;
import com.aloha.server.service.PayService;
import com.aloha.server.service.QnaService;
import com.aloha.server.service.ReplyService;
import com.aloha.server.service.StarService;
import com.aloha.server.service.UserService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/mypage")
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

    /**
     * 사용자 조회(CustomUser 아직 안되서 임의로 지정)
     * 
     * @param customUser
     * @return
     */
    @GetMapping("/profile/{email}")
    public ResponseEntity<?> read(@AuthenticationPrincipal CustomUser customUser) {
        try {
            Users user = customUser.getUser();
            log.info("customUser : " + customUser);
            log.info("user : " + user);
            int userNo = user.getUserNo();
            String email = user.getEmail();
            log.info("email : " + email);
            user = userService.read(email);

            Integer fileNo = fileService.profileSelect(userNo);
            log.info("fileNo: " + fileNo); // 파일 번호 로그 추가

            Files file = null;
            if (fileNo != null && fileNo > 0) {
                file = fileService.select(fileNo);
                log.info("file : " + file);
            } else {
                file = new Files();
                file.setFileNo(-1);
                log.info("file123 : " + file);
            }

            // 사용자 정보와 파일 정보를 함께 반환
            Map<String, Object> response = new HashMap<>();
            response.put("user", user);
            response.put("file", file);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            log.info("error : " + e);
            return ResponseEntity.status(500).body("Internal Server Error");
        }
    }

    /**
     * 사용자 수정
     * 
     * @param user
     * @return
     * @throws Exception
     */
    @PutMapping("/profile")
    public ResponseEntity<?> updatePro(@RequestBody Users user) throws Exception {
        log.info("유정 수정 : " + user);
        try {
            int result = userService.update(user);
            log.info("수정 : " + user);
            if (result > 0) {
                log.info("수정 완료 : " + result);
                return new ResponseEntity<>(result, HttpStatus.OK);
            } else {
                log.info("수정 실패" + result);
                return ResponseEntity.status(500).body("Profile update failed");
            }
        } catch (Exception e) {
            log.info("수정 실패 : " + e);
            return ResponseEntity.status(500).body("Internal Server Error");
        }
    }

    /**
     * 사용자 탈퇴
     * 
     * @param customUser
     * @param userNo
     * @return
     * @throws Exception
     */
    @DeleteMapping("/profile/{userNo}")
    public ResponseEntity<?> deletePro(@AuthenticationPrincipal CustomUser customUser,
            @PathVariable("userNo") int userNo) throws Exception {
        try {
            log.info("Received request to delete user with userNo: " + userNo);

            if (customUser == null) {
                log.info("customUser가 null입니다.");
                return ResponseEntity.status(400).body("User not authenticated");
            }
            Users user = customUser.getUser();
            String email = user.getEmail();
            log.info("email : " + email);
            int result = userService.delete(user);
            log.info("번호 : " + user);
            if (result > 0) {
                log.info("번호 : " + user);
                log.info("탈퇴 성공!");
                return new ResponseEntity<>(result, HttpStatus.OK);
            } else {
                log.info("탈퇴 실패!");
                return ResponseEntity.status(500).body("User deletion failed");
            }
        } catch (Exception e) {
            log.info("error : " + e);
            log.info("탈퇴 실패2 : " + e);
            return ResponseEntity.status(500).body("Internal Server Error");
        }
    }

    /**
     * Q&A 목록
     * 
     * @param page
     * @param option
     * @param session
     * @return
     * @throws Exception
     */
    @GetMapping("/qnaList")
    public ResponseEntity<?> qnaList(Page page, Option option, HttpSession session) throws Exception {
        try {
            List<QnaBoard> qnaList = qnaService.list(page, option);
            log.info("qna 목록 : " + qnaList);
            return new ResponseEntity<>(qnaList, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Internal Server Error");
        }
    }

    /**
     * Q&A 조회
     * 
     * @param qnaNo
     * @return
     * @throws Exception
     */
    @GetMapping("/qna/{qnaNo}")
    public ResponseEntity<?> read(@PathVariable("qnaNo") int qnaNo) throws Exception {
        try {
            QnaBoard qnaBoard = qnaService.select(qnaNo);
            starService.views(qnaNo);
            return new ResponseEntity<>(qnaBoard, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Internal Server Error");
        }
    }

    /**
     * Q&A 수정
     * 
     * @param qnaBoard
     * @return
     * @throws Exception
     */
    @PutMapping("/qna")
    public ResponseEntity<?> updatePro(@RequestBody QnaBoard qnaBoard) throws Exception {
        try {
            int result = qnaService.update(qnaBoard);
            if (result > 0) {
                return new ResponseEntity<>(result, HttpStatus.OK);
            } else {
                return ResponseEntity.status(500).body("QnA update failed");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Internal Server Error");
        }
    }

    @GetMapping("/payment")
    public ResponseEntity<?> payList(@AuthenticationPrincipal CustomUser customUser) throws Exception {
        try {
            // Users user = customUser.getUser();
            Users user = new Users();
            user.setUserNo(15);
            user.setEmail("joeun@naver.com");
            int userNo = user.getUserNo();
            List<Pay> payList = payService.userList(userNo);
            log.info("userNo : " + userNo);
            return new ResponseEntity<>(payList, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Internal Server Error");
        }
    }
    // @GetMapping("/payment")
    // public ResponseEntity<?> payList(HttpSession session) throws Exception {
    // try {
    // Users user = (Users) session.getAttribute("user");
    // int userNo = user.getUserNo();
    // List<Pay> payList = payService.userList(userNo);
    // log.info("userNo : " + userNo);
    // return ResponseEntity.ok(payList);
    // } catch (Exception e) {
    // return ResponseEntity.status(500).body("Internal Server Error");
    // }
    // }

    @GetMapping("/promotion")
    public ResponseEntity<?> promotionList(@AuthenticationPrincipal CustomUser customUser, Page page, Option option)
            throws Exception {
        try {
            // Users user = customUser.getUser();
            Users user = new Users();
            user.setUserNo(15);
            user.setEmail("joeun@naver.com");
            int userNo = user.getUserNo();
            List<StarBoard> promotionList = starService.promotionList(userNo, page, option);
            return new ResponseEntity<>(promotionList, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Internal Server Error");
        }
    }

    @GetMapping("/event")
    public ResponseEntity<?> reviewList(@RequestParam(value = "type", defaultValue = "review") String type, Page page,
            Option option, HttpSession session) throws Exception {
        try {
            List<StarBoard> starList = starService.list(type, page, option);
            return new ResponseEntity<>(starList, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Internal Server Error");
        }
    }

    @DeleteMapping("/event/{starNos}")
    public ResponseEntity<?> reviewDelete(@PathVariable("starNos") String starNos) throws Exception {
        try {
            int result = starService.delete(starNos);
            if (result > 0) {
                return new ResponseEntity<>(result, HttpStatus.OK);
            } else {
                return ResponseEntity.status(500).body("Event deletion failed");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Internal Server Error");
        }
    }

    @GetMapping("/review/{starNo}")
    public ResponseEntity<?> reviewRead(@PathVariable("starNo") int starNo) throws Exception {
        try {
            StarBoard starBoard = starService.select(starNo);
            int commentCount = replyService.countByStarNo(starBoard.getStarNo());
            starBoard.setCommentCount(commentCount);
            starService.views(starNo);
            return new ResponseEntity<>(starBoard, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Internal Server Error");
        }
    }

    @PutMapping("/review")
    public ResponseEntity<?> reviewUpdatePro(@RequestBody StarBoard starBoard) throws Exception {
        try {
            int result = starService.update(starBoard);
            if (result > 0) {
                return new ResponseEntity<>(result, HttpStatus.OK);
            } else {
                return ResponseEntity.status(500).body("Review update failed");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Internal Server Error");
        }
    }

    @GetMapping("/archive")
    public ResponseEntity<?> archive() throws Exception {
        return ResponseEntity.ok("archive endpoint");
    }

    @GetMapping("/archive2")
    public ResponseEntity<?> archive2() throws Exception {
        return ResponseEntity.ok("archive2 endpoint");
    }
}
