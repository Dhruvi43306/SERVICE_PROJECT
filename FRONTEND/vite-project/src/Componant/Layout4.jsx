import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from "./Footer";
import AdminDeshNavbar from './AdminDeshNavbar';
function Layout3() {
  return (
   <>
   <AdminDeshNavbar/>
   <Outlet/>
     <Footer/>  
   </>
  )
}

export default Layout3