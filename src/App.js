import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import { Link } from 'react-router-dom'
import DivLink from './DivLink'
import Nav from './Nav'
import RateClimbModal from './RateClimbModal'

const toUrl = (string) => (
  string.split(' ').join('').toLowerCase()
)

const noDuplicates = (noDups, item) => {
    if (item === (null || undefined)) return noDups
  if(noDups.indexOf(item) === -1)
    noDups.push(item)
    return noDups
}

const GetWallStats = ({walls}) => {
    const stats = {
      gymGrades: [],
      routeSetters: [],
      routeTypes: [],
      wallNumbers: []
    }
    walls.forEach(wall => {
      noDuplicates(stats.wallNumbers, wall.number)
      // noDuplicates(stats.wallNumbers, wall)
      wall.climbingRoutes &&
      wall.climbingRoutes.forEach(cr => {
        noDuplicates(stats.gymGrades, cr.gymGrade)
        noDuplicates(stats.routeSetters, cr.routeSetter)
        noDuplicates(stats.routeTypes, cr.routeType)
      })
    })
  return (
    <div className="row">
      <div className="col s6">
      <p>Walls: {stats.wallNumbers.join(', ')}</p>
        <p>{stats.routeTypes.join(', ')}</p>
      </div>
      <div className="col s6">
        <p>Grades: {stats.gymGrades.join(', ')}</p>
        <p>Setters: {stats.routeSetters.join(', ')}</p>
      </div>
    </div>
  )
}

const Section = ({name, url, walls}) => (
    <div className="col s12 m8 offset-m2 l6 offset-l3 climbingSection">
      <div className="card-panel grey lighten-5 z-depth-1">
        <div className="row valign-wrapper">
          <div className="col s4">
            <img src={url} alt={name} className="circle responsive-img" />
          </div>
          <div className="col s8 center">
            <h3>{name}</h3>
                <GetWallStats walls={walls} />
          </div>
        </div>
      </div>
    </div>
)

const Sections = ({sections}) => {
  return (
  <div>
    { sections &&
      sections
      .map(section => {
        const linkName = section.name.split(' ').join('').toLowerCase()
        return (
        <DivLink to={linkName} key={linkName}>
          <Section key={section.name}
          name={section.name}
          url={section.imageURL}
          walls={section.walls}
          />
        </DivLink>
        )
        })
      }
  </div>
)}


const Ratings = ({ ratings }) => {
  const calculatedRating = (ratings.reduce((tot, rating) => {
    const r = +rating.climberRating
    return tot += r
  }, 0) / ratings.length).toFixed(1)
  return (
    <span>{calculatedRating}</span>
 )
}



const WallRoute = ({ climbingRoute }) => {
  const { color, gymGrade, routeSetter, routeType, createdAt, ratings } = climbingRoute
  const date = new Date(createdAt).toDateString()
  const colorLowerCase = color ? color.toLowerCase() : 'grey'

  return(
    <div className="col s12 ">
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

const Wall = ({ wall, name }) => {
    const { number, imageURL, climbingRoutes } = wall
    return (
      <div className="col s12 m8 offset-m2 l6 offset-l3">
        <div className="card-panel grey lighten-5 z-depth-1">
          <div className="row valign-wrapper">
            <div className="col s4 image-container">
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
          <div className="col s12 image-container center">
            <h1 className="image-title2">{color.toUpperCase()}: #{number}</h1>
            <img src={imageURL} alt={`Route #${number}`} className="square responsive-img" />
          </div>
        </div>
        <div className="row">
          <div className="col s6">
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
          <div className="col s6">
          {(ratings.length !== 0)
            ?
            (
              <div>
                <h5>Rating: <Ratings ratings={ratings} /></h5>
              </div>
            )
            :
            (
              <h5>Be the first to this rate this climb!</h5>
            )
          }
            <p>{date}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

class App extends Component {
  constructor(props) {
    super()
    this.state = {
      sections: null,
      user: null
    }
    // allows getSection to always have access to the state
    this.getSection = this.getSection.bind(this)
    this.setUserState = this.setUserState.bind(this)
  }

  setUserState(data) {
    this.setState({
      user: data
    })
  }

  getSection() {
    return fetch(`http://localhost:4741/`)
      .then(res => res.json())
      .then(myJson =>  {
        this.setState({
          sections: myJson.sections
        })
      })
      .catch(error => console.error('Error:', error))
  }

  componentDidMount() {
    this.getSection()
  }
  componentWillUnmount() {
    this.setState({
      sections: null,
      users: null
    })
  }

  render() {

    const { sections, user } = this.state;
    return (
    <div>
      <Nav
        user={user}
        setUserState={this.setUserState}
        />
      <div className="container">
       <div>
         <Route exact path="/" render={() => <Sections sections={sections}/>}/>
         { sections && (
           <div>
           <Route exact path="/:name" render={( {match} ) => {
             const section = sections.find(s => {
               return toUrl(s.name) === toUrl(match.params.name)
             })
             return section ?
              (
                  <Walls section={section}/>
              )
               :
             (
               <div>
                 <h2 className="center red-text">Content not found.</h2>
                 <h4>Are you lost? Come <Link to="/">Home</Link></h4>
               </div>
              )
           }}/>
           <Route path={`/:name/:number/:color`} render={({ match }) => {
             const section = sections.find(s => {
               return toUrl(s.name) === toUrl(match.params.name)
             })
             const wall = section.walls.find(w => {
               return +w.number === +match.params.number
             })
             const climbingRoute = wall.climbingRoutes.find(cr => {
               return (cr.color.toLowerCase() === match.params.color.toLowerCase())
             })
             return climbingRoute ?
             (
               <ClimbingRoute climbingRoute={climbingRoute}
               wall={wall}
               user={user}
               getSection={this.getSection}
               />
             )
             :
             (
               <div>
                <h2 className="center red-text">Content not found.</h2>
                <h4>Are you lost? Come <Link to="/">Home</Link></h4>
              </div>
             )
           } }/>
           </div>
        )
      }
        <button className="btn" onClick={this.getSection}>Update Page States</button>
        <button className="btn" onClick={() => console.log(this.state)}>State</button>
       </div>
      </div>
    </div>
    );
  }
}

export default App;
