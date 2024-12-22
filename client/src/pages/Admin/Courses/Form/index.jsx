import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { getCategories } from '../../../../api/category';
import { createCourse, getCourseById, updateCourse } from '../../../../api/course';

const CourseForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [course, setCourse] = useState({
    title: '',
    description: '',
    hours: '',
    month: '',
    taskCount: '',
    categoryID: '',
    image: null
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (id) {
      getCourseById(id).then(data => {
        setCourse(data);
      }).catch(error => console.error("Error fetching course: ", error));
    }
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCategories();
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setCourse(prevData => ({ ...prevData, image: file.name }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
  
    formData.append('title', course.title);
    formData.append('description', course.description);
    formData.append('hours', course.hours);
    formData.append('month', course.month);
    formData.append('taskCount', course.taskCount);
    formData.append('categoryID', course.categoryID);
  
    if (imageFile) {
      formData.append('image', imageFile);
    }
  
    try {
      if (id) {
        await updateCourse(id, formData);
        toast.success('Məlumat redaktə olundu');
      } else {
        await createCourse(formData);
        toast.success('Məlumat əlavə olundu');
      }
      navigate('/admin/courses');
    } catch (error) {
      console.error('Error during submission:', error.response ? error.response.data : error);
      toast.error('Xəta baş verdi: ' + (error.response ? error.response.data.message : 'Bilinməyən xəta'));
    }
  };
  
  return (
    <div className='admin-users'>
      <div className="admin-users__title mb-5 justify-content-center">
        <h1>{id ? 'Məlumatı yeniləyin' : 'Yeni kurs əlavə edin'}</h1>
      </div>
      <div className="admin-users__form flex-row w-100">
        <div className="w-1/2">
          <div className="admin-users__form__container">
            <label htmlFor="">Başlıq</label>
            <input value={course.title} onChange={(e) => setCourse({ ...course, title: e.target.value })} />
          </div>
          <div className="admin-users__form__container">
            <label htmlFor="">Təsvir</label>
            <input value={course.description} onChange={(e) => setCourse({ ...course, description: e.target.value })} />
          </div>
          <div className="admin-users__form__container">
            <label htmlFor="">Kateqoriya</label>
            <select value={course.categoryID} onChange={(e) => setCourse({ ...course, categoryID: e.target.value })}>
              <option value="">Seçin</option>
              {
                data.map(item => (
                  <option key={item.id} value={item.id}>{item.title}</option>
                ))
              }
            </select>
          </div>
          <div className="admin-users__form__container mt-4">
            <button onClick={handleSubmit}>{id ? 'Yenilə' : 'Əlavə et'}</button>
          </div>
        </div>
        <div className="w-1/2">
          <div className="admin-users__form__container">
              <label htmlFor="">Dərs müddəti</label>
              <input value={course.month} onChange={(e) => setCourse({ ...course, month: e.target.value })} type='number'/>
          </div>
          <div className="admin-users__form__container">
              <label htmlFor="">Dərs saatı</label>
              <input value={course.hours} onChange={(e) => setCourse({ ...course, hours: e.target.value })} type='number'/>
          </div>
          <div className="admin-users__form__container">
              <label htmlFor="">Tapşırıq sayı</label>
              <input value={course.taskCount} onChange={(e) => setCourse({ ...course, taskCount: e.target.value })} type='number'/>
          </div>
          <div className="admin-users__form__container mt-4">
          <label htmlFor="file-upload" className="custom-file-upload">
            Banner Şəkli seçin
          </label>
          <input 
            id="file-upload" 
            type="file" 
            onChange={handleImageChange}
          />
          {id && course.image && (
            <img src={`${process.env.REACT_APP_IMAGE_URL}courses/${course.image}`} 
                 style={{ width: "250px", height: "250px", display: "block", marginTop: "24px" }} 
                 alt="Şəkil" />
          )}
        </div>
        </div>
      
      </div>
      <Toaster />
    </div>
  );
};

export default CourseForm;