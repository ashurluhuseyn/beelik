import React from 'react'
import arrowRight from '../../assets/images/arrow-right.svg'

import './vacancy.scss'
import { Link } from 'react-router-dom'
import { getFormattedDate } from '../../utils/date'

const VacancyCard = ({ data }) => {
  return (
    <div className='vacancy-card'>
        <Link to={`/vacancy/${data.id}`}>
          <div className="vacancy-card__wrap">
              <div className="vacancy-card__wrap__title">
                  <span>Son tarix: <span className='deadline'>{getFormattedDate(data.deadline)}</span></span>
                  <h1>{data.title}</h1>
              </div>
              <div className="vacancy-card__wrap__arrow">
                  <img src={arrowRight} alt='chevron right icon' />
              </div>
          </div>
        </Link>
    </div>
  )
}

export default VacancyCard