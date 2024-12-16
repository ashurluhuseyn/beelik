import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAbout } from '../../../api/about';

const AdminAbout = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAbout();
        setData(data.about);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const displayData = (value) => value || "yoxdur";


  return (
    <div className='admin-users'>
        <div className="admin-users__title mb-5">
            <h1>Haqqımızda</h1>
            {
                !data && <Link to='/admin/about/form'>Yeni məlumat</Link>
            }
        </div>
        <div className="admin-users__table overflow-x-auto">
          {
            data && <table className='min-w-full divide-y divide-gray bg-white'>
            <thead className='divide-y divide-gray-200'>
              <tr>
                <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider'>section title</th>
                <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider'>address</th>
                <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider'>phone1</th>
                <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider'>email</th>
                <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider'>əməliyyat</th>
              </tr>
            </thead>
            <tbody>
                <tr key={data.id}>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray border'>{displayData(data.sectionTitle)}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray border'>{displayData(data.address)}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray border'>{displayData(data.phone1)}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray border'>{displayData(data.email)}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray border'>
                     <Link to={`/admin/about/form/${data.id}`} className='btn btn-sm btn-outline-warning me-1'>
                      Edit
                    </Link>
                </td>
              </tr>
            </tbody>
        </table>
          }
        </div>
    </div>
  )
}

export default AdminAbout;