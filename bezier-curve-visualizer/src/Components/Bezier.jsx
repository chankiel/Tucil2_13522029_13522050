import React from 'react'
import { Mafs, Coordinates, Point, Line, Theme } from "mafs"

function inPairs(arr) {
    const pairs = []
    for (let i = 0; i < arr.length - 1; i++) {
      pairs.push([arr[i], arr[i + 1]])
    }
    return pairs
}

export default function Bezier({controlPoints, bezierPoints, midPointsHistory, selectedIteration, isUsingDNC}) {
    const opacity = 1 - (2 * 0.5 - 1) ** 6
  
    function plotLineSegments(pointPath, color, opacity) {
        return inPairs(pointPath).map(([p1, p2], idx) => (
          <Line.Segment key={idx} point1={[p1.x,p1.y]} point2={[p2.x, p2.y]} opacity={opacity} color={color}/>
        ))
      }
  
    function plotPoints(points, color, opacity) {
      if (points.length === 1){
        return null
      }
        return points.map((point, idx) => (
            <Point key={idx} x={point.x} y={point.y} color={color} opacity={opacity*2} svgCircleProps={{r:4}}/>
        ))
      }
  
    const selectedMidpoints = isUsingDNC && midPointsHistory.filter(midpoint => midpoint.iteration <= selectedIteration);
    return (
      <Mafs
          viewBox={{ x: [-5, 5], y: [-5, 5] }}
          preserveAspectRatio={true}
          zoom={true} 
      >
        <Coordinates.Cartesian subdivisions={4}/>
        {plotLineSegments(controlPoints, "skyblue",opacity*3)}
        {plotPoints(controlPoints, Theme.blue,opacity)}
        {/* show all midpoints */}
        {isUsingDNC && selectedIteration === 0 && midPointsHistory.map((midpoint, index) => (
          midpoint.midPoints.map((item, idx) => (
            <React.Fragment key={`${index}-${idx}`}>
              {plotPoints(item, "white",opacity*0.5)}
              {plotLineSegments(item,Theme.foreground,opacity*0.5)}
            </React.Fragment>
          ))
        ))}
        {/* show only selected midpoints */}
        {selectedMidpoints && selectedMidpoints.map((midpoint, index) => (
          midpoint.midPoints.map((item, idx) => (
            <React.Fragment key={`${index}-${idx}`}>
              {plotPoints(item, "white",opacity)}
              {plotLineSegments(item,Theme.foreground,opacity*0.5)}
            </React.Fragment>
          ))
        ))}
        {plotLineSegments(bezierPoints, "red",opacity)}
        {plotPoints(bezierPoints, Theme.red,opacity)}
      </Mafs>
    )
  }