import React from 'react'
import eu from '../assets/eu.mp4'

const Main = () =>{
  return (
   
    <div className='main'>
        <video src={eu} autoPlay loop muted/>
    
    </div>
  )
}

export default Main