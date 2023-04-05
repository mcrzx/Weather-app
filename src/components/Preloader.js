import React, { useEffect } from 'react'
import { preLoaderAnim } from '../animations /animate'
import "./Styles.css"
 


//preloader text, importing the animation
const Preloader = () => {
    useEffect(() => {
        preLoaderAnim()
    }, [])
  return (

    <div className='preloader'>
        <div className='texts-container'>
            <span>Weather App.</span>
            <span>Ahead of time.</span>
            
        </div>
    </div>
  )
}

export default Preloader