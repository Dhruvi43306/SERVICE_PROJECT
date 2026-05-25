import express from "express";
import { allowRole } from "../middlewear/roleMiddlewear";
import {
  getAllServiceDeptPerson,
  UpdatedServiceDeptPerson,
  InsertedServiceDeptPerson,
  DeletedServiceDeptPerson,
  getServiceDeptPerson,
} from "../controller/ServiceDeptPerson.controller";
export const ServiceDeptPersonRouter = express.Router();

ServiceDeptPersonRouter.use(
  allowRole({
    GET: ["ADMIN", "HOD"],
    POST: ["ADMIN"],
    PUT: ["ADMIN"],
    DELETE: ["ADMIN"],
  }),
);
//get all
ServiceDeptPersonRouter.get("/", getAllServiceDeptPerson);

//get by id
ServiceDeptPersonRouter.get("/:id", getServiceDeptPerson);

//inserted
ServiceDeptPersonRouter.post("/", InsertedServiceDeptPerson);

//updated
ServiceDeptPersonRouter.put("/:id", UpdatedServiceDeptPerson);

//deleted
ServiceDeptPersonRouter.delete("/:id", DeletedServiceDeptPerson);
