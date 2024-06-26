package com.aloha.server.board.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.aloha.server.board.dto.Option;
import com.aloha.server.board.dto.Page;
import com.aloha.server.board.dto.QnaBoard;
import com.aloha.server.board.service.QnaService;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestBody;







@Slf4j
@Controller
@RequestMapping("/page/board/qnaBoard")
public class QnaController {

    @Autowired
    private QnaService qnaService;

    @GetMapping("/qnaList")
    public String list(Model model, Page page, Option option) throws Exception {
        log.info("qna 목록");

        List<QnaBoard> qnaList = qnaService.list(page, option);

        // 페이징, 검색
        log.info("page : " + page);
        log.info("option : " + option);

        // List<QnaBoard> qnaList = qnaService.list();
        model.addAttribute("qnaList", qnaList);
        model.addAttribute("page", page);
        model.addAttribute("option", option);

        List<Option> optionList = new ArrayList<Option>();
        optionList.add(new Option("제목+내용", 0));
        optionList.add(new Option("제목", 1));
        optionList.add(new Option("내용", 2));
        optionList.add(new Option("작성자", 3));
        model.addAttribute("optionList", optionList);
        return "/page/board/qnaBoard/qnaList";
    }

    @GetMapping("/qnaPost")
    public String read(@RequestParam("qnaNo") int qnaNo, Model model) throws Exception {
        QnaBoard qnaBoard = qnaService.select(qnaNo);

        // 조회수 증가
       qnaService.views(qnaNo);

        // 모델 등록
        model.addAttribute("qnaBoard", qnaBoard);

        // 뷰페이지 지정
        return "/page/board/qnaBoard/qnaPost";
    }
    

    /**
     * 게시글 등록 화면 요청
     * @return
     * @throws Exception
     */
    @GetMapping("/qnaInsert")
    public String insert() throws Exception {

        return "/page/board/qnaBoard/qnaInsert";
    } 

    // @GetMapping("/qnaPost")
    // public String quaPost(Model model) throws Exception {
    //     log.info("qna 목록");

    //     QnaBoard qnaBoard = new QnaBoard();
    //     qnaBoard.setContent("<p><b>굵게</b></p><p><b><br></b></p><p><b><i>기울임</i></b></p><p><b><i><br></i></b></p><p><b><i><u>밑줄</u></i></b></p>");
    //     model.addAttribute("qnaBoard", qnaBoard);
    //     return "/page/board/qnaBoard/qnaPost";
    // }


    @PostMapping("/qnaInsert")
    public String insertPro(QnaBoard qnaBoard, String username) throws Exception {
        int result = qnaService.insert(qnaBoard, username);
        // 리다이렉트
        // 데이터 처리 성공
        if(result>0){
            return "redirect:/page/board/qnaBoard/qnaList";
        }
        // 데이터 처리 실패
        int no = qnaBoard.getQnaNo();
        return "redirect:/board/insert?no=" + no + "&error";
    }

    /** 글 수정
     * 
     */
    @GetMapping("/qnaUpdate")
    public String update(@RequestParam("qnaNo") int qnaNo, Model model) throws Exception {
        QnaBoard qnaBoard = qnaService.select(qnaNo);

        // 모델 등록
        model.addAttribute("qnaBoard", qnaBoard);

        // 뷰페이지 지정
        return "/page/board/qnaBoard/qnaUpdate";
    }

    @PostMapping("/qnaUpdate")
    public String updatePro(QnaBoard qnaBoard) throws Exception {

        int result = qnaService.update(qnaBoard);
        if ( result > 0) {
            return "redirect:/page/board/qnaBoard/qnaList";
        }
        int qnaNo = qnaBoard.getQnaNo();
        
        return "redirect:/page/board/qnaBoard/qnaUpdate?qnaNo=" + qnaNo + "$error";
    }
    

    @PostMapping("/qnaDelete")
    public String delete(@RequestParam("qnaNos") String qnaNos) throws Exception {
       
        int result = 0;
        result = qnaService.delete(qnaNos);

        if (result > 0) {
            return "redirect:/page/board/qnaBoard/qnaList";
        }
        
        return "redirect:/page/board/qnaBoard/qnaList";  // 삭제 실패시에도 같은 페이지로 리디렉션
    }

    @PostMapping("/qnaPost")
    public String insertAnswerPro(QnaBoard qnaBoard, Model model) throws Exception {
        log.info("답변수정");
        int result = qnaService.insertAnswer(qnaBoard);
        if(result > 0) {
        return "redirect:/admin/pages/mailboxQna"; 
        }
        int qnaNo = qnaBoard.getQnaNo();
        return "redirect:/page/board/qnaBoard/qnaPost?qnaNo=" + qnaNo + "&error";

    }

    @PostMapping("/qnaPost/deleteAnswer")
    public String deleteAnswerPro(QnaBoard qnaBoard, Model model) throws Exception {
        log.info("답변삭제");
        int result = qnaService.deleteAnswer(qnaBoard);
        if(result > 0) {
        return "redirect:/admin/pages/mailboxQna"; 
        }
        int qnaNo = qnaBoard.getQnaNo();
        return "redirect:/page/board/qnaBoard/qnaPost?qnaNo=" + qnaNo + "&error";
    }
    

}
    

    
