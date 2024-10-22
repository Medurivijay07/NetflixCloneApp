import {IoMdSearch} from 'react-icons/io'
import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <div className="header-container">
    <ul className="header-list">
      <div className="left-header-container">
        <Link to="/" className="link-item">
          <li>
            <h1 className="header-title">MOVIES</h1>
          </li>
        </Link>
        <Link to="/" className="link-item">
          <li>
            <p className="home-link">Home</p>
          </li>
        </Link>
        <Link to="/popular" className="link-item">
          <li>
            <p className="popular-link">Popular</p>
          </li>
        </Link>
      </div>
      <div className="right-header-container">
        <Link to="/search">
          <li>
            <button type="button" className="search-button">
              <IoMdSearch className="search-icon" />
            </button>
          </li>
        </Link>
        <Link to="/account">
          <li>
            <img
              src="https://res.cloudinary.com/djcejfaxi/image/upload/v1728882803/Avatar_sepbqh.png"
              alt=""
              className="header-profile"
            />
          </li>
        </Link>
      </div>
    </ul>
  </div>
)

export default Header
