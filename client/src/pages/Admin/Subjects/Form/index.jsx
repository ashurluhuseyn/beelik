import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { createSubject, getSubjectById, updateSubject } from '../../../../api/subject';
import { getCourses } from '../../../../api/course';

const SubjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState([])
  const [data, setData] = useState({
    title: "",
    description: "",
    courseID: "",
  });

  useEffect(() => {
    if (id) {
      getSubjectById(id).then(data => {
        setData(data);
      }).catch(error => console.error("Error fetching subject: ", error));
    }
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCourses();
        setCourse(data.courses);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateSubject(id, data);
        toast.success('Məlumat redaktə olundu');
      } else {
        await createSubject(data);
        toast.success('Məlumat əlavə olundu');
      }
      navigate('/admin/subjects');
    } catch (error) {
      toast.error('Xəta baş verdi: ' + (error.response ? error.response.data.message : 'Bilinməyən xəta'));
    }
  };
  
  return (
    <div className='admin-users'>
      <div className="admin-users__title mb-5 justify-content-center">
        <h1>{id ? 'Məlumatı yeniləyin' : 'Yeni mövzu əlavə edin'}</h1>
      </div>
      <div className="admin-users__form">
        <div className="admin-users__form__container">
          <label htmlFor="">Mövzu adı</label>
          <input value={data.title}  onChange={(e) => setData({ ...data, title: e.target.value })} />
        </div>
        <div className="admin-users__form__container">
          <label htmlFor="">Təsviri</label>
          <input value={data.description}  onChange={(e) => setData({ ...data, description: e.target.value })} />
        </div>
        <div className="admin-users__form__container">
          <label htmlFor="">Kateqoriya</label>
          <select value={data.courseID} onChange={(e) => setData({ ...data, courseID: e.target.value })}>
            <option value="">Seçin</option>
             {
              course.map(item => (
                <option key={item.id} value={item.id}>{item.title}</option>
              ))
            } 
          </select>
        </div>
        <div className="admin-users__form__container">
          <button onClick={handleSubmit}>{id ? 'Yenilə' : 'Əlavə et'}</button>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default SubjectForm;
