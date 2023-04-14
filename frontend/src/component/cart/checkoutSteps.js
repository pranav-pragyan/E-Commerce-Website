import { Step, Stepper, Typography,StepLabel } from '@mui/material'
import React, { Fragment } from 'react'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import "./checkoutSteps.css"
const CheckoutSteps = ({activeStep}) => {

  const steps =
  [ 
    {
      label : <Typography>Shipping Details</Typography>,
      icon : <LocalShippingIcon/>, 
    },

    {
      label : <Typography>Confirm Order</Typography>,
      icon : <LibraryAddCheckIcon/>, 
    },

    {
      label : <Typography>Payment</Typography>,
      icon : <AccountBalanceIcon/>, 
    },
  ]

  const stepStyles = {
    boxSizing : "border-box",
  };


  return (
    <Fragment>
        <Stepper alternativeLabel activeStep={activeStep} stepStyles={stepStyles}>
            { steps.map((item,index)=>(
              <Step key={index} active={activeStep===index?true : false} completed={activeStep>=index?true : false}>
                    <StepLabel icon={item.icon} style={{color : activeStep>=index?"green":"red"}} >{item.label}</StepLabel>
              </Step>
            )) }
        </Stepper>
    </Fragment>
  )
}

export default CheckoutSteps