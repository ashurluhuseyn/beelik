import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import toast from "react-hot-toast";
import VacancyCard from '../../../components/Vacancy';
import AlertMessage from '../../../components/Alert';
import { getVacancyDetails } from '../../../api/vacancy';
import { createApply } from '../../../api/Apply/jobApply';
import { getFormattedDate } from '../../../utils/date';

import arrowRight from '../../../assets/images/arrow-right.svg'
import attach from '../../../assets/images/attach.svg'

import './career.scss';
import Loader from '../../../components/Loader';

const VacancyDetails = () => {
    const { id } = useParams()
    const [modal, setModal] = useState(false);
    const [data, setData] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({
        fullname: '',
        phone: '',
        email: '',
        vacancyID: id,
        cv: null
    })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getVacancyDetails(id);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleFileChange = (e) => {
    setUser({ ...user, cv: e.target.files[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!user.fullname || !user.email || !user.phone || !user.cv) {
      toast.error('Zəhmət olmasa, bütün sahələri doldurun və CV yükləyin.');
      return;
    }

    const formData = new FormData();
    formData.append('fullname', user.fullname);
    formData.append('phone', user.phone);
    formData.append('email', user.email);
    formData.append('cv', user.cv);
    formData.append('vacancyID', user.vacancyID); 

    try {
      await createApply(formData);
      toast.success('Müraciətiniz uğurla göndərildi!');
      setModal(true);
      setUser({ fullname: '', phone: '', email:'', cv: null, vacancyID: id });
    } catch (error) {
      toast.error('Müraciət göndərilərkən xəta baş verdi.');
    }
  };

  if (loading) {
    return <Loader />
  }

  if (!data) {
    return <AlertMessage text='Göstəriləcək məlumat yoxdur'/>;
  }

  return (
    <div className='vacancy-details-page'>
        <div className="vacancy">
            <div className="breadcrumb">
                <ul>
                    <li>
                        <Link to='/'>Ana səhifə</Link>
                    </li>
                    <li>
                        <img src={arrowRight} alt="" />
                    </li>
                    <li>
                        <Link to='/about'>Haqqımızda</Link>
                    </li>
                    <li>
                        <img src={arrowRight} alt="" />
                    </li>
                    <li>
                        <Link to='/about'>Vakansiyalar</Link>
                    </li>
                    <li>
                        <img src={arrowRight} alt="" />
                    </li>
                    <li>
                        <Link to={`/vacancy/${data.vacancyData.id}`}>{data.vacancyData.title}</Link>
                    </li>
                </ul>
            </div>
            <div className="vacancy__wrap">
                <div className="vacancy__wrap__details">
                    <div className="vacancy__wrap__details__title">
                        <span>Son tarix: <span className='deadline'>{getFormattedDate(data.vacancyData.deadline)}</span></span>
                        <h1>{data.vacancyData.title}</h1>
                    </div>
                    <div className="vacancy__wrap__details__desc">
                        <h2>Təsvir</h2>
                        <p>{data.vacancyData.description}</p>
                    </div>
                    <div className="vacancy__wrap__details__reqs">
                        <h2>Tələblər</h2>
                        <div dangerouslySetInnerHTML={{ __html: data.vacancyData.requirements }} />
                    </div>
                </div>
                <div className="vacancy__wrap__form">
                    <h1>Müraciət et</h1>
                    <div className="form-container">
                        <input id="name" type="text" name='fullname' value={user.fullname} onChange={handleChange} placeholder="Adınızı daxil edin" />
                        <input id="phone" type="tel" name='phone' value={user.phone} onChange={handleChange} placeholder="+994 51 323 32 32" />
                        <input type="text" name='email' value={user.email} onChange={handleChange} placeholder="Email" />
                        <div className="cv-container">
                            <label htmlFor="file-upload" className="custom-cv-upload">
                                <span>CV yüklə</span>
                                <img src={attach} alt="" />
                            </label>
                            <input
                                id="file-upload"
                                type="file"
                                className="cv-upload-input"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                        <div className="form-button">
                            <button onClick={submitHandler}>Müraciət et </button>
                        </div>
                    </div>
            </div>
            <div className="other-vacancies">
                <h1>Digər vakansiyalar</h1>
                <div className="other-vacancies__list">
                    {
                        data.otherVacancies && data.otherVacancies.length > 0 ? data.otherVacancies.map(item => {
                            return(
                                <VacancyCard key={item.id} data={item}/>
                            )
                        }) : <AlertMessage text='Göstəriləcək başqa vakansiya yoxdur'/>
                    }
                </div>
            </div>
        </div>
    </div>
  );
};

export default VacancyDetails;