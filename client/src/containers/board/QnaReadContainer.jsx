import React, { useEffect, useState } from 'react'
import * as qna from '../../apis/qna'
import QnaRead from '../../components/board/QnaRead'

const QnaReadContainer = ({qnaNo}) => {
    // 🧊 state
  const [qnaBoard, setQnaBoard] = useState({})
  const [isLoading, setLoading] = useState(false)

  const getQnaBoard = async () => {
    setLoading(true)
    const response = await qna.select(qnaNo)
    
    setQnaBoard(response)
    console.log("container : " +response.title);
    setLoading(false)
  }


  // hook
  useEffect( () => {
    getQnaBoard()
  }, [qnaNo])
  return (
    <>
        <QnaRead
        qnaNo={qnaNo} qnaBoard={qnaBoard} isLoading={isLoading}
        />
    </>
  )
}

export default QnaReadContainer