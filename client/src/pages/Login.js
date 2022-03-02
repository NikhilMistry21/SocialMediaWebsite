import React, { useState } from "react";

import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    let navigate = useNavigate();

    //post login data
    const login = () => {
        const data = { username: username, password: password };
        axios.post("http://localhost:3001/auth/login", data).then ((response) => {
            if (response.data.error) {  //if else statement that only creates session variable if the login is successful
                alert(response.data.error);
            } else {
                sessionStorage.setItem("accessToken", response.data);
                navigate("/");
                
            }
        });
    };

    //form for logging in
  return (
    <div>
        <input 
            type="text"
            onChange={(event) => {
                setUsername(event.target.value);
            }}    
        />

        <input 
            type="password"
            onChange={(event) => {
                setPassword(event.target.value);
            }}    
        />
        <button onClick={login}> Login </button>
    </div>
  )
}

export default Login