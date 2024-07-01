import React, { useEffect, useState } from 'react'
import * as starBoard from '../../apis/starBoard'
import Read from '../../components/board/Read'

const ReadContainer = ({starNo}) => {
  // 🧊 state
  const [board, setBoard] = useState({})
  const [fileList, setFileList] = useState([])    // List는 배열이기 때문에 []
  const [isLoading, setLoading] = useState(false)

  // 🌞 함수
  const getBoard = async () => {
      // 로딩 시작
      setLoading(true)
      const response = await starBoard.select(starNo)
      const data = await response.data        // ⭐ board 객체 + fileList

      const board = data.board
      const fileList = data.fileList

      setBoard(board)
      setFileList(fileList)

      // console.log(data)
      // setBoard(data)
      setLoading(false)
      // 로딩 끝
  }



  // ❓ hook
  useEffect( () => {
      getBoard()
  }, [starNo])
return (
  <>
      <Read
      starNo={starNo} board={board} fileList={fileList} isLoading={isLoading}
      />
  </>

)
}

export default ReadContainer