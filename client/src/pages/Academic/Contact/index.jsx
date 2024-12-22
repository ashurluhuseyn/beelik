import React, { useEffect, useState } from 'react';
import Ask from '../../../components/Ask';
import linkedin from '../../../assets/images/linkedin.svg';
import facebook from '../../../assets/images/facebook.svg';
import instagram from '../../../assets/images/instagram.svg';

import './contact.scss';
import { getData } from '../../../api/contact';
import AlertMessage from '../../../components/Alert';
import Loader from '../../../components/Loader';
import { Helmet } from 'react-helmet';
import { useTheme } from '../../../context/themeContext';

const Contact = () => {
  const [data, setData] = useState(null); 
  const [loading, setLoading] = useState(true);
  const { pageMode } = useTheme()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData();
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
    <div className={pageMode ? 'contact' : 'contact contact-dark'}>
       <Helmet>
            <title>Əlaqə</title>
        </Helmet>
      <div className="contact__details">
        <div className="map">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3038.4130725585114!2d49.83892557658007!3d40.3996990714424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d6478c8c497%3A0x1c2cd364de0cdc09!2sBeelik!5e0!3m2!1str!2saz!4v1733213642975!5m2!1str!2saz" width="100%" height="100%"  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div className="info">
          <h1>{data.address}</h1>
          <span>Necə gedə bilərəm?</span>
          <p>{data.addressExplain}</p>
          <ul>
            <li>{data.phone1}</li>
            <li>{data.phone2}</li>
            <li>{data.email}</li>
          </ul>
        </div>
      </div>

      <div className="contact__social">
        {pageMode && <h1>Bizi sosial media üzərindən izlə</h1>}
        <ul>
          <li className={!pageMode && 'dark-social'}>
            <a href={data.linkedin} target='_blank' rel='noreferrer'>
              <img src={linkedin} alt="linkedin icon" />
            </a>
          </li>
          <li className={!pageMode && 'dark-social'}>
            <a href={data.instagram} target='_blank' rel='noreferrer'>
              <img src={instagram} alt="instagram icon" />
            </a>
          </li>
          <li className={!pageMode && 'dark-social'}>
            <a href={data.facebook} target='_blank' rel='noreferrer'>
              <img src={facebook} alt="facebook icon" />
            </a>
          </li>
        </ul>
      </div>

      <Ask />
    </div>
  );
};

export default Contact;
