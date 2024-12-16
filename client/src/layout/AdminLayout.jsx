import React from 'react'
import Sidebar from '../components/Admin/Sidebar'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../context/authContext';
import { CiUser } from 'react-icons/ci';

const layoutCSS = {
    display: "flex",
}

const adminContainer = {
  width: "100%",
  backgroundColor: "#FAFAFB"
}

const mainCSS = {
  padding: "40px"
}

const AdminLayout = () => {
  const { username } = useAuth();

  return (
    <div style={layoutCSS}>
        <Sidebar />
        <main style={adminContainer}>
          <div className='admin-header'>
            {username && <span className='bg-lime-700 text-white p-2 rounded-2 shadow-md d-flex align-items-center'><CiUser style={{fontSize: "16px", marginRight: "8px"}}/> Xoş gəlmisiniz, {username}</span>}
          </div>
          <div style={mainCSS}>
            <Outlet />
          </div>
        </main>
    </div>
  )
}

export default AdminLayout;
