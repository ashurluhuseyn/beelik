import React from 'react'
import './spinner.scss'

const Loader = () => {
  return (
    <div className="loader">
        <div className="spinner-loader">
            <div className="circle"></div>
            <div className="circle-inner"></div>
        </div>
    </div>
  )
}

export default Loader