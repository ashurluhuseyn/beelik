import React from 'react'

import './advantage.scss'
import AdvantageCard from './Card'

const Advantages = ({ data }) => {
  
  return (
   <div className="advantages">
    <div className="advantages__wrap">
      <div className="advantages__wrap__text">
        <h1>Üstünlüklərimiz</h1>
        <p>Explore our diverse range of courses designed to enhance your skills and knowledge. Whether you're interested in technology, arts, or business, we have something for everyone!</p>
      </div>
      <div className="advantages__wrap__list">
        {
          data.map(item => {
            return(
              <AdvantageCard key={item.id} data={item}/>
            )
          })
        }
      </div>
    </div>
   </div>
  )
}

export default Advantages