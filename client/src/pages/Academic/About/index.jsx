import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import Ask from '../../../components/Ask'
import WhyUs from '../../../components/WhyUs'
import logoYellow from '../../../assets/images/logo-yellow.svg'

import './about.scss'
import VacancyCard from '../../../components/Vacancy'
import { getAbout } from '../../../api/about'
import AlertMessage from '../../../components/Alert'

const About = () => {
  const [data, setData] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAbout();
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
    <div className='about-page'>
       <Helmet>
            <title>Haqqımızda</title>
        </Helmet>
       <div className="about">
          <div className="who-we">
                <div className="who-we__text">
                    <h1>{data.aboutData.title}</h1>
                    <p>{data.aboutData.description}</p>
                </div>
                <div className="who-we__banner">
                    <img className='banner-img' src={`${process.env.REACT_APP_IMAGE_URL}about/${data.aboutData.image}`} alt="" />
                    <img className='logo' src={logoYellow} alt="" />
                </div>
            </div>
            <WhyUs data={data.whyData && data.whyData}/>
            <div className="vacancies">
              <div className="vacancies__top">
                <h1>Vakansiyalar</h1>
                <Link>Ətraflı</Link>
              </div>
              <div className="vacancies__list">
                {
                  data.vacancyData && data.vacancyData.length > 0 ? data.vacancyData.map(item => {
                    return(
                      <VacancyCard key={item.id} data={item}/>
                    )
                  }) : <AlertMessage text='Hal-hazırda aktiv vakansiya yoxdur'/>
                }
              </div>
            </div>
            <Ask />
       </div>
    </div>
  )
}

export default About