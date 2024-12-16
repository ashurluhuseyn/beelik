import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteCategory, getCategories } from '../../../api/category';
import toast from 'react-hot-toast';
import { IoTrashOutline, IoAddOutline, IoCreateOutline } from "react-icons/io5";

const AdminCategories = () => {
  const [data, setData] = useState([]);

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

  const deleteHandler = async (id) => {
    try {
        await deleteCategory(id);
        setData(prevData => prevData.filter(item => item.id !== id));
        toast.success('Məlumat silindi')
    } catch (error) {
        toast.error('Xəta baş verdi')
    }
  }

  return (
    <div className='admin-users'>
        <div className="admin-users__title mb-5">
            <h1>Bütün kateqoriyalar</h1>
            <Link to='/admin/categories/form' className='d-flex align-items-center'><IoAddOutline /> Yeni kateqoriya</Link>
        </div>
        <div className="admin-users__table">
          {
            data.length > 0 ? <table className='min-w-full divide-y divide-gray bg-white shadow-md'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>Kateqoriya adı</th>
                <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody>
                {data.map(data => (
                <tr key={data.id}>
                  <td className='px-6 py-3 whitespace-nowrap text-sm text-gray border'>{data.title}</td>
                  <td className='px-6 py-3 whitespace-nowrap text-sm text-gray border'>
                    <Link to={`/admin/categories/form/${data.id}`} className='btn btn-sm btn-warning text-white me-3'>
                      Edit
                    </Link>
                    <button onClick={() => deleteHandler(data.id)} className='btn btn-sm btn-outline-danger'>
                      Delete
                    </button>
                  </td>
                </tr>
                ))}
            </tbody>
        </table> : <div className="alert alert-danger mx-auto w-25 text-center">Kateqoriya yoxdur...</div>
          }
        </div>
    </div>
  )
}

export default AdminCategories;