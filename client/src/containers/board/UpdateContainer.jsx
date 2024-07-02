import React from 'react'
import UpdateForm from '../../components/board/UpdateForm'
import * as boards from '../../apis/starBoard'

const UpdateContainer = ({no}) => {
  const navigate = useNavigate()

  // 🧊 state
  const [board, setBoard] = useState({})
  const [isLoading, setLoading] = useState(false)

  // 🎁 이벤트 함수
  const getBoard = async () => {
    // ⏳ 로딩 시작
    setLoading(true)
    const response = await boards.select(no)
    const data = await response.data    // board 객체 + fileList 객체
    // console.log("확인용 " + data)

    const board = data.board
    // const fileList = data.fileList

    setBoard(board)
    // setFileList(fileList)
    // 로딩 끝 ⌛
    setLoading(false)
  }

  const onUpdate = async (no, title, writer, content) => {
    try {
      const response = await boards.update(no, title, writer, content)
      const status = await response.status
      console.log(`게시글 수정 요청 결과 : ${status}`);
      alert("게시글 수정 완료!")

      // -> rptlrmf ahrfhrdmfh dlehd
      navigate(`/${type}`)

    } catch (error) {
      console.log(error);
    }
  }

  // ❓ hook 
  useEffect(() => {
    getBoard()
  }, [])

  return (
    <UpdateForm no={no} type={type} boadr={board} onUpdate={onUpdate} isLoading={isLoading}/>
  )
}

export default UpdateContainer