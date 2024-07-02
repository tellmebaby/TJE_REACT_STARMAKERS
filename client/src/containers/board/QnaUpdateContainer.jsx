import React, { useEffect, useState } from 'react'
import QnaUpdateForm from '../../components/board/QnaUpdateForm'
import * as qna from '../../apis/qna'
import { useNavigate } from 'react-router-dom'

const UpdateContainer = ({qnaNo}) => {
  const navigate = useNavigate()

  // 🧊 state
  const [qnaBoard, setQnaBoard] = useState({})
  const [isLoading, setLoading] = useState(false)

  // 🎁 이벤트 함수
  const getBoard = async () => {
    // ⏳ 로딩 시작
    setLoading(true)
    const response = await qna.select(qnaNo)
    // const data = await response.data    // board 객체 + fileList 객체
    // console.log("확인용 " + data)

    // const board = data.qnaBoard
    console.log(response)
    // const fileList = data.fileList

    setQnaBoard(response)
    // setFileList(fileList)
    // 로딩 끝 ⌛
    setLoading(false)
  }

  const onUpdate = async (qnaNo, formData, headers) => {
    try {
      const response = await qna.update(formData, headers)
      const status = await response.status
      console.log(`게시글 수정 요청 결과 : ${status}`);
      alert("게시글 수정 완료!"+qnaNo)
      

      // 게시글 조회로 이동
      navigate('/qna/qnaRead/'+qnaNo)

    } catch (error) {
      console.log(error);
    }
  }

  // ❓ hook 
  useEffect(() => {
    getBoard()
  }, [])

  return (
    <QnaUpdateForm qnaNo={qnaNo} qnaBoard={qnaBoard} onUpdate={onUpdate} isLoading={isLoading}/>
  )
}

export default UpdateContainer