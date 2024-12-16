import React, { useEffect, useState } from 'react'
import './courses.scss'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast';
import { IoTrashOutline, IoAddOutline, IoCreateOutline } from "react-icons/io5";
import { deleteCourse } from '../../../api/course';
import { deletePlan, getPlans } from '../../../api/plan';


const AdminPlans = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPlans();
        setPlans(data.plans);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);


  const deleteHandler = async (id) => {
    try {
        await deletePlan(id);
        setPlans(prevData => prevData.filter(item => item.id !== id));
        toast.success('Məlumat silindi')
    } catch (error) {
        toast.error('Xəta baş verdi')
    }
  }


  return (
    <div className='admin-users'>
        <div className="admin-users__title mb-5">
            <h1>Bütün Planlar</h1>
            <Link to='/admin/plans/form' className='d-flex align-items-center'><IoAddOutline /> Yeni plan</Link>
        </div>
        <div className="admin-users__table">
          <table className='min-w-full divide-y divide-gray bg-white rounded-2 shadow-md'>
              <thead className='divide-y divide-gray-200 bg-gray-200'>
                <tr>
                  <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>şəkli</th>
                  <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>Başlıq</th>
                  <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>təsviri</th>
                  <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>əməliyyatlar</th>
                </tr>
              </thead>
              <tbody>
                  {plans.map(plan => (
                  <tr key={plan.id}>
                    <td className='px-6 py-2 whitespace-nowrap text-sm text-gray border' style={{backgroundColor: "#008ADF"}}>
                      <img src={`${process.env.REACT_APP_IMAGE_URL}plans/${plan.image}`} alt="" />
                    </td>
                    <td className='px-6 py-2 whitespace-nowrap text-sm text-gray border'>{plan.title}</td>
                    <td className='px-6 py-2 whitespace-nowrap text-sm text-gray border'>{plan.description}</td>
                    <td className='px-6 py-2 whitespace-nowrap text-sm text-gray border'>
                    <Link to={`/admin/plans/form/${plan.id}`} className='btn btn-lg text-warning'>
                      <IoCreateOutline />
                      </Link>
                      <button onClick={() => deleteHandler(plan.id)}  className='btn btn-lg text-danger'>
                        <IoTrashOutline />
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

export default AdminPlans;