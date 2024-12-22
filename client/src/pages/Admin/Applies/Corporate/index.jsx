import React, { useEffect, useState } from 'react'
import { GoTrash, GoCheck } from "react-icons/go";
import { getApplies, updateApplyStatus } from '../../../../api/corporateApply';
import toast, { Toaster } from 'react-hot-toast';
import { getFormattedDate } from '../../../../utils/date';
import { maskPhone } from '../../../../utils/mask';


const CorporativeApply = () => {
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
      await updateApplyStatus(id, { status: newStatus });
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
            <select style={{border: "1px solid #D0D5DD", fontSize: "14px", fontWeight: "400",padding: "5px 16px", borderRadius: "8px"}}>
              <option value="">Statusa görə</option>
              <option value="1">Təsdiqlənmiş</option>
              <option value="2">Gözləmədə</option>
              <option value="3">Silinmiş</option>
            </select>
        </div>
        <div className="admin-users__table">
          <table className='min-w-full divide-y divide-gray bg-white rounded-2 shadow-md'>
              <thead className='divide-y divide-gray-200 bg-gray-200'>
                <tr>
                  <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>Ad, soyad</th>
                  <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>Email</th>
                  <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>Telefon</th>
                  <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>Qeyd</th>
                  <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>Tarix</th>
                  <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>Status</th>
                  <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>Əməliyyatlar</th>
                </tr>
              </thead>
              <tbody style={{fontSize: "12px"}}>
                  {data.map(data => (
                  <tr className={data.status === 'silinmiş' && 'text-decoration-line-through'} key={data.id}>
                    <td className='px-6 py-3 whitespace-nowrap text-sm text-gray border'>{data.firstname} {data.lastname}</td>
                    <td className='px-6 py-3 whitespace-nowrap text-sm text-gray border'>{data.email}</td>
                    <td className='px-6 py-3 whitespace-nowrap text-sm text-gray border'>{maskPhone(data.phone)}</td>
                    <td className='px-6 py-3 whitespace-nowrap text-sm text-gray border'>{data.description}</td>
                    <td className='px-6 py-3 whitespace-nowrap text-sm text-gray border'>{getFormattedDate(data.createdAt)}</td>
                    <td className='px-6 py-3 whitespace-nowrap text-sm text-gray border'>
                      <span style={{ cursor: "pointer" }} className={data.status === 'gözləmədə' ? "bg-warning p-1 rounded-2 text-white" : data.status === 'təsdiqlənmiş' ? "bg-success p-1 rounded-2 text-white" : "bg-danger p-1 rounded-2 text-white"} >{data.status}</span>
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

export default CorporativeApply;