import React from 'react';
import {BrowserRouter as Router, Routes, Route,Navigate} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useSelector } from 'react-redux';
import Profile from './pages/Profile';
function App() {
  const isauth = Boolean(useSelector((state) => state.token))
  return (
   <>
   <Router>
    <Routes>
      <Route exact path='/login' element={isauth?<Navigate to="/home"/>: <Login/>} />
      <Route exact path='/signup' element={isauth?<Navigate to="/home"/>:<Signup/>} />
      <Route exact path='/home' element={isauth?<Home/>: <Navigate to="/login" />}/>
      <Route exact path='/profile' element={isauth?<Profile/>: <Navigate to="/login" />}/>


    </Routes>
   </Router>
    
   </>
   
   
  );
}

export default App;
  