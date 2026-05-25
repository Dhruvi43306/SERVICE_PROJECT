import express from "express";
import { allowRole } from "../middlewear/roleMiddlewear";
import {
  getAllServiceRequestReply,
  getServiceRequestReplyById,
  InsertedServiceRequestReply,
  UpadtedServiceRequestReply,
  DeletedServiceRequestReply,
} from "../controller/ServiceRequestReply.controller";

export const ServiceRequestReplyRouter = express.Router();

ServiceRequestReplyRouter.use(
  allowRole({
    GET: ["ADMIN", "HOD", "TECHNICIAN", "STAFF", "REQUESTOR"],
    POST: ["ADMIN", "TECHNITION"],
    PUT: ["ADMIN", "TECHNITION"],
    DELETE: ["ADMIN"],
  }),
);
//get all
ServiceRequestReplyRouter.get("/", getAllServiceRequestReply);

//get by id
ServiceRequestReplyRouter.get("/:id", getServiceRequestReplyById);

//insert
ServiceRequestReplyRouter.post("/", InsertedServiceRequestReply);

//updated
ServiceRequestReplyRouter.put("/:id", UpadtedServiceRequestReply);

//deletd
ServiceRequestReplyRouter.delete("/:id", DeletedServiceRequestReply);
