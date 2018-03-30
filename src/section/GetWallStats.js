import React from 'react'

const noDuplicates = (noDupes, item) => {
  // item is empty, return the empty array
  if (item === (null || undefined)) return noDupes
  // f the item is not already in the array push it
  if(noDupes.indexOf(item) === -1)
    noDupes.push(item)
  return noDupes
}

const GetWallStats = ({walls}) => {
  const stats = {
    wallNumbers: [],
    gymGrades: [],
    routeSetters: [],
    routeTypes: []
  }
  walls.forEach(wall => {
    noDuplicates(stats.wallNumbers, wall.number)
    wall.climbingRoutes &&
      wall.climbingRoutes.forEach(cr => {
        const { gymGrade, routeSetter, routeType} = cr
        noDuplicates(stats.gymGrades, gymGrade)
        noDuplicates(stats.routeSetters, routeSetter)
        noDuplicates(stats.routeTypes, routeType)
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

export default GetWallStats
