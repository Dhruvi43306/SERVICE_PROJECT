import express from "express";
import { allowRole } from "../middlewear/roleMiddlewear";
import {
  DeletedServicePriority,
  getAllServicePriority,
  getServicePriority,
  InsertedServicePriority,
  UpdatedServicePriority,
} from "../controller/Priority.controller";

export const priority = express.Router();

priority.use(
  allowRole({
    GET: ["ADMIN", "HOD", "TECHNICIAN", "REQUESTOR"],
    POST: ["ADMIN"],
    PUT: ["ADMIN"],
    DELETE: ["ADMIN"],
  }),
);

//get all
priority.get("/", getAllServicePriority);

//get by id
priority.get("/:id", getServicePriority);

//inserted
priority.post("/", InsertedServicePriority);

//updated
priority.put("/:id", UpdatedServicePriority);

//deletd
priority.delete("/:id", DeletedServicePriority);
