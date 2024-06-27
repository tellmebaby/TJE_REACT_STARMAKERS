package com.aloha.server.board.service;

import java.util.List;

import com.aloha.server.board.dto.Option;
import com.aloha.server.board.dto.Page;
import com.aloha.server.board.dto.QnaBoard;

public interface QnaService {
    // 목록 조회
    public List<QnaBoard> list(Page page, Option option) throws Exception;

    // 글 조회
    public QnaBoard select(int qnaNo) throws Exception;

    // 글 등록
    public QnaBoard insert(QnaBoard qnaBoard, String username) throws Exception;
        
    // 글 수정
    public int update(QnaBoard qnaBoard) throws Exception;

    // 글 삭제
    public int delete(String qnaNoList) throws Exception;
    
    // 답변 등록
    public int insertAnswer(QnaBoard qnaBoard) throws Exception;

    // 답변 삭제
    public int deleteAnswer(QnaBoard qnaBoard) throws Exception;

    // 검색 목록
    public List<QnaBoard> search(Option option) throws Exception;

    // 조회수 증가
    public int views(int qnaNo) throws Exception;
}