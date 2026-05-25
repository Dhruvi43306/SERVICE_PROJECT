import express from "express";
import { allowRole } from "../middlewear/roleMiddlewear";
import {
  getAllServiceRequest,
  getServiceRequestById,
  InsertedServiceRequest,
  UpdatedServiceRequest,
  DeletedServiceRequest,
  adminApproveController,
  hodassigenByTech,
  ResolvedByTechnition,
  startWorkController,
  adminAssignedController,
} from "../controller/ServiceRequest.controller";

export const ServiceRequestRouter = express.Router();
ServiceRequestRouter.use(
  allowRole({
    GET: ["ADMIN", "HOD", "TECHNICIAN", "STAFF", "REQUESTOR"],
    POST: ["ADMIN", "REQUESTOR", "TECHNICIAN", "HOD"],
    PUT: ["ADMIN", "HOD", "TECHNICIAN"],
    DELETE: ["ADMIN"],
  }),
);
//get all
ServiceRequestRouter.get("/", getAllServiceRequest);

//get by id
ServiceRequestRouter.get("/:id", getServiceRequestById);

//inserted
ServiceRequestRouter.post("/", InsertedServiceRequest);

//updated
ServiceRequestRouter.put("/:id", UpdatedServiceRequest);

//deletd
ServiceRequestRouter.delete("/:id", DeletedServiceRequest);

//Admin Approved
ServiceRequestRouter.post("/adminApprove/:id", adminApproveController);

//Admin assigned
ServiceRequestRouter.post("/adminAssigned/:id", adminAssignedController);

//Hod Assigned
ServiceRequestRouter.post("/hodAssigned/:id", hodassigenByTech);

//start work
ServiceRequestRouter.post("/startWork/:id", startWorkController);

//Resolved
ServiceRequestRouter.post("/resolved/:id", ResolvedByTechnition);
