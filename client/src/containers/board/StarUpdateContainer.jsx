import React, { useEffect, useState } from 'react'
import StarUpdateForm from '../../components/board/StarUpdateForm'
import { useNavigate } from 'react-router-dom'
import * as boards from '../../apis/starBoard'


const StarUpdateContainer = ({ starNo }) => {
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
            const response = await boards.update(formData, headers)
            const status = await response.status
            console.log(`게시글 수정 요청 결과 : ${status}`);
            alert("게시글 수정 완료!" + starNo)


            // 게시글 조회로 이동
            navigate('/' + starNo)

        } catch (error) {
            console.log(error);
        }
    }

    // ❓ hook 
    useEffect(() => {
        getBoard()
    }, [])
    return (
        <>
            <StarUpdateForm starNo={starNo} starBoard={starBoard} />
        </>
    )
}

export default StarUpdateContainer