import React from 'react'
import './teacher.scss'

const TeacherCard = ({ data }) => {
  return (
    <div className='teacher-card'>
        <div className="teacher-card__wrap">
            <div className="teacher-card__wrap__image">
                <img src={`${process.env.REACT_APP_IMAGE_URL}teachers/${data.image}`} alt="" />
            </div>
            <div className="teacher-card__wrap__content">
                <h1>{data.name}</h1>
                <p>{data.bio}</p>
                <span>Təcrübə</span>
                <div dangerouslySetInnerHTML={{ __html: data.experience }} />
            </div>
        </div>
    </div>
  )
}

export default TeacherCard