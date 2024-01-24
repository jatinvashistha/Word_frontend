import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import Cookies from "js-cookie";

const DocumentList = ({ isAuthenticated }) => {
  const storedUser = localStorage.getItem('user');
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const userObject = JSON.parse(storedUser);
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);

  const fetchDataList = async () => {
    try {
      if (isAuthenticated) {
        console.log(Cookies)

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
        console.log(tokenValue, 'the token')
        const { data } = await axios.put(
          "https://qsqrjh-5000.csb.app/api/v1//documents", {
          token: tokenValue
        },
          {
            withCredentials: true,
          }
        );

        setDocuments(data?.document);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleClick = (document) => {
    if (document._id) {
      navigate(`/document/${document._id}`);
    } else {
      console.error("Document ID is undefined");
    }
  };

  const handleClick2 = (document) => {
    if (document._id) {
      if (userObject._id === document.owner) {
        navigate(`/getdocument/${document._id}`);
      } else {
        navigate(`/document/${document._id}`);
      }
    } else {
      console.error("Document ID is undefined");
    }
  };





  const deleteDocument = async (documentId) => {

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
      const response = await axios.put(
        `https://qsqrjh-5000.csb.app/api/v1/deletedocuments/${documentId}`, {
          token: tokenValue
          
        },
        {
          withCredentials: true,
        }
      );

      if (response.data) {
        alert("Document deleted successfully");
        fetchDataList();
      }
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };


  useEffect(() => {
   
    fetchDataList();
  }, [isAuthenticated]);

  return (
    <div>
      {title && content ? (
        <>
          <h3> {title} </h3>
          {content}
        </>
      ) : (
        <>
          <h2 style={{ color: 'blue', fontSize: '20px' }}>Document List</h2>
          <div style={{ border: '1px solid #ccc', padding: '10px' }}>
            {documents.map((document, index) => (
              <div
                key={index}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '9fr,1fr',
                  cursor: 'pointer',
                  marginBottom: '5px',
                  backgroundColor:
                    index % 2 === 0 ? '#f2f2f2' : 'white',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span
                  style={{ width: '90%' }}
                  onClick={() => {
                    handleClick2(document);
                  }}
                >
                  {document.title}
                </span>
                {userObject._id === document.owner ? (
                  <>
                    <button
                      onClick={() => {
                        handleClick(document);
                      }}
                      style={{ width: '10%', marginRight: '5px' }}
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => {
                        deleteDocument(document._id);
                      }}
                      style={{ width: '10%' }}
                    >
                      <RiDeleteBin5Fill />
                    </button>
                  </>
                ) : (
                  <></>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DocumentList;
