import React, { useState } from 'react';
import { useAuth } from '../../../context/authContext';
import './login.scss';
import {login as loginUser} from '../../../api/user'
import logo from '../../../assets/images/logo.svg'

const Login = () => {
  const { login } = useAuth();
  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const data = await loginUser(user);
      if (data && data.token) {
        login(data.token); 
      } else {
        setError('Giriş məlumatları səhvdir');
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setError('Giriş zamanı xəta baş verdi');
    }
  };
  

  return (
    <div className='login'>
      <div className="login__left">
        <div className='login-form'>
          <div className="login-form__container">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder='E-mail'
              value={user.email}
              onChange={(e) => setUser({...user, email:e.target.value})}
            />
          </div>
          <div className="login-form__container">
            <label htmlFor="password">Şifrə</label>
            <input
              id='password'
              type="password"
              placeholder='Şifrə'
              value={user.password}
              onChange={(e) => setUser({...user, password:e.target.value})}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="login-form__container">
            <button onClick={handleLogin}>Daxil ol</button>
          </div>
        </div>
      </div>
      <div className="login__banner">
        <img src={logo} alt="" />
      </div>
    </div>
  )
}

export default Login;