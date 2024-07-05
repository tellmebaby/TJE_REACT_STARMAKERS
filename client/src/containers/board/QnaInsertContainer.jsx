import React from 'react'
import * as qna from '../../apis/qna'
import { useNavigate } from 'react-router-dom'
import InsertForm from '../../components/board/InsertForm'
import * as Swal from '../../apis/alert'

const QnaInsertContainer = () => {
    const navigate = useNavigate()


    // 🎁 이벤트 함수
    // const onInsert = async (title, writer, content) => {
    const onInsert = async ( formData, headers) => {
      try {
        // const response = await boards.insert(formData, headers)
        const response = await qna.insert(formData, headers);
        const status = await response.status 
        console.log(`게시글 등록 요청 결과 : ${status}`);
        Swal.alert("게시글 등록 완료!")

        // -> 게시글 목록으로 이동
        navigate("/qna/qnaList")
      } catch (error) {
        console.log(error);
      }
    }
    // ❓ hook 
  
  
    return (
      <>
          {/* 게시글 등록 */}
          {/* <InsertForm onInsert={onInsert}/> */}
          <InsertForm type={""} onInsert={onInsert} status={'답변 대기'}/>
      </>
    )

}

export default QnaInsertContainer