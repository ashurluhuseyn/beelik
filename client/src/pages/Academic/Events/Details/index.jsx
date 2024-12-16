import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";

import arrowRight from '../../../../assets/images/arrow-right.svg'
import location from '../../../../assets/images/location.svg'
import eventTime from '../../../../assets/images/event-time.svg'
import eventVector from '../../../../assets/images/event-vector.png'
import { getEventById } from "../../../../api/event";
import AlertMessage from "../../../../components/Alert";
import { getFormattedDate } from "../../../../utils/date";
import Loader from "../../../../components/Loader";
import EventModal from "../../../../components/Modal/Event";

const EventDetails = () => {
  const { id } = useParams()
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalActive, setIsModalActive] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEventById(id);
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
    return <Loader />
  }

  if (!data) {
    return <AlertMessage text='Göstəriləcək məlumat yoxdur'/>;
  }
  return (
    <div className="event-details-page">
       <Helmet>
            <title>{data.title}</title>
        </Helmet>
      <div className="details">
        <div className="breadcrumb">
          <ul>
            <li>
              <Link to="/">Ana səhifə</Link>
            </li>
            <li>
              <img src={arrowRight} alt="" />
            </li>
            <li>
              <Link to="/events">Tədbirlər</Link>
            </li>
            <li>
              <img src={arrowRight} alt="" />
            </li>
            <li>
              <Link to={`/events/${data.id}`}>{data.title}</Link>
            </li>
          </ul>
        </div>
        <div className="details__wrap">
            <div className="details__wrap__image">
                <img src={`${process.env.REACT_APP_IMAGE_URL}events/${data.image}`} alt="" />
            </div>
            <div className="details__wrap__content">
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
                <div className="details__wrap__content__title">
                    <h1>{data.title}</h1>
                    <p>{data.description}</p>
                </div>
                <div className="details__wrap__content__button">
                    <button onClick={() => { setIsModalActive(true) }}>Qeydiyyatdan keç</button>
                </div>
            </div>
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
      {isModalActive && (
        <EventModal active={isModalActive} setIsActive={setIsModalActive} eventID={data.id} />
      )}
    </div>
  );
};

export default EventDetails;
