package com.aloha.server.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.core.ExceptionDepthComparator;

import com.aloha.server.dto.Option;
import com.aloha.server.dto.Page;
import com.aloha.server.dto.StarBoard;

@Mapper
public interface StarMapper {

    // 글 삭제
    public int delete(String starNoList) throws Exception;

    // 홍보 승인
    public int approve(String starNoList) throws Exception;

    // 홍보 반려
    public int companion(String starNoList) throws Exception;

    // 목록 조회 - 페이징, 검색
    public List<StarBoard> list(@Param("type") String type, @Param("page") Page page, @Param("option") Option option)
            throws Exception;

    // 목록 조회 - 페이징, 검색
    public List<StarBoard> list(@Param("type") String type,
            @Param("page") Page page, @Param("option") Option option, @Param("userNo") int userNo) throws Exception;
            
    // 목록 조회 - 페이징, 검색
    public List<StarBoard> list(@Param("type") String type,
            @Param("page") Page page, @Param("option") Option option, @Param("userNo") int userNo, @Param("status") int status) throws Exception;

    // 목록 조회 - 갯수 조회
    public List<StarBoard> countList() throws Exception;

    // 글 등록
    public int insert(StarBoard starBoard) throws Exception;

    // 글 등록(유료)
    public int payInsert(StarBoard starBoard, String username) throws Exception;

    // 글 조회
    public StarBoard select(int starNo) throws Exception;

    // 글 조회(로그인 시)
    public StarBoard readUserBoard(@Param("starNo") int StarNo, @Param("userNo")int userNo) throws Exception; 

    // 글 수정
    public int update(StarBoard starBoard) throws Exception;

    // 게시글 번호(기본키) 최댓값
    public int maxPk(String type) throws Exception;

    // 게시글 데이터 개수 조회
    public int count(@Param("option") Option option, @Param("type") String type) throws Exception;

    // 게시글 목록 - [검색]
    public List<StarBoard> search(@Param("option") Option option) throws Exception;

    // 조회수 증가
    public int views(int starNo) throws Exception;

    // 새 메인 페이지 카드리스트 요청
    public List<StarBoard> mainCardList(String type) throws Exception;

    // 마이페이지 쓴 글 조회
    public List<StarBoard> promotionList(@Param("userNo") int userNo, @Param("page") Page page,
            @Param("option") Option option) throws Exception;

    // 로그인 유저 모든 카드 불러오기
    public List<StarBoard> getMainCardListForLoggedInUser(@Param("userNo") int userNo,@Param("type") String type ) throws Exception;

    // 관리자 홍보카드 조회
    public List<StarBoard> adminStarCard(String type, Page page,@Param("option") Option option, int status)  throws Exception;
    
    // 마이페이지 내보관함 카드
    public List<StarBoard> getStarCardsByUserNo( @Param("userNo") int userNo ) throws Exception;

    // 목록조회 getStarList
    public List<StarBoard> getStarList(@Param("type") String type, @Param("page") Page page, @Param("option") Option option, @Param("userNo") int userNo ) throws Exception;

    // 메인 배너 가져오기
    public List<StarBoard> getBanner() throws Exception;

    // 메인 리뷰 가져오기
    public List<StarBoard> getFragByType(String type) throws Exception;
}
