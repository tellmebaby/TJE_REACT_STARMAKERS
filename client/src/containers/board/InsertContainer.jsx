import React from 'react'

import InsertForm from '../../components/board/InsertForm'
import * as boards from '../../apis/starBoard'
import { useNavigate } from 'react-router-dom'


const InsertContainer = ({toBoard}) => {
    const navigate = useNavigate()


    // 🎁 이벤트 함수
    // const onInsert = async (title, writer, content) => {
    const onInsert = async (toBoard, formData, headers) => {
      try {
        // const response = await boards.insert(title, writer, content)
        const response = await boards.insert({toBoard}, formData, headers)
        const status = await response.status 
        console.log(`게시글 등록 요청 결과 : ${status}`);
        alert("게시글 등록 완료!")

        // -> 게시글 목록으로 이동
        navigate({toBoard})
      } catch (error) {
        console.log(error);
      }
    }
    // ❓ hook 
  
  
    return (
      <>
          {/* 게시글 등록 */}
          {/* <InsertForm onInsert={onInsert}/> */}
          <InsertForm toBoard={toBoard} onInsert={onInsert}/>
      </>
    )

  }


export default InsertContainer