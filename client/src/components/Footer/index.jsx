import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.svg'
import footerFb from '../../assets/images/footer-fb.svg'
import footerInsta from '../../assets/images/footer-insta.svg'
import footerLinkedin from '../../assets/images/footer-linkedin.svg'

import './footer.scss'

const Footer = () => {
  return (
    <footer className='footer'>
        <div className="footer__wrap">
          <div className="info">
            <img src={logo} alt="Beelik logo" />
            <ul>
              <li>
                  <p>+994 (50) 265-64-63</p>
                  <span>Kursların alışı ilə bağlı məsələlər üçün</span>
              </li>
              <li>
                  <p>+994 (50) 234-07-07</p>
                  <span>Korporativ müştərilər üçün</span>
              </li>
              <li>
                  <span>Bakı, Azərbaycan, Ünvan: Cavadxan küçəsi, ev 1, mərtəbə 1, ofis 105A</span>
              </li>
            </ul>
          </div>
          <div className="links">
            <ul className='links__list'>

              <li>
                <ul>
                  <li>
                    <h2>Akademiya</h2>
                  </li>
                  <li>
                    <Link>Tədbirlər</Link>
                  </li>
                  <li>
                    <Link>Blog</Link>
                  </li>
                  <li>
                    <Link>Məzunlar</Link>
                  </li>
                </ul>
              </li>

              <li>
                <ul>
                  <li>
                    <h2>Haqqımızda</h2>
                  </li>
                  <li>
                    <Link>Ümumi məlumat</Link>
                  </li>
                  <li>
                    <Link>Vakansiyalar</Link>
                  </li>
                </ul>
              </li>

              <li>
                <ul>
                  <li>
                    <h2>Tədris sahələri</h2>
                  </li>
                  <li>
                    <Link>Proqramlaşdırma</Link>
                  </li>
                  <li>
                    <Link>Data Analitika</Link>
                  </li>
                  <li>
                    <Link>Kiber Təhlükəsizlik</Link>
                  </li>
                  <li>
                    <Link>Dizayn</Link>
                  </li>
                </ul>
              </li>

              <li>
                <ul>
                  <li>
                    <h2>Əlaqə</h2>
                  </li>
                </ul>
              </li>

              <li>
                <ul className='footer-social'>
                  <li>
                    <Link>
                      <img src={footerFb} alt="Beelik facebook səhifəsi" />
                    </Link>
                  </li>
                  <li>
                    <Link>
                      <img src={footerInsta} alt="Beelik Instagram səhifəsi" />
                    </Link>
                  </li>
                  <li>
                    <Link>
                      <img src={footerLinkedin} alt="Beelik Linkedin səhifəsi" />
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} All rights reserved</p>
        </div>
    </footer>
  )
}

export default Footer