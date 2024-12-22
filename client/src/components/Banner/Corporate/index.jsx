import React from 'react'

const CorporateBanner = ({ data }) => {
  return (
    <div className='cor-banner'>
        <div className="cor-banner__wrap">
            <div className="cor-banner__wrap__content">
                <h1>{data.title}</h1>
                <p>{data.description}</p>
                <button>Ətraflı bax</button>
            </div>
        </div>
    </div>
  )
}

export default CorporateBanner