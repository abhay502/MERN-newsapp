import React, { useState } from 'react';
import FetchData from '../components/FetchData';
import './style.css';
import Navbar from '../components/Navbar';
import Poster from '../components/Poster';
import Footer from '../components/Footer';
function Home() {
  // State to manage the theme (light or dark)
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to handle the theme toggle
  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Applying the dark mode class to the body element based on the theme state
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }

  return (
    <div>
      <Navbar/>
      <Poster/>
      {/* Toggle button for theme */}
      <button className={isDarkMode?"btn btn-outline-light " :"btn btn-outline-dark" } onClick={handleThemeToggle}>
        {isDarkMode ? '🌙Mode' : ' 🌞Mode'}
      </button>
      <FetchData />
      <Footer/>
    </div>
  );
}

export default Home;
