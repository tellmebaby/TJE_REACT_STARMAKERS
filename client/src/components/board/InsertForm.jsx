import React, { useRef } from 'react';
import 'summernote/dist/summernote-bs4.css'; // 썸머노트 스타일시트
import 'summernote/dist/summernote-bs4'; // 썸머노트 자바스크립트
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css'; // 리액트 썸머노트 스타일시트

const InsertForm = () => {
    const editorRef = useRef(null);

    // 에디터 초기화 이벤트
    const onInit = () => {
        // 초기화 이후 추가적인 설정 가능
        console.log('Editor initialized');
    };

    return (
        <ReactSummernote
            ref={editorRef}
            options={{
                height: 300,
                dialogsInBody: true,
                toolbar: [
                    ['style', ['style']],
                    ['font', ['bold', 'underline', 'clear']],
                    ['fontname', ['fontname']],
                    ['para', ['ul', 'ol', 'paragraph']],
                    ['table', ['table']],
                    ['insert', ['link', 'picture', 'video']],
                    ['view', ['fullscreen', 'codeview']],
                ],
            }}
            onInit={onInit}
        />
    );
};

export default InsertForm;
