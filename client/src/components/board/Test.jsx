import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import styles from '../board/CSS/insert.module.css'
// ckeditor5
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as filesAPI from '../../apis/files'

const Test = ({ onInsert }) => {
    // 🧊 state
    const [title, setTitle] = useState('')
    const [writer, setWriter] = useState('')
    const [content, setContent] = useState('')
    const [files, setFiles] = useState(null)

    // 🎁 함수
    const handleChangeTitle = (e) => {
        setTitle(e.target.value)
    }
    const handleChangeWriter = (e) => {
        setWriter(e.target.value)
    }
    const handleChangeContent = (e) => {
        setContent(e.target.value)
    }
    // 파일 업로드
    const handleChangeFile = (e) => {
        setFiles(e.target.files)
    }
    const onSubmit = () => {
        // 유효성 검사 ✅
        // ...일단 생략

        // 파일 업로드에서는 
        // Content-Type : application/json -> multipart/form-data
        const formData = new FormData()
        formData.append('title', title)
        formData.append('writer', writer)
        formData.append('content', content)

        // 헤더
        const headers = {
            'Content-type': 'multipart/form-data'
        }

        // 파일 데이터 추가
        if (files) {
            for (let i = 0; i < files.length; i++) {
                // const file = files[i];
                // formData.append('files', file)
                formData.append(`files[${i}]`, files[i])
            }
        }

        // onInsert(title, writer, content) // jsonf
        onInsert(formData, headers)         // formData
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
                            default: `/file/img/${newFileNo}`
                        })

                    });
                });
            },
        };
    };

    function uploadPlugin(editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
            return customUploadAdapter(loader);
        };
    }

    
    return (
        <div className='container'>
            <h1 className='title'>게시글 등록</h1>
            <table>
                <tbody>
                    <tr>
                        <td>제목</td>
                        <td>
                            {/* 
                                CSS module의 클래스 선택자는 카멜 케이스로 쓰는 것이 관례
                                - 카멜 케이스 : styles.formInput
                                - 케밥 케이스 : styles.['form-input']
                            */}
                            <input type="text" value={title} onChange={handleChangeTitle} />
                        </td>
                    </tr>
                    <tr>
                        <td>작성자</td>
                        <td>
                            <input type="text" value={writer} onChange={handleChangeWriter} />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>내용</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            {/* <textarea cols="40" className={styles.formInput} rows={10} value={content} onChange={handleChangeContent}></textarea> */}
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
                                data=""         // ⭐ 기존 컨텐츠 내용 입력 (HTML)
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
                        </td>
                    </tr>
                    <tr>
                        <td>파일</td>
                        <td>
                            <input type="file" onChange={handleChangeFile} multiple />
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className='btn-box'>
                <Link to="/boards" className='btn'>목록</Link>
                <button className='btn' onClick={onSubmit}>등록</button>
            </div>

        </div>
    )
}

export default Test