import {IoMdSearch} from 'react-icons/io'
import './index.css'

const Header = () => (
  <div className="header-container">
    <ul className="header-list">
      <div className="left-header-container">
        <li>
          <h1 className="header-title">MOVIES</h1>
        </li>
        <li>
          <p className="home-link">Home</p>
        </li>
        <li>
          <p className="popular-link">Popular</p>
        </li>
      </div>
      <div className="right-header-container">
        <li>
          <IoMdSearch className="search-icon" />
        </li>
        <li>
          <img
            src="https://res.cloudinary.com/djcejfaxi/image/upload/v1728882803/Avatar_sepbqh.png"
            alt=""
            className="header-profile"
          />
        </li>
      </div>
    </ul>
  </div>
)

export default Header
