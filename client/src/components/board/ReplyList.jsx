import React, { useContext } from 'react';
import styles from '../board/css/read.module.css';
import { LoginContext } from '../../contexts/LoginContextProvider';

const ReplyList = ({ reply, sessionUser, deleteReply, insertAnswer }) => {
  const { isLogin, logout, userInfo } = useContext(LoginContext)

  
  return (
    <div>
      {/* 댓글인 경우 */}
      {reply.replyNo === reply.parentNo && (
        <div className={styles['reply-line']} id="reply-line">
          {/* 댓글 */}
          <div className={styles['reply-top']}>
            <span className={styles['reply-writer']}>{reply.writer}</span>
            <span className={styles['reply-regDate']}>
              {new Date(reply.regDate).toLocaleString()} {/* 날짜 포맷 변환 예시 */}
              {/* <i className="fa-regular fa-thumbs-up icon"></i> */}
            </span>
          </div>
          {/* 댓글 내용/ 수정 삭제 버튼 */}
          <div className={styles['reply-con']}>
            <div className={styles['reply-middle']}>
              <p className={styles['reply-content']}>{reply.content}</p>
              <div className={styles['reply-button']}>
                {userInfo && userInfo.userNo === reply.userNo && (
                  <>
                    <button className={styles['btn-reply-update']} data-replyno={reply.replyNo}>수정</button>
                    <button className={styles['btn-reply-delete']} onClick={() => deleteReply(reply.replyNo)}>삭제</button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className={styles['reply-rereply']}>
            <button className={styles['btn-rereply']} onClick={() => insertAnswer(reply.replyNo)}>답글쓰기</button>
          </div>
        </div>
      )}

      {/* 답글인 경우 */}
      {reply.replyNo !== reply.parentNo && (
        <div className={styles['rereply-list']} id="rereply-list">
          <div className={styles['rereply']}>
            {/* 답글 */}
            <div className={styles['rereply-top']}>
              <span className={styles['rereply-writer']}>{reply.writer}</span>
              <span className={styles['rereply-regDate']}>
                {new Date(reply.regDate).toLocaleString()} {/* 날짜 포맷 변환 예시 */}
                {/* <i className="fa-regular fa-thumbs-up icon"></i> */}
              </span>
            </div>
            {/* 답글 내용/ 수정 삭제 버튼 */}
            <div className={styles['rereply-con']}>
              <div className={styles['rereply-middle']}>
                <p className={styles['rereply-content']}>{reply.content}</p>
                <div className={styles['rereply-button']}>
                  {userInfo && userInfo.userNo === reply.userNo && (
                    <>
                      <button className={styles['btn-rereply-update']} data-replyno={reply.replyNo}>수정</button>
                      <button className={styles['btn-rereply-delete']} onClick={() => deleteReply(reply.replyNo)}>삭제</button>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className={`${styles['rereply-container']} m-0 p-0`}>
              <div className={styles['rereply-box']}>
                <textarea placeholder="자유롭게 의견을 작성하세요. 운영원칙에 위배되는 댓글은 삭제될 수 있습니다."></textarea>
                <button type="button" onClick={() => insertAnswer(reply.replyNo)}>등록</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReplyList;
