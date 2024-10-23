import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Redirect, Link} from 'react-router-dom'
import {FiAlertTriangle} from 'react-icons/fi'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}

class Home extends Component {
  state = {
    originalsData: [],
    trendingData: [],
    originalsApiStatus: apiStatusConstants.initial,
    trendingApiStatus: apiStatusConstants.initial,
    isLoading: true,
  }

  componentDidMount() {
    this.getOriginalsData()
    this.getTrendingData()
  }

  getTrendingData = async () => {
    this.setState({trendingApiStatus: apiStatusConstants.inprogress})

    const apiUrl = 'https://apis.ccbp.in/movies-app/trending-movies'
    const jwtToken = Cookies.get('jwt_token')
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
        trendingData: updatedData,
        trendingApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({trendingApiStatus: apiStatusConstants.failure})
    }
  }

  getOriginalsData = async () => {
    this.setState({originalsApiStatus: apiStatusConstants.inprogress})

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.results.map(movie => ({
        backdropPath: movie.backdrop_path,
        id: movie.id,
        overview: movie.overview,
        posterPath: movie.poster_path,
        title: movie.title,
      }))
      this.setState({
        originalsData: updatedData,
        originalsApiStatus: apiStatusConstants.success,
        isLoading: false,
      })
    } else {
      this.setState({
        originalsApiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickingTrendingRetry = () => {
    this.getTrendingData()
  }

  onClickingOriginalsRetry = () => {
    this.getOriginalsData()
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderTrendingFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/djcejfaxi/image/upload/v1729593311/Group_oonwsy.png"
        alt="failure view"
      />
      <p className="error-message">Something went wrong. Please try again</p>
      <button
        type="button"
        className="try-again-button"
        onClick={this.onClickingTrendingRetry}
      >
        Try Again
      </button>
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
        onClick={this.onClickingOriginalsRetry}
      >
        Try Again
      </button>
    </div>
  )

  renderHomePoster = () => {
    const {originalsData, isLoading} = this.state

    if (isLoading) {
      return this.renderLoadingView()
    }

    const randomIndex = Math.floor(Math.random() * originalsData.length)
    const {posterPath, title, overview} = originalsData[randomIndex]

    return (
      <>
        <div
          style={{
            backgroundImage: `url(${posterPath})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            height: '100vh',
          }}
        >
          <Header />
          <div className="home-poster-content">
            <h1>{title}</h1>
            <p>{overview}</p>
            <button type="button" className="play-button">
              Play
            </button>
          </div>
        </div>
      </>
    )
  }

  renderTrendingVideos = () => {
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
    }

    const {trendingData} = this.state

    return (
      <div className="slider-container">
        <Slider {...settings}>
          {trendingData.map(movie => (
            <Link to={`/movies/${movie.id}`} className="each-trending-item">
              <div key={movie.id}>
                <img
                  src={movie.backdropPath}
                  alt={movie.title}
                  className="trending-image"
                />
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    )
  }

  renderTrendingVideosUsingSwitch = () => {
    const {trendingApiStatus} = this.state
    switch (trendingApiStatus) {
      case apiStatusConstants.success:
        return this.renderTrendingVideos()
      case apiStatusConstants.failure:
        return this.renderTrendingFailureView()
      case apiStatusConstants.inprogress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderOriginalVideosUsingSwitch = () => {
    const {originalsApiStatus} = this.state
    switch (originalsApiStatus) {
      case apiStatusConstants.success:
        return this.renderOriginalVideos()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inprogress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderOriginalVideos = () => {
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
    }

    const {originalsData} = this.state

    return (
      <Slider {...settings}>
        {originalsData.map(movie => (
          <Link to={`/movies/${movie.id}`} className="each-trending-item">
            <div key={movie.id}>
              <img
                src={movie.backdropPath}
                alt={movie.title}
                className="trending-image"
              />
            </div>
          </Link>
        ))}
      </Slider>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <>
        {this.renderHomePoster()}
        <div className="bottom-container">
          <h1 className="trending-heading">Trending Now</h1>
          {this.renderTrendingVideosUsingSwitch()}
          <h1 className="originals-heading">Originals</h1>
          {this.renderOriginalVideosUsingSwitch()}
          <Footer />
        </div>
      </>
    )
  }
}

export default Home
