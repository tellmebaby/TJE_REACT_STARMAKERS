import React, { useContext, useState } from 'react';
// ckeditor5
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import 'bootstrap/dist/css/bootstrap.css';
import { LoginContext } from '../../contexts/LoginContextProvider';
import './editer.css'
import * as filesAPI from '../../apis/files'
import { Link } from 'react-router-dom';
import Calendar from './calendar.css';
import styles from './css/Insert.module.css'

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const StarInsertForm = ({ type, onInsert }) => {
    const { isLogin, logout, userInfo } = useContext(LoginContext)
    const [promoButton, setpromoButton] = useState('freePromo');
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [files, setFiles] = useState(null)
    const [category, setCategory] = useState([])    // category1
    const [category22, setCategory22] = useState([])    // category2
    const [category1, setCategory1] = useState(null)
    const [category2, setCategory2] = useState(null)
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [status, setStatus] = useState('홍보요청')
    const [card, setCard] = useState('무료홍보')


    // 🎁 함수
    const handleChangeTitle = (e) => {
        setTitle(e.target.value)
    }
    // 파일 업로드
    const handleChangeFile = (e) => {
        setFiles(e.target.files)
    }
    const handleChangeCategory1 = (e) => {
        setCategory1(e.target.value)
        handleCate1(e.target.value)
    }

    const handleChangeCategory2 = (e) => {
        setCategory2(e.target.value)
        handleCate2(e.target.value)
    }
    // 카테고리1 체크
    const handleCate1 = (cate) => {
        let duplicated = false
        for (let i = 0; i < category.length; i++) {
            const checkCategory = category[i];
            // 중복 : 체크박스 해제
            if (checkCategory == cate) {
                category.splice(i, 1)
                duplicated = true
            }
        }
        // 중복X -> 체크박스 지정 -> 추가
        if (!duplicated) category.push(cate)
        setCategory(category)

    }

    // 카테고리2 체크
    const handleCate2 = (cate) => {
        let duplicated = false
        for (let i = 0; i < category22.length; i++) {
            const checkCategory = category22[i];
            // 중복 : 체크박스 해제
            if (checkCategory == cate) {
                category22.splice(i, 1)
                duplicated = true
            }
        }
        // 중복X -> 체크박스 지정 -> 추가
        if (!duplicated) category22.push(cate)
        console.log(`선택된 카테고리 : ${category22}`);
        setCategory22(category22)
    }

    const handlePromoClick = (promoType) => {
        setpromoButton(promoType);
    };

    const onSubmit = (e) => {
        e.preventDefault();  // 기본 이벤트 방지
    
        // 유효성 검사 ✅
        // ...일단 생략
    
        // 파일 업로드에서는 
        // Content-Type : application/json -> multipart/form-data
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('type', type);
        formData.append('userNo', userInfo.userNo);
        formData.append('writer', userInfo.id);
        formData.append('category1', category);
        formData.append('category2', category22);
        formData.append('status', status);
        formData.append('card', card);
        formData.append('startDate', startDate);
        formData.append('endDate', endDate);
    
        // 헤더
        const headers = {
            'Content-Type': 'multipart/form-data'
        };
    
        // 파일 데이터 추가
        if (files) {
            for (let i = 0; i < files.length; i++) {
                formData.append('image', files[i]);
            }
        }
    
        onInsert(formData, headers);  // formData
    };
    

    const payment = (e) => {
        e.preventDefault();
        setCard('유료홍보');
        onSubmit(e); // 함수 호출명 수정
    };
    
    const customUploadAdapter = (loader) => {
        return {
            upload() {
                return new Promise((resolve, reject) => {
                    const formData = new FormData();
                    loader.file.then(async (file) => {
                        formData.append("parentTable", 'editor');
                        formData.append("file", file);

                        const headers = {
                            'Content-Type': 'multipart/form-data'
                        };

                        let response = await filesAPI.upload(formData, headers);
                        let data = await response.data;

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

    function uploadPlugin(editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
            return customUploadAdapter(loader);
        };
    }

    return (

        <div className="insert">
            <div className="body lg" >
                {/* {
                    !isLogin ?
                        <div className="container content-box mt-3 mb-3">
                            <div className="d-flex justify-content-center mb-5" >
                                <p>로그인이 필요한 페이지입니다.</p>
                            </div>
                            <div className="d-flex justify-content-center">
                                <a href="/login" className="btn btn-info m-1 " >로그인 하러 가기</a>
                                <a href="/join" className="btn btn-primary m-1">회원가입 하러 가기</a>
                            </div>
                        </div>
                        : */}
                <div className="container">
                    <form id="starInsert">

                        <div className="d-flex align-items-center border-bottom border-dark" id="channel">
                            <button type="button"
                                className={`btn btn-lg col-4 border-0 rounded-1 ${promoButton === 'freePromo' ? 'btn-dark' : 'btn-outline-dark'} `}
                                onClick={() => handlePromoClick('freePromo')}
                            >무료홍보</button>
                            <button type="button"
                                className={`btn btn-lg col-4 border-0 rounded-1 ${promoButton === 'payPromo' ? 'btn-dark' : 'btn-outline-dark'}`}
                                onClick={() => handlePromoClick('payPromo')}
                            >유료홍보</button>
                            <button type="button"
                                className={`btn btn-lg col-4 border-0 rounded-1 ${promoButton === 'design' ? 'btn-dark' : 'btn-outline-dark'}`}
                                onClick={() => handlePromoClick('design')}
                            >디자인의뢰</button>
                        </div>

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
                        {/* <div className='input-group' id='datetimepicker1' data-td-target-input='nearest' data-td-target-toggle='nearest'>
                            <span className="input-group-text mb-3 col-2">
                                홍보 기간
                            </span>
                            <input type='date' name="startDate" id='datepicker' className='form-control' data-td-target='#datepicker'
                                width="41.7%" aria-describedby="addon-wrapping" placeholder="홍보 시작일" readonly />
                            <input type='date' name="endDate" id='datepicker2' className='form-control' data-td-target='#datepicker2'
                                width="41.7%" aria-describedby="addon-wrapping" placeholder="홍보 종료일" readonly />
                        </div> */}
                        {/* <div class="input-group mb-3">
                            <span class="input-group-text">홍보 기간</span>
                            <input type="date" aria-label="First name" class="form-control" placeholder="홍보 시작일" value={startDate} />
                            <input type="date" aria-label="Last name" class="form-control" placeholder="홍보 종료일" value={endDate} />
                        </div> */}
                        {/* <div class="input-group mb-3">
                            <span class="input-group-text">홍보 기간</span>
                            <ReactDatePicker onChange={handleStartDate}/>
                            <ReactDatePicker onChange={handleEndDate}/>
                        </div> */}
                        <div className='input-group'>
                            <span className="input-group-text mb-3 col-2">
                                홍보 기간
                            </span>
                            <span className='col-5'>
                                <DatePicker
                                    selected={startDate}
                                    onChange={date => setStartDate(date)}
                                    dateFormat="yyyy-MM-dd"
                                    className="form-control col-5"
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
                                minDate={new Date()}
                                placeholderText="홍보 종료일"
                            />
                        </div>
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
                            data=""         // ⭐ 기존 컨텐츠 내용 입력 (HTML)
                            onReady={editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log('Editor is ready to use!', editor);
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setContent(data);
                            }}
                            onBlur={(event, editor) => {
                                console.log('Blur.', editor);
                            }}
                            onFocus={(event, editor) => {
                                console.log('Focus.', editor);
                            }}
                        />
                        <div className="d-flex justify-content-end mt-2 p-0">
                            <Link to={`/${type}`} className={styles.btnl} >목록</Link>
                            {promoButton === 'freePromo' && (
                                <div>
                                    <button id="sendPost" className={styles.btns} onClick={onSubmit}>등록</button>
                                </div>
                            )}
                            {promoButton === 'payPromo' && (
                                <div>
                                    <button className={styles.btns}  id="payBtn" onClick={payment} >결제</button>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
                {/* } */}



            </div>

        </div>
    )
}

export default StarInsertForm
