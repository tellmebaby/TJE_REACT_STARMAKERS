
-- Active: 1716770063195@@127.0.0.1@3306@joeun



        TRUNCATE user;
        TRUNCATE user_auth;

        -- ID : joeun@naver.com
        -- PW : 123456
        -- 사용자
        INSERT INTO user (name, id, email, password, phone, address, gender, birth)
        VALUES ('김조은', 'joeun', 'joeun@naver.com', '$2a$10$7qJoHkll6P6WzghR7KkFqOM5q8JeGf7/C/Z7v0b.5H0cI8yxnhz0O', '010-1234-1234', '인천시', '', '2024-01-01');

        INSERT INTO user (name, id, email, password, phone, address, gender, birth)
        VALUES 
        ('홍길동', 'user1', 'user1@example.com', '$2a$10$7qJoHkll6P6WzghR7KkFqOM5q8JeGf7/C/Z7v0b.5H0cI8yxnhz0O', '010-1234-5678', '서울시 강남구', '남성', '1990-01-01'),
        ('김연아', 'user2', 'user2@example.com', '$2a$10$7qJoHkll6P6WzghR7KkFqOM5q8JeGf7/C/Z7v0b.5H0cI8yxnhz0O', '010-2345-6789', '서울시 마포구', '여성', '1990-09-05'),
        ('박보검', 'user3', 'user3@example.com', '$2a$10$7qJoHkll6P6WzghR7KkFqOM5q8JeGf7/C/Z7v0b.5H0cI8yxnhz0O', '010-3456-7890', '서울시 강북구', '남성', '1993-06-16'),
        ('손예진', 'user4', 'user4@example.com', '$2a$10$7qJoHkll6P6WzghR7KkFqOM5q8JeGf7/C/Z7v0b.5H0cI8yxnhz0O', '010-4567-8901', '서울시 서초구', '여성', '1982-01-11'),
        ('이민호', 'user5', 'user5@example.com', '$2a$10$7qJoHkll6P6WzghR7KkFqOM5q8JeGf7/C/Z7v0b.5H0cI8yxnhz0O', '010-5678-9012', '서울시 송파구', '남성', '1987-06-22'),
        ('수지', 'user6', 'user6@example.com', '$2a$10$7qJoHkll6P6WzghR7KkFqOM5q8JeGf7/C/Z7v0b.5H0cI8yxnhz0O', '010-6789-0123', '서울시 영등포구', '여성', '1994-10-10'),
        ('박서준', 'user7', 'user7@example.com', '$2a$10$7qJoHkll6P6WzghR7KkFqOM5q8JeGf7/C/Z7v0b.5H0cI8yxnhz0O', '010-7890-1234', '서울시 용산구', '남성', '1988-12-16'),
        ('아이유', 'user8', 'user8@example.com', '$2a$10$7qJoHkll6P6WzghR7KkFqOM5q8JeGf7/C/Z7v0b.5H0cI8yxnhz0O', '010-8901-2345', '서울시 종로구', '여성', '1993-05-16'),
        ('현빈', 'user9', 'user9@example.com', '$2a$10$7qJoHkll6P6WzghR7KkFqOM5q8JeGf7/C/Z7v0b.5H0cI8yxnhz0O', '010-9012-3456', '서울시 성동구', '남성', '1982-09-25'),
        ('정은지', 'user10', 'user10@example.com', '$2a$10$7qJoHkll6P6WzghR7KkFqOM5q8JeGf7/C/Z7v0b.5H0cI8yxnhz0O', '010-0123-4567', '서울시 동작구', '여성', '1993-08-18'),
        ('이종석', 'user11', 'user11@example.com', '$2a$10$7qJoHkll6P6WzghR7KkFqOM5q8JeGf7/C/Z7v0b.5H0cI8yxnhz0O', '010-1234-5678', '서울시 중구', '남성', '1989-09-14');

        INSERT INTO user ( name, id, email, password, phone, address, gender, birth )
        VALUES ( '관리자1', 'admin1', 'admin@naver.com', '$2a$10$7qJoHkll6P6WzghR7KkFqOM5q8JeGf7/C/Z7v0b.5H0cI8yxnhz0O', '010-1234-1234', '인천시', '', '2024-01-01' );
        INSERT INTO user (name, id, email, password, phone, address, gender, birth)
        VALUES ('관리자2', 'admin2', 'admin@gmail.com', '$2a$10$7qJoHkll6P6WzghR7KkFqOM5q8JeGf7/C/Z7v0b.5H0cI8yxnhz0O', '010-1234-5678', '본사', '남성', '1997-01-01');
        INSERT INTO user_auth (user_id, auth)
        VALUES 
        ('user1@example.com', 'ROLE_USER'),
        ('user2@example.com', 'ROLE_USER'),
        ('user3@example.com', 'ROLE_USER'),
        ('user4@example.com', 'ROLE_USER'),
        ('user5@example.com', 'ROLE_USER'),
        ('user6@example.com', 'ROLE_USER'),
        ('user7@example.com', 'ROLE_USER'),
        ('user8@example.com', 'ROLE_USER'),
        ('user9@example.com', 'ROLE_USER'),
        ('user10@example.com', 'ROLE_USER'),
        ('user11@example.com', 'ROLE_USER');

        INSERT INTO user_auth ( user_id,  auth )
        VALUES ( 'admin@naver.com', 'ROLE_USER' ),
            ( 'admin@naver.com', 'ROLE_ADMIN' ),
            ( 'admin@gmail.com', 'ROLE_USER' ),
            ( 'admin@gmail.com', 'ROLE_ADMIN' );
        INSERT INTO user_auth ( user_id,  auth )
        VALUES ( 'joeun@naver.com', 'ROLE_USER' );

        SET FOREIGN_KEY_CHECKS = 0;
        TRUNCATE reply;
        TRUNCATE star_board ;

        INSERT INTO star_board (title, writer, content, user_no, type)
        VALUES 
        ('이벤트제목', '김조은', '내용1', 1, 'event'),
        ('이벤트제목2', '김연아', '내용2', 3, 'event'),
        ('이벤트제목3', '박보검', '내용3', 4, 'event'),
        ('이벤트제목4', '손예진', '내용4', 5, 'event'),
        ('이벤트제목5', '이민호', '내용5', 6, 'event'),
        ('이벤트제목6', '수지', '내용6', 7, 'event'),
        ('이벤트제목7', '박서준', '내용7', 8, 'event'),
        ('이벤트제목8', '아이유', '내용8', 9, 'event'),
        ('이벤트제목9', '현빈', '내용9', 10, 'event'),
        ('이벤트제목10', '정은지', '내용10', 11, 'event'),
        ('이벤트제목11', '이종석', '내용11', 12, 'event');

        INSERT INTO star_board (title, writer, content, user_no, status, card, category1, category2, type)
        VALUES 
        ('이벤트제목1', '김조은', '내용1', 1, '승인', '무료홍보', 'instagram', 'music', 'starCard'),
        ('이벤트제목2', '김연아', '내용2', 3, '승인', '무료홍보', 'instagram', 'music', 'starCard'),
        ('이벤트제목3', '박보검', '내용3', 4, '승인', '무료홍보', 'instagram', 'music', 'starCard'),
        ('이벤트제목4', '손예진', '내용4', 5, '승인', '무료홍보', 'instagram', 'music', 'starCard'),
        ('이벤트제목5', '이민호', '내용5', 6, '승인', '무료홍보', 'instagram', 'music', 'starCard'),
        ('이벤트제목6', '수지', '내용6', 7, '승인', '무료홍보', 'instagram', 'music', 'starCard'),
        ('이벤트제목7', '박서준', '내용7', 8, '승인', '무료홍보', 'instagram', 'music', 'starCard'),
        ('이벤트제목8', '아이유', '내용8', 9, '승인', '무료홍보', 'instagram', 'music', 'starCard'),
        ('이벤트제목9', '현빈', '내용9', 10, '승인', '무료홍보', 'instagram', 'music', 'starCard'),
        ('이벤트제목10', '정은지', '내용10', 11, '승인', '무료홍보', 'instagram', 'music', 'starCard'),
        ('이벤트제목11', '이종석', '내용11', 12, '승인', '무료홍보', 'instagram', 'music', 'starCard');


        INSERT INTO star_board (title, writer, content, user_no, type)
        VALUES 
        ('후기1', '김조은', '내용1', 1, 'review'),
        ('후기2', '김연아', '내용2', 3, 'review'),
        ('후기3', '박보검', '내용3', 4, 'review'),
        ('후기4', '손예진', '내용4', 5, 'review'),
        ('후기5', '이민호', '내용5', 6, 'review'),
        ('후기6', '수지', '내용6', 7, 'review'),
        ('후기7', '박서준', '내용7', 8, 'review'),
        ('후기8', '아이유', '내용8', 9, 'review'),
        ('후기9', '현빈', '내용9', 10, 'review'),
        ('후기10', '정은지', '내용10', 11, 'review'),
        ('후기11', '이종석', '내용11', 12, 'review');

        INSERT INTO star_board (title, writer, content, user_no, type)
        VALUES 
        ('공지1', '관리자', '내용1', 13, 'an'),
        ('공지2', '관리자', '내용2', 13, 'an'),
        ('공지3', '관리자', '내용3', 13, 'an'),
        ('공지4', '관리자', '내용4', 13, 'an'),
        ('공지5', '관리자', '내용5', 13, 'an'),
        ('공지6', '관리자', '내용6', 13, 'an'),
        ('공지7', '관리자', '내용7', 13, 'an'),
        ('공지8', '관리자', '내용8', 13, 'an'),
        ('공지9', '관리자', '내용9', 13, 'an'),
        ('공지10', '관리자', '내용10', 13, 'an'),
        ('공지11', '관리자', '내용11', 13, 'an');

        INSERT INTO qna_board (title, writer, content, user_no, status)
        VALUES 
        ('Q&A1', '김조은', '질문', 1, '답변대기'),
        ('Q&A2', '김연아', '질문', 3, '답변대기'),
        ('Q&A3', '박보검', '질문', 4, '답변대기'),
        ('Q&A4', '손예진', '질문', 5, '답변대기'),
        ('Q&A5', '이민호', '질문', 6, '답변대기'),
        ('Q&A6', '수지', '질문', 7, '답변대기'),
        ('Q&A7', '박서준', '질문', 8, '답변대기'),
        ('Q&A8', '아이유', '질문', 9, '답변대기'),
        ('Q&A9', '현빈', '질문', 10, '답변대기'),
        ('Q&A10', '정은지', '질문', 11, '답변대기');

        INSERT INTO file (file_name, origin_name, size, user_no, star_no)
        VALUES
        ('1c5ece20-8b5a-402e-8fad-40cc4f5f3468_joeun.jpg', 'joeun.jpg', 39478, 13, 0),
        ('8c849b42-9548-41a7-811e-ed0206aec3fe_kildong.webp', 'kildong.webp', 21572, 2, 0),
        ('8fa5bf08-91a4-42fc-802d-12a1a4fa0a01_yeona.jpg', 'yeona.jpg', 138823, 3, 0),
        ('126a7dcc-113f-4b12-85cc-1389d0846226_bokeom.jpg', 'bokeom.jpg', 310505, 4, 0),
        ('fa0950a1-9f74-423e-bb89-2273f96232a6_yejin.webp', 'yejin.webp', 52354, 5, 0),
        ('b0e22b80-eb5e-4241-a46d-496bf260f129_minho.jpg', 'minho.jpg', 82689, 6, 0),
        ('2fc5c6e4-5711-474d-b8d3-ebdba52ca444_suji.jpg', 'suji.jpg', 113056, 7, 0),
        ('019d8ec3-822d-4745-a855-ef69cc8acd1d_seojun.jpg', 'seojun.jpg', 29648, 8, 0),
        ('f0958808-11aa-4589-9788-ff2f7fc5328d_iu.png', 'iu.png', 453192, 9, 0),
        ('1cd9c44a-be38-4e27-a63c-ed0a9813688e_hyunbin.jpg', 'hyunbin.jpg', 424234, 10, 0),
        ('a06970d3-838b-4d4c-8094-bcdec56b6716_eunji.jpg', 'eunji.jpg', 42740, 11, 0),
        ('53f3d32a-ff41-47f2-ab67-07753cc8dfcf_jongseok.jpg', 'jongseok.jpg', 22263, 12, 0),
        ('7a84712c-6d8d-4f9b-b3e9-83396b72ede6_tkxkd9187.gif', 'tkxkd9187.gif', 203552, 1, 0);


        INSERT INTO reply (writer, content, reg_date, upd_date, user_no, star_no, review_no, pre_no, parent_no)
        VALUES ('joeun', 'This is a comment for star_no 10.', NOW(), NOW(), NULL, 10, NULL, NULL, NULL);

        TRUNCATE message;

        INSERT INTO message (message_no, content, code, reg_date, reply_no, pay_no, qna_no, user_no)
        VALUES ('3', '관리자메세지', 'toUser', NOW(), 0, 0, 0, 0);

        SET FOREIGN_KEY_CHECKS = 1;