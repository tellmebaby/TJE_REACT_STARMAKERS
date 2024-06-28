import React, { useContext, useState } from 'react';
// ckeditor5
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import 'bootstrap/dist/css/bootstrap.css';
import { LoginContext } from '../../contexts/LoginContextProvider';
import './test.css'

const InsertForm = () => {
  const { isLogin, logout } = useContext(LoginContext)


  return (
    
    <div className="insert">
      <h1 class="d-flex justify-content-center mb-3 mt-3">
        공지 등록
      </h1>
      <div class="body lg" >

        <form action="/page/board/anBoard/anInsert" method="post" id="anInsert">

          <div className="container">
            <div className="input-group mb-3">
              <span className="input-group-text" id="addon-wrapping">제목</span>
              <input type="text" name="title" className="form-control" placeholder="글 제목을 입력해주세요" aria-label="tilte"
                aria-describedby="addon-wrapping" />
            </div>
            <input type="hidden" name="type" value="an" />
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

                                    // extraPlugins: [uploadPlugin]            // 업로드 플러그인
                                }}
                                data=""         // ⭐ 기존 컨텐츠 내용 입력 (HTML)
                                onReady={editor => {
                                    // You can store the "editor" and use when it is needed.
                                    console.log('Editor is ready to use!', editor);
                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    console.log({ event, editor, data });
                                    // setContent(data);
                                }}
                                onBlur={(event, editor) => {
                                    console.log('Blur.', editor);
                                }}
                                onFocus={(event, editor) => {
                                    console.log('Focus.', editor);
                                }}
                            />
            <div className="d-flex justify-content-end mt-2">
              <button type="button" className="btn btn-primary btn-submit col-1 border-1 btn-list" >목록</button>
              <input type="submit" className="btn btn-primary btn-submit col-1 border-0" value="등록" />
            </div>
          </div>
        </form>
        {/* <input type="sub" /> */}
      </div>
      {/* {
        isLogin ?
          <div className="container content-box mt-3 mb-3">
            <div className="d-flex justify-content-center mb-5" style="padding-top:200px">
              <p>로그인이 필요한 페이지입니다.</p>
            </div>
            <div className="d-flex justify-content-center">
              <a href="/login" className="btn btn-info m-1 " style="color:white">로그인 하러 가기</a>
              <a href="/join" className="btn btn-primary m-1">회원가입 하러 가기</a>
            </div>
          </div>
          :
          <div class="body lg" style="max-width: 900 ;">
            <h1 class="d-flex justify-content-center mb-3 mt-3">
              공지 등록
            </h1>
          <form action="/page/board/anBoard/anInsert" method="post" id="anInsert">

            <div class="container">
              <input type="hidden" th:name="${_csrf.parameterName}" th:value="${_csrf.token}"/>
                <input type="hidden" name="username" th:value="${session.user.email}"/>
                  <div class="input-group mb-3">
                    <span class="input-group-text" id="addon-wrapping">제목</span>
                    <input type="text" name="title" class="form-control" placeholder="글 제목을 입력해주세요" aria-label="tilte"
                      aria-describedby="addon-wrapping"/>
                  </div>
                  <input type="hidden" name="type" value="an" />
                          <textarea name="content" class="" id="summernote"></textarea>
                          <div class="d-flex justify-content-end mt-2">
                            <button type="button" class="btn btn-primary btn-submit col-1 border-1 btn-list" style="color: #91ACCF !important; background-color: #FFFFFF; border: 1px solid #91ACCF;" onclick="anList()">목록</button>
                            <input type="submit" class="btn btn-primary btn-submit col-1 border-0" style="background-color: #91ACCF;" value="등록"/>
                          </div>
                        </div>
                      </form>
                    </div>
       } */}
    </div>
  )
}

export default InsertForm
