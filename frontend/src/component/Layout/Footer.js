import React from 'react'
import "./Footer.css"
import YouTubeIcon from '@material-ui/icons/YouTube';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
function Footer() {
  return (
    <div className='footer'>
      <div className="leftFooter">
          <p className='pstyle'>About Us</p>
          <p>Pranav Kumar,<br/>
             Tezpur University, <br/> 
             Assam (784028)<br/>
          </p>
          <p className='pstyle'>Send Your Query</p>  
          <p>pranavpragyan.sk@gmail.com</p> 
      </div>

      <div className="middleFooter">
          <h1 className='company_name'>Enigmaticomm</h1>
          <h5>Buy Your Dream Product</h5>
          <p className='copyright' >Copyrights 2022 &copy; Pranav Kumar</p>
      </div>

      <div className="rightFooter">
          <p>Follow Us</p>
          
          <a href="https://www.facebook.com/profile.php?id=100040680951982" className="facebook"><FacebookIcon /></a> 
          <a href="https://www.instagram.com/pranavkumar3159/" className="instagram"><InstagramIcon/></a>
          <a href="https://www.youtube.com/channel/UCmg0kcoKS-YrTN25TieWfSw" className="youtube" ><YouTubeIcon/></a>
          <a href="/" className="twitter" ><TwitterIcon/></a>
          <a href="https://www.linkedin.com/in/pranav-kumar-a654251b5" className="linkedin"><LinkedInIcon/></a>
      </div>
    </div>
  )
}

export default Footer