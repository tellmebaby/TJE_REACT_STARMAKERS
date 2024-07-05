package com.aloha.server.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.aloha.server.dto.Point;


@Mapper
public interface PointMapper {

    // 마이페이지 포인트내역조회
   public List<Point> list(int userNo) throws Exception;

    // 게시물 후원금액 조회
   public int selectBoard(int starNo) throws Exception;

    // 포인트 추가/삭제
   public int insert(Point point) throws Exception;
   

    // 사용자 포인트 조회
   public int sum(int userNo)  throws Exception;


}
