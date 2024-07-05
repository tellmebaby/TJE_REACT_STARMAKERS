package com.aloha.server.service;

import java.util.List;

import com.aloha.server.dto.Point;

public interface PointService {

  // 마이페이지 포인트내역조회
  public List<Point> list(int userNo) throws Exception;

  // 게시물 후원금액 조회
  public int selectBoard(int starNo) throws Exception;

  // 포인트 추가/삭제
  public int insert(Point point) throws Exception;
}
