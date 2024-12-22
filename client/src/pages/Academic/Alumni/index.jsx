import React, { useEffect, useState } from "react";
import "./alumni.scss";
import { getCategories } from "../../../api/category";
import { getBlogs } from "../../../api/blog";
import Loader from "../../../components/Loader";
import AlumniCard from "../../../components/Alumni";
import { getData, getDataByCategory } from "../../../api/alumni";

const AlumniPage = () => {
  const [categories, setCategories] = useState([]);
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all'); 

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [categoriesData, alumniData] = await Promise.all([
          getCategories(),
          getData()
        ]);
        const allCategory = { id: 'all', title: 'Hamısı' };
        setCategories([allCategory, ...categoriesData]);
        setAlumni(alumniData)
      } catch (error) {
        console.error('Xəta baş verdi:', error);
        setCategories([]);
        setAlumni([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleCategoryClick = async (categoryId) => {
    setActiveCategory(categoryId); 
    setLoading(true);

    try {
      const alumniData = categoryId === 'all' 
        ? await getData() 
        : await getDataByCategory(categoryId);

      setAlumni(alumniData);
    } catch (error) {
      console.error('Xəta baş verdi:', error);
      setAlumni([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />
  }


  return (
    <div className="alumni-page">
      <div className="alumni">
        <div className="alumni__banner">
          <div className="alumni__banner__text">
            <h1>Məzunlarımız</h1>
            <p>
            Onlar yalnızca kurslarımızın deyil, həm də həyatlarının yeni səhifəsini açaraq öz uğur hekayələrini yazan və əldə etdikləri biliklər ilə cəmiyyətdə dəyər qatan ilham mənbələridir.
            </p>
          </div>
          <div className="alumni__banner__img">
            <img
              className="banner-img"
              src="https://s3-alpha-sig.figma.com/img/e4a5/5cd0/fabd8fe7ca7cfb67f4eebb33102b6222?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=lUf84lYvXJ2R~79pO4fPj70eQDlxbQ80KT2aXrZDch12xq6vtXsz3Fdy5ha5fZOIrHaHL2fcmec1sQwfbJgKzUDoYl~0cXQq~1SAhNyLMNtqaXmx6Ar3Z~JT8SCCygOIVGKaBeNJzrR5vcdN9sk-6HBBS9f-Z02x6HPL3QrmZ82CIICcrA7ObzzmOWSDI2PFBRFVDRScv6xS6Tvvs3KhbI070ao9qSndSAbCZGHIDdoZbg9oRnSE0aZOliaOZQsuVVaLzCCvu0WfFA5Kb7E8oP~jAZgjrYbnh-N200gBLEmzFUf7qTim1L6rrM6cW9XtHeVzUR4byKcTP4ABUup8kQ__"
              alt=""
            />
          </div>
        </div>
        <div className="alumni__wrap">
          <h2>Məzunlarımızın rəyləri</h2>
          <div className="alumni__wrap__category">
            <ul>
              {categories.map((category) => (
                <li
                  key={category.id}
                  className={
                    activeCategory === category.id ? "active-category" : ""
                  }
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <span>{category.title}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="alumni__wrap__list">
            {
                alumni.map(item => {
                    return(
                        <AlumniCard key={item.id} data={item}/>
                    )
                })
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumniPage;
