import React from 'react';

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

export default GetWallStats;
