import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
     <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="logo" className='logo'/>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, impedit! Consequuntur fugit veniam maiores nam, tempora laborum minima eveniet impedit hic cupiditate, iusto dolor velit sequi! Ex dicta sequi nemo.</p>
              <div className="footer-social-icons">
                <img src={assets.facebook} alt="facebook-icon"  className='icon'/>
                <img src={assets.linkedin} alt="linkedIn-icon" className='icon' />
                <img src={assets.twitter} alt="twitter-icon" className='icon' />

              </div>
            </div>
            <div className="footer-content-center">
            <h2>COMPANY </h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>

            </div>
            <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91-987-456-7890</li>
                    <li>contact@cravings.com</li>
                </ul>

            </div>
        </div>
        <hr />
        <p className="copyright">Copyright 2024 @ Cravings.com || All Rights Reserved</p>
      
    </div>
  )
}

export default Footer
