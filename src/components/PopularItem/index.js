import {Link} from 'react-router-dom'
import './index.css'

const PopularItem = props => {
  const {movie} = props
  const {posterPath, title, id} = movie
  return (
    <Link to={`/movies/${id}`} className="eachPopularItem">
      <li>
        <img src={posterPath} alt={title} className="image-style" />
      </li>
    </Link>
  )
}

export default PopularItem
