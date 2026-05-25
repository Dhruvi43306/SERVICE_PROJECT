require('dotenv').config()
import express from "express"
import cors from "cors";
import http from "http"
import cookieParser from "cookie-parser";
import { userRouter } from "./routes/users.route";
import { authMiddlewear } from "./middlewear/authMiddlewear";
import { ServiceDeptRouter } from "./routes/ServiceDept.route";
import { ServiceDeptPersonRouter } from "./routes/ServiceDeptPerson.route";
import { ServiceRequestRouter } from "./routes/ServiceRequest.route";
import { ServiceRequestReplyRouter } from "./routes/ServiceRequestReply.route";
import { ServiceRequestStatusRouter } from "./routes/ServiceRequestStatus.route";
import { ServiceRequestTypeRouter } from "./routes/ServiceRequestType.route";
import { ServiceRequestTypeWiseRouter } from "./routes/Servicerequesttypewiseperson.route";
import { ServiceTypeRouter } from "./routes/ServiceType.route";
import { campusRouter } from "./routes/Campus.route";
import { workflowstep } from "./routes/WorkFlowStep.route";
import { workflowtype } from "./routes/WorkflowType";
import { priority } from "./routes/Priority.route";
import { dashrouter } from "./routes/DashboardCount.route";
import { notifyRouter } from "./routes/Notification.route";
import { Server } from "socket.io";

const app = express()
const port = process.env.PORT || 5000
const server = http.createServer(app)
export const io = new Server(server,{
    cors:{
    origin: "http://localhost:5173",
    credentials: true
  }
})

io.on("connection",(socket)=>{
  console.log("User Connected:", socket.id)


socket.on("join",(UserID)=>{
  console.log("JOIN EVENT RECEIVED:", UserID); 
  socket.join(UserID.toString())
  console.log(`User joined room: ${UserID}`)
})

socket.on("disconnect",()=>{
    console.log("User Disconnected:", socket.id)
  })
})
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

app.use(express.json())
app.use(cookieParser());

app.use("/users",userRouter)

app.use(authMiddlewear)
app.use("/ServiceDept",ServiceDeptRouter)
app.use("/ServiceDeptPerson",ServiceDeptPersonRouter)
app.use("/ServiceRequest",ServiceRequestRouter)
app.use("/ServcieRequestReply",ServiceRequestReplyRouter)
app.use("/ServiceRequestType",ServiceRequestTypeRouter)
app.use("/ServiceRequestTypeWise",ServiceRequestTypeWiseRouter)
app.use("/ServiceType",ServiceTypeRouter)
app.use("/ServiceRequestStatus",ServiceRequestStatusRouter)
app.use("/Campus",campusRouter)
app.use("/WorkflowStep",workflowstep)
app.use("/WorkFlowType",workflowtype)
app.use("/Priority",priority)
app.use("/dashboardCounts",dashrouter)
app.use("/notify",notifyRouter)

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});