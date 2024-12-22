import React from 'react'
import './ask.scss'
import { useTheme } from '../../context/themeContext'

const Ask = () => {
  const { pageMode } = useTheme()

  return (
    <div className={pageMode ? 'ask' : 'ask dark-ask'}>
        <div className="ask__form">
            <h1>Hər hansı bir sualınız varsa, məmnuniyyətlə cavablandırarıq — soruşun!</h1>
            <form>
                <input type="text" placeholder='Adınızı daxil edin'/>
                <input type="tel" placeholder='Telefon nömrəsi'/>
                <input type="email" placeholder='Email'/>
                <button>Soruş</button>
            </form>
        </div>
    </div>
  )
}

export default Ask