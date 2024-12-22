import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { getDataById, updateAbout } from '../../../../api/about';

const AboutForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    sectionTitle: '',
    sectionDescription: '',
    innerTitle: '',
    innerDescription: '',
    address: '',
    phone1: '',
    phone2: '',
    phone3: '',
    email: '',
    email2: '',
    image: null
  })
  
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (id) {
      getDataById(id).then(data => {
        setData(data)
      }).catch(error => console.error("Error fetching data: ", error));
    }
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setData((prevData) => ({ ...prevData, image: file.name }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
  
    formData.append('sectionTitle', data.sectionTitle);
    formData.append('sectionDescription', data.sectionDescription);
    formData.append('innerTitle', data.innerTitle);
    formData.append('innerDescription', data.innerDescription);
    formData.append('address', data.address);
    formData.append('phone1', data.phone1);
    formData.append('phone2', data.phone2);
    formData.append('phone3', data.phone3);
    formData.append('email', data.email);
    formData.append('email2', data.email2);
    
  
    if (imageFile) {
      formData.append('image', imageFile);
    }
    try {
      if (id) {
        await updateAbout(id, formData);
        toast.success('Məlumat redaktə olundu');
      }
      navigate('/admin/about');
    } catch (error) {
      console.error('Error during submission:', error.response ? error.response.data : error);
      toast.error('Xəta baş verdi: ' + (error.response ? error.response.data.message : 'Bilinməyən xəta'));
    }
  };


  return (
    <div className='admin-users'>
     <div className="admin-users__title mb-5 justify-content-center">
        <h1>{id ? 'Məlumatı yeniləyin' : 'Yeni bloq əlavə edin'}</h1>
      </div>
      <div className="admin-users__form w-100 flex-row">
        <div className='w-1/2'>
          <div className="admin-users__form__container">
            <label htmlFor="">Banner Başlığı</label>
            <input value={data.sectionTitle} onChange={(e) => setData({ ...data, sectionTitle: e.target.value })} />
          </div>
          <div className="admin-users__form__container">
            <label htmlFor="">Banner Təsviri</label>
            <input value={data.sectionDescription} onChange={(e) => setData({ ...data, sectionDescription: e.target.value })} />
          </div>
          <div className="admin-users__form__container">
            <label htmlFor="">Alt Başlıq</label>
            <input value={data.innerTitle} onChange={(e) => setData({ ...data, innerTitle: e.target.value })} />
          </div>
          <div className="admin-users__form__container">
            <label htmlFor="">Alt Təsvir</label>
            <input value={data.innerDescription} onChange={(e) => setData({ ...data, innerDescription: e.target.value })} />
          </div>
        </div>
        <div className='w-1/2'>
          <div className="admin-users__form__container">
            <label htmlFor="">Adress</label>
            <input value={data.address} onChange={(e) => setData({ ...data, address: e.target.value })} />
          </div>
          <div className="admin-users__form__container">
            <label htmlFor="">Phone 1</label>
            <input value={data.phone1} onChange={(e) => setData({ ...data, phone1: e.target.value })} />
          </div>
          {
            data.phone2 &&  <div className="admin-users__form__container">
              <label htmlFor="">Phone 2</label>
              <input value={data.phone2} onChange={(e) => setData({ ...data, phone2: e.target.value })} />
            </div>
          }
          {
            data.phone3 && <div className="admin-users__form__container">
              <label htmlFor="">Phone 3</label>
              <input value={data.phone3} onChange={(e) => setData({ ...data, phone3: e.target.value })} />
            </div>
          }
          <div className="admin-users__form__container mt-3">
            <label htmlFor="file-upload" className="custom-file-upload">
              Şəkli seçin
            </label>
            <input 
              id="file-upload" 
              type="file" 
              onChange={handleImageChange}
            />
            {id && data.image && (
              <img src={`${process.env.REACT_APP_IMAGE_URL}about/${data.image}`} 
                  style={{ width: "250px", height: "250px", display: "block", marginTop: "24px" }} 
                  alt="Şəkil" />
            )}
          </div>
          <div className="admin-users__form__container mt-3">
            <button onClick={handleSubmit}>{id ? 'Yenilə' : 'Əlavə et'}</button>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default AboutForm;
