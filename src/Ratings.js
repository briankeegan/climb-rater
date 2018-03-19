import React from 'react'
import carabiner from './carabiner.png';


const Ratings = ({ ratings, color }) => {
  // if color is passed int, use it (same as from Climbing route),
  const colorClass = color ?
   (color + " lighten-4")
   : ("white")
  let calculatedRating = (ratings.reduce((tot, rating) => {
    const r = +rating.climberRating
    return tot += r
  }, 0) / ratings.length).toFixed(1)

  calculatedRating = (calculatedRating !== 'NaN') ? calculatedRating : 'none'



  let carabiners = []
  for (let i = 0, r = calculatedRating; i < 5; i++) {
    if (r - 1 > 0) {
      r--
      carabiners.push(
        <img src={carabiner} alt="carabiner-icon" key={i}/>
      )
    } else if (r > 0) {
      // calculated proper percentage of width for %
      const wPercentage = -((r * 26)-26)
      r = 0
      //as such, need to specify style for each div divider
      const cDiv = {
        right: '0',
        bottom: '0',
        position: 'absolute',
        height: '35px',
        width: `${wPercentage}px`,
        }
      carabiners.push(
        <span
          style={{position: 'relative'}}
          key={"span" + i}>
          <div style={cDiv} key={"span" + i} className={colorClass}>
          </div>
            <img src={carabiner} alt="carabiner-icon" key={i}/>
            {/* Below is to appear over the percentage div above*/}
            <img src={carabiner} alt="carabiner-icon" key={'unfilled' + i} className="unfilled"
            style={{
              position: 'absolute',
              left: '0'
            }}/>
        </span>
      )
    }
    else {
      carabiners.push(
        <img src={carabiner} alt="carabiner-icon" key={i} className="unfilled"/>
      )
    }
  }
  return (
    <div className="ratings-holster">
      <div className="carabiners">{carabiners}</div>
      <div>Rating: {calculatedRating}</div>
    </div>
 )
}

export default Ratings
