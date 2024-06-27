import React, { useState } from 'react';
import Summernote from '@easylogic/react-summernote';
// import 'bootstrap/dist/css/bootstrap.css';
import '@easylogic/react-summernote/dist/summernote-bs4.css';

const SummernoteComponent = () => {
  const [content, setContent] = useState('');

  const handleChange = (content) => {
    setContent(content);
  }

  return (
    <div className="App">
      <h1>React Summernote Example</h1>
      <Summernote
        options={{
          height: 350,
          dialogsInBody: true,
          toolbar: [
            ['style', ['style']],
            ['font', ['bold', 'underline', 'clear']],
            ['fontname', ['fontname']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['table', ['table']],
            ['insert', ['link', 'picture', 'video']],
            ['view', ['fullscreen', 'codeview']]
          ]
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

export default SummernoteComponent;