 import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

const GetDocument = () => {
    const socket = io('http://localhost:5000');

    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [owner, setOwner] = useState('');
    const param = useParams();
    const storedUser = localStorage.getItem('user');
    const userObject = JSON.parse(storedUser);

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
                const { data } = await axios.put(`https://qsqrjh-5000.csb.app/api/v1//documentt/${param.id}`, {
                    token:tokenValue
                }, {
                    withCredentials: true,
                });
                setContent(data?.document?.content);
                setTitle(data?.document?.title);
                setOwner(data?.document?.owner);
            } catch (e) {
                console.error('Error fetching document:', e);
              
            }
        };

        fetchData();
    }, [param.id]);

    return (
         
        <div>
            <div style={{
                padding: '15px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                margin: '20px',
                maxWidth: '100%'
            }}>
                <h3 style={{ marginBottom: '15px' }}>{title}</h3>
                <div style={{
                    whiteSpace: 'pre-wrap',
                    width: "100%",
                    height: "auto",
                    overflowWrap: 'break-word'  
                }}>
                    {content}
                </div>
            </div>
        </div>


    );
};

export default GetDocument;

