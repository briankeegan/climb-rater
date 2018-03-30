import React from 'react'
import DivLink from '../DivLink'
import WallRoute from './WallRoute'

const toUrl = (string) => (
  string.split(' ').join('').toLowerCase()
)

const Wall = ({ wall, name }) => {
  const { number, imageURL, climbingRoutes } = wall
  return (
    <div className="col s12 m8 offset-m2 l6 offset-l3">
      <div className="card-panel grey lighten-5 z-depth-1">
        <div className="row valign-wrapper">
          <div className="col s4 wall-image-container valign-wrapper">
            <h1 className="image-title">#{number}</h1>
            <img src={imageURL} alt="" className="square responsive-img" />
          </div>
          <div className="col s8">
            {climbingRoutes &&
            climbingRoutes
              .map((climbingRoute, i) => {
                const color = climbingRoute.color.toLowerCase()
                return (
                  <div key={i}>
                    <DivLink to={`${toUrl(name)}/${number}/${color}`}>
                      <WallRoute climbingRoute={climbingRoute}/>
                    </DivLink>
                  </div>
                )}
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

const Walls = ({section}) => {
  const { name, walls } = section
  return (
    <div>
      {name && <h1 className="center">{name}</h1>}
      {walls &&
        walls
          .map(wall => {
            return (
              <Wall key={wall._id} wall={wall} name={name}/>
            )
          })
      }
    </div>
  )
}

export default Walls
