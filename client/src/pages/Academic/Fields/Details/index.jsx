import React, { useEffect, useState } from "react";
import "../fields.scss";
import { useParams } from "react-router-dom";
import { getCourseDetails } from "../../../../api/course";
import Loader from "../../../../components/Loader";
import AlertMessage from "../../../../components/Alert";
import Ask from "../../../../components/Ask";

import chevronUp from "../../../../assets/images/chevron-up.svg";
import chevronDown from "../../../../assets/images/chevron-down.svg";
import adobe from "../../../../assets/images/adobe.svg";
import TeacherCard from "../../../../components/Teacher";

const CourseDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCourseDetails(id);
        setData(response);
      } catch (error) {
        console.log(error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (loading) {
    return <Loader />;
  }

  if (!data) {
    return <AlertMessage text="Göstəriləcək məlumat yoxdur" />;
  }

  return (
    <div className="course-details">
      <div className="details">
        <div className="details__banner">
          <div className="details__banner__text">
            <h1>{data.courseData.title}</h1>
            <p>{data.courseData.description}</p>
            <button>Müraciət et</button>
          </div>
          <div className="details__banner__image">
            <img
              src={`${process.env.REACT_APP_IMAGE_URL}courses/${data.courseData.image}`}
              alt=""
            />
          </div>
        </div>
        <div className="details__content">
          <h2>Tədris proqramı</h2>
          <ul className="month-task">
            <li>
              <span>{data.courseData.month}</span>
              <span>ay təhsil</span>
            </li>
            <li>
              <span>{data.courseData.taskCount}</span>
              <span>praktiki tapşırıq</span>
            </li>
          </ul>
          <div className="study-tools">
            <h3>Öyrənəcəyin proqramlar</h3>
            <ul>
              <li>
                <img src={adobe} alt="" />
              </li>
              <li>
                <img src={adobe} alt="" />
              </li>
              <li>
                <img src={adobe} alt="" />
              </li>
              <li>
                <img src={adobe} alt="" />
              </li>
            </ul>
          </div>
          <div className="plan-list">
            <div className="plan-list__accordion">
              <div className="max-w">
                {data.teachingPlans && data.teachingPlans.length > 0 ? (
                  data.teachingPlans.map((item) => (
                    <div className="accordion-elem" key={item.id}>
                      <button
                        className="flex justify-between items-center w-full py-3 px-6 text-left focus:outline-none"
                        onClick={() => toggleAccordion(item.id)}
                      >
                        <span className="accordion-title">{item.title}</span>
                        <span className="accordion-desc">
                          {openIndex === item.id ? (
                            <img src={chevronUp} alt="" />
                          ) : (
                            <img src={chevronDown} alt="" />
                          )}
                        </span>
                      </button>
                      {openIndex === item.id && (
                        <div className="px-6 py-2">
                          <p className="accordion-content">
                            {item.description}
                          </p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <AlertMessage text="Bu tədrisin sillabusu yoxdur..." />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="course-teachers">
          <h3>Müəllimlər</h3>
          <div className="course-teachers__list">
            {
              data.teachers.length > 0 ? data.teachers.map(item => {
                return(
                  <TeacherCard key={item.id} data={item}/>
                )
              }) : <AlertMessage text='Bu tədris üçün müəllim yoxdur'/>
            }
          </div>
        </div>
        <Ask />
      </div>
    </div>
  );
};

export default CourseDetails;
