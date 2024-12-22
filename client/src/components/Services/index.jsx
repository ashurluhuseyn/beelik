import React from 'react'
import './services.scss'
import ServiceCard from './ServiceCard'
import LoadMore from '../LoadMore'
import { ROUTES } from '../../routes';


const Services = ({ data }) => {
  return (
    <div className='services'>
        <h1 className='services__title'>Xidmətlərimiz</h1>
        <div className="services__list">
            {
              data && data.map(item => {
                return(
                  <ServiceCard data={item}/>
                )
              })
            }
        </div>
        <LoadMore link={ROUTES.CORPORATE.SERVICES.MAIN.PATH}/>
    </div>
  )
}

export default Services