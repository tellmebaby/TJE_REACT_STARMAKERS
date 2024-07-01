package com.aloha.server.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.aloha.server.dto.Files;



public interface FileService {

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
    
    // 파일 업로드
    public int upload(MultipartFile multipartFile, Integer star_no, int user_no) throws Exception;

    // 프로필 업로드
    public boolean profileUpload(MultipartFile multipartFile, int userNo) throws Exception;


    // 파일 다운로드
    public Files download(int no) throws Exception;

    public Files selectByUserNoAndStarNo(int userNo) throws Exception;
    
}
