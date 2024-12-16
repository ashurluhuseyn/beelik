import React, { useEffect, useState } from 'react'
import './users.scss'
import { Link } from 'react-router-dom'
import { deleteUser, getAllUsers, updateRole } from '../../../api/user';
import toast from 'react-hot-toast';
import { IoTrashOutline, IoAddOutline, IoSyncOutline } from "react-icons/io5";
import { userRoles } from '../../../constants';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [activeRole, setActiveRole] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getAllUsers();
        setUsers(userData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    const token = localStorage.getItem('token'); 
    if (!token) {
      toast.error("Token mövcud deyil, silinmə əməliyyatı uğursuz oldu");
      return;
    }
  
    try {
       await deleteUser(userId, token); 
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
        toast.success("İstifadəçi silindi");
    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast.error("Sizin bu əməliyyat üçün hüququnuz yoxdur");
      } else {
        toast.error("Xəta baş verdi, istifadəçi silinmədi");
      }
    }
  };

  const handleRoleToggle = (userId) => {
    setActiveRole(prev => prev === userId ? null : userId);
  }

  const handleRoleChange = async (userId, newRole) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Token mövcud deyil, rol dəyişdirilə bilməz');
      return;
    }
  
    try {
        await updateRole(userId, newRole, token);
        setUsers(prevUsers => prevUsers.map(user => 
          user.id === userId ? { ...user, role: newRole } : user
        ));
        toast.success('Rol dəyişdirildi');
    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast.error("Sizin bu əməliyyat üçün hüququnuz yoxdur");
      } else {
        toast.error("Xəta baş verdi, rol dəyişdirilə bilməz");
      }
    }
  };
  

  return (
    <div className='admin-users'>
        <div className="admin-users__title mb-5">
            <h1>Bütün istifadəçilər</h1>
            <Link to='/admin/users/new' className='d-flex align-items-center'><IoAddOutline /> Yeni istifadəçi</Link>
        </div>
        <div className="admin-users__table">
          <table className='min-w-full divide-y divide-gray bg-white rounded-2 shadow-md'>
              <thead className='divide-y divide-gray-200 bg-gray-200'>
                <tr>
                  <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>Id</th>
                  <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>Email</th>
                  <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>Rolu</th>
                  <th className='px-6 py-3 text-center text-xs font-medium text-gray uppercase tracking-wider border'>Əməliyyatlar</th>
                </tr>
              </thead>
              <tbody>
                  {users.map(user => (
                  <tr key={user.id}>
                    <td className='px-6 py-2 whitespace-nowrap text-sm text-gray border'>{user.id}</td>
                    <td className='px-6 py-2 whitespace-nowrap text-sm text-gray border'>{user.email}</td>
                    <td className='px-6 py-2 whitespace-nowrap text-sm text-gray border'>{user.role}</td>
                    <td className='px-6 py-2 whitespace-nowrap text-sm text-gray border'>
                      <button className='btn btn-md btn-success text-white me-3' onClick={() => handleRoleToggle(user.id)}>
                        <IoSyncOutline />
                        <ul className={activeRole === user.id ? 'role-dp role-active' : 'role-dp'}>
                            {userRoles.map(role => (
                              <li key={role} onClick={() => handleRoleChange(user.id, role)}>
                                {role}
                              </li>
                            ))}
                        </ul>
                      </button>
                      <button onClick={() => handleDelete(user.id)}  className='btn btn-md btn-danger text-white'>
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

export default AdminUsers
