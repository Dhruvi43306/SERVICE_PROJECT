import express from "express";
import { allowRole } from "../middlewear/roleMiddlewear";
import {
  DeletedServiceCampus,
  getAllServiceCampus,
  getServiceCampus,
  InsertedServiceCampus,
  UpdatedServiceCampus,
} from "../controller/Campus.controller";

export const campusRouter = express.Router();

campusRouter.use(
  allowRole({
    GET: ["ADMIN", "HOD", "TECHNICIAN"],
    POST: ["ADMIN"],
    PUT: ["ADMIN"],
    DELETE: ["ADMIN"],
  }),
);
//get all
campusRouter.get("/", getAllServiceCampus);

//get by id
campusRouter.get("/:id", getServiceCampus);

//inserted
campusRouter.post("/", InsertedServiceCampus);

//updated
campusRouter.put("/:id", UpdatedServiceCampus);

//deletd
campusRouter.delete("/:id", DeletedServiceCampus);
