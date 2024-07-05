import React, { useEffect, useState } from 'react';
import * as qna from '../../apis/qna';
import QnaRead from '../../components/board/QnaRead';
import { useNavigate } from 'react-router-dom';
import * as Swal from '../../apis/alert'

const QnaReadContainer = ({ qnaNo }) => {
  // 🧊 state
  const [qnaBoard, setQnaBoard] = useState({});
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getQnaBoard = async () => {
    setLoading(true);
    try {
      const response = await qna.select(qnaNo);
      setQnaBoard(response);
    } catch (error) {
      console.error('Error fetching Q&A board:', error);
    } finally {
      setLoading(false);
    }
  };

  const addAnswer = async (answer) => {
    setLoading(true);
    try {
      await qna.insertAnswer({ qnaNo, answer });
      await getQnaBoard();
    } catch (error) {
      console.error('Error adding answer:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateAnswer = async (answer) => {
    setLoading(true);
    try {
      await qna.insertAnswer({ qnaNo, answer });
      await getQnaBoard();
    } catch (error) {
      console.error('Error updating answer:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteAnswer = async () => {
    setLoading(true);
    try {
      await qna.deleteAnswer({ qnaNo });
      await getQnaBoard();
    } catch (error) {
      console.error('Error deleting answer:', error);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (qnaNo) => {
    try {
      
      Swal.confirm("정말로 삭제하시겠습니까?", "", "question", (result) => {
        // isConfirmed : 확인버튼 클릭 여부
        if (result.isConfirmed) {
            try {
              qna.remove(qnaNo);
              Swal.alert("삭제 완료!");
              navigate("/qna/qnaList");
            } catch (error) {
              console.error('게시글 삭제 실패:', error);
            }
        }
    })

    } catch (error) {
      console.error('게시글 삭제 실패:', error);
    }
  };


  // hook
  useEffect(() => {
    getQnaBoard();
  }, [qnaNo]);

  return (
    <>
      <QnaRead
        qnaNo={qnaNo}
        qnaBoard={qnaBoard}
        isLoading={isLoading}
        addAnswer={addAnswer}
        updateAnswer={updateAnswer}
        deleteAnswer={deleteAnswer}
        onDelete={onDelete}
      />
    </>
  );
};

export default QnaReadContainer;
