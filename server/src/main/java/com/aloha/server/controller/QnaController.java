package com.aloha.server.controller;

import java.util.ArrayList;
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

import com.aloha.server.dto.Option;
import com.aloha.server.dto.Page;
import com.aloha.server.dto.QnaBoard;
import com.aloha.server.service.QnaService;

import lombok.extern.slf4j.Slf4j;


@Slf4j
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/qna")
public class QnaController {

    @Autowired
    private QnaService qnaService;

    @GetMapping("/qnaList")
    public ResponseEntity<?> list(Page page, Option option) throws Exception {
        log.info("qna 목록");
        try {
            List<QnaBoard> qnaList = qnaService.list(page, option);

            Map<String, Object> response = new HashMap<>();
            response.put("qnaList", qnaList);
            response.put("page", page);
            response.put("option", option);

            List<Option> optionList = new ArrayList<Option>();
            optionList.add(new Option("제목+내용", 0));
            optionList.add(new Option("제목", 1));
            optionList.add(new Option("내용", 2));
            optionList.add(new Option("작성자", 3));
            response.put("optionList", optionList);
            
            return new ResponseEntity<>(qnaList, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // @GetMapping("/qnaList")
    // public String list(Model model, Page page, Option option) throws Exception {
    //     log.info("qna 목록");

    //     List<QnaBoard> qnaList = qnaService.list(page, option);

    //     // 페이징, 검색
    //     log.info("page : " + page);
    //     log.info("option : " + option);

    //     // List<QnaBoard> qnaList = qnaService.list();
    //     model.addAttribute("qnaList", qnaList);
    //     model.addAttribute("page", page);
    //     model.addAttribute("option", option);

    //     List<Option> optionList = new ArrayList<Option>();
    //     optionList.add(new Option("제목+내용", 0));
    //     optionList.add(new Option("제목", 1));
    //     optionList.add(new Option("내용", 2));
    //     optionList.add(new Option("작성자", 3));
    //     model.addAttribute("optionList", optionList);
    //     return "/page/board/qnaBoard/qnaList";
    // }

    @GetMapping("qnaPost/{qnaNo}")
    public ResponseEntity<?> read(@PathVariable("qnaNo") int qnaNo) {
        log.info("Q&A 글 번호: ", qnaNo);
        try {
            QnaBoard qnaBoard = qnaService.select(qnaNo);
            qnaService.views(qnaNo);
            if (qnaBoard != null) {
                return new ResponseEntity<>(qnaBoard, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            log.error("Q&A 글 조회 실패: qnaNo={}", qnaNo, e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // @GetMapping("/qnaPost")
    // public String read(@RequestParam("qnaNo") int qnaNo, Model model) throws Exception {
    //     QnaBoard qnaBoard = qnaService.select(qnaNo);

    //     // 조회수 증가
    //    qnaService.views(qnaNo);

    //     // 모델 등록
    //     model.addAttribute("qnaBoard", qnaBoard);

    //     // 뷰페이지 지정
    //     return "/page/board/qnaBoard/qnaPost";
    // }
    



    @PostMapping()
    public ResponseEntity<?> insert(@RequestBody QnaBoard qnaBoard) {
        try {
            String username = qnaBoard.getUsername();
            QnaBoard newQnaBoard = qnaService.insert(qnaBoard, username);

            if (newQnaBoard != null) {
                // log.info("여기까진오나??");
                return new ResponseEntity<>(newQnaBoard, HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    /** 글 수정
     * 
     */
    @PutMapping()
    public ResponseEntity<?> update(@RequestBody QnaBoard qnaBoard) {
        try {
            int qnaNo = qnaBoard.getQnaNo();
            qnaBoard.setQnaNo(qnaNo);
            int result = qnaService.update(qnaBoard);
            if (result > 0) {
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 답변 등록(answer 속성 수정)
     * @param qnaBoard
     * @return
     */
    @PutMapping("/answer")
    public ResponseEntity<?> insertAnswer(@RequestBody QnaBoard qnaBoard) {
        try {
            int qnaNo = qnaBoard.getQnaNo();
            qnaBoard.setQnaNo(qnaNo);
            int result = qnaService.insertAnswer(qnaBoard);
            if (result > 0) {
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * qna 삭제
     * @param qnaNos
     * @return
     * @throws Exception
     */
    @DeleteMapping("/{qnaNos}")
    public ResponseEntity<?> delete(@PathVariable("qnaNos") String qnaNos) throws Exception {
       
        try {
            int result = qnaService.delete(qnaNos);
            if (result > 0) {
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 답변 삭제(속성 수정)
     * @param qnaBoard
     * @param model
     * @return
     * @throws Exception
     */
    @PutMapping("/deleteAnswer")
    public ResponseEntity<?> deleteAnswer(@RequestBody QnaBoard qnaBoard) {
        try {
            int qnaNo = qnaBoard.getQnaNo();
            qnaBoard.setQnaNo(qnaNo);
            int result = qnaService.deleteAnswer(qnaBoard);
            if (result > 0) {
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    

}
    

    
