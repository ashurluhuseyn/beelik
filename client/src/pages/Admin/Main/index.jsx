import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AlertMessage from '../../../components/Alert';
import { getCorHomeDataById, getHomeDataById } from '../../../api/home';


const tdCSS = {
  maxWidth: "550px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
}

const AdminMain = () => {
  const [homeData, setHomeData] = useState(null);
  const [corHomeData, setCorHomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [homeData, corHomeData] = await Promise.all([getHomeDataById(1), getCorHomeDataById(1)])
        
       setHomeData(homeData)
       setCorHomeData(corHomeData)
        
      } catch (error) {
        console.log(error);
        setHomeData(null);
        setCorHomeData(null);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

if (loading) {
  return <p>Yüklenir...</p>;
}

if (!homeData || !corHomeData) {
  return <AlertMessage text='Göstəriləcək məlumat yoxdur'/>;
}
  return (
    <div className='admin-users'>
        <div className='home-table'>
          <div className="admin-users__title mb-3">
              <h1>Ana səhifə (Akademik)</h1>
          </div>
          <div className="admin-users__table overflow-x-auto">
            <table className='min-w-full divide-y divide-gray shadow-md bg-white'>
                  <thead className='bg-gray-100'>
                    <tr>
                      <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>Şəkil</th>
                      <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>Başlıq</th>
                      <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>Təsvir</th>
                      <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>Əməliyyatlar</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr key={homeData.id}>
                    <td className='px-6 py-2 whitespace-nowrap text-sm text-gray border'>
                      <img src={`${process.env.REACT_APP_IMAGE_URL}home/${homeData.image}`} alt="" />
                    </td>
                    <td className='px-6 py-2 whitespace-nowrap text-sm text-gray border'>{homeData.title}</td>
                    <td className='px-6 py-2 whitespace-wrap text-sm text-gray border'>{homeData.description}</td>
                    <td className='px-6 py-2 whitespace-nowrap text-sm text-gray border'>
                    <Link to={`/admin/home/form/${homeData.id}?type=academic`} className='btn btn-sm btn-warning text-dark'>
                      Edit
                      </Link>
                    </td>
                  </tr>
                  </tbody>
              </table>
          </div>
        </div>

        <div className='home-table mt-5'>
          <div className="admin-users__title mb-3">
              <h1>Ana səhifə (Korporativ)</h1>
          </div>
          <div className="admin-users__table overflow-x-auto">
             <table className='min-w-full divide-y divide-gray shadow-md bg-white'>
                  <thead className='bg-gray-100'>
                    <tr>
                      <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>Başlıq</th>
                      <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>Təsvir</th>
                      <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>Əməliyyatlar</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr key={corHomeData.id}>
                    <td className='px-6 py-2 whitespace-nowrap text-sm text-gray border'>{corHomeData.title}</td>
                    <td className='px-6 py-2 whitespace-wrap text-sm text-gray border'>{corHomeData.description}</td>
                    <td className='px-6 py-2 whitespace-nowrap text-sm text-gray border'>
                    <Link to={`/admin/home/form/${corHomeData.id}?type=corporate`} className='btn btn-sm btn-warning text-dark'>
                      Edit
                      </Link>
                    </td>
                  </tr>
                  </tbody>
              </table>
          </div>
        </div>
    </div>
  )
}

export default AdminMain