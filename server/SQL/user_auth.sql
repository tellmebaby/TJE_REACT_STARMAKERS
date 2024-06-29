-- Active: 1717071708994@@127.0.0.1@3306@joeun
-- 👮‍♀️ USER_AUTH  --

-- 기존 테이블 존재하면 삭제
DROP TABLE IF EXISTS user_auth;

-- user_auth : 권한 테이블
CREATE TABLE `user_auth` (
      auth_no int NOT NULL AUTO_INCREMENT       -- 권한번호
    , user_id varchar(100) NOT NULL             -- 아이디
    , auth varchar(100) NOT NULL                -- 권한 (USER, ADMIN, ...)
    , PRIMARY KEY(auth_no)                      
);


-- 기본 데이터
-- 사용자 
-- * 권한 : USER
INSERT INTO user_auth ( user_id,  auth )
VALUES ( 'user', 'ROLE_USER' );

-- 관리자
-- * 권한 : USER, ADMIN
INSERT INTO user_auth ( user_id,  auth )
VALUES ( 'admin', 'ROLE_USER' );

INSERT INTO user_auth ( user_id,  auth )
VALUES ( 'admin', 'ROLE_ADMIN' );


--   XXX  ➡ ROLE_XXX  변환
UPDATE user_auth
SET auth = CONCAT('ROLE_', auth)
WHERE auth NOT LIKE 'ROLE_%';
