import express from "express";
import { allowRole } from "../middlewear/roleMiddlewear";
import {
  getAllServiceDept,
  getServiceDept,
  InsertedServiceDept,
  UpdatedServiceDept,
  DeletedServiceDept,
} from "../controller/servicedept.controller";

export const ServiceDeptRouter = express.Router();

ServiceDeptRouter.use(
  allowRole({
    GET: ["ADMIN", "HOD", "TECHNICIAN", "REQUESTOR"],
    POST: ["ADMIN"],
    PUT: ["ADMIN"],
    DELETE: ["ADMIN"],
  }),
);
//get all
ServiceDeptRouter.get("/", getAllServiceDept);

//get by id
ServiceDeptRouter.get("/:id", getServiceDept);

//inserted
ServiceDeptRouter.post("/", InsertedServiceDept);

//updated
ServiceDeptRouter.put("/:id", UpdatedServiceDept);

//deletd
ServiceDeptRouter.delete("/:id", DeletedServiceDept);
