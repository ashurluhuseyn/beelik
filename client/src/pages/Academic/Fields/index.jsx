import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import "./fields.scss";
import Ask from "../../../components/Ask";
import FieldCard from "../../../components/Fields";
import { getCategories } from "../../../api/category";
import { getCourses, getCoursesByCategory } from "../../../api/course";
import AlertMessage from "../../../components/Alert";
import Loader from "../../../components/Loader";

const Fields = () => {
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [categoriesData, coursesData] = await Promise.all([
          getCategories(),
          getCourses(),
        ]);
        const allCategory = { id: "all", title: "Hamısı" };
        setCategories([allCategory, ...categoriesData]);
        setCourses(coursesData);
      } catch (error) {
        console.error("Xəta baş verdi:", error);
        setCategories([]);
        setCourses([]);
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
      const coursesData = categoryId === "all"
          ? await getCourses()
          : await getCoursesByCategory(categoryId);
          
      setCourses(coursesData);
      
    } catch (error) {
      console.error("Xəta baş verdi:", error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="fields-page">
      <Helmet>
        <title>Tədris sahələri</title>
      </Helmet>
      <div className="fields">
        <div className="fields__title">
          <h1>Tədris sahələri</h1>
        </div>
        <div className="fields__category">
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
        <div className="fields__list">
          {courses.length > 0 ? (
            courses.map(item => {
              return <FieldCard key={item.id} data={item} />;
            })
          ) : (
            <AlertMessage text="Hal-hazırda kurs mövcud deyil" />
          )}
        </div>
      </div>
      <Ask />
    </div>
  );
};

export default Fields;
