import React, { useEffect, useState } from 'react'
import './courses.scss'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast';
import { IoTrashOutline, IoAddOutline, IoCreateOutline } from "react-icons/io5";
import { deleteCourse, getCourses } from '../../../api/course';


const AdminCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);


  const handleDelete = async (courseID) => {
    const confirmDelete = window.confirm("Bu kursu silmək istədiyinizə əminsiniz?");
    if (!confirmDelete) return;
  
    const token = localStorage.getItem("token");
    try {
      const response = await deleteCourse(courseID, token);
      if (response.status === 200) {
        setCourses((prevData) =>
          prevData.filter((course) => course.id !== courseID)
        );
        toast.success("Kurs silindi");
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast.error("Sizin bu əməliyyat üçün hüququnuz yoxdur");
      } else {
        toast.error("Xəta baş verdi, kurs silinmədi");
      }
    }
  };
  


  return (
    <div className='admin-users'>
        <div className="admin-users__title mb-5">
            <h1>Bütün Kurslar</h1>
            <Link to='/admin/courses/form' className='d-flex align-items-center'><IoAddOutline /> Yeni kurs</Link>
        </div>
        <div className="admin-users__table">
          <table className='min-w-full divide-y divide-gray bg-white rounded-2 shadow-md'>
              <thead className='divide-y divide-gray-200 bg-gray-200'>
                <tr>
                  <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>şəkli</th>
                  <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>kursun adı</th>
                  <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>müddəti</th>
                  <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>baxış sayı</th>
                  <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>əməliyyatlar</th>
                </tr>
              </thead>
              <tbody>
                  {courses.map(course => (
                  <tr key={course.id}>
                    <td className='px-6 whitespace-nowrap text-sm text-gray border'>
                      <img src={`${process.env.REACT_APP_IMAGE_URL}courses/${course.image}`} alt="" />
                    </td>
                    <td className='px-6 whitespace-nowrap text-sm text-gray border'>{course.title}</td>
                    <td className='px-6 whitespace-nowrap text-sm text-gray border'>{course.month} ay / {course.hours} saat</td>
                    <td className='px-6 whitespace-nowrap text-sm text-gray border'>{course.viewCount}</td>
                    <td className='px-6 whitespace-nowrap text-sm text-gray border'>
                    <Link to={`/admin/courses/form/${course.id}`} className='btn btn-sm me-2 text-dark bg-warning'>
                      Edit
                      </Link>
                      <button onClick={() => handleDelete(course.id)}  className='btn btn-sm text-white bg-danger'>
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

export default AdminCourses;




