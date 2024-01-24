import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Document from "./Pages/Document/Document";
import DocumentList from "./Pages/DocumentList/DocumentList";
import Navbar from "./Pages/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import axios from "axios";
import GetDocument from "./Pages/GetDocument.jsx/GetDocument";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [username, setUsername] = useState("");
  const handleLogin = (user) => {
    setUsername(user);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    Cookies.remove("token");
    localStorage.removeItem("user");
  };

  const handleRegister = (user) => {
    setUsername(user);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(user));
  };
  const createDocument = () => {};
  useEffect(() => {
    const fetchDataList = async () => {
       function getCookie(cookieName) {
         var cookies = document.cookie.split(";");

         for (var i = 0; i < cookies.length; i++) {
           var cookie = cookies[i].trim();

           if (cookie.indexOf(cookieName + "=") === 0) {
             return cookie.substring(cookieName.length + 1);
          }
        }

         return null;
      }

       var tokenValue = getCookie("token");
      try {
        if (isAuthenticated) {
          const { data } = await axios.put(
            "https://qsqrjh-5000.csb.app/api/v1/documents", {
             token:tokenValue 
            },
            {
              withCredentials: true,
            }
          );

          setFileList(data?.document);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchDataList();
  }, [isAuthenticated]);

  useEffect(() => {
    const checkAuthentication = () => {
      const token = Cookies.get("token");
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };
    checkAuthentication();
  }, []);

  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element=<Login onLogin={handleLogin} /> />
        <Route path="/signup" element=<Signup onRegister={handleRegister} /> />
        <Route
          path="/documents"
          element={
            isAuthenticated ? (
              <DocumentList isAuthenticated={isAuthenticated} />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/document/:id"
          element={
            isAuthenticated ? <Document /> : <Login onLogin={handleLogin} />
          }
        />
        <Route
          path="/getdocument/:id"
          element={
            isAuthenticated ? <GetDocument /> : <Login onLogin={handleLogin} />
          }
        />
        <Route
          path="/"
          isAuthenticated={isAuthenticated}
          element=<Home isAuthenticated={isAuthenticated} />
        />
      </Routes>
    </div>
  );
};

export default App;
