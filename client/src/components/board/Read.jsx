import React, { useContext } from 'react';
import styles from '../board/css/read.module.css';
import ReplyList from './ReplyList';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../contexts/LoginContextProvider';
import { useSession } from '../../contexts/SessionContext';

const Read = ({
  starNo,
  starBoard,
  fileList,
  isLoading,
  replyList,
  newReply,
  replyUpdate,
  onReplySubmit,
  handleReplyDelete,
  handleReplyUpdate,
  onDelete,
  handleReplySubmit,
  handleNewReplyChange,
  userInfo,
  isLogin
}) => {

  console.log("replyList", starBoard);

  const navigate = useNavigate();
  const { session } = useSession();
  console.log("userInfo");
  console.log(userInfo);
  console.log("댓글", replyList)
  console.log("파일번호 : " + starBoard.imgNo);



  // const category2 = document.getElementById('category2')
  // const category2Text = category2.textContent

  // var arr = [category2Text.split(',')]
  // console.log(arr)
  // const category2Text2 = category2Text.split(',').map(word => `#${word.trim()}`).join(' ')
  // category2.textContent = arr

  return (
    <div className="container2" style={{ padding: '10px' }}>
      <center>
        {starBoard.type === 'an' && <h1>공지사항</h1>}
        {starBoard.type === 'event' && <h1>이벤트</h1>}
        {starBoard.type === 'review' && <h1>후기</h1>}
        {starBoard.type === 'starCard' && <h1>홍보</h1>}
      </center>
      {!isLoading && starBoard && (
        <>
          {starBoard.type == 'starCard' ?
            <>
              <div className="d-flex justify-content-between fw-light fs-6 read-top">
                <span className="">
                  {new Date(starBoard.startDate).toLocaleDateString()}~{new Date(starBoard.endDate).toLocaleDateString()}
                </span>
                <span className="align-items-center">{new Date(starBoard.regDate).toLocaleString()}</span>
                <div className="d-flex justify-content-end col-2">
                  <span ><i className="fa-solid fa-star"></i> </span>
                  <span>{starBoard.likes}</span>
                  <span className="ms-2"><i className="fa-regular fa-eye"></i> </span>
                  <span>{starBoard.views}</span>
                </div>
              </div>
              <div className={styles.mainImage}>
                <div>
                  <img src={"/file/img/" + starBoard.imgNo} className="image rounded mt-auto" alt="썸네일" />
                </div>
                <div className={styles.text}>
                  <span className=" fs-1 m-0 p-0 text-light black-han-sans-regular">{starBoard.title}</span>
                  <br />
                  <span className="fw-bold text-light fs-10 eventtext">{starBoard.writer}</span>
                  <br />
                  {
                    starBoard.category1.split(',').map((icon, index) =>
                      <img
                        key={index}
                        src={`/img/icon/${icon}.png`}
                        className={`content-icon ${icon}`}
                        style={{ maxWidth: '20px', margin: '0', marginRight: '5px', maxHeight: '20px' }}
                      />
                    )
                  }
                  <br />
                  {
                    starBoard.koreaCategory2.split(',').map(word => `#${word.trim()}`).join(' ')
                  }
                </div>
              </div>
            </>
            :
            <>
              <div className={styles.writer}>
                <label>{starBoard.writer}</label>
                <label>{new Date(starBoard.regDate).toLocaleString()}</label>
              </div>
              <div className={styles['title-container']}>
                <span>{starBoard.title}</span>
                <hr />
              </div>
            </>

          }
        </>
      )}
      <div className={styles['content-container']}>
        <span dangerouslySetInnerHTML={{ __html: starBoard.content }}></span>
      </div>
      <div className={`d-flex justify-content-end mt-2 ${styles['button-box']}`}>
        <button className={styles['btn-list']} type="button" onClick={() => navigate(-1)}>목록</button>
        {userInfo && userInfo.userNo === starBoard.userNo && (
          <>
            {starBoard.type == "starCard" ?
              <button className={styles['btn-update']} type="button" onClick={() => window.location.href = `/starUpdate/${starNo}`}>수정</button>
              :
              <button className={styles['btn-update']} type="button" onClick={() => window.location.href = `/update/${starNo}`}>수정</button>
            }
            <button className={styles['btn-delete']} type="button" onClick={() => onDelete(starNo)}>삭제</button>
          </>
        )}
      </div>
      <div className={styles['reply-container']}>
        <div className={styles['reply-box']}>
          <textarea
            value={newReply}
            onChange={handleNewReplyChange}
            placeholder="자유롭게 의견을 작성하세요. 운영원칙에 위배되는 댓글은 삭제될 수 있습니다. 로그인 하신 분만 댓글을 작성할 수 있습니다."
            disabled={!isLogin}
          ></textarea>
          <button
            type="button"
            className="btn-reply"
            onClick={handleReplySubmit}
            disabled={!isLogin}
          >등록</button>
        </div>
      </div>
      <div className={styles['top-reply-list']}>
        <label className="reply">댓글</label>
        <label className="reply-count">{replyList.length} 개</label>
      </div>
      <div id={styles['reply-listbox']}>
        {Array.isArray(replyList) && replyList.map(reply => (
          <ReplyList
            key={reply.replyNo}
            reply={reply}
            sessionUser={session ? session.user : null}
            deleteReply={handleReplyDelete}
            updateReply={handleReplyUpdate}
            insertAnswer={onReplySubmit}
          />
        ))}
      </div>
    </div>
  );
};

export default Read;
