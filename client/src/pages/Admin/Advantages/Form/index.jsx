import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createAdvantage, updateAdvantage, getAdvantageById } from '../../../../api/advantage';
import toast, { Toaster } from 'react-hot-toast';

const AdvantageForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (id) {
      getAdvantageById(id).then(data => {
        setTitle(data.title);
        setDescription(data.description);
      }).catch(error => console.error("Error fetching advantage: ", error));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateAdvantage(id, { title, description });
        toast.success('Məlumat redaktə olundu')
      } else {
        await createAdvantage({ title, description });
        toast.success('Məlumat əlavə olundu')
      }
      navigate('/admin/advantages');
    } catch (error) {
      toast.success('Xəta baş verdi')
    }
  };

  return (
      <div className='admin-users'>
        <div className="admin-users__title mb-5 justify-content-center">
            <h1>{id ? 'Məlumatı yeniləyin' : 'Yeni məlumat əlavə edin'}</h1>
        </div>
        <div className="admin-users__form">
            <div className="admin-users__form__container">
                <label htmlFor="">Başlıq</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div className="admin-users__form__container">
                <label htmlFor="">Təsvir</label>
                <input value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="admin-users__form__container">
                <button onClick={handleSubmit} >{id ? 'Yenilə' : 'Əlavə et'}</button>
            </div>
        </div>
        <Toaster />
    </div>
  );
};

export default AdvantageForm;
