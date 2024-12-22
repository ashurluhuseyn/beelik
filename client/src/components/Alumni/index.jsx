import React from 'react'
import './alumni.scss'

const AlumniCard = ({ data }) => {
  return (
    <div className='alumni-card'>
        <div className="alumni-card__head">
            <div className="alumni-card__head__img">
                <img src={`${process.env.REACT_APP_IMAGE_URL}alumni/${data.image}`} alt="" />
            </div>
            <div className="alumni-card__head__title">
                <h1>{data.fullname}</h1>
                <span>{data.workPlace}</span>
                <span>{data.position}</span>
            </div>
        </div>
        <div className="alumni-card__body">
            <p>{data.description}</p>
        </div>
    </div>
  )
}

export default AlumniCard