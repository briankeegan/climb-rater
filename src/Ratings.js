import React from 'react'


const Ratings = ({ ratings }) => {
  const calculatedRating = (ratings.reduce((tot, rating) => {
    const r = +rating.climberRating
    return tot += r
  }, 0) / ratings.length).toFixed(1)
  return (
    <span>{calculatedRating}</span>
 )
}

export default Ratings
