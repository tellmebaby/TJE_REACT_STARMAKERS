import React from 'react'

const ReplyList = () => {
  return (
    <div>
      {/* 댓글인 경우 */}
      {reply.replyNo === reply.parentNo && (
        <div id="reply-line">
          {/* 댓글 */}
          <div className="reply-top">
            <span className="reply-writer">{reply.writer}</span>
            <span className="reply-regDate">
              {new Date(reply.regDate).toLocaleString()} {/* 날짜 포맷 변환 예시 */}
              <i className="fa-regular fa-thumbs-up icon"></i>
            </span>
          </div>
          {/* 댓글 내용/ 수정 삭제 버튼 */}
          <div className="reply-con">
            <div className="reply-middle">
              <p className="reply-content">{reply.content}</p>
              <div className="reply-button">
                {sessionUser !== null && sessionUser.id === reply.writer && (
                  <>
                    <button className="btn-reply-update" data-replyno={reply.replyNo}>수정</button>
                    <button className="btn-reply-delete" onClick={() => deleteReply(reply.replyNo)}>삭제</button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="reply-rereply">
            <button className="btn-rereply" onClick={() => insertAnswer(reply.replyNo)}>답글쓰기</button>
          </div>
        </div>
      )}

      {/* 답글인 경우 */}
      {reply.replyNo !== reply.parentNo && (
        <div id="rereply-list">
          <div className="rereply">
            {/* 답글 */}
            <div className="rereply-top">
              <span className="rereply-writer">{reply.writer}</span>
              <span className="rereply-regDate">
                {new Date(reply.regDate).toLocaleString()} {/* 날짜 포맷 변환 예시 */}
                <i className="fa-regular fa-thumbs-up icon"></i>
              </span>
            </div>
            {/* 답글 내용/ 수정 삭제 버튼 */}
            <div className="rereply-con">
              <div className="rereply-middle">
                <p className="rereply-content">{reply.content}</p>
                <div className="rereply-button">
                  {sessionUser !== null && sessionUser.id === reply.writer && (
                    <>
                      <button className="btn-rereply-update" data-replyno={reply.replyNo}>수정</button>
                      <button className="btn-rereply-delete" onClick={() => deleteReply(reply.replyNo)}>삭제</button>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="rereply-container m-0 p-0">
              <div className="rereply-box">
                <textarea placeholder="자유롭게 의견을 작성하세요. 운영원칙에 위배되는 댓글은 삭제될 수 있습니다."></textarea>
                <button type="button" onClick={() => insertAnswer(reply.replyNo)}>등록</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReplyList