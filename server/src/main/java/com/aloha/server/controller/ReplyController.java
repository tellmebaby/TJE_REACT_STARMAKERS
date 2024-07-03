package com.aloha.server.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aloha.server.dto.Reply;
import com.aloha.server.service.ReplyService;

import lombok.extern.slf4j.Slf4j;




@Slf4j
@RestController
@RequestMapping("/reply")
@CrossOrigin(origins = "*")
public class ReplyController {

    @Autowired
    private ReplyService replyService;

    /**
     * 댓글 목록
     * @param starNo
     * @param model
     * @return
     * @throws Exception
     */
    @GetMapping("/{starNo}")
    public ResponseEntity<?> list(@PathVariable("starNo") int starNo) throws Exception {

        try {
            List<Reply> replyList = replyService.listByStarNo(starNo);
            Map<String, Object> response = new HashMap<>();
            response.put("replyList", replyList);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 댓글 등록
     * @param reply
     * @return
     * @throws Exception
     */
    @PostMapping()
    public ResponseEntity<String> insert(@RequestBody Reply reply) throws Exception {
        log.info(reply.toString());
        String userId = reply.getUsername();
        // 댓글 등록 서비스 호출
        int result = replyService.insert(reply, userId);
        
        // 결과에 따른 응답 반환
        if (result > 0) {
            return new ResponseEntity<>("SUCCESS", HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("FAIL", HttpStatus.OK);
        }
    }

    /**
     * 댓글 수정
     * @param reply
     * @return
     * @throws Exception
     */
    @PutMapping()
    public ResponseEntity<String> update(@RequestBody Reply reply) throws Exception {
        int result = replyService.update(reply);
        if(result > 0) {
            return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
        }
        return new ResponseEntity<>("FAIL", HttpStatus.OK);
    }
    
    /**
     * 댓글 삭제
     * @param replyNo
     * @return
     * @throws Exception
     */
    @DeleteMapping("/{replyNo}")
    public ResponseEntity<String> delete(@PathVariable("replyNo") int replyNo) throws Exception {
        int result = replyService.delete(replyNo);
        if(result > 0) {
            return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
        }
        return new ResponseEntity<>("FAIL", HttpStatus.OK);
    }
    
}
