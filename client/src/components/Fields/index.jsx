import React from 'react'
import clock from '../../assets/images/clock.svg'
import './field-card.scss'
import { useTheme } from '../../context/themeContext'
import { Link } from 'react-router-dom'

const FieldCard = ({ data }) => {
    const { pageMode } = useTheme()
  return (
    <div className={pageMode ? 'field-card' : 'field-card dark-field-card'}>
       <Link to={`/courses/${data.id}`}>
        <div className={pageMode ? 'field-card__image' : 'field-card__image dark-card-image'}>
                <img src={`${process.env.REACT_APP_IMAGE_URL}courses/${data.image}`} alt="" />
            </div>
       </Link>
        <div className="field-card__description">
            <ul>
                <li>
                    <span>{data.category.title}</span>
                </li>
                <li>
                    <img src={clock} alt="" />
                    <span>{data.hours} Saat</span>
                </li>
            </ul>
            <h1>{data.title}</h1>
        </div>
    </div>
  )
}

export default FieldCard