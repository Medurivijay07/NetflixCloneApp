import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="footer-icons-container">
      <FaGoogle className="google-icon" />
      <FaTwitter className="google-icon" />
      <FaInstagram className="google-icon" />
      <FaYoutube className="google-icon" />
    </div>
    <p className="contactus-style">Contact Us</p>
  </div>
)

export default Footer
