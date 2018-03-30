import React from 'react'
import carabiner from './carabiner.png'

const GetCarabinerRating = ({calculatedRating, color}) => {
  let carabiners = []
  for (let i = 0, r = calculatedRating; i < 5; i++) {
    //
    if (r > 1) {
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
          key={'span' + i}>
          {/* neccessary workaround for half and quarter ratings */}
          <div style={cDiv} key={'span' + i} className={color}>
          </div>
          <img src={carabiner} alt="carabiner-icon" key={i}/>
          {/* Below is to appear over the percentage div above */}
          <img src={carabiner} alt="carabiner-icon" key={'unfilled' + i} className="unfilled-absolute"/>
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
    <div className="carabiners">{carabiners}</div>
  )
}

export default GetCarabinerRating
