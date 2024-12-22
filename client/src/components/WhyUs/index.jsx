import React, { useState, useEffect } from 'react';
import './why.scss';
import AlertMessage from '../Alert';

const Counter = ({ end }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 3000;
    const stepTime = Math.abs(Math.floor(duration / end));
    const timer = setInterval(() => {
      start += 1;
      if (start >= end) {
        clearInterval(timer);
        start = end;
      }
      setCount(start);
    }, stepTime);

    return () => clearInterval(timer);
  }, [end]);

  return <h1>{count}</h1>;
};

const WhyUs = ({ data }) => {
  return (
    <div className="why">
      <div className="why__wrap">
        <div className="why__wrap__text">
          <h1>Niyə Beelik?</h1>
          <p>
            Beelik, bilik və bacarıqlarınızı inkişaf etdirmək üçün mükəmməl seçimdir.
            Texnologiya, dizayn və biznes sahələrini əhatə edən müxtəlif kurslarımız
            sizi məqsədlərinizə daha yaxınlaşdırmaq üçün xüsusi olaraq hazırlanıb.
            Hər bir iştirakçı üçün fərdi yanaşma, peşəkar təlimçilər və praktiki
            təcrübə ilə Beelik sizə parlaq gələcək üçün lazım olan bütün dəstəyi
            təqdim edir. Potensialınızı kəşf edin, Beelik ilə fərq yaradın!
          </p>
        </div>
        <div className="why__wrap__list">
          {data && data.length > 0 ? (
            data.map((item, index) => {
              return (
                <div className="why__wrap__list__items" key={index}>
                  <Counter end={item.count} />
                  <span>{item.title}</span>
                </div>
              );
            })
          ) : (
            <AlertMessage text="Məlumat yoxdur" />
          )}
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
