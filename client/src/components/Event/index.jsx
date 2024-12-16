import React from 'react'
import { Link } from 'react-router-dom'
import location from '../../assets/images/location.svg'
import eventTime from '../../assets/images/event-time.svg'
import { getFormattedDate } from '../../utils/date'

import './event.scss'

const EventCard = ({ data }) => {
  return (
    <div className='event-card'>
        <div className="event-card__image">
            <Link to={`/events/${data.id}`}>
                <img src={`${process.env.REACT_APP_IMAGE_URL}events/${data.image}`} alt="" />
            </Link>
        </div>
        <div className="event-card__description">
            <h1>{data.title}</h1>
            <ul>
                <li>
                    <img src={eventTime} alt="" />
                    <span>{getFormattedDate(data.date)}</span>
                </li>
                <li>
                    <img src={location} alt="" />
                    <span>{data.location}</span>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default EventCard