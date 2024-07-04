import React, { useContext, useEffect, useState } from 'react'
import UpdateForm from '../../components/board/UpdateForm'
import * as boards from '../../apis/starBoard'
import { useNavigate } from 'react-router-dom'
import { LoginContext } from '../../contexts/LoginContextProvider'

const UpdateContainer = ({ starNo }) => {

  const { userInfo } = useContext(LoginContext)
  console.log(userInfo);

  const navigate = useNavigate()

  // 🧊 state
  const [starBoard, setStarBoard] = useState({})
  const [isLoading, setLoading] = useState(false)

  // 🎁 이벤트 함수
  const getBoard = async () => {
    // ⏳ 로딩 시작
    setLoading(true)
    const response = await boards.select(starNo)
    const data = await response.data    // board 객체 + fileList 객체
    // console.log("확인용 " + data)

    const board = data.starBoard
    console.log(board)
    // const fileList = data.fileList

    setStarBoard(board)
    // setFileList(fileList)
    // 로딩 끝 ⌛
    setLoading(false)
  }

  const onUpdate = async (starNo, formData, headers) => {
    try {
      formData.append('writer', userInfo.id)
      const response = await boards.update(formData, headers)
      const status = response.status
      console.log(`게시글 수정 요청 결과 : ${status}`);
      alert("게시글 수정 완료!" + starNo)


      // 수정 후 게시글 조회 화면으로 이동
      navigate(-2)

    } catch (error) {
      console.log(error);
    }
  }

  // ❓ hook 
  useEffect(() => {
    getBoard()
  }, [])

  return (
    <UpdateForm starNo={starNo} starBoard={starBoard} onUpdate={onUpdate} isLoading={isLoading} />
  )
}

export default UpdateContainer