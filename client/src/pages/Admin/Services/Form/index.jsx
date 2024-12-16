import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { getCategories } from '../../../../api/category';
import { createService, getServiceById, updateService } from '../../../../api/service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

const ServiceForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [service, setService] = useState({
    title: '',
    description: '',
    description2: '',
    categoryID: '',
    image: null,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchService = () => {
        getServiceById(id)
          .then((data) => {
            setService({
              title: data.service?.title || '',
              description: data.service?.description || '',
              description2: data.service?.description2 || '',
              categoryID: data.service?.categoryID || '',
              image: null,
            });
          })
          .catch((error) => {
            console.error('Error fetching service:', error);
          });
      };
  
      fetchService();
    }
  }, [id]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setService({ ...service, [name]: value });
  };

  const handleFileChange = (e) => {
    setService({ ...service, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', service.title);
    formData.append('description', service.description);
    formData.append('description2', service.description2);
    formData.append('categoryID', service.categoryID);
    if (service.image) formData.append('image', service.image);

    try {
      if (id) {
        await updateService(id, formData);
        toast.success('Xidmət uğurla yeniləndi!');
      } else {
        await createService(formData);
        toast.success('Xidmət uğurla yaradıldı!');
      }
      navigate('/admin/services');
    } catch (error) {
      console.error('Error submitting service:', error);
      toast.error('Xidmət göndərilərkən xəta baş verdi.');
    }
  };
  
  return (
    <div className="admin-users">
    <div className="admin-users__title mb-5 justify-content-center">
      <h1>{id ? 'Xidməti yeniləyin' : 'Yeni xidmət əlavə edin'}</h1>
    </div>
    <form onSubmit={handleSubmit} className="admin-users__form">
      <div className="admin-users__form__container">
        <label>Başlıq</label>
        <input
          type="text"
          name="title"
          value={service.title}
          onChange={handleInputChange}
          placeholder="Xidmət başlığı"
        />
      </div>
      <div className="admin-users__form__container">
        <label>Kateqoriya</label>
        <select
          name="categoryID"
          value={service.categoryID}
          onChange={handleInputChange}
        >
          <option value="" disabled>
            Kateqoriya seçin
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
      </div>
      <div className="admin-users__form__container">
        <label>Açıqlama</label>
        <textarea
          name="description"
          value={service.description}
          onChange={handleInputChange}
          placeholder="Qısa açıqlama"
        />
      </div>
      <div className="admin-users__form__container">
        <label>Ətraflı Açıqlama</label>
        <CKEditor
            editor={ClassicEditor}
            data={service.description2 || ''} // Əgər undefined və ya null olarsa, boş string kimi istifadə olunur
            onChange={(event, editor) => {
              const data = editor.getData();
              setService({ ...service, description2: data });
            }}
          />
      </div>
      <div className="admin-users__form__container">
          <label htmlFor="file-upload" className="custom-file-upload">
            Şəkli seçin
          </label>
          <input 
            id="file-upload" 
            type="file" 
            onChange={handleFileChange}
          />
      </div>
      <div className="admin-users__form__container">
        <button type="submit">{id ? 'Yenilə' : 'Əlavə et'}</button>
      </div>
    </form>
    <Toaster />
  </div>
  );
};

export default ServiceForm;
