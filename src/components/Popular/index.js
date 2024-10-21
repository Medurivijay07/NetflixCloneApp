import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'
import Header from '../Header'
import Footer from '../Footer'
import PopularItem from '../PopularItem'

class Popular extends Component {
  state = {popularData: []}

  componentDidMount() {
    this.getPopularData()
  }

  getPopularData = async () => {
    const apiUrl = 'https://apis.ccbp.in/movies-app/popular-movies'
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
      console.log(data)
      const updatedData = data.results.map(movie => ({
        backdropPath: movie.backdrop_path,
        id: movie.id,
        overview: movie.overview,
        posterPath: movie.poster_path,
        title: movie.title,
      }))
      this.setState({popularData: updatedData})
    }
  }

  renderPopularMovies = () => {
    const {popularData} = this.state
    return (
      <div className="Popular-movies-container">
        <ul className="movies-list-popular">
          {popularData.map(movie => (
            <PopularItem key={movie.id} movie={movie} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <div className="popular-container">
        <Header />
        {this.renderPopularMovies()}
        <Footer />
      </div>
    )
  }
}

export default Popular
