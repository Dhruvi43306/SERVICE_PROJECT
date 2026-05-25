import React from 'react'
import { Outlet } from 'react-router-dom'
import HodDeshNavbar from "./HodDeshNavbar";
import Footer from "./Footer";
function Layout3() {
  return (
   <>
   <HodDeshNavbar/>
   <Outlet/>
     <Footer/>  
   </>
  )
}

export default Layout3