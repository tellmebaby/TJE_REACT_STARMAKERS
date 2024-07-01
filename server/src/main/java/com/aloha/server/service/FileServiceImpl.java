package com.aloha.server.service;

import java.io.File;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import com.aloha.server.dto.Files;
import com.aloha.server.mapper.FileMapper;

import lombok.extern.slf4j.Slf4j;



@Slf4j
@Service
public class FileServiceImpl implements FileService {

    @Autowired
    private FileMapper fileMapper;

    @Value("${upload.path}")        // application.properties 에 설정한 업로드 경로 가져옴
    private String uploadPath;

    /**
     * 파일 목록
     */
    @Override
    public List<Files> list() throws Exception {
        List<Files> fileList = fileMapper.list();
        
        return fileList;
    }

    /**
     * 파일 조회
     */
    @Override
    public Files select(int no) throws Exception {
        Files file = fileMapper.select(no);
        return file;
    }

    /**
     * 파일 등록
     */
    @Override
    public int insert(Files file) throws Exception {
        fileMapper.insert(file);
        return file.getFileNo();
    }


    /**
     * 파일 수정
     */
    @Override
    public int update(Files file) throws Exception {
        int result = fileMapper.update(file);
        return result;
    }

    /**
     * 파일 삭제
     */
    @Override
    public int delete(int fileNo) throws Exception {
        // 파일 정보 조회
        Files file = fileMapper.select(fileNo);

        // DB 파일 정보 삭제
        int result = fileMapper.delete(fileNo);

        // 파일 시스템의 파일 삭제
        if( result > 0 && file != null) {
            String filePath = uploadPath + File.separator + file.getFileName();
            File deleteFile = new File(filePath);
            // 파일 존재 확인
            if( !deleteFile.exists() ) {
                log.info("삭제할 파일 경로: " + filePath); 
            }
            // 파일 삭제
            if( deleteFile.delete() ) {
                log.info("파일이 정상적으로 삭제되었습니다.");
                log.info("file : " + filePath);
            } else {
                log.info("파일 삭제에 실패하였습니다.");
            }
        }
        return result;
    }

    /**
     * 부모 테이블 기준, 파일 목록 조회
     */
    @Override
    public List<Files> listByParent(Files file) throws Exception {
        List<Files> fileList = fileMapper.listByParent(file);
        return fileList;
    }

    /**
     * 부모 테이블에 종속된 파일 목록 삭제
     */
    @Override
    public int deleteByParent(Files file) throws Exception {
        List<Files> fileList = fileMapper.listByParent(file);

        for (Files deleteFile : fileList) {
            int fileNo = deleteFile.getFileNo();
            delete(fileNo);
        }

        
        int result = fileMapper.deleteByParent(file);
        // log.info(result + "개의 파일을 삭제하였습니다.");

        return result;
    }

    /**
     * 파일 업로드
     */
    @Override
    public int upload(MultipartFile mf, Integer stat_no, int user_no) throws Exception {

        // 파일 정보 : 원본파일명, 파일 용량, 파일 데이터
        String originName = mf.getOriginalFilename();
        long fileSize = mf.getSize();
        byte[] fileData = mf.getBytes();
        
        log.info("원본 파일명 : " + originName);
        log.info("파일 용량 : " + fileSize);
        log.info("파일 데이터 : " + fileData);

        // ⭐ 파일 업로드
        // - 파일 시스템의 해당 파일을 복사
        // - 파일의 정보를 DB에 등록
        
        // ✅ 업로드 경로 - application.properties ( upload.path )
        // ✅ 파일명
        // - 파일명 중복 방지를 위해 UID_파일명.xx 형식으로 지정
        // - 업로드 파일명 : UID_원본파일명.xxx
        String fileName = UUID.randomUUID().toString() + "_" + originName;
        File uploadFile = new File(uploadPath, fileName);

        // ↑ 파일 업로드
        FileCopyUtils.copy(fileData, uploadFile);

        Files file = new Files();

        // file_name, origin_name, size, user_no, star_no

        // 파일 정보 등록
        file.setFileName(fileName);
        file.setOriginName(originName);
        file.setSize(fileSize);
        file.setUserNo(user_no);
        file.setStarNo(stat_no);

        fileMapper.insert(file);
        int fileNo = file.getFileNo();

        return fileNo;
    }


    /**
     * 파일 다운로드
     */
    @Override
    public Files download(int no) throws Exception {
        Files file = fileMapper.select(no);

        // 다운로드 시, 추가 작업
        // ...
        
        return file;
    }


    /**
     * 
     * 사용자 이미지 파일 정보 가져오기
     */
    @Override
    public Files selectByUserNoAndStarNo(int userNo) throws Exception{
        return fileMapper.selectByUserNoAndStarNo(userNo);
    }
    

    @Override
    public boolean profileUpload(MultipartFile mf, int user_no) throws Exception {

        // 파일 정보 : 원본파일명, 파일 용량, 파일 데이터
        String originName = mf.getOriginalFilename();
        long fileSize = mf.getSize();
        byte[] fileData = mf.getBytes();
        
        log.info("원본 파일명 : " + originName);
        log.info("파일 용량 : " + fileSize);
        log.info("파일 데이터 : " + fileData);

        // ⭐ 파일 업로드
        // - 파일 시스템의 해당 파일을 복사
        // - 파일의 정보를 DB에 등록
        
        // ✅ 업로드 경로 - application.properties ( upload.path )
        // ✅ 파일명
        // - 파일명 중복 방지를 위해 UID_파일명.xx 형식으로 지정
        // - 업로드 파일명 : UID_원본파일명.xxx
        String fileName = UUID.randomUUID().toString() + "_" + originName;
        File uploadFile = new File(uploadPath, fileName);

        // ↑ 파일 업로드
        FileCopyUtils.copy(fileData, uploadFile);

        Files file = new Files();

        // file_name, origin_name, size, user_no, star_no

        // 파일 정보 등록
        file.setFileName(fileName);
        file.setOriginName(originName);
        file.setSize(fileSize);
        file.setUserNo(user_no);
        file.setStarNo(0); // star_no 값을 0으로 설정

        fileMapper.insert(file);

        return true;
    }

    /**
     * 파일 프로필 조회
     */
    @Override
    public Integer profileSelect(int userNo) throws Exception {

        Integer result = fileMapper.profileSelect(userNo);
        if ( result == null ) {
            return -1;
        }
        return result;
    }

    @Override
    public int allDelete(int userNo) throws Exception {
    
        int result = fileMapper.allDelete(userNo);
        return result;

    }

}