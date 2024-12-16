import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { getCorHomeDataById, getHomeDataById, updateCorHomeData, updateHomeData } from '../../../../api/home';

const MainForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: '',
    description: '',
    image: null
  })
  const location = useLocation();
  const type = new URLSearchParams(location.search).get('type');
  
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (id) {
      if(type === 'academic') { 
        getHomeDataById(id).then(data => {
          setData(data)
        }).catch(error => console.error("Error fetching data: ", error))
      }
      else{
        getCorHomeDataById(id).then(data => {
          setData(data)
        }).catch(error => console.error("Error fetching data: ", error))
      }
    }
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setData((prevData) => ({ ...prevData, image: file.name }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(type === 'academic') {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
    
      if (imageFile) {
        formData.append('image', imageFile);
      }
    
      try {
        if (id) {
          await updateHomeData(id, formData);
          toast.success('Məlumat redaktə olundu');
        }
        navigate('/admin/home');
      } catch (error) {
        console.error('Error during submission:', error.response ? error.response.data : error);
        toast.error('Xəta baş verdi: ' + (error.response ? error.response.data.message : 'Bilinməyən xəta'));
      }
    }
    else{
      await updateCorHomeData(id, data)
      toast.success('Məlumat redaktə olundu');
      navigate('/admin/home');
    }
  };


  return (
    <div className='admin-users'>
     <div className="admin-users__title mb-5 justify-content-center">
        <h1>{id ? 'Məlumatı yeniləyin' : 'Yeni bloq əlavə edin'}</h1>
      </div>
      <div className="admin-users__form">
          <div className="admin-users__form__container">
            <label htmlFor="">Banner Başlığı</label>
            <input value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} />
          </div>
          <div className="admin-users__form__container">
            <label htmlFor="">Banner Təsviri</label>
            <input value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} />
          </div>
          {
            type === 'academic' && <div className="admin-users__form__container mt-3">
            <label htmlFor="file-upload" className="custom-file-upload">
              Şəkli seçin
            </label>
            <input 
              id="file-upload" 
              type="file" 
              onChange={handleImageChange}
            />
            {id && data.image && (
              <img src={`${process.env.REACT_APP_IMAGE_URL}home/${data.image}`} 
                  style={{ width: "250px", height: "250px", display: "block", marginTop: "24px" }} 
                  alt="Şəkil" />
            )}
          </div>
          }
          <div className="admin-users__form__container mt-3">
            <button onClick={handleSubmit}>{id ? 'Yenilə' : 'Əlavə et'}</button>
          </div>
      </div>
      <Toaster />
    </div>
  );
};

export default MainForm;
