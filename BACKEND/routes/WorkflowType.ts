import express from "express";
import { allowRole } from "../middlewear/roleMiddlewear";
import {
  DeletedServiceWorkflowType,
  getAllServiceWorkflowType,
  getServiceWorkflowType,
  InsertedServiceWorkflowType,
  UpdatedServiceWorkflowType,
} from "../controller/WorkFlowType.controller";

export const workflowtype = express.Router();

workflowtype.use(
  allowRole({
    GET: ["ADMIN", "HOD", "TECHNICIAN"],
    POST: ["ADMIN"],
    PUT: ["ADMIN"],
    DELETE: ["ADMIN"],
  }),
);

//get all
workflowtype.get("/", getAllServiceWorkflowType);

//get by id
workflowtype.get("/:id", getServiceWorkflowType);

//inserted
workflowtype.post("/", InsertedServiceWorkflowType);

//updated
workflowtype.put("/:id", UpdatedServiceWorkflowType);

//deletd
workflowtype.delete("/:id", DeletedServiceWorkflowType);
