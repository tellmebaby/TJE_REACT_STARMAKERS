package com.aloha.server.service;

public interface LikeService {
    
    // 좋아요하기
    public boolean toggleLike(int userNo, int starNo) throws Exception;

    // 좋아요확인
    public int checkLiked(int userNo, int starNo) throws Exception;

    // 좋아요 수 카운트
    public int likeCount(int starNo) throws Exception;
}
