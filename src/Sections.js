import React from 'react';
import DivLink from './DivLink'
import GetWallStats from './GetWallStats'

const Section = ({name, url, walls}) => (
    <div className="col s12 m8 offset-m2 l6 offset-l3 climbingSection">
      <div className="card-panel grey lighten-5 z-depth-1">
        <div className="row .v-align">
          <div className="col s12 m5 section-image-container center">
            <img src={url} alt={name} className="circle responsive-img center" />
          </div>
          <div className="col s12 m7 center">
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
  <h1 className="center">BKB Somerville</h1>
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

export default Sections
