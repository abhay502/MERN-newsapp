import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate()
  const [userName,setUserName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("")
    const [picturePath, setPicturePath] = useState(null); // State to store the user image file

    const handleFileChange = (e) => {
      // Update the state with the selected file
      setPicturePath(e.target.files[0]);
    };

    const submit = async () => {
      const formData = new FormData();  
      formData.append("userName", userName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("picturePath", picturePath.name);

      formData.append("picture", picturePath);
    
      try { 
        const response = await axios.post("http://localhost:3001/auth/register", formData);
    
        console.log(response);
        if (response.status === 201) {
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <div className='login-container'>
    <div className='login-content'>
      <h1 className='text-center'><span className='text-danger'>Buletin-news</span> Signup Page</h1>
      <form>
         {/* Username input */}
         <div className="form-outline mb-4">
          <label className="form-label" >Username</label>
          <input type="email" onChange={(e)=>setUserName(e.target.value)}  className="form-control" placeholder='Enter your Username'/>
        </div>

        {/* Email input */}
        <div className="form-outline mb-4">
          <label className="form-label" >Email address</label>
          <input type="email" onChange={(e)=>setEmail(e.target.value)}  className="form-control" placeholder='Enter your email'/>
        </div>

        {/* Password input */}
        <div className="form-outline mb-4">
          <label className="form-label" >Password</label>
          <input type="password"  onChange={(e)=>setPassword(e.target.value)}   className="form-control" placeholder='Enter your password' />
        </div>

      
          {/* User image input */}
          <div className="form-outline mb-4">
            <label className="form-label" >User Image</label>
            <input type="file" id="userImageInput" name='picture' onChange={handleFileChange} className="form-control" />
          </div>

        {/* Submit button */}
        <div className="text-center">
        <button onClick={()=>submit()} type="button" className="btn btn-primary btn-block mb-4">Sign in</button>

        </div>

        {/* Register buttons */}
        <div className="text-center">
          <p>Already have an account? <a href="/login">Login</a></p>
          <p>or login in with:</p>
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
  )
}

export default Signup