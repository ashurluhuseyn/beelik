import React, { useEffect, useState } from 'react'
import CorporateBanner from '../../../components/Banner/Corporate';
import './home.scss'
import { getCourses } from '../../../api/course';
import FieldCard from '../../../components/Fields';
import Advantages from '../../../components/Advantages';
import { Link } from 'react-router-dom';
import { getCorporateData } from '../../../api/home';
import Loader from '../../../components/Loader';
import AlertMessage from '../../../components/Alert';

const Corporate = () => {
  const [data, setData] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCorporateData();
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
    <div className='corporate'>
      <CorporateBanner data={data.corHomeData}/>
      <div className="fields">
        <div className="fields__top">
          <h1>Təlimlərimiz</h1>
          <Link>Hamısına bax</Link>
        </div>
        <div className="fields__list">
          {
            data.coursesData.length > 0 ? data.coursesData.map(item => {
              return(
                <FieldCard key={item.id} data={item}/>
              )
            }) : <AlertMessage text="Hal-hazırda mövcud təlim yoxdur."/> 
          }
        </div>
      </div>
      {
        data.advantageData.length > 0 && <Advantages data={data.advantageData}/>
      }
    </div>
  )
}

export default Corporate