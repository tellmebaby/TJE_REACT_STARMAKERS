import React, { useEffect, useState } from 'react'
import * as starBoards from '../../apis/starBoard'
import Read from '../../components/board/Read'

const ReadContainer = ({starNo}) => {
  // 🧊 state
  const [starBoard, setStarBoard] = useState({})
  const [fileList, setFileList] = useState([])    // List는 배열이기 때문에 []
  const [isLoading, setLoading] = useState(false)

  // 🌞 함수
  const getBoard = async () => {
      // 로딩 시작
      setLoading(true)
      const response = await starBoards.select(starNo)
      const data = await response.data        // ⭐ board 객체 + fileList

      console.log(response);

       console.log("container : " + response.data);
      // const fileList = data.fileList

      setStarBoard(data.starBoard)
      // setFileList(fileList)

      // console.log(data)
      // setBoard(data)
      setLoading(false)
      // 로딩 끝
  }



  // ❓ hook
  useEffect( () => {
    getBoard()
  }, [])
return (
  <>
      <Read
      starNo={starNo} starBoard={starBoard} fileList={fileList} isLoading={isLoading}
      />
  </>

)
}

export default ReadContainer