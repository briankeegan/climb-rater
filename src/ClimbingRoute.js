import React from 'react'
import Ratings from './Ratings'
import RateClimbModal from './RateClimbModal'

const GetClimberGrades = ({ ratings }) => {
  const reducedRatings = ratings.reduce((tot, ratings) => {
    tot[ratings.climberGrade] = tot[ratings.climberGrade] ? ++tot[ratings.climberGrade] : 1
    return tot
  }, {})
  return (
    Object.keys(reducedRatings).map((cg, i) => {
      return (
        <div className="center" key={i}>
          <p>{cg}<span className="new badge blue" data-badge-caption="votes">{reducedRatings[cg]}</span></p>
        </div>
      )
    })
  )
}

const ClimbingRoute = ({ climbingRoute, wall, user, getSection }) => {
  const { color, gymGrade, ratings, routeSetter, routeType, createdAt, _id } = climbingRoute
  const { number, imageURL } = wall
  const date = new Date(createdAt).toDateString()

  const saveRating = ratings.find(r => {
    const u = user && user.user && user.user._id
    return (u === r._owner) && r
    }
  )

  return (
    <div className="col s12 m8 offset-m2 l6 offset-l3">
      <div className="card-panel grey lighten-5 z-depth-1">

        <div className="row valign-wrapper">
          <div className="col s4 climbingroute-image-container center valign-wrapper ">
              <h4 className="image-title2">{color.toUpperCase()}: <br /> #{number}</h4>
              <img src={imageURL} alt={`Route #${number}`} className="square responsive-img" />
          </div>

          <div className="col s4">
            {user
              ?
              (
                <RateClimbModal
                  store={user}
                  routeId={_id}
                  color={color}
                  number={number}
                  getSection={getSection}
                  saveRating={saveRating}
                  />
              )
              :
              (
                <p className="purple-text">Sign In Above to rate route!</p>
              )
            }
            <p>Gym Grade: {gymGrade}</p>
            <p>{routeType}</p>
            <p>Setter: {routeSetter}</p>
            {(ratings.length !== 0)
              ?
              (
                <div>
                  <p>Climbers graded this route as a:</p>
                  <GetClimberGrades ratings={ratings}/>
                </div>
              )
              :
              (
                <span></span>
              )
            }
          </div>
          <div className="col s4">
              <Ratings ratings={ratings} />
            <p>{date}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClimbingRoute
