import { Routes, Route } from "react-router-dom";
import Login from "./Componant/Login";
import Header from "./Componant/Header";
import Navbar1 from "./Componant/Navbar1";
import Layout1 from "./Componant/Layout1"
import Layout4 from "./Componant/Layout4"
import Layout from "./Componant/Layout"
import Layout2 from "./Componant/Layout2"
import Layout3 from "./Componant/Layout3"
import SignUp from "./Componant/SignUp";
import TechnicionProfile from "./Componant/Dashbord/TechnitionDashboard/TechnicionProfile";
import RequestorDashboard from "./Componant/Dashbord/RequesterDashboard/RequestorDashboard";
import HodDashboard from "./Componant/Dashbord/HodDashboard/HodDashboard";
import TechnicianDashboard from "./Componant/Dashbord/TechnitionDashboard/TechnicianDashboard";
import ServiceRequestStatusMaster from "./Componant/Master/ServiceRequestStatusMaster";
import ServiceDepartmentMaster from "./Componant/Master/ServiceDepartmentMaster";
import ServiceDepartmentPersonMaster from "./Componant/Master/ServiceDepartmentPersonMaster";
import ServiceTypeMaster from "./Componant/Master/ServiceTypeMaster";
import ServiceRequestTypeMaster from "./Componant/Master/ServiceRequestTypeMaster";
import ServiceRequestTypeWisePersonMapping from "./Componant/Master/ServiceRequestTypeWisePersonMapping";
import CreateRequest from "./Componant/Dashbord/RequesterDashboard/CreateRequest";
// import RequestDetail from "./Componant/Dashbord/RequesterDashboard/RequestDetail";
import RequesterProfile from "./Componant/Dashbord/RequesterDashboard/RequesterProfile";
import HodProfile from "./Componant/Dashbord/HodDashboard/HodProfile";
import Notification from "./Componant/Notification";
// import RequestTracker from "./Componant/Dashbord/AdminDashboard/RequestTracker";
// import TechnicianAssignedRequests from "./Componant/Dashbord/TechnitionDashboard/TechnicianAssignedRequests";
// import KnowledgeBase from "./Componant/KnowledgeBase";
// import TechnicianRequestDetails from "./Componant/Dashbord/TechnitionDashboard/TechnicianRequestDetails";
// import TechnicianInProgress from "./Componant/Dashbord/TechnitionDashboard/TechnicianInProgress";
// import UpdateRequest from "./Componant/Dashbord/RequesterDashboard/UpdateRequest";
import AdminDashboard from "./Componant/Dashbord/AdminDashboard/AdminDashboard";
// import AlltechnitionPage from "./Componant/Dashbord/AdminDashboard/AlltechnitionPage";
import AdminApprovePage from "./Componant/Dashbord/AdminDashboard/AdminApprovePage";
import AssignedTech from "./Componant/AssignedTech"
// import RequestorHistory from "./Componant/Dashbord/AdminDashboard/RequestorHistory"
import AddTechnition from "./Componant/Dashbord/AdminDashboard/AddTechnition"
import AdminProfile from "./Componant/Dashbord/AdminDashboard/AdminProfile"
import ForgotPassword from "./Componant/ForgotPassword"
import VerifyOtp from "./Componant/VerifyOtp"
import ResetPassword from "./Componant/ResetPassword"
import VerifyForgot from "./Componant/VerifyForgot"
import Campus from "./Componant/Master/Campus";
import ResulationPage from "./Componant/Dashbord/TechnitionDashboard/ResulationPage"
import StartWorkPage from "./Componant/Dashbord/TechnitionDashboard/StartWorkPage"
import PNF from "./Componant/PNF";
import ApiDocs from "./Componant/ApiDocs"
import Docs from "./Componant/Docs";



function App() {
  return (
    
    <Routes>
      <Route path="*" element={<PNF/>}/>
      <Route path="/Login" element={<Login/>} />
      <Route path="/SignUp"element={<SignUp/>}/>
      <Route path = "/ForgotPassword"element={<ForgotPassword/>}/>
      <Route path="/VerifyOtp"element={<VerifyOtp/>}/>
      <Route path="/VerifyForgot"element={<VerifyForgot/>}/>
      <Route path="/ResetPassword"element={<ResetPassword/>}/>
      <Route path="/Campus" element={<Campus/>}/>
      <Route path="/ResulationPage/:id" element={<ResulationPage/>}/>
      <Route path="Notification" element={<Notification/>}/>
      <Route path="TechnicionProfile" element={<TechnicionProfile/>} />
      <Route path="HodProfile" element={<HodProfile/>}/>
      <Route path="RequesterProfile" element={<RequesterProfile/>}/>
      <Route path ="AdminProfile" element={<AdminProfile/>}/>
      <Route path = "Docs"element={<Docs/>}/>
      <Route path = "ApiDocs"element={<ApiDocs/>}/>
      <Route path="/" element={<Layout1/>}>
      <Route index element={<Header/>}/>
      <Route path="/Navbar1" element={<Navbar1/>}/>
    </Route>
      
      <Route path='/' element={<Layout/>}>
      <Route path="RequestorDashboard" element={<RequestorDashboard />}/>
      <Route path="CreateRequest"element={<CreateRequest/>}/>
      </Route>
      

    <Route path="/" element={<Layout2/>}>
    <Route path="TechnicianDashboard" element={<TechnicianDashboard/>}/>
    <Route path="StartWorkPage/:id" element={<StartWorkPage/>}/>
    </Route>

    <Route path="/" element={<Layout3/>}>
    <Route path="HodDashboard" element={<HodDashboard/>}/>
    </Route>

     <Route path="/" element={<Layout4/>}>
        <Route path="AdminDashboard" element={<AdminDashboard/>}/>
        {/* <Route path="AlltechnitionPage"element={<AlltechnitionPage/>}/> */}
        <Route path = "/AdminApprovePage/:id"element={<AdminApprovePage/>}/>
        <Route path="ServiceRequestStatusMaster" element={<ServiceRequestStatusMaster/>}/>
        <Route path="ServiceDepartmentMaster" element={<ServiceDepartmentMaster/>}/>
        <Route path="ServiceDepartmentPersonMaster" element={<ServiceDepartmentPersonMaster/>}/>
        <Route path="ServiceTypeMaster" element={<ServiceTypeMaster/>}/>
        <Route path="ServiceRequestTypeMaster" element={<ServiceRequestTypeMaster/>}/>
        <Route path="ServiceRequestTypeWisePersonMapping" element={<ServiceRequestTypeWisePersonMapping/>}/>
             <Route path="CreateRequest"element={<CreateRequest/>}/>
             {/* <Route path="RequestDetail" element={<RequestDetail/>}/>
             <Route path="RequestTracker" element={<RequestTracker/>}/>
             <Route path="KnowledgeBase" element={<KnowledgeBase/>}/>
             <Route path="TechnicianAssignedRequests" element={<TechnicianAssignedRequests/>}/>
             <Route path="TechnicianRequestDetails"element={<TechnicianRequestDetails/>}/>
             <Route path="TechnicianInProgress"element={<TechnicianInProgress/>}/>
             <Route path="UpdateRequest"element={<UpdateRequest/>}/>
              <Route path="RequestorHistory" element={<RequestorHistory/>}/> */}
              <Route path = "AddTechnition" element={<AddTechnition/>}/>
              <Route path ="AssignedTech/:id" element={<AssignedTech/>}/>

    </Route>
    </Routes>
  
  );
}

export default App;
