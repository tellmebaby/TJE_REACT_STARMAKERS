import React from 'react'


const CardContent = ({card}) => {
    const htmlContent = card.content;

    const sanitizeContent = (htmlContent) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, 'text/html');
      
      // Remove all style attributes
      const elements = doc.body.getElementsByTagName('*');
      for (let i = 0; i < elements.length; i++) {
        elements[i].removeAttribute('style');
      }
       // Set font size for h3 and span elements
       const h3Elements = doc.body.getElementsByTagName('h3');
       const spanElements = doc.body.getElementsByTagName('span');
       
       for (let i = 0; i < h3Elements.length; i++) {
         h3Elements[i].style.fontSize = '1rem';
       }
   
       for (let i = 0; i < spanElements.length; i++) {
         spanElements[i].style.fontSize = '1rem';
       } 
  
      return doc.body.innerHTML;
    };
  
    const sanitizedContent = sanitizeContent(htmlContent);
  
  return (
    <div>
        <div className="card-text" dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div>
    </div>
  )
}

export default CardContent