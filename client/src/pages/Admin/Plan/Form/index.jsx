import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { createPlan, getPlanById, updatePlan } from '../../../../api/plan';

const PlanForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState({
    title: '',
    description: '',
    image: null,
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (id) {
        getPlanById(id).then(data => {
        setPlan(data);
      }).catch(error => console.error("Error fetching plann: ", error));
    }
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPlan(prevData => ({ ...prevData, image: file.name }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
  
    formData.append('title', plan.title);
    formData.append('description', plan.description);
  
    if (imageFile) {
      formData.append('image', imageFile);
    }
  
    try {
      if (id) {
        await updatePlan(id, formData);
        toast.success('Məlumat redaktə olundu');
      } else {
        await createPlan(formData);
        toast.success('Məlumat əlavə olundu');
      }
      navigate('/admin/plans');
    } catch (error) {
      console.error('Error during submission:', error.response ? error.response.data : error);
      toast.error('Xəta baş verdi: ' + (error.response ? error.response.data.message : 'Bilinməyən xəta'));
    }
  };
  
  return (
    <div className='admin-users'>
      <div className="admin-users__title mb-5 justify-content-center">
        <h1>{id ? 'Məlumatı yeniləyin' : 'Yeni plan əlavə edin'}</h1>
      </div>
      <div className="admin-users__form">
        <div className="admin-users__form__container">
          <label htmlFor="">Başlıq</label>
          <input value={plan.title} onChange={(e) => setPlan({ ...plan, title: e.target.value })} />
        </div>
        <div className="admin-users__form__container">
          <label htmlFor="">Təsvir</label>
          <input value={plan.description} onChange={(e) => setPlan({ ...plan, description: e.target.value })} />
        </div>
        <div className="admin-users__form__container">
          <label htmlFor="icon-upload" className="custom-file-upload">
            İkon seçin
          </label>
          <input 
            id="icon-upload" 
            type="file" 
            onChange={handleImageChange}
          />
          {id && plan.image && (
            <img src={`${process.env.REACT_APP_IMAGE_URL}plans/${plan.image}`} 
                 style={{ width: "50px", height: "50px", display: "block", marginTop: "24px" }} 
                 alt="İkon" />
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

export default PlanForm;
