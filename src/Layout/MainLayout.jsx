import React, { useContext } from 'react'
import UserNav from '../components/UserNav'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Login from '../components/Login'
import { AppContext } from '../context/AppContext'
import { ToastContainer } from 'react-toastify';

function MainLayout() {
    const {showLogin}=useContext(AppContext)
  return (
    <div className="px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-white to-blue-100">
        <ToastContainer position='top-right'/>
        <UserNav/>
        <Outlet/>
        <Footer/>
        {showLogin&& <Login />}
       
    </div>
  )
}

export default MainLayout