import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { getCategories } from '../../../../api/category';
import { createVacancy, getVacancyById, updateVacancy } from '../../../../api/vacancy';
import { jobTypes } from '../../../../constants';

const VacancyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [vacancy, setVacancy] = useState({
    title: '',
    deadline: new Date(),
    jobType: '',
    requirements: '',
    duties: '',
    conditions: '',
    categoryID: '',
  });

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const data = await getVacancyById(id);
          setVacancy({
            title: data.title || '',
            deadline: data.deadline ? new Date(data.deadline) : new Date(),
            jobType: data.jobType || '',
            requirements: data.requirements || '',
            duties: data.duties || '',
            conditions: data.conditions || '',
            categoryID: data.categoryID || '',
          });
        } catch (error) {
          console.error("Error fetching vacancy: ", error);
        }
      };
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await getCategories();
        setData(categories);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateVacancy(id, vacancy);
        toast.success('Məlumat redaktə olundu');
      } else {
        await createVacancy(vacancy);
        
        toast.success('Məlumat əlavə olundu');
      }
      navigate('/admin/vacancies');
    } catch (error) {
      toast.error('Xəta baş verdi');
    }
  };

  return (
    <div className='admin-users'>
      <div className="admin-users__title mb-5 justify-content-center">
        <h1>{id ? 'Məlumatı yeniləyin' : 'Yeni vakansiya əlavə edin'}</h1>
      </div>
      <div className="admin-users__form">
        <div className="admin-users__form__container">
          <label>Başlıq</label>
          <input
            value={vacancy.title}
            onChange={(e) => setVacancy({ ...vacancy, title: e.target.value })}
          />
        </div>
        <div className="admin-users__form__container">
            <label>Kateqoriya</label>
            <select
              value={vacancy.categoryID}
              onChange={(e) => setVacancy({ ...vacancy, categoryID: e.target.value })}
            >
              <option value="" disabled>Birini seçin</option> {/* Disabled statik seçim */}
              {data.map((item) => (
                <option key={item.id} value={item.id}>{item.title}</option>
              ))}
            </select>
          </div>

          <div className="admin-users__form__container">
            <label>İş növü</label>
            <select
              value={vacancy.jobType}
              onChange={(e) => setVacancy({ ...vacancy, jobType: e.target.value })}
            >
              <option value="" disabled>Birini seçin</option> {/* Disabled statik seçim */}
              {jobTypes.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

        <div className="admin-users__form__container">
          <label>Tarix</label>
          <DatePicker
            selected={vacancy.deadline}
            onChange={(date) => setVacancy({ ...vacancy, deadline: date })}
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <div className="admin-users__form__container">
          <label>Tələblər</label>
          <CKEditor
            editor={ClassicEditor}
            data={vacancy.requirements || ''} 
            onChange={(event, editor) => {
              const data = editor.getData();
              setVacancy({ ...vacancy, requirements: data });
            }}
          />
        </div>
        <div className="admin-users__form__container">
          <label>Vəzifələr</label>
          <CKEditor
                editor={ClassicEditor}
                data={vacancy.duties || ''}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    setVacancy({ ...vacancy, duties: data });
                }}
            />
        </div>
        <div className="admin-users__form__container">
          <label>Şərtlər</label>
          <CKEditor
            editor={ClassicEditor}
            data={vacancy.conditions || ''} 
            onChange={(event, editor) => {
              const data = editor.getData();
              setVacancy({ ...vacancy, conditions: data });
            }}
          />
        </div>
        <div className="admin-users__form__container">
          <button onClick={handleSubmit}>{id ? 'Yenilə' : 'Əlavə et'}</button>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default VacancyForm;
