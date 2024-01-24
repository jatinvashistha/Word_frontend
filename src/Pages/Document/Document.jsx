import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import io from 'socket.io-client';
 
const Document = () => {
  const socket = io('https://qsqrjh-5000.csb.app');

  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [owner, setOwner] = useState('');
  const param = useParams();
  const storedUser = localStorage.getItem('user');
  const userObject = JSON.parse(storedUser);
  
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
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
        const { data } = await axios.put(`https://qsqrjh-5000.csb.app/api/v1/documentt/${param.id}`, {
          token:tokenValue
        },{
          withCredentials: true,
        });
        setContent(data?.document?.content);
        setTitle(data?.document?.title);
        setOwner(data?.document?.owner);
       } catch (e) {
       }
    };

    fetchData();
  }, [param.id]);
  useEffect(() => {
    socket.emit('setup', param.id);
  }, [param.id]);


  const handleContentChange = (e) => {
    
    setContent(e.target.value);

    const data = {
      id: param.id,
      content,
      owner,
      title
    };
    socket.emit('content', data);
    
  };
  const handleContentChange2 = (e) => {
    
    setTitle(e.target.value);

    const data = {
      id: param.id,
      content,
      owner,
      title
    };
    socket.emit('content', data);
    
  };

  const updateData = async () => {
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
      const { data } = await axios.put('https://qsqrjh-5000.csb.app/api/v1/document', {
        title,
        content,
        documentId: param.id,
        token:tokenValue,
      }, {
        withCredentials: true
      });
      if (data) {
        alert("saved successfully");
        navigate('/documents')
        
      }

     } catch (e) {
     }
  };

  useEffect(() => {
    socket.on('message', (m) => {
       if (userObject?._id.toString() !== m.owner.toString()) {
         setContent(m.content);
         console.log(m)
         setTitle(m.title);
        
      }
    });
  });

  return (
    <div style={styles.wordGeneratorContainer}>
      <h3>{title}</h3>
      {
        owner === userObject?._id ?
          <>
            <input value={title} onChange={(e) => {
              handleContentChange2(e)
            
            
            }} placeholder='Enter title .......' type='text' />

            <textarea style={styles.wordInput} onChange={(e) => handleContentChange(e)} value={content}></textarea>
            
            <button onClick={updateData}>Update Data</button>
          </> :
          <>
            {
              content
            }
          </>

      }
    </div>
  );
};

export default Document;


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

