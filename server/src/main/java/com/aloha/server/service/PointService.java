package com.aloha.server.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.aloha.server.dto.Files;


public interface PointService {

  // 게시글 목록
   public List<Files> list() throws Exception;
   // 게시글 조회
   public Files select(int no) throws Exception;
   // 게시글 등록
   public int insert(Files file) throws Exception;
   // 게시글 수정
   public int update(Files file) throws Exception;
   // 게시글 삭제
   public int delete(int no) throws Exception;
   // 조회수 업데이트
   public int updateViews(@Param("count") int count, @Param("no") int no) throws Exception;
}
