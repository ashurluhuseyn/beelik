import { useState } from 'react';
import { ROUTES } from '../../routes';
import { Link, NavLink } from 'react-router-dom';
import { useSidebar } from '../../context/sideContext';
import logo from '../../assets/images/logo.svg';
import darkLogo from '../../assets/images/logo-darkMode.svg';
import menuIcon from '../../assets/images/menu.svg';
import arrowDown from '../../assets/images/arrow-down.svg';
import './header.scss';
import { useTheme } from '../../context/themeContext';
import AcademicModal from '../WhyUs/Modal/Apply/Academic';

const Header = () => {
  const { pageMode } = useTheme();
  const { toggleSidebar } = useSidebar();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  return (
    <header className={pageMode ? 'header' : 'header dark-header'}>
      <div className="header__top">
        <div className="header__top__links">
          <NavLink to="/">Fərdi</NavLink>
          <NavLink to="/corporate">Biznes üçün</NavLink>
        </div>
        <div className="header__top__lang">
          <span>AZ</span>
          <img src={arrowDown} alt="arrow icon" />
        </div>
      </div>
      <div className="header__bottom">
        <div className="header__bottom__logo-nav">
          {pageMode ? (
            <Link to={ROUTES.EDUCATIONAL.HOME.PATH}>
              <img src={logo} alt="Beelik logo for education" />
            </Link>
          ) : (
            <Link to={ROUTES.CORPORATE.HOME.PATH}>
              <img src={darkLogo} alt="Beelik logo for corporate" />
            </Link>
          )}
          <nav>
            <ul>
              {pageMode && (
                <>
                  <li
                    className="dropdown"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    <Link to="#">Akademiya</Link>
                    {isDropdownOpen && (
                      <div className="dropdown-menu">
                        <Link to="/events">Tədbirlər</Link>
                        <Link to="/blogs">Bloqlar</Link>
                        <Link to="/alumni">Məzunlarımız</Link>
                      </div>
                    )}
                  </li>
                  <li>
                    <Link to="/about">Haqqımızda</Link>
                  </li>
                </>
              )}
              <li>
                {
                  pageMode ? 
                  <Link to="/courses">Tədris sahələri</Link> : <Link to="/courses">Təlimlərimiz</Link>
                }
              </li>
              <li>
                {
                  pageMode ? <Link to="/contact">Əlaqə</Link> : <Link to="/corporate/contact">Əlaqə</Link>
                }
              </li>
            </ul>
          </nav>
        </div>
        <div className="header__bottom__apply">
          <button onClick={() => setIsModalOpen(true)}>Müraciət et</button>
          <img src={menuIcon} onClick={toggleSidebar} alt="sidebar menu icon" />
        </div>
      </div>
      {isModalOpen && (
        <AcademicModal onClose={() => setIsModalOpen(false)} /> // Pass onClose to modal
      )}
    </header>
  );
};

export default Header;
