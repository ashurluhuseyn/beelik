import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { IoTrashOutline, IoAddOutline, IoCreateOutline } from "react-icons/io5";
import { deleteTeacher, getTeachers } from '../../../api/teacher';
import AlertMessage from '../../../components/Alert';
import Loader from '../../../components/Loader';



const AdminTeachers = () => {
  const [data, setData] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTeachers();
        setData(response);
      } catch (error) {
        console.log(error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteHandler = async (id) => {
    const confirmDelete = window.confirm("Bu təlimçini silmək istədiyinizə əminsiniz?");
    if (!confirmDelete) return;
  
    try {
      await deleteTeacher(id);
        setData((prevData) =>
          prevData.filter(teacher => teacher.id !== id)
        );
        toast.success("Təlimçi silindi");
    } catch (error) {
      
      if (error.response && error.response.status === 403) {
        toast.error("Sizin bu əməliyyat üçün hüququnuz yoxdur");
      } else {
        toast.error("Xəta baş verdi, təlimçi silinmədi");
      }
    }
  }

  if (loading) {
    return <Loader />
  }
 
  return (
    <div className='admin-users'>
       <div className="admin-users__title mb-5">
            <h1>Bütün Təlimçilər</h1>
            <Link to='/admin/teachers/form' className='d-flex align-items-center'><IoAddOutline /> Yeni təlimçi</Link>
        </div>
        {
          data ? <div className="admin-users__table">
          <table className='min-w-full divide-y divide-gray bg-white rounded-2 shadow-md'>
              <thead className='divide-y divide-gray-200 bg-gray-200'>
                <tr>
                  <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>şəkli</th>
                  <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>ad, soyadı</th>
                  <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>sahəsi</th>
                  <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>əməliyyatlar</th>
                </tr>
              </thead>
              <tbody>
                  {data.map(item => (
                  <tr key={item.id}>
                    <td className='px-6 py-2 whitespace-nowrap text-sm text-gray border'>
                      <img src={`${process.env.REACT_APP_IMAGE_URL}teachers/${item.image}`} alt="" />
                    </td>
                    <td className='px-6 whitespace-nowrap text-sm text-gray border'>{item.name}</td>
                    <td className='px-6 whitespace-nowrap text-sm text-gray border'>{item.category.title}</td>
                    <td className='px-6 whitespace-nowrap text-sm text-gray border'>
                    <Link to={`/admin/teachers/form/${item.id}`} className='btn btn-lg text-warning'>
                      <IoCreateOutline />
                      </Link>
                      <button onClick={() => deleteHandler(item.id)} className='btn btn-lg text-danger'>
                        <IoTrashOutline />
                      </button>
                    </td>
                  </tr>
                  ))}
              </tbody>
          </table>
        </div> : <AlertMessage text='Göstəriləcək məlumat yoxdur'/>
        }
    </div>
  );
};

export default AdminTeachers;