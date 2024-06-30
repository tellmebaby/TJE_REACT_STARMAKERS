-- Active: 1717023153983@@127.0.0.1@3306@joeun
--------------------------------[user]-------------------------------

INSERT INTO user ( id, password, name, email )
VALUES ( 'user', '$2a$12$TrN..KcVjciCiz.5Vj96YOBljeVTTGJ9AUKmtfbGpgc9hmC7BxQ92', '사용자', 'user@mail.com' );

INSERT INTO user_auth ( user_id,  auth )
VALUES ( 'user', 'ROLE_USER' );


