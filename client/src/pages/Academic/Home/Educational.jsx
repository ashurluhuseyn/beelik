import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet'
import FieldCard from "../../../components/Fields";
import './home.scss'
import WhyUs from "../../../components/WhyUs";
import Banner from "../../../components/Banner/Edu";
import AlertMessage from "../../../components/Alert";
import { getData } from "../../../api/home";
import Loader from "../../../components/Loader";

const Educational = () => {
  const [data, setData] = useState(null); 
  const [loading, setLoading] = useState(true);

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
    <div className="educational">
        <Helmet>
         <title>Ana səhifə</title>
       </Helmet>
       <Banner data={data.homeData}/>
       <div className="fields-area">
        <div className="fields-area__top">
          <h1>Tədris sahələri</h1>
          <Link to='/courses'>Hamısına bax</Link>
        </div>
        <div className="fields-area__list">
          {
            data.coursesData && data.coursesData.length > 0 ? data.coursesData.map(item => {
              return(
                <FieldCard key={item.id} data={item}/>
              )
            }) : <AlertMessage text='Hal-hazırda tədris sahəsi yoxdur.'/>
          }
        </div>
       </div>
       <WhyUs data={data.whyData}/>
       <div className="partners">
        <div className="partners__top">
          <h1>Partnyorlarımız</h1>
          <p>Explore our diverse range of courses designed to enhance your skills and knowledge. Whether you're interested in technology.</p>
        </div>
        <div className="partners__list">
         
         {
          data.partnerData.length > 0 ? data.partnerData.map(item => {
            return(
              <div key={item.id} className="partners__list__item">
                <a href={item.link}>
                  <img  src={`${process.env.REACT_APP_IMAGE_URL}partners/${item.image}`} alt="" />
                </a>
              </div>
            )
          }) : <AlertMessage text='Hal-hazırda partnyorumuz mövcud deyil.'/>
         }
        </div>
       </div>
    </div>
  );
};

export default Educational;
