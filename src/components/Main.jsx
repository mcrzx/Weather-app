//video background source: Benn TK - youtube creator
//additional video edit for the Weather App project is done by Maria L
import React from 'react'
import background from '../assets/background.mp4'

const Main = () =>{
  return (
   
    <div className='main'>
        <video src={background} autoPlay loop muted/>
    
    </div>
  )
}

export default Main