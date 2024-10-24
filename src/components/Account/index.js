import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const Account = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const renderAccountDetails = () => (
    <div className="account-container">
      <h1>Account</h1>
      <hr />
      <div className="details">
        <p className="membership-title">Member ship</p>
        <div>
          <p>rahul@gmail.com</p>
          <p className="membership-title">password: dbsdgdfdg</p>
        </div>
      </div>
      <hr />
      <div className="premium-container">
        <p className="membership-title">Plan details</p>
        <p>Premium</p>
        <p className="ultra-hd">Ultra HD</p>
      </div>
      <hr />
      <div className="button-container">
        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </div>
  )

  return (
    <div className="account-main-container">
      <Header />
      {renderAccountDetails()}
      <Footer />
    </div>
  )
}

export default Account
