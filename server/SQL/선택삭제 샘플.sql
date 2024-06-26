-- Active: 1716511247384@@127.0.0.1@3306@joeun

INSERT INTO qna_board (title, writer, content, reg_date, user_no, status)
VALUES
('첫 번째 질문', 'User1', '첫 번째 질문입니다.', CURRENT_TIMESTAMP, 1, '답변 대기중'),
('두 번째 질문', 'User2', '두 번째 질문입니다.', CURRENT_TIMESTAMP, 2, '답변 완료'),
('세 번째 질문', 'User3', '세 번째 질문입니다.', CURRENT_TIMESTAMP, 3, '답변 대기중');


DELETE FROM qna_board
WHERE qna_no IN (17,18,19)
;

SELECT *
FROM qna_board;