import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import './App.css';

const noDuplicates = (noDups, item) => {
    if (item === (null || undefined)) return noDups
  if(noDups.indexOf(item) === -1)
    noDups.push(item)
    return noDups
}

const GetStats = ({walls}) => {
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
                <GetStats walls={walls} />
          </div>
        </div>
      </div>
    </div>
)

const Sections = ({sections}) => (
  <div>
    {sections
      .map(section => <Section key={section.name}
                              name={section.name}
                              url={section.imageURL}
                              walls={section.walls}
                              />)}
  </div>
)

const Dashboard = () => (
  <div>
    <h1>Testing routing</h1>
  </div>
)

class App extends Component {
  constructor(props) {
    super()
    this.state = {
      sections: null
    }
    // allows getSection to always have access to the state
    this.getSection = this.getSection.bind(this)
  }

  getSection() {
    return fetch(`http://localhost:4741/`)
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(myJson =>  {
        this.setState({
          sections: myJson.sections
        })
      })
  }
  componentDidMount() {
    this.getSection()
  }
  componentWillUnmount() {
    this.setState({
      sections: null
    })
  }
  render() {

    const { sections } = this.state;
    return (
      <div className="container">
      <nav>
         <Link to="/dashboard">Dashboard</Link>
       </nav>
       <div>
         <Route path="/dashboard" component={Dashboard}/>
       </div>
        {sections &&
          <div>
            <Sections sections={sections}/>
          </div>
        }
      </div>
    );
  }
}

export default App;
