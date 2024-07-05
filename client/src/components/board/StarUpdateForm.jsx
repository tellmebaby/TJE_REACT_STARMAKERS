import React, { useContext, useState, type, useEffect } from 'react';
// ckeditor5
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import 'bootstrap/dist/css/bootstrap.css';
import { LoginContext } from '../../contexts/LoginContextProvider';
import './editer.css'
import * as filesAPI from '../../apis/files'
import { Link, useNavigate } from 'react-router-dom';
// import Calendar from './css/calendar.module.css';
import styles from './css/Insert.module.css'

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const StarUpdateForm = ({ starNo, starBoard, onUpdate, isLoading }) => {
    const navigate = useNavigate()

    const { userInfo } = useContext(LoginContext)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [files, setFiles] = useState(null)
    const [category1, setCategory1] = useState([])
    const [category2, setCategory2] = useState([])
    const [category, setCategory] = useState([])    // category1
    const [category22, setCategory22] = useState([])    // category2
    const [status, setStatus] = useState('홍보요청')
    const [duplicated, setDuplicated] = useState(false)
    const [duplicated2, setDuplicated2] = useState(false)

    const [cate1, setCate1] = useState(false)
    const [cate2, setCate2] = useState(false)

    // 🎁 함수
    const handleChangeTitle = (e) => {
        setTitle(e.target.value)
    }

    // 파일 업로드
    const handleChangeFile = (e) => {
        setFiles(e.target.files)
    }

    // ✅ 카테고리1 : 유튜브,인스타,아프리카,치지직
    const handleChangeCategory1 = (e) => {
        setCate1(true) // 실행 되는 경우 true로 바꿈
        const cate = e.target.value

        let checked = false
        for (let i = 0; i < category.length; i++) {
            const checkCategory = category[i];
            // 중복 : 체크박스 해제
            if (checkCategory == cate) {
                category.splice(i, 1)
                setCategory(category)
                checked = true
                break
            }
        }
        console.log(`category1 [] : ${category}`);
        if (!checked) {
            const updatedCategory = [cate, ...category]
            console.log(`category1 [] : ${updatedCategory}`);
            setCategory(updatedCategory)
        }
    }

    const handleChangeCategory2 = (e) => {
        setCate2(true)
        const cate = e.target.value

        let checked = false
        for (let i = 0; i < category22.length; i++) {
            const checkCategory = category22[i];
            // 중복 : 체크박스 해제
            if (checkCategory == cate) {
                category22.splice(i, 1)
                setCategory(category22)
                checked = true
                break
            }
        }
        console.log(`category22 [] : ${category22}`);
        if (!checked) {
            const updatedCategory = [cate, ...category22]
            console.log(`category22 [] : ${updatedCategory}`);
            setCategory22(updatedCategory)
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()      // 기본 이벤트 방지
        console.log("여기오나? onSubmit");
        // 유효성 검사 ✅
        // ...일단 생략

        // 파일 업로드에서는 
        // Content-Type : application/json -> multipart/form-data
        console.log("userNo? " + userInfo.userNo);
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('userNo', userInfo.userNo);
        formData.append('writer', userInfo.id);
        if (cate1) {
            formData.append('category1', category);
        } else {
            formData.append('category1', category1)
        }
        if (cate2) {
            formData.append('category2', category22);
        } else {
            formData.append('category2', category2)
        }
        formData.append('status', status);
        formData.append('starNo', starNo)

        console.log("title : " + title);
        console.log("content : " + content);

        // 헤더
        const headers = {
            'Content-type': 'multipart/form-data'
        }

        // 파일 데이터 추가
        if (files) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                formData.append('image', file)
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
        if (starBoard && !isLoading) {
            
            setTitle(starBoard.title);
            setContent(starBoard.content);
            setCategory1(starBoard.category1);
            setCategory2(starBoard.category2);
            
            console.log(`starBoard.category1 : ${category1}`);
            console.log(`starBoard.category2 : ${category2}`);
            const cat1Inputs = document.querySelectorAll('input[name="category1"]');
            const cat1List = Array.from(cat1Inputs).map(input => input.value);

            const cat2Inputs = document.querySelectorAll('input[name="category2"]');
            const cat2List = Array.from(cat2Inputs).map(input => input.value);

            // category1 (문자열) : instagram,youtube 
            if (starBoard.category1) {
                let newCategory = []
                cat1List.forEach(cat1Value => {
                    if (starBoard.category1.includes(cat1Value)) {
                        const inputElement = document.querySelector(`input[id="${cat1Value}"]`);
                        if (inputElement) {
                            inputElement.checked = true;
                            newCategory = [cat1Value, ...newCategory]
                            console.log(`newCategory : ${newCategory}`);
                            // console.log("category1 : " + category1);
                            // setDuplicated(false);
                            // handleCate1(inputElement)
                        }
                    }
                });
                setCategory(newCategory)
            }

            if (starBoard.category2) {
                let newCategory = []
                cat2List.forEach(cat2Value => {
                    if (starBoard.category2.includes(cat2Value)) {
                        const inputElement = document.querySelector(`input[value="${cat2Value}"]`);
                        if (inputElement) {
                            inputElement.checked = true;
                            newCategory = [cat2Value, ...newCategory]
                            console.log(`newCategory2 : ${newCategory}`);
                            console.log("category2 : " + starBoard.category2);

                            // setDuplicated2(false);
                            // if (!duplicated2) category22.push(inputElement)
                            //     console.log(`category2 : ${category22}`);
                            //     setCategory22(category22)
                        }
                    }
                });
                setCategory22(newCategory)
            }
        }
    }, [starBoard]);

    function uploadPlugin(editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
            return customUploadAdapter(loader);
        };
    }

    return (
        <div className="update">
            <div class="body lg" >
                {/* <h1 class="d-flex justify-content-center mb-3 mt-3 "> */}
                <h1 className={styles.starTitle}>
                    홍보글 수정
                </h1>
                <span class="d-flex justify-content-center text-secondary mb-3">
                    <p className={styles.updateSub}>
                        수정 시, 관리자 확인 후 글이 재등록됩니다.<br />자세한 문의사항은 1:1 채팅 또는 Q&A 게시판을 이용해주세요:D
                    </p>
                </span>
                {
                    isLoading ?
                        <div className="container content-box mt-3 mb-3">
                            <div className="d-flex justify-content-center mb-5" >
                                <p>로딩 중</p>
                            </div>
                        </div>
                        :
                        <form id="starUpdate">

                            <div className="container">
                                <div className="category my-4 bg-body-tertiary rounded">
                                    <div className="site row py-2">
                                        <div className="item col-1"></div>
                                        <div className="item col-2">
                                            <b>채널</b>
                                        </div>

                                        <div className="item col-8 d-flex justify-content-start column-gap-2">
                                            <div className="form-check form-check-inline d-flex align-items-center">
                                                <input className="form-check-input " name="category1" type="checkbox" value="youtube" id="youtube" onChange={handleChangeCategory1} />
                                                <label className="form-check-label" for="youtube" >
                                                    유튜브
                                                </label>
                                            </div>
                                            <div className="form-check form-check-inline d-flex align-items-center">
                                                <input className="form-check-input" name="category1" type="checkbox" value="instagram" id="instagram" onChange={handleChangeCategory1} />
                                                <label className="form-check-label" for="instagram">
                                                    인스타그램
                                                </label>
                                            </div>
                                            <div className="form-check form-check-inline d-flex align-items-center">
                                                <input className="form-check-input" name="category1" type="checkbox" value="afreeca" id="afreeca" onChange={handleChangeCategory1} />
                                                <label className="form-check-label" for="afreeca">
                                                    아프리카
                                                </label>
                                            </div>
                                            <div className="form-check form-check-inline d-flex align-items-center">
                                                <input className="form-check-input" name="category1" type="checkbox" value="chzzk" id="chzzk" onChange={handleChangeCategory1} />
                                                <label className="form-check-label" for="chzzk">
                                                    치지직
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="site row py-2">
                                        <div className="item col-1"></div>
                                        <div className="item col-2">
                                            <b>분야</b>
                                        </div>
                                        <div className="item col-9 d-flex justify-content-start column-gap-2">
                                            <div className="form-check form-check-inline d-flex align-items-center">
                                                <input className="form-check-input" name="category2" type="checkbox" value="food" id="food" onChange={handleChangeCategory2} />
                                                <label className="form-check-label" for="food">
                                                    음식
                                                </label>
                                            </div>
                                            <div className="form-check form-check-inline d-flex align-items-center">
                                                <input className="form-check-input" name="category2" type="checkbox" value="travel" id="travel" onChange={handleChangeCategory2} />
                                                <label className="form-check-label" for="travel">
                                                    여행
                                                </label>
                                            </div>
                                            <div className="form-check form-check-inline d-flex align-items-center">
                                                <input className="form-check-input " name="category2" type="checkbox" value="game" id="game" onChange={handleChangeCategory2} />
                                                <label className="form-check-label" for="game">
                                                    게임
                                                </label>
                                            </div>
                                            <div className="form-check form-check-inline d-flex align-items-center">
                                                <input className="form-check-input" name="category2" type="checkbox" value="music" id="music" onChange={handleChangeCategory2} />
                                                <label className="form-check-label" for="music">
                                                    음악
                                                </label>
                                            </div>
                                            <div className="form-check form-check-inline d-flex align-items-center">
                                                <input className="form-check-input" name="category2" type="checkbox" value="animal" id="animal" onChange={handleChangeCategory2} />
                                                <label className="form-check-label" for="animal">
                                                    동물
                                                </label>
                                            </div>
                                            <div className="form-check form-check-inline d-flex align-items-center">
                                                <input className="form-check-input" name="category2" type="checkbox" value="workout" id="workOut" onChange={handleChangeCategory2} />
                                                <label className="form-check-label" for="workOut">
                                                    운동
                                                </label>
                                            </div>
                                            <div className="form-check form-check-inline d-flex align-items-center">
                                                <input className="form-check-input" name="category2" type="checkbox" value="asmr" id="asmr" onChange={handleChangeCategory2} />
                                                <label className="form-check-label" for="asmr">
                                                    ASMR
                                                </label>
                                            </div>
                                            <div className="form-check form-check-inline d-flex align-items-center">
                                                <input className="form-check-input" name="category2" type="checkbox" value="fashion" id="fashion" onChange={handleChangeCategory2} />
                                                <label className="form-check-label" for="fashion">
                                                    패션
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="addon-wrapping">제목</span>
                                    <input type="text" className="form-control" placeholder="글 제목을 입력해주세요" aria-label="tilte"
                                        aria-describedby="addon-wrapping" value={title} onChange={handleChangeTitle} />
                                </div>
                                {/* <div className='input-group'>
                                    <span className="input-group-text mb-3 col-2">
                                        홍보 기간
                                    </span>
                                    <span className='col-5'>
                                        <DatePicker
                                            selected={startDate}
                                            onChange={date => setStartDate(date)}
                                            dateFormat="yyyy-MM-dd"
                                            className="form-control col-5 "
                                            calendarClassName={Calendar.calenderWrapper}
                                            minDate={new Date()}
                                            placeholderText="홍보 시작일"
                                        />

                                    </span>
                                    <DatePicker
                                        selected={endDate}
                                        onChange={date => setEndDate(date)}
                                        dateFormat="yyyy-MM-dd"
                                        className="form-control col-5"
                                        minDate={startDate}
                                        placeholderText="홍보 종료일"
                                    />
                                </div> */}
                                <div className="input-group mb-3">
                                    <label className="input-group-text" for="inputGroupFile01">썸네일</label>
                                    <input type="file" name="image" className="form-control" id="inputGroupFile01" onChange={handleChangeFile} />
                                </div>

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
                                    {/* <button type="button" className="btn btn-primary btn-submit col-1 border-1 btn-list" >목록</button> */}
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

export default StarUpdateForm