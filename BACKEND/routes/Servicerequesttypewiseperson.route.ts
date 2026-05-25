import express from "express";
import { allowRole } from "../middlewear/roleMiddlewear";
import {
  getAllServiceRequestTypeWisePerson,
  getServiceRequestTypeWisePersonById,
  UpdatedServiceRequestTypeWisePerson,
  InsertedServiceRequestTypeWisePerson,
  DeletedServiceRequestTypeWisePerson,
} from "../controller/ServiceRequestTypeWise.controller";
export const ServiceRequestTypeWiseRouter = express.Router();

ServiceRequestTypeWiseRouter.use(
  allowRole({
    GET: ["ADMIN", "HOD"],
    POST: ["ADMIN"],
    PUT: ["ADMIN"],
    DELETE: ["ADMIN"],
  }),
);

//get all
ServiceRequestTypeWiseRouter.get("/", getAllServiceRequestTypeWisePerson);

//get By id
ServiceRequestTypeWiseRouter.get("/:id", getServiceRequestTypeWisePersonById);

//inserted
ServiceRequestTypeWiseRouter.post("/", InsertedServiceRequestTypeWisePerson);

//updated
ServiceRequestTypeWiseRouter.put("/:id", UpdatedServiceRequestTypeWisePerson);

//deleted
ServiceRequestTypeWiseRouter.delete(
  "/:id",
  DeletedServiceRequestTypeWisePerson,
);
