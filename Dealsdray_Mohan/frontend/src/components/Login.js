import React from 'react';
import './Login.css';
import { useNavigate} from "react-router-dom";
import { useState } from "react"; import axios from 'axios';
function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const nav = useNavigate();
    const handleUserNameChange = (event) => {
      setUserName(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Submitting form:', { userName, password }); let vaf=true;
        await axios.get("http://localhost:3333/adminInfo/"+userName+"/"+password).then(res=>{if(res.status!==200){vaf = false; alert("Invalid Login Details (:"); }}).catch(e=>console.log(e));
       vaf && nav('/AdminDashboard', {state:{userName:userName}});}
  return (
    <div className="login-container">
      <div className="login-box">
        <img src="https://is2-ssl.mzstatic.com/image/thumb/Purple114/v4/b5/60/9b/b5609b14-e928-3f4d-0a34-6ead78a0ada4/source/512x512bb.jpg
" alt="Logo" className="logo" />
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" value={userName}
              onChange={handleUserNameChange}
              required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={password}
              onChange={handlePasswordChange} required />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
