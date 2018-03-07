import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import './App.css'
import DivLink from './DivLink';

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
)

const WallRoute = ({ climbingRoute }) => {
  const { color, gymGrade, routeSetter, routeType, createdAt } = climbingRoute
  const date = new Date(createdAt).toDateString()
  const colorLowerCase = color.toLowerCase()
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
          <p>Rating: 5(hardcoded)</p>
          <p>{date}</p>
        </div>
      </div>
    </div>
  </div>
)}

const Wall = ({ wall }) => {
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
              .map((climbingRoute, i) => (
                <WallRoute key={i} climbingRoute={climbingRoute}/>
              ))
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
          <Wall key={wall._id} wall={wall}/>
        )
      })
    }
  </div>
  )
}

const CreateRoutes = ({sections}) => (
  <div>
    {sections &&
      sections.map(section => {
        const linkName = section.name.split(' ').join('').toLowerCase()
        return (<Route exact path={'/' + linkName} key={linkName} render={() => <Walls section={section}/>}/>)
      })
    }
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
      sections: null
    })
  }

  render() {

    const { sections } = this.state;
    return (
      <div className="container">
      <nav>
        <Link to="/">Home</Link>
       </nav>
       <div>
         <Route exact path="/" render={() => <Sections sections={sections}/>}/>
         <CreateRoutes sections={sections} />

       </div>
      </div>
    );
  }
}

export default App;
