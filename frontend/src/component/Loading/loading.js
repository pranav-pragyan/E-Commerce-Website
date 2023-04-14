import React from 'react';
import "./loading.css";
import logo from '../../../src/image/Enigmaticomm-logos_white.png'
const loading = () => {
  return (
    <div className='loadingStyle'>

      <img src={logo} alt="Company_Logo" />
      <div></div>

      <p>Loading Please Wait...</p>
    </div>
  )
}

export default loading