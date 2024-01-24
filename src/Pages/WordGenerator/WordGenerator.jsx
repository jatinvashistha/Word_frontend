import axios from 'axios';
import React, { useState } from 'react';
const WordGenerator = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  
  const onSubmitt = async () => {
     function getCookie(cookieName) {
       var cookies = document.cookie.split(';');

       for (var i = 0; i < cookies.length; i++) {
         var cookie = cookies[i].trim();
        if (cookie.indexOf(cookieName + '=') === 0) {
           return cookie.substring(cookieName.length + 1);
        }
      }

       return null;
    }
    var tokenValue = getCookie('token');

    try {
      if (title && content) {

        const { data } = await axios.post('https://qsqrjh-5000.csb.app/api/v1/document',
          {
            title, content
            ,token:tokenValue
        }, {
          withCredentials: true
        })

        if (data) {

          setTitle('');
          setContent('')
          alert('File created successfully')
        }
      }
      else {



      }

    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <div style={styles.wordGeneratorContainer} >
      <input value={title} onChange={(e) => { setTitle(e.target.value) }} placeholder='Enter title .......' type='text' />
      <textarea value={content} onChange={(e) => { setContent(e.target.value) }} style={styles.wordInput} placeholder="Type your content here..."></textarea>

      <button onClick={onSubmitt}>Submit</button>
    </div>
  );
};

export default WordGenerator;


const styles = {
  wordGeneratorContainer: {
    width: '95%',
    boxSizing: 'border-box',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  wordInput: {
    width: '100%',
    height: '70vh',
    padding: '10px',
    fontSize: '16px',
    lineHeight: '1.5',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
};
