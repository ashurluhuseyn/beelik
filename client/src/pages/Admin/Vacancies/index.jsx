import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getFormattedDate } from '../../../utils/date';
import { deleteVacancy, getVacancies } from '../../../api/vacancy';
import toast from 'react-hot-toast';
import { IoTrashOutline, IoAddOutline, IoEyeOutline, IoCreateOutline } from "react-icons/io5";
import CvModal from '../../../components/CvModal';

const AdminVacancies = () => {
  const [data, setData] = useState([]);
  const [isModalActive, setIsModalActive] = useState(false);
  const [selectedVacancyId, setSelectedVacancyId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getVacancies();
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const deleteHandler = async (id) => {
    try {
      await deleteVacancy(id);
      setData(prevData => prevData.filter(item => item.id !== id));
      toast.success('Məlumat silindi')
    } catch (error) {
      toast.error('Xəta baş verdi')
    }
  }

  return (
    <div className='admin-users'>
      <div className="admin-users__title mb-5">
        <h1>Vakansiyaların siyahısı</h1>
        <Link to='/admin/vacancies/form' className='d-flex align-items-center'><IoAddOutline /> Yeni vakansiya</Link>
      </div>
      <div className="admin-users__table overflow-x-auto">
        {
          data.length > 0 ? <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-100'>
              <tr>
                <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>Vakansiya adı</th>
                <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>Əlavə olunma tarixi</th>
                <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>Son tarix</th>
                <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>İş növü</th>
                <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>Baxış sayı</th>
                <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>Müraciət sayı</th>
                <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {data.map(item => (
                <tr key={item.id}>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 border'>{item.title}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 border'>{getFormattedDate(item.createDate)}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 border'>{getFormattedDate(item.deadline)}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 border'>{item.jobType}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 border'>{item.viewCount}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 border'>{item.applyCount}</td>
                  <td>
                    <Link to={`/admin/vacancies/form/${item.id}`} className='btn btn-lg text-warning'>
                      <IoCreateOutline />
                    </Link>
                    <button className='btn btn-lg text-danger' onClick={() => deleteHandler(item.id)}>
                      <IoTrashOutline />
                    </button>
                    <button onClick={() => { setSelectedVacancyId(item.id); setIsModalActive(true); }} className='btn btn-lg text-success'>
                      <IoEyeOutline />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> : <div className="alert alert-danger mx-auto w-25 text-center">Vakansiya tapılmadı...</div>
        }
      </div>
      {isModalActive && (
        <CvModal active={isModalActive} setIsActive={setIsModalActive} id={selectedVacancyId} />
      )}
    </div>
  )
}

export default AdminVacancies;