import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {HiOutlineSearch} from 'react-icons/hi'
import Loader from 'react-loader-spinner'
import Popularitem from '../PopularItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}

class Search extends Component {
  state = {
    searchInput: '',
    searchData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getMoviesData()
  }

  getMoviesData = async () => {
    this.setState({apiStatus: apiStatusConstants.inprogress})

    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.results.map(movie => ({
        backdropPath: movie.backdrop_path,
        id: movie.id,
        overview: movie.overview,
        posterPath: movie.poster_path,
        title: movie.title,
      }))
      this.setState({
        searchData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    this.getMoviesData()
  }

  onClickingTryAgain = () => {
    this.getMoviesData()
  }

  renderNoSearchResults = () => {
    const {searchInput} = this.state
    return (
      <div className="no-search-results-container">
        <img
          src="https://res.cloudinary.com/djcejfaxi/image/upload/v1729080752/Group_7394_yatcrd.png"
          alt="no movies"
        />
        <p className="empty-search">
          Your search for {searchInput} did not find any matches.
        </p>
      </div>
    )
  }

  renderResultsUsingSwitch = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSearchResults()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inprogress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderSearchResults = () => {
    const {searchData} = this.state
    if (searchData.length === 0) {
      return this.renderNoSearchResults()
    }
    return (
      <ul className="search-movies-container">
        {searchData.map(movie => (
          <Popularitem key={movie.id} movie={movie} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/djcejfaxi/image/upload/v1729593311/Group_oonwsy.png"
        alt="failure view"
      />
      <p className="error-message">Something went wrong. Please try again</p>
      <button
        type="button"
        className="try-again-button"
        onClick={this.onClickingTryAgain}
      >
        Try Again
      </button>
    </div>
  )

  renderHeader = () => (
    <div className="header-container">
      <ul className="header-list">
        <div className="left-header-container">
          <Link to="/" className="link-item">
            <li>
              <img
                src="https://res.cloudinary.com/djcejfaxi/image/upload/v1728881201/Group_7399_d4jhtx.png"
                alt="website logo"
                className="logo-image"
              />
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
          <li className="searchItem-container">
            <input
              type="search"
              className="search-input"
              onChange={this.onChangeInput}
            />
            <button
              type="button"
              className="search-button"
              onClick={this.onClickSearch}
              data-testid="searchButton"
            >
              <HiOutlineSearch className="search-icon" />
            </button>
          </li>
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

  render() {
    return (
      <>
        <div className="search-container">
          {this.renderHeader()}
          {this.renderResultsUsingSwitch()}
        </div>
      </>
    )
  }
}

export default Search
