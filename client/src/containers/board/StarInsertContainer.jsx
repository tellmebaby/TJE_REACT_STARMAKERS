import React from 'react'

import * as boards from '../../apis/starBoard'
import { useNavigate } from 'react-router-dom'
import StarInsertForm from '../../components/board/StarInsertForm'


const StarInsertContainer = ({type}) => {
    const navigate = useNavigate()


    // 🎁 이벤트 함수
    // const onInsert = async (title, writer, content) => {
    const onInsert = async ( formData, headers) => {
      // console.log("onInsert" + {toBoard});
      try {
        // const response = await boards.insert(title, writer, content)
        const response = await boards.insert(formData, headers)
        const status = await response.status 
        console.log(`게시글 등록 요청 결과 : ${status}`);
        alert("게시글 등록 완료!")

        // -> 게시글 목록으로 이동
        navigate('/starCard')
      } catch (error) {
        console.log(error);
      }
    }
    // ❓ hook 
  
  
    return (
      <>
          {/* 게시글 등록 */}
          <StarInsertForm type={type} onInsert={onInsert}/>
      </>
    )

  }


export default StarInsertContainer