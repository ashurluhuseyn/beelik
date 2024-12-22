import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getEventDetails } from '../../../../api/event'
import EventCard from '../../../../components/Event'
import calendar from '../../../../assets/images/calendar.svg'
import LoadMore from '../../../../components/LoadMore'
import AlertMessage from '../../../../components/Alert'

const EventDetails = () => {
    const { id } = useParams()
    const [data, setData] = useState();

    useEffect(() => {
        const fetchBlog = async () => {
        try {
            const data = await getEventDetails(id);
            setData(data)
        } catch (error) {
            console.error('Error fetching event:', error);
        }
    };

    fetchBlog();
  }, []);
  return (
    <div className='event-details'>
       {
        data ? <>
             <div className="event-content">
            <div className="event-content__banner">
                <h1>{data.event.title}</h1>
                <p>{data.event.description}</p>
                <div>
                    <img src={`${process.env.REACT_APP_IMAGE_URL}events/${data.event.image}`}  alt="" />
                </div>
            </div>
            <ul className="event-content__date">
                <li>{data.event.category.title}</li>
                <li><img src={calendar} alt="" /> March 2024</li>
            </ul>
            <div className="event-content__description">
                <div dangerouslySetInnerHTML={{ __html: data.event.description2 }} />
            </div>
        </div>
        <div className="other-events">
            <h1>Digər Tədbirlərə Nəzər Yetir</h1>
            <div className="other-events-list">
                {
                    data.relatedEvents.length > 0 ? data.relatedEvents.map(item => {
                        return(
                            <EventCard key={item.id} data={item}/>
                        )
                    }) : <AlertMessage text="Bu kateqoriyaya uyğun başqa tədbir yoxdur."/>
                }
            </div>
        </div>
        <LoadMore link='/corporate/events'/>
        </> : "Yuklenir..."
       }
    </div>
  )
}

export default EventDetails