import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import styles from "../board/css/read.module.css";
import ReplyList from "./ReplyList";
import * as pay from "../../apis/pay";

const Read = ({
  starNo,
  starBoard,
  fileList,
  isLoading,
  replyList,
  newReply,
  answerContent,
  setAnswerContent,
  replyUpdate,
  onReplySubmit,
  handleReplyDelete,
  handleReplyUpdate,
  onDelete,
  handleReplySubmit,
  handleRereplySubmit,
  handleNewReplyChange,
  handleNewRereplyChange,
  userInfo,
  isLogin,
  likes,
  liked,
  onLikeToggle,
}) => {
  const navigate = useNavigate();

  const [showAnswerBox, setShowAnswerBox] = useState(null);
  const toggleAnswerBox = (replyNo) => {
    if (showAnswerBox === replyNo) {
      setShowAnswerBox(null);
      setAnswerContent(""); // 답글 내용 초기화
    } else {
      setShowAnswerBox(replyNo);
      setAnswerContent(""); // 답글 내용 초기화
    }
  };

  const getTypeClass = () => {
    switch (starBoard.type) {
      case "an":
        return styles.notice;
      case "event":
        return styles.event;
      case "review":
        return styles["black-han-sans-regular"];
      case "starCard":
        return styles.starCard;
    }
  };

  const getTitle = () => {
    switch (starBoard.type) {
      case "event":
        return "EVENT";
      case "an":
        return "Notice";
      case "review":
        return "후기";
      case "starCard":
        return "스타 홍보";
    }
  };

  // 포인트를 사용할때
  async function pointAdd(point) {
    if (userInfo.point < point) {
      alert("포인트가 부족합니다.");
      return false;
    }

    const requestData = {
      point: -point,
      type: "사용",
      userNo: userInfo.userNo,
      starNo: starNo,
      msg: `${point}포인트를 사용하여 ${starBoard.writer}님에게 후원하였습니다.`,
    };

    try {
      const response = await pay.pointAdd(requestData);

      if (response.status !== 200) {
        alert("다시시도해주세요");
        return false;
      } else {
        userInfo.point = userInfo.point - point;
        return true;
      }
    } catch (error) {
      console.error("결제 확인 중 에러 발생:", error);
      //   navigate(`/payments/fail`);
    }
  }

  // 후원받을때
  async function pointAdd_v2(point) {
    const requestData = {
      point: point,
      type: "후원",
      sendNo: userInfo.userNo,
      starNo: starNo,
      userNo: starBoard.userNo,
    };

    try {
      const response = await pay.pointAdd(requestData);

      if (response.status !== 200) {
        alert("다시시도해주세요");
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error("결제 확인 중 에러 발생:", error);
      //   navigate(`/payments/fail`);
    }
  }

  const donaition = (point) => {
    // db처리
    console.log(
      `${starBoard.writer}님에게 ${userInfo.id}님이 ${point} 포인트를 후원하였습니다`
    );
    // alert
    Swal.fire({
      title: "감사합니다!",
      text: point + " 포인트가 후원되었습니다",
      icon: "success",
    }).then((result) => {});
    // alert(`${point} 포인트가 후원되었습니다. 감사합니다!`)
  };

  const clickDona = async (point) => {
    Swal.fire({
      title: "후원하기",
      html: `<p>${starBoard.writer}님에게 ${point}포인트를 후원합니다.</p>`,
      showCancelButton: true,
      confirmButtonText: "좋아요",
      cancelButtonText: "취소",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const success = await pointAdd(point);
        if (success) {
          donaition(point);
          pointAdd_v2(point);
        }
      }
    });
  };

  const dona = () => {
    const inputValue = 0;
    const inputStep = 100;
    // const inputNumber =
    Swal.fire({
      icon: "question",
      title: "후원하기",
      // text: '이 스타에게 포인트를 후원 하시나요?',
      html: `<br/>
            <p>최소 100포인트에서 최대 10,000포인트까지<br/>후원 가능합니다 :D<br><br/>현재 보유 포인트 : ${userInfo.point.toLocaleString()}</p>
               <input
                    type="number"
                    value="${inputValue}"
                    step="${inputStep}"
                    class="swal2-input"
                    id="range-value">`,
      input: "range",
      inputValue,
      inputAttributes: {
        min: "100",
        max: "10000",
        step: inputStep.toString(),
      },
      showCancelButton: true,
      confirmButtonText: "후원하기",
      cancelButtonText: "취소",
      confirmButtonColor: "#91accf",
      cancelButtonColor: "#ffccee",
      didOpen: () => {
        const inputRange = Swal.getInput();
        const inputNumber = Swal.getPopup().querySelector("#range-value");
        // remove default output
        Swal.getPopup().querySelector("output").style.display = "none";
        inputRange.style.width = "100%";

        // sync input[type=number] with input[type=range]
        inputRange.addEventListener("input", () => {
          inputNumber.value = inputRange.value;
        });

        // sync input[type=range] with input[type=number]
        inputNumber.addEventListener("change", () => {
          inputRange.value = inputNumber.value;
        });
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const point = Swal.getPopup().querySelector("#range-value").value;
        clickDona(point);
      }
    });
  };

  return (
    <div className="container2" style={{ padding: "10px" }}>
      <center>
        {/* {starBoard.type === 'an' && <h1>Notice</h1>}
        {starBoard.type === 'event' && <h1>EVENT</h1>}
        {starBoard.type === 'review' && <h1>후기</h1>}
        {starBoard.type === 'starCard' && <h1>홍보</h1>} */}
        <h1 className={`${styles.title} ${getTypeClass()}`}>{getTitle()}</h1>
      </center>
      {!isLoading && starBoard && (
        <>
          {starBoard.type == "starCard" ? (
            <>
              <div className="d-flex justify-content-between fw-light fs-6 read-top">
                <span className="">
                  {new Date(starBoard.startDate).toLocaleDateString()}~
                  {new Date(starBoard.endDate).toLocaleDateString()}
                </span>
                <span className="align-items-center">
                  {new Date(starBoard.regDate).toLocaleString()}
                </span>
                <div className="d-flex justify-content-end col-2">
                  <span>
                    <i className="fa-solid fa-star"></i>{" "}
                  </span>
                  <span>{likes}</span>
                  <span className="ms-2">
                    <i className="fa-regular fa-eye"></i>{" "}
                  </span>
                  <span>{starBoard.views}</span>
                </div>
              </div>
              <div className={styles.mainImage}>
                <div>
                  <img
                    src={"/file/img/" + starBoard.imgNo}
                    className="image rounded mt-auto"
                    alt="썸네일"
                  />
                </div>
                <div className={styles.text}>
                  <span className=" fs-1 m-0 p-0 text-light black-han-sans-regular">
                    {starBoard.title}
                  </span>
                  <br />
                  <span className="fw-bold text-light fs-10 eventtext">
                    {starBoard.writer}
                  </span>
                  <br />
                  {starBoard.category1.split(",").map((icon, index) => (
                    <img
                      key={index}
                      src={`/img/icon/${icon}.png`}
                      className={`content-icon ${icon}`}
                      style={{
                        maxWidth: "20px",
                        margin: "0",
                        marginRight: "5px",
                        maxHeight: "20px",
                      }}
                    />
                  ))}
                  <br />
                  {starBoard.koreaCategory2
                    .split(",")
                    .map((word) => `#${word.trim()}`)
                    .join(" ")}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={styles.writer}>
                <label>{starBoard.writer}</label>
                <label>{new Date(starBoard.regDate).toLocaleString()}</label>
              </div>
              <div className={styles["title-container"]}>
                <span>{starBoard.title}</span>
                <hr />
              </div>
            </>
          )}
        </>
      )}
      <div className={styles["content-container"]}>
        <span dangerouslySetInnerHTML={{ __html: starBoard.content }}></span>
      </div>
      <div
        className={`d-flex justify-content-end mt-2 ${styles["button-box"]}`}
      >
        <button
          className={styles["btn-list"]}
          type="button"
          onClick={() => navigate(-1)}
        >
          목록
        </button>
        {userInfo && userInfo.userNo === starBoard.userNo ? (
          <>
            {starBoard.type == "starCard" ? (
              <button
                className={styles["btn-update"]}
                type="button"
                onClick={() => (window.location.href = `/starUpdate/${starNo}`)}
              >
                수정
              </button>
            ) : (
              <button
                className={styles["btn-update"]}
                type="button"
                onClick={() => (window.location.href = `/update/${starNo}`)}
              >
                수정
              </button>
            )}
            <button
              className={styles["btn-delete"]}
              type="button"
              onClick={() => onDelete(starNo)}
            >
              삭제
            </button>
          </>
        ) : (
          <>
            {isLogin && (
              <button
                className={styles["btn-update"]}
                type="button"
                onClick={dona}
              >
                후원
              </button>
            )}
          </>
        )}
      </div>
      <div className={styles["button-box1"]}>
        <button className={styles["like-btn"]} onClick={onLikeToggle}>
          <i className={`fa fa-star ${liked ? "fa-solid" : "fa-regular"}`}></i>
        </button>
        <span id="like-count" className={styles["like-span"]}>
          {likes}
        </span>
      </div>
      <div className={styles["reply-container"]}>
        <div className={styles["reply-box"]}>
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
          >
            등록
          </button>
        </div>
      </div>
      <div className={styles["top-reply-list"]}>
        <label className="reply">댓글</label>
        <label className="reply-count">{replyList.length} 개</label>
      </div>
      <div id={styles["reply-listbox"]}>
        {Array.isArray(replyList) &&
          replyList.map((reply) => (
            <ReplyList
              key={reply.replyNo}
              reply={reply}
              sessionUser={userInfo}
              deleteReply={handleReplyDelete}
              updateReply={handleReplyUpdate}
              insertAnswer={onReplySubmit}
              handleReplySubmit={handleReplySubmit}
              handleRereplySubmit={handleRereplySubmit}
              handleNewReplyChange={handleNewReplyChange}
              handleNewRereplyChange={handleNewRereplyChange}
              answerContent={answerContent}
              setAnswerContent={setAnswerContent}
              showAnswerBox={showAnswerBox}
              toggleAnswerBox={toggleAnswerBox}
            />
          ))}
      </div>
    </div>
  );
};

export default Read;
