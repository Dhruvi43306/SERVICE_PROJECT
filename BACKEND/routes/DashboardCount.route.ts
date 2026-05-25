import express from "express";
import { dashboardCounts } from "../controller/DashboardCount.contoller";

export const dashrouter = express.Router();

dashrouter.get("/", dashboardCounts);
