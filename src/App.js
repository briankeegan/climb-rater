import React, { Component } from 'react'
import { Route, Link, Switch } from 'react-router-dom'
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

  // Gathers data from api needed to display content
  // Sets state of section so updates happen universally.
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
  // When component is unmounted clear all data
  componentWillUnmount() {
    this.setState({
      sections: null,
      user: null
    })
  }

  render() {

    const { sections, user } = this.state

    // Show materialize spinner while waiting for sections data
    if (!sections) {
      return (
        <div>
          <Nav
            user={user}
            setUserState={this.setUserState}
          />
          <Spinner />
        </div>
      )
    }

    return (
      <div>
        <Nav
          user={user}
          setUserState={this.setUserState}
        />
        <div className="container">
          <Switch>
            {/* main view displaying all climbing Sections */}
            <Route exact path="/" render={() => <Sections sections={sections}/>} />

            {/* ection view, showing single Section and all associated Walls (walls are numbered) */}
            <Route exact path="/:name"
              render={({ match }) => {
                const section = sections.find(s => toUrl(s.name) === toUrl(match.params.name))
                return section ? <Walls section={section}/> : <NotFound />
              }}
            />

            {/*
              ClimbgingRoute view, based on name of Section, Wall number and ClimbingRoute color
              Shows single ClimbingRoute with option for authenticated user to login
            */}
            <Route
              path={'/:name/:number/:color'}
              render={({ match }) => {
                const section = sections.find(s => toUrl(s.name) === toUrl(match.params.name))
                // match.params.numbers is converted to number to compare with Wall number
                const wall = section.walls.find(w => w.number === +match.params.number)
                let climbingRoute

                // make both param and ClimbningRoute lowerCase in case of data error or user input error
                if (wall) {
                  climbingRoute = wall.climbingRoutes.find(cr =>
                    cr.color.toLowerCase() === match.params.color.toLowerCase())
                }

                return (
                  climbingRoute ?
                    <ClimbingRoute climbingRoute={climbingRoute}
                      wall={wall}
                      user={user}
                      getSection={this.getSection}
                    />
                    :
                    <NotFound />
                )
              }}
            />
            // Default for unknown route
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App
