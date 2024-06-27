import React, { useState } from 'react';
import Summernote from '@easylogic/react-summernote';
import '@easylogic/react-summernote/dist/summernote-bs4.css'

import 'bootstrap/dist/css/bootstrap.css';

const InsertForm = () => {
  const [content, setContent] = useState('');

  const handleChange = (content) => {
    setContent(content);
  }

  return (
    <div className="App">
      <h1>React Summernote Example</h1>
      <Summernote
        options={{
          height: 500,
          minHeight: null,
          maxHeight: null,
          lang: 'ko-KR',
          fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', '맑은 고딕', '궁서', '굴림체', '굴림', '돋움체', '바탕체'],
          fontSizes: ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '28', '30', '36', '50', '72'],
          placeholder: '내용을 입력하세요.',
          toolbar: [
            ['fontname', ['fontname']],
            ['fontsize', ['fontsize']],
            ['style', ['bold', 'italic', 'underline', 'strikethrough', 'clear']],
            ['color', ['forecolor', 'color']],
            ['table', ['table']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']],
            ['insert', ['link', 'picture', 'video']],
            ['view', ['fullscreen', 'help']]
          ],
        }}
        onChange={handleChange}
      />
      <div>
        <h3>Content</h3>
        <div>{content}</div>
      </div>
    </div>
  );
}

export default InsertForm


