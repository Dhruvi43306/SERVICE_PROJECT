import express from "express";
import { allowRole } from "../middlewear/roleMiddlewear";
import {
  DeletedServiceCampus,
  getAllServiceCampus,
  getServiceCampus,
  InsertedServiceCampus,
  UpdatedServiceCampus,
} from "../controller/Campus.controller";
import {
  DeletedServiceNotification,
  getAllServiceNotification,
  getNotificationByUserController,
  getServiceNotification,
  InsertedServiceNotification,
  UpdatedServiceNotification,
} from "../controller/Notification.controller";

export const notifyRouter = express.Router();

notifyRouter.use(
  allowRole({
    GET: ["ADMIN", "HOD", "TECHNICIAN", "REQUESTOR"],
    POST: ["ADMIN", "HOD", "TECHNICIAN"],
    PUT: ["ADMIN", "HOD", "TECHNICIAN"],
    DELETE: ["ADMIN", "TECHNICIAN", "HOD"],
  }),
);
//get all
notifyRouter.get("/", getAllServiceNotification);

//user-notifyid
notifyRouter.get("/user/:userId", getNotificationByUserController);

//get by id
notifyRouter.get("/:id", getServiceNotification);

//inserted
notifyRouter.post("/", InsertedServiceNotification);

//updated
notifyRouter.put("/:id", UpdatedServiceNotification);

//deletd
notifyRouter.delete("/:id", DeletedServiceNotification);
