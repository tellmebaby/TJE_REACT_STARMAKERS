-- Active: 1714701530602@@127.0.0.1@3306@joeun
--------------------------------[user]-------------------------------

INSERT INTO user ( id, password, name, email )
VALUES ( 'user', '$2a$12$TrN..KcVjciCiz.5Vj96YOBljeVTTGJ9AUKmtfbGpgc9hmC7BxQ92', '사용자', 'user@mail.com' );

INSERT INTO user_auth ( user_id,  auth )
VALUES ( 'user', 'ROLE_USER' );



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
        s.type = 'starCard' and s.status = '승인'
    ORDER BY 
        s.reg_date DESC
    LIMIT 60;