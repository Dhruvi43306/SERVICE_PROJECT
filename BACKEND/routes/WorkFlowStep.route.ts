import express from "express";
import { allowRole } from "../middlewear/roleMiddlewear";
import {
  DeletedServiceWorkflowStep,
  getAllServiceWorkflowStep,
  getServiceWorkflowStep,
  InsertedServiceWorkflowStep,
  UpdatedServiceWorkflowStep,
} from "../controller/WorkFlowStep.controller";

export const workflowstep = express.Router();

workflowstep.use(
  allowRole({
    GET: ["ADMIN", "HOD", "TECHNICIAN"],
    POST: ["ADMIN"],
    PUT: ["ADMIN"],
    DELETE: ["ADMIN"],
  }),
);

//get all
workflowstep.get("/", getAllServiceWorkflowStep);

//get by id
workflowstep.get("/:id", getServiceWorkflowStep);

//inserted
workflowstep.post("/", InsertedServiceWorkflowStep);

//updated
workflowstep.put("/:id", UpdatedServiceWorkflowStep);

//deletd
workflowstep.delete("/:id", DeletedServiceWorkflowStep);
