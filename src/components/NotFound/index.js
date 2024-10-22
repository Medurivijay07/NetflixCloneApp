import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <h1 className="lost-way">Lost Your Way?</h1>
    <p>
      we are sorry, the page you requested could not be found Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button type="button" className="goto-home-button">
        Go to Home
      </button>
    </Link>
  </div>
)

export default NotFound
