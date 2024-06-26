-- Active: 1716943546664@@127.0.0.1@3306@joeun
SELECT COUNT(*)
FROM user
WHERE name = "김조은" AND email = "joeun@naver.com";

SELECT COUNT(*)
FROM user
WHERE id = "joeun";

SELECT * 
FROM user;

SELECT *
FROM star_board

SELECT COUNT(*)
FROM star_board 
WHERE type = "event"   
ORDER BY reg_date DESC 

SELECT COUNT(*)
FROM star_board 
WHERE type = "event";
and title LIKE CONCAT '%%'
OR content LIKE CONCAT '%%';

SELECT *
FROM file;


SELECT * FROM file
    WHERE user_no = 1 AND star_no = 0
    ORDER BY reg_date DESC
    LIMIT 1;

SELECT * FROM file 
    WHERE user_no = 1 AND star_no = 0 ;

  SELECT COUNT(*)
        FROM star_board 
        WHERE type = "event";
        and title LIKE CONCAT '%%'
                OR content LIKE CONCAT '%%';

SELECT *
FROM user

SELECT *
FROM file

SELECT *
        FROM file
        WHERE user_no = 3
        AND star_no = 0



-- 새 메인 스타카드 불러오기
SELECT 
    s.*,
    f.file_no AS imgNo,
    (
        SELECT file_no 
        FROM file f2 
        WHERE f2.user_no = s.user_no AND f2.star_no = 0 
        ORDER BY f2.reg_date DESC 
        LIMIT 1
    ) AS userImgId
FROM 
    star_board s
LEFT JOIN 
    file f ON f.star_no = s.star_no
WHERE 
    s.type = 'starCard'
ORDER BY 
    s.reg_date DESC;




SELECT 
    sb.writer,
    sb.views,
    sb.user_no,
    sb.likes,
    sb.category2,
    f.file_no AS userImgId
FROM (
    SELECT 
        s.user_no,
        MAX(s.writer) AS writer,
        MAX(s.views) AS views,
        MAX(s.likes) AS likes,
        MAX(s.category2) AS category2,
        COALESCE(MAX(s.views), 0) + COALESCE(MAX(s.likes), 0) AS total_score  -- total_score 계산
    FROM 
        star_board s
    WHERE 
        s.card IS NOT NULL
    GROUP BY 
        s.user_no
    ORDER BY 
        total_score DESC
    LIMIT 5
) AS sb
LEFT JOIN file AS f ON sb.user_no = f.user_no AND f.star_no = 0;


-- 최근에 글올린 유저
SELECT 
    sb.star_no,
    sb.writer,
    sb.views,
    sb.user_no,
    sb.likes,
    sb.category2,
    f.file_no AS userImgId
FROM (
    SELECT 
        s.*,
        ROW_NUMBER() OVER (PARTITION BY s.user_no ORDER BY s.reg_date DESC) AS row_num
    FROM 
        star_board s
    WHERE 
        s.card IS NOT NULL  
    ORDER BY 
        s.reg_date DESC
) sb
LEFT JOIN file f ON sb.user_no = f.user_no AND f.star_no = 0
WHERE 
    sb.row_num = 1
ORDER BY 
    sb.reg_date DESC
LIMIT 5;


SELECT 
    sb.writer,
    sb.views,
    sb.user_no,
    sb.likes,
    sb.category2,
    sb.star_no,  -- 가장 높은 조회수 게시물의 star_no
    f.file_no AS userImgId
FROM (
    SELECT 
        s.user_no,
        s.writer,
        s.views,
        s.likes,
        s.category2,
        s.star_no,
        COALESCE(s.views, 0) + COALESCE(s.likes, 0) AS total_score
    FROM 
        star_board s
    WHERE 
        s.card IS NOT NULL
        AND s.views = (
            SELECT MAX(inner_s.views)
            FROM star_board inner_s
            WHERE inner_s.user_no = s.user_no
        )
    ORDER BY 
        total_score DESC
    LIMIT 5
) AS sb
LEFT JOIN file AS f ON sb.user_no = f.user_no AND f.star_no = 0;

delete  
FROM file
WHERE user_no = 6 AND star_no = 0

SELECT *
FROM file

INSERT INTO payment_info (code, price, user_no, star_no, product_title, status) VALUES
(102, '54000', 1, 9, '유튜브 홍보합니다', '환불대기')

TRUNCATE payment_info

SELECT *
FROM payment_info

select * 
FROM star_board

