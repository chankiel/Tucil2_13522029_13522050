import React, {useState } from 'react'
import Input from './Input'
import Bezier from './Bezier'
import { dnc } from '../dncNPoints'
import { bfBezier } from '../bfNPoints'

export default function Visualizer() {
  const [controlPoints, setcontrolPoints] = useState([])
  const [iteration, setIteration] = useState(0)
  const [selectedIteration, setSelectedIteration] = useState(0);
  const [isUsingDNC, setisUsingDNC] = useState(true)
  const [dncData, setDncData] = useState({
    result: [],
    midPointsHistory: [],
    runtime: 0,
  });
  const [bruteForceData, setBruteForceData] = useState({
    result: [],
    midPointsHistory: [],
    runtime: 0,
  });
  
    function ResultBox({type, runtime}){
      return (<div className='output'>
        <h3>Result with {type} </h3>
        <p>Runtime:<b> {runtime} ms</b></p>
        {type === 'DnC' &&  (<select onChange={handleIterationSelection} value={selectedIteration}>
          <option key="all" value={0}>Show all iterations</option>
          {Array.from({ length: iteration }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              Iteration {i + 1}
            </option>
          ))}
        </select>)}
      </div>
      )
    }
  
    function fetchBezierPoints(controlPoints, iterations, isUsingDNC){
      setSelectedIteration(0)
      const startTime = performance.now()
      const result = isUsingDNC? dnc(controlPoints,iterations,iterations) : bfBezier(controlPoints,iterations)
      const endTime = performance.now()
      // console.log(result)
      if (isUsingDNC){
        setDncData({
          result: [controlPoints[0], ...(result.points), controlPoints[controlPoints.length-1]],
          midPointsHistory: result.midPointsHistory,
          runtime: (endTime - startTime),
        })
      }
      else {
        setBruteForceData({
          result: result,
          midPointsHistory: [], 
          runtime: (endTime - startTime),
        })
      }
    }

    function handleIterationChange(i) {
      setIteration(i)
    }

    function handleControlPointChange(arr){
      setcontrolPoints(arr)
    }

    function handleIterationSelection(event) {
      setSelectedIteration(Number(event.target.value))
      isUsingDNC? null : setisUsingDNC(true)
    }

    function handleModeChange(mode){
      setisUsingDNC(mode)
    }

  const data = isUsingDNC? dncData : bruteForceData
  {console.log(data)}
  return <>
    <div className='app'>
      <h1>Bézier Curve Visualizer</h1>
      <div className='box'>
        <Bezier controlPoints={controlPoints} bezierPoints={data.result} midPointsHistory={dncData.midPointsHistory} selectedIteration={selectedIteration} isUsingDNC={isUsingDNC}/>
      </div>
      <div className='interaction-container'>
        <Input onSubmit={fetchBezierPoints} onControlPointChange={handleControlPointChange} onIterationChange={handleIterationChange} onModeChange={handleModeChange}/>
        <ResultBox type={'DnC'} runtime={dncData.runtime}></ResultBox>
        <ResultBox type={'Brute Force'} runtime={bruteForceData.runtime}></ResultBox>
      </div>
    </div>
  </>
}
