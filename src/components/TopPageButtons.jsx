import React from 'react'

function TopPageButtons() {
    const cities  = [
    {
      id:1,
      title: 'Discover'
    },
    {
      id:2,
      title: 'Faverouties'
    },
    {
      id:3,
      title: 'Source'
    }
  
  
  
  
  
  
  ]


   return  <div className='flex item-center justify-around my-6'>
    {cities.map((city) => (
        <button key={city.id} className='text-white text-lg font-medium'>
          {city.title}
          </button>
    ))}
   </div>
  
}

export default TopPageButtons