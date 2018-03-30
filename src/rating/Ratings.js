import React from 'react'
import GetCarabinerRating from './GetCarabinerRating'


const Ratings = ({ ratings, color = 'white' }) => {
  let calculatedRating = (ratings.reduce((tot, rating) => {
    const r = +rating.climberRating
    return tot += r
  }, 0) / ratings.length).toFixed(1)

  calculatedRating = (calculatedRating !== 'NaN') ? calculatedRating : 'none'


  return (
    <div className="ratings-holster">
      <GetCarabinerRating calculatedRating={calculatedRating} color={color} />
      <div>Rating: {calculatedRating}</div>
    </div>
  )
}

export default Ratings
