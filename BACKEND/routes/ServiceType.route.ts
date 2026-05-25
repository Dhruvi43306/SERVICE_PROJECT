import express from "express";
import { allowRole } from "../middlewear/roleMiddlewear";
import {
  getAllServiceType,
  getServiceTypeById,
  InsertedServiceType,
  UpdatedServiceType,
  DeletedServiceType,
} from "../controller/ServiceType.controller";

export const ServiceTypeRouter = express.Router();
ServiceTypeRouter.use(
  allowRole({
    GET: ["ADMIN", "HOD", "TECHNICIAN", "STAFF", "REQUESTOR"],
    POST: ["ADMIN"],
    PUT: ["ADMIN"],
    DELETE: ["ADMIN"],
  }),
);
//get all
ServiceTypeRouter.get("/", getAllServiceType);

//get by id
ServiceTypeRouter.get("/:id", getServiceTypeById);

//inserted
ServiceTypeRouter.post("/", InsertedServiceType);

//updated
ServiceTypeRouter.put("/:id", UpdatedServiceType);

//deletd
ServiceTypeRouter.delete("/:id", DeletedServiceType);
