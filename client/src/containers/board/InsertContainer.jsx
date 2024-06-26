import React from 'react'

import InsertForm from '../../components/board/InsertForm'
import * as boards from '../../apis/starBoard'
import { useNavigate } from 'react-router-dom'


const InsertContainer = ({type, isFile}) => {
    const navigate = useNavigate()


    // 🎁 이벤트 함수
    // const onInsert = async (title, writer, content) => {
    const onInsert = async ( formData, headers) => {
      try {
        const response = await boards.insert(formData, headers)
        const status = await response.status 
        console.log(`게시글 등록 요청 결과 : ${status}`);
        alert("게시글 등록 완료!")

        // -> 게시글 목록으로 이동
        navigate(`/${type}`)
      } catch (error) {
        console.log(error);
      }
    }
    // ❓ hook 
  
  
    return (
      <>
          {/* 게시글 등록 */}
          {/* <InsertForm onInsert={onInsert}/> */}
          <InsertForm type={type} onInsert={onInsert} isFile={isFile}/>
      </>
    )

  }


export default InsertContainer