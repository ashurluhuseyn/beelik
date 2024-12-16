import React from 'react'
import arrowUpRight from '../../../assets/images/services-icon.svg'
import { Link } from 'react-router-dom'


const ServiceCard = ({ data }) => {
  return (
    <div className='services__list__item'>
      <div className='services-arrow'>
        <img src={arrowUpRight} alt="" />
      </div>
      <div className="services__list__item__elem">
        <Link to={`/corporate/services/${data.id}`}>{data.title}</Link>
        <p>{data.description.length > 70 ? data.description.slice(0,70) + "..." : data.description}</p>
      </div>
    </div>
  )
}

export default ServiceCard

