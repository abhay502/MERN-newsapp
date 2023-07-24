import React, { useState } from 'react';
import axios from 'axios';
import './style.css'; // Import the custom CSS file for additional styling
import { useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux";
import {setLogin} from '../state/index';
function Login() {
  const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("")
    
    const [loginError,setLoginError] = useState("")
    const submit = async()=>{
        try {
            const response = await axios.post("http://localhost:3001/auth/login",{
                email,password
            })

            
            if(response?.status === 200){
              dispatch(setLogin({user:response?.data?.user, token:response?.data?.token}))
              navigate("/home")
            }
        } catch (error) {
          console.log(error)

          setLoginError(error?.response?.data?.msg)
        }
    } 
    
  return (
    <div className='login-container'>
      <div className='login-content'>
        <h1 className='text-center'><span className='text-danger'>Buletin-news</span> Login Page</h1>
        {loginError? <span className='text-danger'>{loginError}⚠️</span>:null}
        <form>
          {/* Email input */}
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form2Example1">Email address</label>
            <input type="email" onChange={(e)=>setEmail(e.target.value)}  className="form-control" placeholder='Enter your email'/>
          </div>

          {/* Password input */}
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form2Example2">Password</label>
            <input type="password"  onChange={(e)=>setPassword(e.target.value)}   className="form-control" placeholder='Enter your password' />
          </div>

          {/* Submit button */}
          <div className="text-center">
          <button onClick={()=>submit()} type="button" className="btn btn-primary btn-block mb-4">LogIn</button>

          </div>

          {/* Register buttons */}
          <div className="text-center">
            <p>Not a member? <a href="/signup">Register</a></p>
            <p>or sign up with:</p>
            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-facebook-f"></i>
            </button>

            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-google"></i>
            </button>

            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-twitter"></i>
            </button>

            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-github"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
