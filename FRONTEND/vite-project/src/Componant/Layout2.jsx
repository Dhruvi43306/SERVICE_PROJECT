import React from 'react'
import { Outlet } from 'react-router-dom'
import TechDeshNavbar from "./TechDeshNavbar";
import Footer from "./Footer";
function Layout2() {
  return (
   <>
   <TechDeshNavbar/>
   <Outlet/>
     <Footer/>  
   </>
  )
}

export default Layout2