import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}

class MovieItemDetails extends Component {
  state = {movieDetails: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inprogress})

    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        adult: data.movie_details.adult,
        backdropPath: data.movie_details.backdrop_path,
        budget: data.movie_details.budget,
        genres: data.movie_details.genres.map(genre => ({
          id: genre.id,
          name: genre.name,
        })),
        id: data.movie_details.id,
        overview: data.movie_details.overview,
        posterPath: data.movie_details.poster_path,
        releaseDate: data.movie_details.release_date,
        runtime: data.movie_details.runtime,
        similarMovies: data.movie_details.similar_movies.map(movie => ({
          backdropPath: movie.backdrop_path,
          id: movie.id,
          overview: movie.overview,
          posterPath: movie.poster_path,
          title: movie.title,
        })),
        spokenLanguages: data.movie_details.spoken_languages.map(lang => ({
          id: lang.id,
          englishName: lang.english_name,
        })),
        title: data.movie_details.title,
        voteAverage: data.movie_details.vote_average,
        voteCount: data.movie_details.vote_count,
      }
      this.setState({
        movieDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickingRetry = () => {
    this.getMovieDetails()
  }

  renderBottomContainer = () => {
    const {movieDetails} = this.state
    const {
      genres = [],
      spokenLanguages = [],
      posterPath,
      title,
      overview,
      budget,
      releaseDate,
      voteAverage,
      voteCount,
    } = movieDetails

    return (
      <>
        <div
          style={{
            backgroundImage: `url(${posterPath})`,
            backgroundSize: 'cover',
            height: '100vh',
          }}
        >
          <Header />
          <div className="poster-content">
            <h1>{title}</h1>
            <p>{overview}</p>
            <button type="button" className="play-button">
              Play
            </button>
          </div>
        </div>

        <ul className="bottom-details-container">
          <li className="genre-container">
            <h1 className="genre-title-color">Genres</h1>
            {genres.map(genre => (
              <p>{genre.name}</p>
            ))}
          </li>
          <li className="audio-container">
            <h1 className="genre-title-color">Audio Available</h1>
            {spokenLanguages.map(language => (
              <p>{language.englishName}</p>
            ))}
          </li>
          <li className="rating-container">
            <h1 className="genre-title-color">Rating Count</h1>
            <p>{voteCount}</p>
            <h1 className="genre-title-color">Rating Average</h1>
            <p>{voteAverage}</p>
          </li>
          <li className="rating-container">
            <h1 className="genre-title-color">Budget</h1>
            <p>{budget}</p>
            <h1 className="genre-title-color">Release Date</h1>
            <p>{releaseDate}</p>
          </li>
        </ul>
      </>
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
        onClick={this.onClickingRetry}
      >
        Try Again
      </button>
    </div>
  )

  renderUsingSwitch = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderBottomContainer()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inprogress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="main-details-container">
        {this.renderUsingSwitch()}
        <div className="footer-container">
          <Footer />
        </div>
      </div>
    )
  }
}

export default MovieItemDetails
