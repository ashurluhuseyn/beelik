import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSidebar } from '../../context/sideContext';
import './sidenav.scss';
import arrowRight from '../../assets/images/arrow-right.svg';
import { menuItems } from '../../constants';

const Sidenav = () => {
  const { visibleRight, setVisibleRight } = useSidebar();
  const [openDropdowns, setOpenDropdowns] = useState({});

  const toggleDropdown = (key) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleLinkClick = () => {
    setVisibleRight(false); 
  };

  return (
    <>
      {visibleRight && (
        <div className="sidenav">
          <div className="sidenav__header">
            <NavLink to="/" onClick={handleLinkClick}>
              Təhsil
            </NavLink>
            <NavLink to="/corporate" onClick={handleLinkClick}>
              Korporativ
            </NavLink>
          </div>
          <ul className="sidenav__links">
            {menuItems.map((item) => (
              <li
                key={item.key}
                className={openDropdowns[item.key] ? 'dropdown-open' : ''}
              >
                {item.subItems && item.subItems.length > 0 ? (
                  <>
                    <div
                      onClick={() => toggleDropdown(item.key)}
                      className="dropdown-header"
                    >
                      <span>{item.title}</span>
                      <img src={arrowRight} alt="arrow icon" />
                    </div>
                    {openDropdowns[item.key] && (
                      <ul className="dropdown-content">
                        {item.subItems.map((subItem, index) => (
                          <li key={index}>
                            <Link to={subItem.path} onClick={handleLinkClick}>
                              {subItem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link to={item.path} onClick={handleLinkClick}>
                    {item.title}
                  </Link>
                )}
              </li>
            ))}
            <li>
              <Link to="/contact" onClick={handleLinkClick}>
                Əlaqə
              </Link>
            </li>
          </ul>
          <ul className='sidenav__contact'>
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
      )}
    </>
  );
};

export default Sidenav;
