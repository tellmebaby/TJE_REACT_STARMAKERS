import React from 'react'

import * as boards from '../../apis/starBoard'
import { useNavigate } from 'react-router-dom'
import StarInsertForm from '../../components/board/StarInsertForm'


const StarInsertContainer = ({type}) => {
    const navigate = useNavigate()


    // 🎁 이벤트 함수
    const onInsert = async ( formData, headers) => {
      try {
        const response = await boards.insert(formData, headers)
        const data = await response.data 
        

        if(data.card=='유료홍보'){
          navigate(`/starPayment/`+data.starNo);
        }else{
          alert("게시글 등록 완료!")
          navigate('/starList')
        }

      } catch (error) {
        console.log(error);
      }
    }
  
  
    return (
      <>
          <StarInsertForm type={type} onInsert={onInsert}/>
      </>
    )

  }


export default StarInsertContainer