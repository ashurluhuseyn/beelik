import React from 'react'

const AdvantageCard = ({ data }) => {
  return (
    <div className='advantage-card'>
      <div className='advantage-card__icon'>
        <img src={`${process.env.REACT_APP_IMAGE_URL}advantages/${data.image}`}  alt="" />
      </div>
      <div className="advantage-card__content">
        <h1>{data.title}</h1>
        <p>{data.description}</p>
      </div>
    </div>
  )
}

export default AdvantageCard