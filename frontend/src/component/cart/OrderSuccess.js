import React from 'react'
import "./OrderSuccess.css"
import { Typography } from '@material-ui/core';
import DoneIcon from '@mui/icons-material/Done';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
      <div className='successContainer'>
        
        <Link to="/order">
          <div className="successHeading">
            <Typography>Success</Typography>
            <DoneIcon/>
          </div>
        </Link>
      </div>
    
  )
}

export default OrderSuccess