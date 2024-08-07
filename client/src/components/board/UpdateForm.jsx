import React, { useContext, useState, type, useEffect } from 'react';
// ckeditor5
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import 'bootstrap/dist/css/bootstrap.css';
import { LoginContext } from '../../contexts/LoginContextProvider';
import './editer.css'
import * as filesAPI from '../../apis/files'
import { Link, useNavigate } from 'react-router-dom';

import styles from '../board/css/read.module.css';

const UpdateForm = ({ isFile, starNo, starBoard, onUpdate, isLoading }) => {
  const navigate = useNavigate()
  
  const { isLogin, logout, userInfo } = useContext(LoginContext)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [files, setFiles] = useState(null)


  // 🎁 함수
  const handleChangeTitle = (e) => {
    setTitle(e.target.value)
  }
  
  // 파일 업로드
  const handleChangeFile = (e) => {
    setFiles(e.target.files)
  }

  const onSubmit = (e) => {
    e.preventDefault()      // 기본 이벤트 방지
    console.log("여기오나? onSubmit");
    // 유효성 검사 ✅
    // ...일단 생략

    // 파일 업로드에서는 
    // Content-Type : application/json -> multipart/form-data
    console.log("userNo? " + userInfo.userNo);
    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)
    formData.append('userNo', userInfo.userNo)
    formData.append('starNo', starNo)
    // if (status != null) {
    //   formData.append('status', status)
    // }

    console.log("title : " + title);
    console.log("content : " + content);

    // 헤더
    const headers = {
      'Content-type': 'multipart/form-data'
    }

    // 파일 데이터 추가
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append('image', files[i])
      }
    }

    // onInsert(title, writer, content) // json
    onUpdate(starNo, formData, headers)         // formData
  }
  const customUploadAdapter = (loader) => {
    return {
      upload() {
        return new Promise((resolve, reject) => {
          const formData = new FormData();
          loader.file.then(async (file) => {
            console.log(file);
            formData.append("parentTable", 'editor');
            formData.append("file", file);

            const headers = {
              'Content-Type': 'multipart/form-data'
            };

            let response = await filesAPI.upload(formData, headers);
            let data = await response.data;
            console.log(`data : ${data}`);

            // let newFile = data;
            // let newFileNo = newFile.no;

            let newFileNo = data;

            // 이미지 렌더링
            await resolve({
              // default: `http://localhost:8080/files/img/${newFileNo}`
              default: `/file/img/${newFileNo}`
            })
          });
        });
      },
    };
  };
  
  useEffect(() => {
    if (starBoard) {
      setTitle(starBoard.title)
      setContent(starBoard.content)
    }
  }, [starBoard])

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return customUploadAdapter(loader);
    };
  }

  const getTypeClass = () => {
    switch (starBoard.type) {
      case 'an':
        return styles.notice;
      case 'event':
        return styles.event;
      case 'review':
        return styles['black-han-sans-regular'];
    }
  };

  const getTitle = () => {
    switch (starBoard.type) {
      case 'event': return 'EVENT';
      case 'an': return 'Notice';
      case 'review': return '후기';
    }
  };

  return (
    <div className="update">
      <div class="body lg" >
        <cneter className="d-flex justify-content-center mb-3">
        {/* {starBoard.type === 'an' && <h1>공지사항 수정</h1>}
        {starBoard.type === 'event' && <h1>이벤트 수정</h1>}
        {starBoard.type === 'review' && <h1>후기 수정</h1>} */}
        <h1 className={`${styles.title} ${getTypeClass()}`}>{getTitle()}</h1>
         </cneter>
        {
          !isLogin || isLoading ?
            <div className="container content-box mt-3 mb-3">
              <div className="d-flex justify-content-center mb-5" >
                <p>로그인이 필요한 페이지입니다.</p>
              </div>
              <div className="d-flex justify-content-center">
                <a href="/login" className="btn btn-info m-1 " >로그인 하러 가기</a>
                <a href="/join" className="btn btn-primary m-1">회원가입 하러 가기</a>
              </div>
            </div>
            :
            <form id="anInsert">

              <div className="container">
                <div className="input-group mb-3">
                  <span className="input-group-text" id="addon-wrapping">제목</span>
                  <input type="text" className="form-control" placeholder="글 제목을 입력해주세요" aria-label="tilte"
                    aria-describedby="addon-wrapping" value={title} onChange={handleChangeTitle} />
                </div>
                {
                  starBoard.type=='event' ?
                  <React.Fragment>
                       <div className="input-group mb-3">
                            <label className="input-group-text" for="inputGroupFile01">썸네일</label>
                            <input type="file" name="image" className="form-control" id="inputGroupFile01" onChange={handleChangeFile} />
                        </div>
                    </React.Fragment>
                  :
                  <></>
                }
                <CKEditor
                  editor={ClassicEditor}
                  config={{
                    placeholder: "내용을 입력하세요.",
                    toolbar: {
                      items: [
                        'undo', 'redo',
                        '|', 'heading',
                        '|', 'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor',
                        '|', 'bold', 'italic', 'strikethrough', 'subscript', 'superscript', 'code',
                        '|', 'bulletedList', 'numberedList', 'todoList', 'outdent', 'indent',
                        '|', 'link', 'uploadImage', 'blockQuote', 'codeBlock',
                        '|', 'mediaEmbed',
                      ],
                      shouldNotGroupWhenFull: false
                    },
                    editorConfig: {
                      height: 500, // Set the desired height in pixels
                    },
                    alignment: {
                      options: ['left', 'center', 'right', 'justify'],
                    },

                    extraPlugins: [uploadPlugin]            // 업로드 플러그인
                  }}
                  data={content}         // ⭐ 기존 컨텐츠 내용 입력 (HTML)
                  onReady={editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log({ event, editor, data });
                    setContent(data);
                  }}
                  onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                  }}
                  onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                  }}
                />
                <div className="d-flex justify-content-end mt-2">
                  <button className='btn btn-secondary btn-submit col-1 border-0' type="button" onClick={() => navigate(-2)}>목록</button> {/* 뒤로가기 기능 */}
                  <button className="btn btn-primary btn-submit col-1 border-0" onClick={onSubmit}>수정</button>
                </div>
              </div>
            </form>
        }

      </div>

    </div>
  )
}

export default UpdateForm