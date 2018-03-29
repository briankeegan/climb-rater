import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import './App.css'
import Nav from './Nav'
import Spinner from './Spinner'
import Sections from './Sections'
import Walls from './Walls'
import ClimbingRoute from './ClimbingRoute'

const toUrl = (string) => (
  string.split(' ').join('').toLowerCase()
)

const NotFound = () => (
  <div>
    <h2 className="center red-text">Content not found.</h2>
    <h4>Are you lost? Come <Link to="/">Home</Link></h4>
  </div>
)

class App extends Component {
  constructor() {
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
    return fetch('https://climb-rater-api-development.herokuapp.com')
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

    const { sections, user } = this.state
    return (
      <div>
        <Nav
          user={user}
          setUserState={this.setUserState}
        />
        <div className="container">
          { sections ?
            (
              <Route exact path="/" render={() => <Sections sections={sections}/>}/>
            )
            :
            (
              <Spinner />
            )

          }

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
                    <NotFound />
                  )
              }}/>
              <Route path={'/:name/:number/:color'} render={({ match }) => {
                const section = sections.find(s => {
                  return toUrl(s.name) === toUrl(match.params.name)
                })
                const wall = section.walls.find(w => {
                  return +w.number === +match.params.number
                })
                let climbingRoute
                if (wall) {
                  climbingRoute = wall.climbingRoutes.find(cr => {
                    return (cr.color.toLowerCase() ===    match.params.color.toLowerCase())
                  })
                }
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
                    <NotFound />
                  )
              } }/>
            </div>
          )
          }
        </div>
      </div>
    )
  }
}

export default App;
