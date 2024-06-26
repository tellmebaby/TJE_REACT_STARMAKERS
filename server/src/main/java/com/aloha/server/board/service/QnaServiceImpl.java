package com.aloha.server.board.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aloha.server.board.dto.Option;
import com.aloha.server.board.dto.Page;
import com.aloha.server.board.dto.QnaBoard;
import com.aloha.server.board.mapper.QnaMapper;
import com.aloha.server.user.dto.Users;
import com.aloha.server.user.mapper.UserMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class QnaServiceImpl implements QnaService {

    @Autowired
    private QnaMapper qnaMapper;
    
    @Autowired
    private UserMapper userMapper;

    // 목록 조회
    @Override
    public List<QnaBoard> list(Page page, Option option) throws Exception {
        int total = qnaMapper.count(option);
        page.setTotal(total);
        List<QnaBoard> qnaList = qnaMapper.list(page, option);
        return qnaList;
    }

    @Override
    public QnaBoard select(int qnaNo) throws Exception {
        QnaBoard qnaBoard = qnaMapper.select(qnaNo);
        return qnaBoard;
    }

    // 글 등록
    @Override
    public int insert(QnaBoard qnaBoard, String username) throws Exception {
        // 작성자 정보 불러오기
        Users user = userMapper.login(username);
        qnaBoard.setUserNo(user.getUserNo());
        qnaBoard.setWriter(user.getId());

        // 정보 등록
        int result = qnaMapper.insert(qnaBoard);
        
        return result;
    }

    @Override
    public int update(QnaBoard qnaBoard) throws Exception {
        int result = qnaMapper.update(qnaBoard);

        return result;
    }

    @Override
    public int insertAnswer(QnaBoard qnaBoard) throws Exception {
        int result = qnaMapper.insertAnswer(qnaBoard);
        return result;
    }

    public int deleteAnswer(QnaBoard qnaBoard) throws Exception {
        int result = qnaMapper.deleteAnswer(qnaBoard);
        return result;
    }


    @Override
    public int delete(String qnaNoList) throws Exception {

        int result = qnaMapper.delete(qnaNoList);
        return result;
    }

    @Override
    public List<QnaBoard> search(Option option) throws Exception {

        List<QnaBoard> qnaList = qnaMapper.search(option);
        return qnaList;
    }

    @Override
    public int views(int qnaNo) throws Exception {
        log.info(qnaNo + "번 게시글 조회수 증가");
        return qnaMapper.views(qnaNo);
    }

    
}