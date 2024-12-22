import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { getCategories } from '../../../../api/category';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { createEvent, getEventById, updateEvent } from '../../../../api/event';

const EventForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [event, setEvent] = useState({
    title: '',
    description: '',
    categoryID: '',
    image: null,
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (id) {
      getEventById(id).then(data => {
        setEvent(data.event);
      }).catch(error => console.error("Error fetching event: ", error));
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
    setEvent(prevData => ({ ...prevData, image: file.name }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
  
    formData.append('title', event.title);
    formData.append('description', event.description);
    formData.append('categoryID', event.categoryID);
  
    if (imageFile) {
      formData.append('image', imageFile);
    }
  
    try {
      if (id) {
        await updateEvent(id, formData);
        toast.success('Məlumat redaktə olundu');
      } else {
        await createEvent(formData);
        toast.success('Məlumat əlavə olundu');
      }
      navigate('/admin/events');
    } catch (error) {
      console.error('Error during submission:', error.response ? error.response.data : error);
      toast.error('Xəta baş verdi: ' + (error.response ? error.response.data.message : 'Bilinməyən xəta'));
    }
  };

  return (
    <div className="admin-users">
    <div className="admin-users__title mb-5 justify-content-center">
        <h1>{id ? 'Məlumatı yeniləyin' : 'Yeni bloq əlavə edin'}</h1>
      </div>
      <div className="admin-users__form">
        <div className="admin-users__form__container">
          <label htmlFor="">Başlıq</label>
          <input value={event.title} onChange={(e) => setEvent({ ...event, title: e.target.value })} />
        </div>
        <div className="admin-users__form__container">
          <label htmlFor="">Kateqoriya</label>
          <select value={event.categoryID} onChange={(e) => setEvent({ ...event, categoryID: e.target.value })}>
            <option value="">Seçin</option>
            {
              data.map(item => (
                <option key={item.id} value={item.id}>{item.title}</option>
              ))
            }
          </select>
        </div>
        <div className="admin-users__form__container">
          <label htmlFor="">Təsvir</label>
          <input value={event.description} onChange={(e) => setEvent({ ...event, description: e.target.value })} />
        </div>
        <div className="admin-users__form__container">
          <label htmlFor="file-upload" className="custom-file-upload">
            Şəkli seçin
          </label>
          <input 
            id="file-upload" 
            type="file" 
            onChange={handleImageChange}
          />
          {id && event.image && (
            <img src={event.image}
                 style={{ width: "250px", height: "250px", display: "block", marginTop: "24px" }} 
                 alt="Şəkil" />
          )}
        </div>
        <div className="admin-users__form__container">
          <button onClick={handleSubmit}>{id ? 'Yenilə' : 'Əlavə et'}</button>
        </div>
      </div>
      <Toaster />
  </div>
  );
};

export default EventForm;
