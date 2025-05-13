import React from 'react'
import './Footer.css';
import footer_logo from '../Assets/logo_big.png';
import instagram_icon from '../Assets/instagram_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-logo">
        <img src={footer_logo} alt="" />
        <p>SHOPIFY</p>
      </div>

      <ul className="footer-links">
       <li> <Link to="company" style={{textDecoration:"none",color:"#252525"}} >Company</Link></li>
         <li><Link to="Products" style={{textDecoration:"none",color:"#252525"}} >Products </Link></li>
         <li><Link to="Offices" style={{textDecoration:"none",color:"#252525"}} >Offices</Link></li>
         <li><Link to="About" style={{textDecoration:"none",color:"#252525"}} >About</Link></li>
         <li><Link to="Contact" style={{textDecoration:"none",color:"#252525"}} >Contact</Link></li>
      </ul>

      <div className="footer-socials-icon">
        
       <a href="https://www.instagram.com"  target="_blank">
         <div className="footer-icons-container">
            <img src={instagram_icon} alt="instagram_icon" />
        </div>
       </a>
        
        <a href="https://www.whatsapp.com" target="_blank">
        <div className="footer-icons-container">
            <img src={whatsapp_icon} alt="whatsapp_icon" />
        </div>
        </a>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>Copyright @ 2025 - All Rights Reserved</p>

      </div>

    </div>
  )
}

export default Footer
