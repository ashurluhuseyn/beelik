import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { getCategories } from '../../../../api/category';
import { getCourses } from '../../../../api/course';
import { createTeacher, getTeacherById } from '../../../../api/teacher';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const TeacherForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [teacher, setTeacher] = useState({
    name: '',
    bio: '',
    experience: '',
    categoryID: '',
    courseIDs: [],
    image: null,
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (id) {
      getTeacherById(id)
        .then(data => setTeacher(data.teacher))
        .catch(error => console.error('Error fetching teacher: ', error));
    }
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getCategories();
        const coursesData = await getCourses();
        setCategories(categoriesData);
        setCourses(coursesData);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setTeacher(prevData => ({ ...prevData, image: file.name }));
  };

  const handleCourseSelection = (e) => {
    const options = Array.from(e.target.selectedOptions).map(option => option.value);
    setTeacher(prevData => ({ ...prevData, courseIDs: options }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', teacher.name);
    formData.append('bio', teacher.bio);
    formData.append('experience', teacher.experience);
    formData.append('categoryID', teacher.categoryID);
    formData.append('courseIDs', JSON.stringify(teacher.courseIDs));
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      if (id) {
        // await updateTeacher(id, formData);
        toast.success('Məlumat redaktə olundu');
      } else {
        await createTeacher(formData);
        toast.success('Məlumat əlavə olundu');
      }
      navigate('/admin/teachers');
    } catch (error) {
      console.error('Error during submission:', error.response ? error.response.data : error);
      toast.error('Xəta baş verdi: ' + (error.response ? error.response.data.message : 'Bilinməyən xəta'));
    }
  };

  return (
    <div className='admin-users'>
      <div className="admin-users__title mb-5 justify-content-center">
        <h1>{id ? 'Məlumatı yeniləyin' : 'Yeni təlimçi əlavə edin'}</h1>
      </div>
      <div className="admin-users__form">
        <div className="admin-users__form__container">
          <label htmlFor="name">Ad</label>
          <input
            id="name"
            value={teacher.name}
            onChange={(e) => setTeacher({ ...teacher, name: e.target.value })}
          />
        </div>
        <div className="admin-users__form__container">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            value={teacher.bio}
            onChange={(e) => setTeacher({ ...teacher, bio: e.target.value })}
          />
        </div>
        <div className="admin-users__form__container">
          <label htmlFor="experience">Təcrübə</label>
          <CKEditor
            editor={ClassicEditor}
            data={teacher.experience || ''}
            id="experience"
            onChange={(event, editor) => {
              const data = editor.getData();
              setTeacher({ ...teacher, experience: data });
            }}
          />
        </div>
        <div className="admin-users__form__container">
          <label htmlFor="category">Kateqoriya</label>
          <select
            id="category"
            value={teacher.categoryID}
            onChange={(e) => setTeacher({ ...teacher, categoryID: e.target.value })}
          >
            <option value="">Seçin</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        <div className="admin-users__form__container">
          <label htmlFor="courses">Kurslar</label>
          <select
            id="courses"
            multiple
            value={teacher.courseIDs}
            onChange={handleCourseSelection}
          >
            {courses.map(course => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
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
          {id && teacher.image && (
            <img
              src={`${process.env.REACT_APP_IMAGE_URL}teachers/${teacher.image}`}
              style={{ width: "250px", height: "250px", display: "block", marginTop: "24px" }}
              alt="Şəkil"
            />
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

export default TeacherForm;