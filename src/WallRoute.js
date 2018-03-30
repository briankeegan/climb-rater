import React from 'react'
import Ratings from './Ratings'

const WallRoute = ({ climbingRoute }) => {
  const { color, gymGrade, routeSetter, routeType, createdAt, ratings } = climbingRoute
  const date = new Date(createdAt).toDateString()
  {/* Uses Materialize class to create background color for each WallRoute based on the actual colors, or grey */}
  let colorLowerCase = color ? color.toLowerCase() : 'grey'
  {/* If the color is black, make it dark grey, because black on black can not be read */}
  colorLowerCase = (colorLowerCase !== 'black') ?  colorLowerCase : 'grey darken-1'

  return(
    <div className="col s12 wall-route">
      <div className={`card-panel ${colorLowerCase} lighten-4 z-depth-1`}>
        <div className="row valign-wrapper">
          <div className="col s6">
            <p>{color.toUpperCase()}: {gymGrade}</p>
            <p>{routeType}</p>
            <p>Setter: {routeSetter}</p>
          </div>
          <div className="col s6 right rating-wall">
            <Ratings ratings={ratings} color={colorLowerCase} />
            <p>{date}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WallRoute
