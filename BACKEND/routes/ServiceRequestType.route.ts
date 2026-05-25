import express from "express";
import { allowRole } from "../middlewear/roleMiddlewear";
import {
  getAllServiceRequestType,
  getServiceRequestTypeById,
  InsertedServiceRequestType,
  UpdatedServiceRequestType,
  DeletedServiceRequestType,
} from "../controller/ServiceRequestType.controller";

export const ServiceRequestTypeRouter = express.Router();

ServiceRequestTypeRouter.use(
  allowRole({
    GET: ["ADMIN", "HOD", "TECHNICIAN", "STAFF", "REQUESTOR"],
    POST: ["ADMIN"],
    PUT: ["ADMIN"],
    DELETE: ["ADMIN"],
  }),
);
//get all
ServiceRequestTypeRouter.get("/", getAllServiceRequestType);

//get by id
ServiceRequestTypeRouter.get("/:id", getServiceRequestTypeById);

//inserted
ServiceRequestTypeRouter.post("/", InsertedServiceRequestType);

//updated
ServiceRequestTypeRouter.put("/:id", UpdatedServiceRequestType);

//deleted
ServiceRequestTypeRouter.delete("/:id", DeletedServiceRequestType);
