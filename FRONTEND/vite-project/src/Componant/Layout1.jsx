import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar1 from "./Navbar1";
import Footer from "./Footer";
function Layout1() {
  return (
   <>
   <Navbar1/>
   <Outlet/>
     <Footer/>  
   </>
  )
}

export default Layout1