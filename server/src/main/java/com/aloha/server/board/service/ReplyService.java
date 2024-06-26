package com.aloha.server.board.service;

import java.util.List;

import com.aloha.server.board.dto.Reply;

public interface ReplyService {
    
    // 댓글 목록
    public List<Reply> list() throws Exception;
    // ⭐댓글 목록
    public List<Reply> listByStarNo(int starNo) throws Exception;

    // 댓글 조회
    public Reply select(int replyNo) throws Exception;
    // 댓글 등록
    public int insert(Reply reply, String userId) throws Exception;
    // 댓글 수정
    public int update(Reply reply) throws Exception;
    // 댓글 삭제
    public int delete(int replyNo) throws Exception;
    // ⭐댓글 종속 삭제
    public int deleteByStarNo(int starNo) throws Exception;

    // ⭐최댓값
    public int max() throws Exception;

    // ⭐답글 종속 삭제
    public int deleteByParentNo(int parentNo) throws Exception;

    // 댓글 개수 조회
    int countByStarNo(int starNo) throws Exception;

    // 회원별 댓글 조회
    public List<Reply> selectUser(int userNo) throws Exception;
}
