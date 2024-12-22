import React, { useState } from 'react'
import '../users.scss'
import { useNavigate } from 'react-router-dom'
import { createUser } from '../../../../api/user'
import toast from 'react-hot-toast'

const UserForm = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUser(user);
            toast.success('Istifadəçi əlavə olundu')
          navigate('/admin/users');
        } catch (error) {
          toast.error('Xəta baş verdi')
        }
      };
  return (
    <div className='admin-users'>
        <div className="admin-users__title mb-5 justify-content-center">
            <h1>Yeni istifadəçi</h1>
        </div>
        <div className="admin-users__form">
            <div className="admin-users__form__container">
                <label htmlFor="">Email</label>
                <input value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} type="text" placeholder='admin@gmail.com'/>
            </div>
            <div className="admin-users__form__container">
                <label htmlFor="">Şifrə</label>
                <input value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} type="password" placeholder='123456a'/>
            </div>
            <div className="admin-users__form__container">
                <button onClick={handleSubmit}>Əlavə et</button>
            </div>
        </div>
    </div>
  )
}

export default UserForm