SELECT pi.*
      ,sb.status as star_status
        FROM 
            payment_info pi
        JOIN 
            star_board sb
        ON 
            pi.user_no = sb.user_no
        WHERE pi.user_no = 1
        AND pi.star_no = sb.star_no


SELECT sb.title, sb.category1, sb.reg_date, sb.status
      ,pi.price
        FROM 
            star_board sb
        JOIN 
            payment_info pi
        ON 
            pi.user_no = sb.user_no
        WHERE pi.user_no = 1
        AND pi.star_no = sb.star_no
;
SELECT 
    sb.user_no,
    sb.title, 
    sb.category1, 
    sb.reg_date, 
    sb.status, 
    pi.price as star_price
FROM 
    star_board sb
JOIN 
    payment_info pi
ON 
    pi.user_no = sb.user_no
AND 
    pi.star_no = sb.star_no
WHERE 
    sb.user_no = 1

    INSERT INTO payment_info (product_title, code, price, user_no, star_no, reg_date, status) VALUES
('홍보카드 기간제 상품', 'MC4xMDkwODM2MTkzMDk', 10000, 1, 16, '2024-06-04 20:29:55', '결제완료'),
('홍보카드 기간제 상품', 'MC44NTkwMTI4NDM0ODc', 9000, 1, 20, '2024-06-04 21:55:39', '결제완료'),
('홍보카드 기간제 상품', 'MC4yNjYyODIxNjc2MTMw', 11000, 1, 21, '2024-06-05 09:40:20', '결제완료'),
('홍보카드 기간제 상품', 'MC43ODY1Nzg3NTg3MTc', 7000, 1, 23, '2024-06-05 10:01:32', '결제완료'),
('홍보카드 기간제 상품', 'MC4zMDYyOTIyMjMzMzcy', 11000, 1, 29, '2024-06-05 10:39:31', '결제완료');

 SELECT SUM(price) as price
    FROM payment_info
    WHERE user_no = 1


SELECT COUNT(*)
     FROM reply
     WHERE star_no = 3;

SELECT *
FROM message

 INSERT INTO message (content, code, reply_no, pay_no, qna_no, user_no)
VALUES ('안녕', 'ToUser', 0, 0, 0, 2)

SELECT like_no
FROM action
where user_no=1 and star_no=4;

SELECT 
    s.*,
    f.file_no AS imgNo,
    (
        SELECT file_no 
        FROM file f2 
        WHERE f2.user_no = s.user_no AND f2.star_no = 0 
        ORDER BY f2.reg_date DESC 
        LIMIT 1
    ) AS userImgId
    FROM 
        star_board s
    LEFT JOIN 
        file f ON f.star_no = s.star_no
    WHERE 
        s.type = 'starcard'
    ORDER BY 
        s.reg_date DESC;


SELECT
    s.*,
    f.file_no AS imgNo,
    (
        SELECT file_no 
        FROM file f2 
        WHERE f2.user_no = s.user_no AND f2.star_no = 0 
        ORDER BY f2.reg_date DESC 
        LIMIT 1
    ) AS userImgId,
    CASE
        WHEN a.star_no IS NOT NULL THEN 'liked'
        ELSE 'nothing'
    END AS action
FROM 
    star_board s
LEFT JOIN 
    file f ON f.star_no = s.star_no
LEFT JOIN
    action a ON a.star_no = s.star_no AND a.user_no = 1
WHERE 
    s.type = 'starCard'
ORDER BY 
    s.reg_date DESC;


SELECT sb.*
FROM star_board sb
JOIN action a ON sb.star_no = a.star_no
WHERE sb.type = 'starCard' AND a.user_no = 1;

SELECT sb.*, file.file_no AS imgNo
        FROM star_board sb
        JOIN action a ON sb.star_no = a.star_no
        LEFT JOIN file ON sb.star_no = file.star_no
        WHERE sb.type = 'starCard' AND a.user_no = 1;

SELECT u.user_no
              ,u.email
              ,password
              ,name
              ,id
              ,phone
              ,address
              ,gender
              ,birth
              ,reg_date
              ,upd_date
              ,1 enabled
              ,auth
        FROM user u 
             LEFT OUTER JOIN user_auth auth ON u.email = auth.user_id
        WHERE u.socia_code = 3519723416
        ;


        SELECT u.user_no
              ,u.email
              ,password
              ,name
              ,id
              ,phone
              ,address
              ,gender
              ,birth
              ,reg_date
              ,upd_date
              ,1 enabled
              ,auth
        FROM user u 
             LEFT OUTER JOIN user_auth auth ON u.email = auth.user_id
        WHERE u.socia_code = 3519723416

