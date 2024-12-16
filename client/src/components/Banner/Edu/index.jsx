import React from 'react'
import '../banner.scss'
import { Link } from 'react-router-dom'

const Banner = ({ data }) => {
  return (
    <div className='banner'>
       <div className="banner__wrap">
          <div className="banner__wrap__content">
            <div className="banner__wrap__content__title">
              <h1>{data.title}</h1>
              <p>{data.description}</p>
            </div>
            <div className="banner__wrap__content__button">
              <Link to='/about'>Ətraflı bax</Link>
            </div>
          </div>
          <div className="banner__wrap__banner">
            <img src={`${process.env.REACT_APP_IMAGE_URL}home/${data.image}`} alt="" />
          </div>
       </div>
    </div>
  )
}

export default Banner