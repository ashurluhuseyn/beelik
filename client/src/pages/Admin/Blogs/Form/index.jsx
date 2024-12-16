import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { createBlog, getBlogById, updateBlog } from '../../../../api/blog';
import { getCategories } from '../../../../api/category';

const BlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [blog, setBlog] = useState({
    title: '',
    description: '',
    categoryID: '',
    readTime: '',
    image: null,
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (id) {
      getBlogById(id).then(data => {
        setBlog(data.blog);
      }).catch(error => console.error("Error fetching blog: ", error));
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
    setBlog((prevBlog) => ({ ...prevBlog, image: file.name }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
  
    formData.append('title', blog.title);
    formData.append('description', blog.description);
    formData.append('categoryID', blog.categoryID);
    formData.append('readTime', blog.readTime);
  
    if (imageFile) {
      formData.append('image', imageFile);
    }
  
    try {
      if (id) {
        await updateBlog(id, formData);
        toast.success('Məlumat redaktə olundu');
      } else {
        await createBlog(formData);
        toast.success('Məlumat əlavə olundu');
      }
      navigate('/admin/blogs');
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
      <div className="admin-users__form">
        <div className="admin-users__form__container">
          <label htmlFor="">Başlıq</label>
          <input value={blog.title} onChange={(e) => setBlog({ ...blog, title: e.target.value })} />
        </div>
        <div className="admin-users__form__container">
          <label htmlFor="">Təsvir</label>
          <input value={blog.description} onChange={(e) => setBlog({ ...blog, description: e.target.value })} />
        </div>
        <div className="admin-users__form__container">
          <label htmlFor="">Kateqoriya</label>
          <select value={blog.categoryID} onChange={(e) => setBlog({ ...blog, categoryID: e.target.value })}>
            <option value="">Seçin</option>
            {
              data.map(item => (
                <option key={item.id} value={item.id}>{item.title}</option>
              ))
            }
          </select>
        </div>
        <div className="admin-users__form__container">
          <label htmlFor="">Oxuma vaxtı</label>
          <input value={blog.readTime} onChange={(e) => setBlog({ ...blog, readTime: e.target.value })} />
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
          {id && blog.image && (
            <img src={`${process.env.REACT_APP_IMAGE_URL}blogs/${blog.image}`} 
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

export default BlogForm;
