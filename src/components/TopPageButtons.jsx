import React from 'react'

function TopPageButtons() {
    const cities = [
    {
      id:1,
      title: 'London'
    },
    {
      id:2,
      title: 'Bucharest'
    },
    {
      id:3,
      title: 'Tokyo'
    },
    {
      id:4,
      title: 'Toronto'
    },
    {
      id:5,
      title: 'Paris'
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