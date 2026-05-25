import express from "express";
import { allowRole } from "../middlewear/roleMiddlewear";
import { authMiddlewear } from "../middlewear/authMiddlewear";
import {
  getAllServiceRequestStatus,
  getServiceRequestStatusById,
  InsertedServiceRequestStatus,
  UpdatedServiceRequestStatus,
  DeletedServiceRequestStatus,
  ServiceRequestStatusTechByController,
} from "../controller/ServiceRequestStatus.controller";

export const ServiceRequestStatusRouter = express.Router();
ServiceRequestStatusRouter.use(authMiddlewear);
ServiceRequestStatusRouter.use(
  allowRole({
    GET: ["ADMIN", "HOD", "TECHNICIAN"],
    POST: ["ADMIN"],
    PUT: ["ADMIN"],
    DELETE: ["ADMIN"],
  }),
);
//get all
ServiceRequestStatusRouter.get("/", getAllServiceRequestStatus);

//get by id
ServiceRequestStatusRouter.get("/:id", getServiceRequestStatusById);

//insert
ServiceRequestStatusRouter.post("/", InsertedServiceRequestStatus);

// ServiceRequestStatusRouter.put("/:id",ServiceRequestStatusTechByController)

//update
ServiceRequestStatusRouter.put("/:id", UpdatedServiceRequestStatus);

//delete
ServiceRequestStatusRouter.delete("/:id", DeletedServiceRequestStatus);
