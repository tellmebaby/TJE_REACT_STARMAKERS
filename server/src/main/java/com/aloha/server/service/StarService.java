package com.aloha.server.service;

import java.util.List;


import com.aloha.server.dto.Option;
import com.aloha.server.dto.Page;
import com.aloha.server.dto.StarBoard;



public interface StarService {

    // 글 삭제
    public int delete(String starNoList) throws Exception;

    // 홍보 승인
    public int approve(String starNoList) throws Exception;

    // 홍보 반려
    public int companion(String starNoList) throws Exception;



    // 목록 조회 - 페이징, 검색
    public List<StarBoard> list(String type 
                               ,Page page
                               ,Option option) throws Exception;

    public List<StarBoard> list(String type 
                                ,Page page
                                ,Option option,
                                int userNo) throws Exception;

    public List<StarBoard> mypageList(String type 
                                ,Page page
                                ,Option option,
                                int userNo) throws Exception;

    
                                
    // 목록 조회 - 갯수 조회
    public List<StarBoard> countList() throws Exception;

    // 관리자 홍보카드 조회
    public List<StarBoard> adminStarCard(String type, Page page, Option option, int status)  throws Exception;

    // 글 등록(무료)
    public StarBoard insert(StarBoard starBoard) throws Exception;

    // 글 등록(유료)
    public int payInsert(StarBoard starBoard, String username) throws Exception;

    // 글 조회
    public StarBoard select(int starNo) throws Exception;

    // 글 조회(로그인시)
    public StarBoard select(int starNo, int userNo) throws Exception;

    // 글 수정
    public int update(StarBoard starBoard) throws Exception;

    // 조회수 증가
    public int views(int starNo) throws Exception;


    // 새 메인 페이지 카드리스트 요청
    public List<StarBoard> mainCardList ( String type ) throws Exception;


    // 마이페이지 쓴 글 조회
    public List<StarBoard> promotionList(int userNo, Page page, Option option) throws Exception;

    // 로그인 유저 모든카드 불러오기
    public List<StarBoard> getMainCardListForLoggedInUser( int userNo, String type ) throws Exception;
    
    // 마이페이지 내보관함 카드
    public List<StarBoard> getStarCardsByUserNo( int userNo ) throws Exception;

    // 목록조회 getStarList
    public List<StarBoard> getStarList(String type, Page page, Option option, int userNo) throws Exception;

    // 메인 배너 가져오기
    public List<StarBoard> getBanner() throws Exception;

    // 메인 리뷰 가져오기
    public List<StarBoard> getFragByType(String type) throws Exception;
}
