import React, { useEffect, useState } from 'react'
import './services.scss'
import ServiceCard from '../../../components/Services/ServiceCard';
import { Helmet } from 'react-helmet';
import { getServices } from '../../../api/service';
import { getCategories } from '../../../api/category';

const Services = () => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getServices();
        const category = await getCategories();
        setData(data.services)
        setCategories(category)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);


  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };
  return (
    <div className='services'>
      {
        data ? <>
          <Helmet>
            <title>Xidmətlərimiz</title>
          </Helmet>
        <div className="services__title">
            <h1>Xidmətlərimiz</h1>
            <p>İnnovativ texnologiyaları tətbiq edən əməkdaşlar şirkətin rəqabət qabiliyyətini artırır, məhsulun və xidmətin keyfiyyətini yüksəldir. Korporativ hədəflərinizə çatmaq üçün komandanızı korporativ həllərimizlə gücləndirin</p>
        </div>
        <ul className="services__category">
            {categories && categories.map(item => (
            <li
                key={item.id}
                className={activeCategory === item ? 'active' : ''}
                onClick={() => handleCategoryClick(item)}
            >
                {item.title}
            </li>
            ))}
        </ul>
        <div className="services__list" style={{marginTop: "32px"}}>
            {
              data && data.map(item => {
                return(
                  <ServiceCard key={item.id} data={item}/>
                )
              })
            }
        </div>
        </> : 'yuklenir'
      }
    </div>
  )
}

export default Services