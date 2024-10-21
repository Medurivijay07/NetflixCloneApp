import './index.css'

const PopularItem = props => {
  const {movie} = props
  const {posterPath, backdropPath} = movie
  return (
    <li className="eachPopularItem">
      <img src={backdropPath} alt="" className="image-style" />
    </li>
  )
}

export default PopularItem
