package com.aloha.server.board.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.aloha.server.board.dto.Files;

@Mapper
public interface FileMapper {

    // 파일 목록
    public List<Files> list() throws Exception;

    // 파일 조회
    public Files select(int no) throws Exception;

    // 회원 프로필 조회
    public Integer profileSelect(int userNo) throws Exception;

    // 파일 등록
    public int insert(Files file) throws Exception;

    // 파일 수정
    public int update(Files file) throws Exception;

    // 파일 삭제
    public int delete(int no) throws Exception;

    // 기본 이미지 변경
    public int allDelete(int userNo) throws Exception;

    // 파일 목록 - 부모 기준
    public List<Files> listByParent(Files file) throws Exception;

    // 파일 삭제 - 부모 기준
    public int deleteByParent(Files file) throws Exception;

    // 유저 이미지 파일 검색
    public Files selectByUserNoAndStarNo( int userNo ) throws Exception;


}
