import React, {useState, useEffect } from 'react'

export default function Input({onSubmit, onControlPointChange, onIterationChange, onModeChange}) {
  const [controlPointsInput, setControlPointsInput] = useState('');
  const [iterationInput, setIterationInput] = useState(''); 
  const [mode, setMode] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [isMin3Points, setIsMin3Points] = useState(true);
  
  useEffect(() => {
    onModeChange(mode);
  }, [mode]);

  function isValidInput() {
    if (controlPointsInput === '' || iterationInput === '' || iterationInput < 1) {
      return false;
    }
    const pattern = /^(-?\d+\s+-?\d+)(,-?\d+\s+-?\d+)*$/;
    if (!pattern.test(controlPointsInput)){
      return false;
    }
    return true;
  }

  function handleSubmit(e,mode){
    e.preventDefault();
    const valid = isValidInput();
    setIsValid(valid);
    if (valid) {
      const controlPoints = controlPointsInput.split(',').map(point => {
        const [x, y] = point.split(' ').map(Number);
        return { x:x, y:y };
      });
      if (controlPoints.length >= 3){
        setIsMin3Points(true)
        setMode(mode)
        onControlPointChange(controlPoints)
        onIterationChange(iterationInput)
        onSubmit(controlPoints, iterationInput, mode)
      }
      else{
        setIsMin3Points(false)
      }
    }
  }

  return (
    <div>
      <form className='input-form' >
        <h3>Enter control points and iterations</h3>
        <input
          type="text" 
          placeholder='x1 y1,x2 y2,x3 y3 ...' 
          value={controlPointsInput} 
          onChange={(e) => setControlPointsInput(e.target.value)}
          aria-label="Control Points"
          />
        <input 
          type="number" 
          placeholder='Iterations' 
          value={iterationInput} 
          min={1}
          onChange={(e) => setIterationInput(e.target.value)}
          />
        {!isValid && (
        <p className='error-msg'>Please enter valid Control Points in the format x1 y1,x2 y2,x3 y3,... and Iteration bigger than 0 !</p>
      )}
        {!isMin3Points && (
        <p className='error-msg'>Please enter a minimum of 3 points !</p>
      )}
      <div className='btn'>
        <button type='button' onClick={(e) => handleSubmit(e,true)}>Visualize With DnC</button>
        <button type='button' onClick={(e) => handleSubmit(e,false)}>Visualize With Brute Force</button>
      </div>
      </form>
    </div>
  )
}
