
 INSERT INTO qna_board (title, writer, content, user_no, status)
        VALUES 
        ('Q&A1', '신준수', '질문', 15, '답변대기'),
        ('Q&A2', '신준수', '질문', 15, '답변대기'),
        ('Q&A3', '신준수', '질문', 15, '답변대기'),
        ('Q&A4', '신준수', '질문', 15, '답변대기'),
        ('Q&A5', '신준수', '질문', 15, '답변대기'),
        ('Q&A6', '신준수', '질문', 15, '답변대기'),
        ('Q&A7', '신준수', '질문', 15, '답변대기'),
        ('Q&A8', '신준수', '질문', 15, '답변대기'),
        ('Q&A9', '신준수', '질문', 15, '답변대기'),
        ('Q&A10', '신준수', '질문', 15, '답변대기');
 INSERT INTO star_board (title, writer, content, card, status, user_no, type)
        VALUES 
        ('Q&A1', '신준수', '질문', "무료홍보", "홍보요청", 15, 'starCard'),
        ('Q&A2', '신준수', '질문', "무료홍보", "홍보요청", 15, 'starCard'),
        ('Q&A3', '신준수', '질문', "무료홍보", "홍보요청", 15, 'starCard'),
        ('Q&A4', '신준수', '질문', "무료홍보", "홍보요청", 15, 'starCard'),
        ('Q&A5', '신준수', '질문', "무료홍보", "홍보요청", 15, 'starCard'),
        ('Q&A6', '신준수', '질문', "무료홍보", "홍보요청", 15, 'starCard'),
        ('Q&A7', '신준수', '질문', "무료홍보", "홍보요청", 15, 'starCard'),
        ('Q&A8', '신준수', '질문', "무료홍보", "홍보요청", 15, 'starCard'),
        ('Q&A9', '신준수', '질문', "무료홍보", "홍보요청", 15, 'starCard'),
        ('Q&A10', '신준수', '질문', "무료홍보", "홍보요청", 15, 'starCard');


INSERT INTO `payment_info` (`product_title`, `code`, `price`, `user_no`, `star_no`, `reg_date`, `status`)
VALUES
('Product A', 'CODE1234', 10000, 15, 140, '2024-07-01 12:00:00', '결제완료'),
('Product B', 'CODE1235', 20000, 15, 141, '2024-07-02 13:00:00', '결제대기'),
('Product C', 'CODE1236', 30000, 15, 142, '2024-07-03 14:00:00', '결제완료'),
('Product D', 'CODE1237', 40000, 15, 143, '2024-07-04 15:00:00', '결제대기'),
('Product E', 'CODE1238', 50000, 15, 144, '2024-07-05 16:00:00', '결제완료');






