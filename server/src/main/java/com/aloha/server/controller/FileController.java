package com.aloha.server.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.aloha.server.dto.Files;
import com.aloha.server.service.FileService;
import com.aloha.server.dto.CustomUser;
import com.aloha.server.dto.Users;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/file")
@CrossOrigin(origins = "*")
public class FileController {

    // URL에서 이미지 데이터를 가져오는 메서드
    private byte[] getImageDataFromURL(String imageURL) throws IOException {
        // RestTemplate을 사용하여 이미지를 URL에서 가져오기
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<byte[]> response = restTemplate.getForEntity(imageURL, byte[].class);
        return response.getBody();
    }

    @Autowired
    private FileService fileService;

    @Value("${upload.path}") // application.properties 에 설정한 업로드 경로 가져옴
    private String uploadPath;

    /**
     * 파일 다운로드
     * 
     * @param no
     * @param response
     * @throws Exception
     */
    @GetMapping("/{no}")
    public void fileDownload(@PathVariable("no") int no, HttpServletResponse response) throws Exception {
        Files downloadFile = fileService.download(no);

        // 파일이 없으면,
        if (downloadFile == null) {
            return;
        }

        // 파일 경로, 파일명
        String fileName = downloadFile.getFileName();   // 파일 이름
        String filePath = uploadPath +downloadFile.getFileName();


        // 다운로드를 위한 응답 헤더 세팅
        // - ContentType : application/octect-stream
        // - Content-Disposition : attachment, filename="파일명.확장자"
        response.setContentType(MediaType.APPLICATION_OCTET_STREAM_VALUE);
        response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");

        // 파일 다운로드
        File file = new File(filePath);
        FileInputStream fis = new FileInputStream(file); // 파일 출력
        ServletOutputStream sos = response.getOutputStream(); // 파일 경로
        FileCopyUtils.copy(fis, sos);

        fis.close();
        sos.close();

        return;

    }

    @DeleteMapping("/{no}")
    public ResponseEntity<String> deleteFile(@PathVariable("no") int no) throws Exception {
        // log.info("[DELETE] - /file/10");

        // 파일 삭제 요청
        int result = fileService.delete(no);

        // ✅ 삭제 성공
        if (result > 0) {
            return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
        }

        // ❌ 삭제 실패
        return new ResponseEntity<>("FAIL", HttpStatus.OK);
    }

    /**
     * 이미지 썸네일
     * 
     * @param no
     * @return
     * @throws Exception
     */
    @GetMapping("/img/{no}")
    public ResponseEntity<byte[]> thumbnailImg(@PathVariable("no") int no) throws Exception {


        if ( no == -1) {

            // 이미지 URL
            String imageURL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf85dv87L-QUBgTu6c8_OrOjHGFkldiqpx31GaI65ut4X0BbqtUvSPJWxyyuiD9bvKqzA&usqp=CAU";

            // 이미지를 URL에서 가져오기
            byte[] imageData = getImageDataFromURL(imageURL);

            // 이미지 데이터와 헤더 설정 후 반환
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG);
            return new ResponseEntity<>(imageData, headers, HttpStatus.OK);
          
        }
        
        // 파일번호로 파일 정보 조회
        Files file = fileService.select(no);
        // Null 체크
        if( file == null ) {

            ClassPathResource imgFile = new ClassPathResource("static/img/standard_card.png");

            byte[] noImageFileData;
            try {
                noImageFileData = FileCopyUtils.copyToByteArray(imgFile.getInputStream());
            } catch (IOException e) {
                throw new RuntimeException("기본 이미지 파일을 읽는 도중 에러가 발생했습니다.", e);
            }

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_PNG);
            
