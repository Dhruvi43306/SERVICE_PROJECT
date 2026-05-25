import React from 'react'
import { Outlet } from 'react-router-dom'
import ReqDeshNavbar from "./ReqDeshNavbar";
import Footer from "./Footer";
function Layout() {
  return (
   <>
   <ReqDeshNavbar/>
   <Outlet/>
     <Footer/>  
   </>
  )
}

export default Layout