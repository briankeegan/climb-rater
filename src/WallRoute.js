import React from 'react'
import Ratings from './Ratings'

const WallRoute = ({ climbingRoute }) => {
  const { color, gymGrade, routeSetter, routeType, createdAt, ratings } = climbingRoute
  const date = new Date(createdAt).toDateString()
  let colorLowerCase = color ? color.toLowerCase() : 'grey'
  colorLowerCase = (colorLowerCase !== 'black') ?  colorLowerCase : 'grey darken-3'

  return(
    <div className="col s12 wall-route">
    <div className={"card-panel " + colorLowerCase + " lighten-4 z-depth-1"}>
      <div className="row valign-wrapper">
        <div className="col s6">
          <p>{color.toUpperCase()}: {gymGrade}</p>
          <p>{routeType}</p>
          <p>Setter: {routeSetter}</p>
        </div>
        <div className="col s6 right">
          {(ratings.length !== 0) &&
            <div>
              <p>Rating: <Ratings ratings={ratings} /></p>
            </div>
          }
          <p>{date}</p>
        </div>
      </div>
    </div>
  </div>
)}

export default WallRoute