            return new ResponseEntity<>(noImageFileData, headers, HttpStatus.OK);
        }


        
        // 파일 정보 중에서 파일 경로 가져오기
        String filePath = uploadPath +file.getFileName();


        // 파일 객체 생성
        File f = new File(filePath);

        // 파일 데이터
        byte[] fileData = FileCopyUtils.copyToByteArray(f); // 파일 객체를 넘겨주는 바이트 데이터를 가져와준다.

        // 이미지 컨텐츠 타입 지정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);

        // new ResponseEntity<>( 데이터, 헤더, 상태코드 )
        return new ResponseEntity<>(fileData, headers, HttpStatus.OK);
    }

    // 반환타입을 void 나 String 으로 하면 html 을 응답해주기 때문에
    // 데이터를 응답받기 위해서는 ResponseEntity 사용

 
    @PostMapping("/upload")
    public ResponseEntity<?> insert(@RequestParam("file") MultipartFile multipartFile ,@AuthenticationPrincipal CustomUser customUser) throws Exception {
        Users user = customUser.getUser();

        int userNo = user.getUserNo();
        int fileNo = fileService.upload(multipartFile, null , userNo);
        if (fileNo>0) {
            return new ResponseEntity<>(fileNo, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("파일 업로드 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // 준수야 이거 알아서 고쳐써라 연진이가 망가트려놨다
    @PostMapping("/profileUpload")
    public ResponseEntity<?> profileUpload(@RequestParam("file") MultipartFile multipartFile,
                                           @AuthenticationPrincipal CustomUser customUser) throws Exception {
        Users user = customUser.getUser();
        int userNo = user.getUserNo();
        boolean isUploaded = fileService.profileUpload(multipartFile, userNo);
        if (isUploaded) {
            Files file = fileService.selectByUserNoAndStarNo(userNo);
            if (file == null) {
                log.error("파일 정보가 데이터베이스에 저장되지 않았습니다.");
                return new ResponseEntity<>("파일 업로드 성공했으나 데이터베이스에 파일 정보가 저장되지 않았습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
            }
            String filePath = "/file/img/" + file.getFileName(); // 파일 경로를 반환
            log.info("파일 업로드 성공: 파일 경로 - " + filePath);
            return new ResponseEntity<>(filePath, HttpStatus.OK); // 파일 경로 반환
        } else {
            log.error("파일 업로드 실패");
            return new ResponseEntity<>("파일 업로드 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/profileDelete/{userNo}")
    public ResponseEntity<String> profileDelete(@PathVariable("userNo") int userNo) {
        try {
            // 파일 정보 가져오기
            Integer fileNo = fileService.profileSelect(userNo);
            if (fileNo != null && fileNo > 0) {
                int result = fileService.allDelete(userNo);
                if (result > 0) {
                    return ResponseEntity.ok("파일이 성공적으로 삭제되었습니다.");
                } else {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일 삭제에 실패하였습니다.");
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("파일이 존재하지 않습니다.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일 삭제 실패: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(@PathVariable("userNo") int userNo) {
        try {
            // 파일 정보 가져오기
            Integer fileNo = fileService.profileSelect(userNo);
            if (fileNo != null && fileNo > 0) {
                int result = fileService.delete(fileNo);
                if (result > 0) {
                    return ResponseEntity.ok("파일이 성공적으로 삭제되었습니다.");
                } else {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일 삭제에 실패하였습니다.");
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("파일이 존재하지 않습니다.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일 삭제 실패: " + e.getMessage());
        }
    }

    @DeleteMapping("/allDelete")
    public ResponseEntity<String> allDelete(@PathVariable("userNo") int userNo) {
        try {
            // 파일 정보 가져오기
            Integer fileNo = fileService.profileSelect(userNo);
            if (fileNo != null && fileNo > 0) {
                int result = fileService.allDelete(userNo);
                if (result > 0) {
                    return ResponseEntity.ok("파일이 성공적으로 삭제되었습니다.");
                } else {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일 삭제에 실패하였습니다.");
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("파일이 존재하지 않습니다.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일 삭제 실패: " + e.getMessage());
        }
    }

    //유저 이미지 정보
    @GetMapping("/api/getFile")
    public ResponseEntity<?> getFileByUserNo(@RequestParam("userNo") int userNo) throws Exception {
        Files file = fileService.selectByUserNoAndStarNo(userNo);
        if (file != null) {
            int userImgId = file.getFileNo();
            return ResponseEntity.ok(userImgId);  // 성공적으로 파일 번호만 반환
        } else {
            return ResponseEntity.notFound().build();  // 파일 정보가 없으면 Not Found 반환
        }
    } 

}
