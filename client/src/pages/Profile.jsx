import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'
import { setLogout } from '../state';

import './style.css'
import { useDispatch, useSelector } from 'react-redux';
function Profile() {

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState("")
  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const handleSubmit = async () => {
    // Handle the form submission, update the profile, and upload the new profile picture

    if (email && userName) {
      const formData = new FormData();
      formData.append("_id", user?._id)
      formData.append("userName", userName);
      formData.append("email", email);
      if (profilePicture) {
        formData.append("picturePath", profilePicture?.name);
      }
      formData.append("picture", profilePicture);


      try {
        const response = await axios.post("http://localhost:3001/auth/editprofile", formData);

        console.log(response);
        if (response.status === 200) {
          dispatch(setLogout())
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setError("Fields are empty!!")
    }


  };
  console.log(user)
  return (
    <div>
  <Navbar />
  <div className="d-flex justify-content-center align-items-center vh-100">
  <div style={{ border: '1px solid black',borderRadius:"2rem", maxWidth: "50rem", padding: '2rem' }}>
    <h2 className='text-center'>Edit Profile👤</h2>
    {error ? <h4 className='text-center text-danger'>{error}⚠️</h4> : null}
    <div className="row justify-content-center">
      <div>
        <form>
          <div className="form-group mb-3">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder={user?.userName}
              onChange={handleUserNameChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder={user?.email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="profilePicture">Update Profile Picture : </label>
            <input
              type="file"
              className="form-control-file"
              id="profilePicture"
              accept="image/*"
              onChange={handleProfilePictureChange}
              required
            />
          </div>
          <button type="button" onClick={handleSubmit} className="btn btn-primary">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  </div>
</div>

  <Footer />
</div>

  )
}

export default Profile