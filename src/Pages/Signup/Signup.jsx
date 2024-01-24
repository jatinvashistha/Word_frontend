// src/Signup.js
import React, { useState } from 'react';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import axios from 'axios';

const Signup = ({
  onRegister
}) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {

    try {
      if (name && email && password) {
        const { data } = await axios.post("https://qsqrjh-5000.csb.app/api/v1/register", {
          name, email, password
        })
        if (data) {
          Cookies.set("token", data?.token);
          onRegister(data?.user)
          navigate('/')
          alert("registered successful")
        } else {
          alert('Error in registration')
        }

      }
      else {
        alert("Enter all field")
      }

    } catch (e) {
      console.log(e.message)
    }
  
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
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
        <button type="button" onClick={handleSignup}>
          Signup
        </button>
        <p>Already Signed Up?

        <button type="button" >
          
        <Link to='/login'  >  Login</Link>        
          </button>
          here
        </p>

      </form>
    </div>
  );
};

export default Signup;
