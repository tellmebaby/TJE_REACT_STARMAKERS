-- Active: 1717721626738@@127.0.0.1@3306@joeun
SELECT * from star_board where user_no = 1;


        SELECT sum(price) as total_price
        FROM payment_info
        WHERE user_no = 2


select * from `user`;


select * from `user_auth`;

INSERT INTO user_auth( user_id, auth )
        VALUES ( 'ab@afdsf.com' , 'ROLE_USER' );

delete from user_auth where auth_no = 2;

select * from star_board;
SELECT * from file;
   
        SELECT s.*, file_no as imgNo
        FROM star_board s 
        left join file f
        ON f.star_no=s.star_no 

        WHERE 
            type = 'starCard'

        <if test="option.keyword != null and option.keyword != ''">
            AND
            <if test="option.code == 0">
                (title LIKE CONCAT('%', #{option.keyword}, '%')
                OR content LIKE CONCAT('%', #{option.keyword}, '%'))
            </if>
            <if test="option.code == 1">
                title LIKE CONCAT('%', #{option.keyword}, '%')
            </if>
            <if test="option.code == 2">
                content LIKE CONCAT('%', #{option.keyword}, '%')
            </if>
            <if test="option.code == 3">
                writer LIKE CONCAT('%', #{option.keyword}, '%')
            </if>
            <if test="option.code == 4">
                s.user_no IN (${option.keyword})
            </if>
        </if>

        
        <!-- 요청 상태 -->
        <if test="option.status or option.approve or option.companion ">
            AND (
                1 = 0
                <!-- 요청 -->
                <if test="option.status == 0">
                    OR status LIKE '%홍보요청%'
                </if>
                <!-- 승인 -->
                <if test="option.status == 1">
                    OR status LIKE '%승인%'
                </if>
                <!-- 반려 -->
                <if test="option.status == 2">
                    OR s.start_date &gt; NOW()
                    OR status LIKE '%반려%'
                </if>
            )
        </if>
        ORDER BY star_no DESC
        LIMIT #{page.index}, #{page.rows}
    </select>