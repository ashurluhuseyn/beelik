import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteAdvantage, getAdvantages } from '../../../api/advantage';
import toast from 'react-hot-toast';


const AdminAdvantages = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAdvantages();
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const deleteHandler = async (id) => {
    try {
        await deleteAdvantage(id);
        setData(prevData => prevData.filter(item => item.id !== id));
        toast.success('Məlumat silindi')
    } catch (error) {
        toast.error('Xəta baş verdi')
    }
  }

  return (
    <div className='admin-users'>
        <div className="admin-users__title mb-5">
            <h1>Məlumatların siyahısı</h1>
            <Link to='/admin/advantages/form'>Yeni məlumat</Link>
        </div>
        <div className="admin-users__table shadow-md sm:rounded-lg">
          <table className='min-w-full divide-y divide-gray-200 bg-white shadow-md'>
              <thead className='divide-y divide-gray-200'>
                <tr>
                  <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>Başlıq</th>
                  <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>Təsvir</th>
                  <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>Əməliyyatlar</th>
                </tr>
              </thead>
              <tbody>
                  {data.map(data => (
                  <tr key={data.id}>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray border'>{data.title}</td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray border'>{data.description}</td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray border'>
                      <Link to={`/admin/advantages/form/${data.id}`} className='btn btn-sm btn-outline-warning me-1'>
                        Edit
                      </Link>
                      <button onClick={() => deleteHandler(data.id)} className='btn btn-sm btn-outline-danger ms-1'>
                        Delete
                      </button>
                    </td>
                  </tr>
                  ))}
              </tbody>
          </table>
        </div>
    </div>
  )
}

export default AdminAdvantages