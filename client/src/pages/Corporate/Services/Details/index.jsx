import React, { useEffect, useState } from 'react'
import '../services.scss'   
import { Link, useParams } from 'react-router-dom'
import ServiceCard from '../../../../components/Services/ServiceCard'
import LoadMore from '../../../../components/LoadMore'
import { getServiceDetails } from '../../../../api/service'
import AlertMessage from '../../../../components/Alert'
import { Helmet } from 'react-helmet'

const ServiceDetails = () => {
    const { id } = useParams()
    const [data, setData] = useState();

    useEffect(() => {
        const fetchData = async () => {
        try {
            const data = await getServiceDetails(id);
            setData(data)
        } catch (error) {
            console.error('Error fetching service:', error);
        }
    };

    fetchData();
  }, []);
  return (
    <div className='service-details'>
       {
        data ? <>
            <Helmet>
                <title>{data.service.title}</title>
            </Helmet>
             <ul className="breadcrumb">
                <li>
                    <Link to='/corporate/services'>Xİdmətlərimiz</Link>
                </li>
                <li>
                    <span>/</span>
                </li>
                <li>
                    <Link to={`/corporate/services/${id}`}>{data.service.title}</Link>
                </li>
        </ul>
        <div className="service-details__title">
            <h1>Xidmətlərimiz</h1>
            <p>İnnovativ texnologiyaları tətbiq edən əməkdaşlar şirkətin rəqabət qabiliyyətini artırır, məhsulun və xidmətin keyfiyyətini yüksəldir. Korporativ hədəflərinizə çatmaq üçün komandanızı korporativ həllərimizlə gücləndirin</p>
        </div>
        <div className="service-details__wrap">
            <div className="service-details__wrap__content">
                <h1>{data.service.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: data.service.description2 }} />
            </div>
            <div className="service-details__wrap__img">
                <img src={`${process.env.REACT_APP_IMAGE_URL}services/${data.service.image}`}  alt="" />
            </div>
        </div>
        <div className="service-details__others">
            <h1>Digər Xidmətlərə Nəzər Yetir</h1>
            {
                data.relatedServices.length > 0 ? data.relatedServices.map(item => {
                    return(
                        <ServiceCard key={item.id} data={item} />
                    )
                }) : <AlertMessage text='Bu xidmətə oxşar xidmət yoxdur'/>
            }
        </div>
        </> : "yuklenir"
       }
    </div>
  )
}

export default ServiceDetails