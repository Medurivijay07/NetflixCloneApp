import './index.css'

const PopularItem = props => {
  const {movie} = props
  const {backdropPath, title} = movie
  return (
    <li className="eachPopularItem">
      <img src={backdropPath} alt={title} className="image-style" />
    </li>
  )
}

export default PopularItem
