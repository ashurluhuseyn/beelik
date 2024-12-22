import React, { useEffect, useState } from 'react'
import { GoTrash, GoCheck } from "react-icons/go";
import { getApplies, updateApplyStatus } from '../../../../api/Apply/academicApply';
import toast, { Toaster } from 'react-hot-toast';
import { getFormattedDate } from '../../../../utils/date';


const AcademicApply = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getApplies();
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);


  const statusHandler = async (id, newStatus) => {
    try {
      await updateApplyStatus(id, newStatus);
      setData(prevData => 
        prevData.map(item => 
          item.id === id ? { ...item, status: newStatus } : item
        )
      );
      toast.success('Status dəyişdi')
    } catch (error) {
     toast.error('Xəta baş verdi') 
    }
  }

  return (
    <div className='admin-users'>
        <div className="admin-users__title mb-5">
            <h1>Müraciətlərin siyahısı ({data.length})</h1>
        </div>
        <div className="admin-users__table">
          <table className='min-w-full divide-y divide-gray bg-white rounded-2 shadow-md'>
              <thead className='divide-y divide-gray-200 bg-gray-200'>
                <tr>
                  <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>Ad, soyad</th>
                  <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>Email</th>
                  <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>Telefon</th>
                  <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>müraciət etdiyi tədris</th>
                  <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>Tarix</th>
                  <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>Status</th>
                  <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>Əməliyyatlar</th>
                </tr>
              </thead>
              <tbody style={{fontSize: "12px"}}>
                  {data.map(data => (
                  <tr className={data.status === 'silinmiş' && 'text-decoration-line-through'} key={data.id}>
                    <td className='px-6 py-3 whitespace-nowrap text-sm text-gray border'>{data.fullname}</td>
                    <td className='px-6 py-3 whitespace-nowrap text-sm text-gray border'>{data.email}</td>
                    <td className='px-6 py-3 whitespace-nowrap text-sm text-gray border'>{data.phone}</td>
                    <td className='px-6 py-3 whitespace-nowrap text-sm text-gray border fw-bold text-decoration-underline'>{data.course.title}</td>
                    <td className='px-6 py-3 whitespace-nowrap text-sm text-gray border'>{getFormattedDate(data.createdAt)}</td>
                    <td className='px-6 py-3 whitespace-nowrap text-sm text-gray border'>
                      <span style={{ cursor: "pointer" }} className={data.status === 'gözləmədə' ? "text-warning p-1 rounded-2 fw-bold" : data.status === 'təsdiqlənmiş' ? "text-success p-1 rounded-2 fw-bold" : "text-danger p-1 rounded-2 fw-bold"} >{data.status}</span>
                    </td>
                    <td className='px-6 py-3 whitespace-nowrap text-sm text-gray border'>
                      <button title='Təsdiqlə' disabled={data.status === 'təsdiqlənmiş' && true} className='btn btn-sm btn-success ms-1'>
                        <GoCheck onClick={() => statusHandler(data.id, 'təsdiqlənmiş')}/>
                      </button>
                      <button disabled={data.status === 'silinmiş' && true} className='btn btn-sm btn-danger ms-1'>
                        <GoTrash onClick={() => statusHandler(data.id, 'silinmiş')}/>
                      </button>
                    </td>
                  </tr>
                  ))}
              </tbody>
          </table>
        </div>
        <Toaster />
    </div>
  )
}

export default AcademicApply;