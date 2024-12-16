import React, { useEffect, useState } from 'react';
import './apply.scss';
import logo from '../../../assets/images/logo.svg';
import arrowRight from '../../../assets/images/arrow-right.svg';
import joinBanner from '../../../assets/images/join-banner.png';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { createApply } from '../../../api/academicApply';
import toast from 'react-hot-toast';
import { getCourses } from '../../../api/course';

const StudentApply = () => {
  const navigate = useNavigate()
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    description: '',
    courseID: '',
  });


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCourses();
        setCourses(data.courses);
        
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstname || !formData.lastname || !formData.email || !formData.phone || !formData.courseID) {
      toast.error('Zəhmət olmasa, bütün sahələri doldurun.');
      return;
    }

    try {
      await createApply(formData);
      toast.success('Müraciətiniz uğurla göndərildi!');
      navigate('/')
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Müraciət göndərilərkən xəta baş verdi.');
    }
  };

  return (
    <div className='student-apply'>
      <Helmet>
        <title>Tələbə müraciəti</title>
      </Helmet>
      <div className="logo">
        <Link to='/'>
          <img src={logo} alt="" />
        </Link>
      </div>
      <div className="student-apply__wrap">
        <div className="student-apply__wrap__form">
          <div className="apply-form-title">
            <h1>Tələbə müraciəti</h1>
            <p>Zəhmət olmasa, məlumatlarınızı daxil edin və ya bizimlə əlaqə saxlayın.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="apply-form-input input-row">
              <input
                type="text"
                placeholder='Ad'
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder='Soyad'
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
              />
            </div>
            <div className="apply-form-input">
            <select
                    name="courseID"
                    value={formData.courseID}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="" disabled>
                    Hansı kurs ilə maraqlanırsınız?
                    </option>
                    {courses &&
                    courses.map((item) => (
                        <option key={item.id} value={item.id}>
                        {item.title}
                        </option>
                    ))}
                </select>
            </div>
            <div className="apply-form-input">
              <input
                type="email"
                placeholder='Elektron mail'
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="apply-form-input">
              <input
                type="tel"
                placeholder='Telefon nömrəsi'
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="apply-form-input">
              <textarea
                placeholder="Əlavə məlumat (istəyə bağlı)"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none"
              ></textarea>
            </div>
            <div className="apply-form-input">
              <button type="submit">
                Göndər <img src={arrowRight} alt="" />
              </button>
            </div>
          </form>
        </div>
        <div className="student-apply__wrap__img">
          <img src={joinBanner} alt="" />
        </div>
      </div>
    </div>
  );
};

export default StudentApply;