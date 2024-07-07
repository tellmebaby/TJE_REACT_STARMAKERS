-- Active: 1714701530602@@127.0.0.1@3306@joeun
-- 👩‍💼 USERS  --

-- 기존 테이블 존재하면 삭제
DROP TABLE IF EXISTS user;

--당스만 회원 새로
INSERT INTO user (
  name,
  id,
  email,
  password,
  phone,
  address,
  gender,
  birth,
  reg_date,
  upd_date,
  socia_code,
  point
) VALUES 
  ('김조은', 'joeun', 'joeun@naver.com', '$2a$12$TrN..KcVjciCiz.5Vj96YOBljeVTTGJ9AUKmtfbGpgc9hmC7BxQ92', '010-1234-1234', '인천시', '', '2024-01-01', CURRENT_TIMESTAMP, NULL, NULL, 0),
  ('홍길동', 'user1', 'user1@example.com', '$2a$12$TrN..KcVjciCiz.5Vj96YOBljeVTTGJ9AUKmtfbGpgc9hmC7BxQ92', '010-1234-5678', '서울시 강남구', '남성', '1990-01-01', CURRENT_TIMESTAMP, NULL, NULL, 0),
  ('김연아', 'user2', 'user2@example.com', '$2a$12$TrN..KcVjciCiz.5Vj96YOBljeVTTGJ9AUKmtfbGpgc9hmC7BxQ92', '010-2345-6789', '서울시 마포구', '여성', '1990-09-05', CURRENT_TIMESTAMP, NULL, NULL, 0),
  ('박보검', 'user3', 'user3@example.com', '$2a$12$TrN..KcVjciCiz.5Vj96YOBljeVTTGJ9AUKmtfbGpgc9hmC7BxQ92', '010-3456-7890', '서울시 강북구', '남성', '1993-06-16', CURRENT_TIMESTAMP, NULL, NULL, 0),
  ('손예진', 'user4', 'user4@example.com', '$2a$12$TrN..KcVjciCiz.5Vj96YOBljeVTTGJ9AUKmtfbGpgc9hmC7BxQ92', '010-4567-8901', '서울시 서초구', '여성', '1982-01-11', CURRENT_TIMESTAMP, NULL, NULL, 0),
  ('이민호', 'user5', 'user5@example.com', '$2a$12$TrN..KcVjciCiz.5Vj96YOBljeVTTGJ9AUKmtfbGpgc9hmC7BxQ92', '010-5678-9012', '서울시 송파구', '남성', '1987-06-22', CURRENT_TIMESTAMP, NULL, NULL, 0),
  ('수지', 'user6', 'user6@example.com', '$2a$12$TrN..KcVjciCiz.5Vj96YOBljeVTTGJ9AUKmtfbGpgc9hmC7BxQ92', '010-6789-0123', '서울시 영등포구', '여성', '1994-10-10', CURRENT_TIMESTAMP, NULL, NULL, 0),
  ('박서준', 'user7', 'user7@example.com', '$2a$12$TrN..KcVjciCiz.5Vj96YOBljeVTTGJ9AUKmtfbGpgc9hmC7BxQ92', '010-7890-1234', '서울시 용산구', '남성', '1988-12-16', CURRENT_TIMESTAMP, NULL, NULL, 0),
  ('아이유', 'user8', 'user8@example.com', '$2a$12$TrN..KcVjciCiz.5Vj96YOBljeVTTGJ9AUKmtfbGpgc9hmC7BxQ92', '010-8901-2345', '서울시 종로구', '여성', '1993-05-16', CURRENT_TIMESTAMP, NULL, NULL, 0),
  ('현빈', 'user9', 'user9@example.com', '$2a$12$TrN..KcVjciCiz.5Vj96YOBljeVTTGJ9AUKmtfbGpgc9hmC7BxQ92', '010-9012-3456', '서울시 성동구', '남성', '1982-09-25', CURRENT_TIMESTAMP, NULL, NULL, 0),
  ('정은지', 'user10', 'user10@example.com', '$2a$12$TrN..KcVjciCiz.5Vj96YOBljeVTTGJ9AUKmtfbGpgc9hmC7BxQ92', '010-0123-4567', '서울시 동작구', '여성', '1993-08-18', CURRENT_TIMESTAMP, NULL, NULL, 0),
  ('이종석', 'user11', 'user11@example.com', '$2a$12$TrN..KcVjciCiz.5Vj96YOBljeVTTGJ9AUKmtfbGpgc9hmC7BxQ92', '010-1234-5678', '서울시 중구', '남성', '1989-09-14', CURRENT_TIMESTAMP, NULL, NULL, 0);


