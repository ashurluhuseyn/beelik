import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import eventVector from '../../../assets/images/event-vector.png'
import EventCard from '../../../components/Event'
import './events.scss'
import { getEvents } from '../../../api/event'
import AlertMessage from '../../../components/Alert'

const Events = () => {
  const [data, setData] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEvents();
        setData(response);
      } catch (error) {
        console.log(error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Yüklenir...</p>;
  }

  if (!data) {
    return <AlertMessage text='Göstəriləcək məlumat yoxdur'/>;
  }
  return (
    <div className='events-page'>
        <Helmet>
            <title>Tədbirlər</title>
        </Helmet>
        <div className="events">
            <div className="events__title">
                <h1>Tədbirlər</h1>
            </div>
            <div className="events__list">
                {
                    data && data.length > 0 ? data.map(item => {
                        return(
                            <EventCard key={item.id} data={item}/>
                        )
                    }) : <AlertMessage text='Hal-hazırda tədbir yoxdur'/>
                }
            </div>
            <div className="events__subscribe">
                <div className="events__subscribe__form">
                    <h1>Növbəti tədbirlərdən <br /> xəbərdar ol!</h1>
                    <div className='form-container'>
                        <div className="input-container">
                            <label htmlFor="name">Ad</label>
                            <input id='name' type="text" placeholder='Adınızı daxil edin'/>
                        </div>
                        <div className="input-container">
                            <label htmlFor="phone">Telefon nömrəsi</label>
                            <input id='phone' type="tel" placeholder='+994 51 323 32 32'/>
                        </div>
                        <div className="input-container">
                            <label htmlFor="">Email</label>
                            <input type="text" placeholder='example@gmail.com'/>
                        </div>
                    </div>
                    <div className="form-button">
                        <button>Soruş</button>
                    </div>
                </div>
                <div className="events__subscribe__image">
                    <img src={eventVector} alt="" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Events