import React, { useEffect, useState } from 'react';
import './events.scss';
import EventCard from '../../../components/Event';
import { Helmet } from 'react-helmet';
import CategoryList from '../../../components/Category';
import { getEvents } from '../../../api/event';
import AlertMessage from '../../../components/Alert';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [emptyState, setEmptyState] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEvents();
        setEvents(data.events);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleCategorySelect = (data) => {
    if (data === null) {
      setFilteredEvents(events);
      setEmptyState(false);
    } else if (data.length === 0) {
      setEmptyState(true);
      setFilteredEvents([]);
    } else {
      setEmptyState(false);
      setFilteredEvents(data);
    }
  };

  

  return (
    <div className='events'>
      <Helmet>
        <title>Tədbirlərimiz</title>
      </Helmet>
      <div className="events__title">
        <h1>Tədbirlərimiz</h1>
        <p>Partnering with DigitX offers a multitude of advantages. Experience increased brand visibility, improved customer engagement, and higher ROI.</p>
      </div>
      <CategoryList queryType="corporate/events" onCategorySelect={handleCategorySelect} />
        <div className="events__list">
            {emptyState ? (
              <AlertMessage text='Bu kateqoriyaya uyğun məlumat yoxdur.'/>
            ) : filteredEvents.length > 0 ? (
              filteredEvents.map(item => <EventCard key={item.id} data={item} />)
            ) : (
              events.map(item => <EventCard key={item.id} data={item} />)
            )}
          </div>
    </div>
  );
};

export default Events;
