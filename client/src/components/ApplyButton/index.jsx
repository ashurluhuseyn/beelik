import React from 'react'
import './button.scss'
import arrowRight from '../../assets/images/arrow-right.svg'
import { Link } from 'react-router-dom'

const ApplyButton = ({ link }) => {
  return (
    <Link to={link} className='apply-btn'>Müraciət et <img src={arrowRight} alt="" /></Link>
  )
}

export default ApplyButton