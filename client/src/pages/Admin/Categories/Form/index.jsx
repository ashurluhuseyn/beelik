import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { createCategory, getCategoryById, updateCategory } from '../../../../api/category';

const AdminCategoryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: ""
  });

  useEffect(() => {
    if (id) {
      getCategoryById(id).then(data => {
        setData(data);
      }).catch(error => console.error("Error fetching category: ", error));
    }
  }, [id]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateCategory(id, data);
        toast.success('Məlumat redaktə olundu');
      } else {
        await createCategory(data);
        console.log(data);
        
        toast.success('Məlumat əlavə olundu');
      }
      navigate('/admin/categories');
    } catch (error) {
      toast.error('Xəta baş verdi: ' + (error.response ? error.response.data.message : 'Bilinməyən xəta'));
    }
  };
  
  return (
    <div className='admin-users'>
      <div className="admin-users__title mb-5 justify-content-center">
        <h1>{id ? 'Məlumatı yeniləyin' : 'Yeni kateqoriya əlavə edin'}</h1>
      </div>
      <div className="admin-users__form">
        <div className="admin-users__form__container">
          <label htmlFor="">Kateqoriya adı</label>
          <input value={data.title}  onChange={(e) => setData({ ...data, title: e.target.value })} />
        </div>
        <div className="admin-users__form__container">
          <button onClick={handleSubmit}>{id ? 'Yenilə' : 'Əlavə et'}</button>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default AdminCategoryForm;
