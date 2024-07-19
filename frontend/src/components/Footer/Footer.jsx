import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img className='logo' src={assets.logo} alt="" />
                <p>At Zwigato, we are committed to revolutionizing the way you experience everyday services. Our mission is to deliver cutting-edge solutions that blend innovation with convenience, ensuring that every interaction is seamless and impactful. We strive to exceed expectations by continuously enhancing our offerings and prioritizing your needs. Join us on our journey as we aim to make a positive difference in your daily life through excellence and reliability.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+1-212-456-7890</li>
                    <li>contact@zwigato.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">Copyright 2024 @ Zwigato.com - All Rights Reserved.</p>
    </div>
  )
}

export default Footer