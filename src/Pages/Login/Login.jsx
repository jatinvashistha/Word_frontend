
import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import Cookies from "js-cookie";
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
  
    try {
      if (email && password) {
        const { data } = await axios.post("https://qsqrjh-5000.csb.app/api/v1/login", {
          email, password
        });
        if (data) {
          Cookies.set("token", data?.token);
          onLogin(data?.user)
          navigate('/')
          alert("Login successfull")
        } else {
          alert('Error in login')
        }

      } else {
        alert("Enter email and password both.")
      }
     


    } catch (e) {
      console.log(e.message)
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
        <p>New User? 

        <button type="button" >
          <Link  to = '/signup'  >  Sign up</Link>
          </button>
          here
        </p>

      </form>
    </div>
  );
};

export default Login;
