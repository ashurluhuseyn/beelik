import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast';
import { IoTrashOutline, IoAddOutline, IoCreateOutline } from "react-icons/io5";
import { deleteSubject, getSubjects, getSubjectsByCourseId } from '../../../api/subject';
import { getCourses } from '../../../api/course';

const selectCSS = {
    "border": "1px solid rgb(208, 213, 221)",
    "fontSize": "14px",
    "fontWeight": "400",
    "padding": "5px 16px",
    "borderRadius": "8px",
}

const AdminSubjects = () => {
  const [data, setData] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [plans, courses] = await Promise.all([getSubjects(), getCourses()]);
        setData(plans);
        
        setCourses(courses);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  
  const deleteHandler = async (id) => {
    try {
        await deleteSubject(id);
        setData(prevData => prevData.filter(item => item.id !== id));
        toast.success('Məlumat silindi')
    } catch (error) {
        toast.error('Xəta baş verdi')
    }
  }

  const handleSubject = async (courseID) => {
    try {
      let filteredData;
      if(courseID === "0") {
        filteredData = await getSubjects()
        setData(filteredData.plans)
      }      
      else{
        filteredData = await getSubjectsByCourseId(courseID)
        setData(filteredData.plans)
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='admin-users'>
        <div className="admin-users__title mb-5">
            <h1>Bütün mövzular</h1>
            <div className='d-flex'>
              <select style={selectCSS} value={data.courseID} onChange={(e) => handleSubject(e.target.value)}>
                <option value="0">Filterlə</option>
                {
                  courses.map(item => (
                    <option key={item.id} value={item.id}>{item.title}</option>
                  ))
                } 
            </select>
              <Link to='/admin/subjects/form' className='d-flex align-items-center ms-4'><IoAddOutline /> Yeni mövzu</Link>
            </div>
        </div>
        <div className="admin-users__table">
          {
            data.length > 0 ? <table className='min-w-full divide-y divide-gray bg-white shadow-md'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>Mövzu adı</th>
                <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>Təsviri</th>
                <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody>
                {data.map(data => (
                <tr key={data.id}>
                  <td className='px-6 py-2 whitespace-nowrap text-sm text-gray border'>{data.title}</td>
                  <td className='px-6 py-2 whitespace-nowrap text-sm text-gray border'>{data.description.length > 100 ? data.description.slice(0,100) + "..." : data.description}</td>
                  <td className='px-6 py-2 whitespace-nowrap text-sm text-gray border'>
                    <Link to={`/admin/subjects/form/${data.id}`} className='btn btn-lg text-warning'>
                      <IoCreateOutline />
                    </Link>
                    <button onClick={() => deleteHandler(data.id)} className='btn btn-lg text-danger'>
                      <IoTrashOutline />
                    </button>
                  </td>
                </tr>
                ))}
            </tbody>
        </table> : <div className="alert alert-danger mx-auto w-25 text-center">Mövzu yoxdur...</div>
          }
        </div>
    </div>
  )
}

export default AdminSubjects;