import { Request, Response } from "express";
import { AuthRequest } from "../type/authRequest.type";
import {
  createNotification,
  getNotificationByUser,
  getNotificationDetail,
  listServiceNotification,
  removeNotification,
  updateNotification,
} from "../services/Notification.servcie";
import { ServiceRequestStatusTechByController } from "./ServiceRequestStatus.controller";
import { getServiceRequestDetails } from "../services/ServiceRequest.service";

// GET ALL NOTIFICATIONS
export async function getAllServiceNotification(
  req: AuthRequest,
  res: Response,
) {
  try {
    const data = await listServiceNotification();
    res
      .status(200)
      .json({
        err: false,
        data,
        message: "All Service Notifications fetched successfully!",
      });
  } catch (err: any) {
    console.error("GET ERROR:", err);
    res.status(500).json({ error: true, message: err.message });
  }
}

// GET NOTIFICATION BY ID
export async function getServiceNotification(req: AuthRequest, res: Response) {
  try {
    const notifyId = Number(req.params.id);
    const data = await getNotificationDetail(notifyId);
    res
      .status(200)
      .json({
        err: false,
        data,
        message: "Service Notification fetched successfully!",
      });
  } catch (err: any) {
    console.error("GETBYID ERROR:", err);
    res.status(500).json({ error: true, message: err.message });
  }
}

// GET NOTIFICATIONS FOR LOGGED-IN USER
export async function getNotificationByUserController(
  req: AuthRequest,
  res: Response,
) {
  try {
    if (!req.user)
      return res.status(401).json({ error: true, message: "Unauthorized" });
    const userId = Number(req.user.UserID);
    const data = await getNotificationByUser(userId);
    res
      .status(200)
      .json({
        err: false,
        data,
        message: "User Notifications fetched successfully",
      });
  } catch (err: any) {
    console.error("GET USER NOTIFY ERROR:", err);
    res.status(500).json({ error: true, message: err.message });
  }
}

// CREATE NOTIFICATION
export async function InsertedServiceNotification(
  req: AuthRequest,
  res: Response,
) {
  try {
    if (!req.user) return res.status(401).send("Unauthorized");
    const data = await createNotification(req.body, req.user);
    res
      .status(200)
      .json({
        err: false,
        data,
        message: "Notification inserted successfully!",
      });
  } catch (err: any) {
    console.error("INSERT ERROR:", err);
    res.status(500).json({ error: true, message: err.message });
  }
}

// UPDATE NOTIFICATION
export async function UpdatedServiceNotification(
  req: AuthRequest,
  res: Response,
) {
  try {
    const notifyId = Number(req.params.id);
    if (!req.user) return res.status(401).send("Unauthorized");
    const data = await updateNotification(req.body, notifyId, req.user);
    res
      .status(200)
      .json({
        err: false,
        data,
        message: "Notification updated successfully!",
      });
  } catch (err: any) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ error: true, message: err.message });
  }
}

// DELETE NOTIFICATION
export async function DeletedServiceNotification(
  req: AuthRequest,
  res: Response,
) {
  try {
    const notifyId = Number(req.params.id);
    if (!req.user) return res.status(401).send("Unauthorized");
    const data = await removeNotification(notifyId, req.user);
    res
      .status(200)
      .json({
        err: false,
        data,
        message: "Notification deleted successfully!",
      });
  } catch (err: any) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ error: true, message: err.message });
  }
}

// TECH START WORK
export async function startWork(req: AuthRequest, res: Response) {
  const requestId = Number(req.params.id);
  const techUser = req.user;
  if (!techUser) return res.status(401).send("Unauthorized");

  const request = await getServiceRequestDetails(requestId);
  if (!request) return res.status(404).send("Request not found");

  await ServiceRequestStatusTechByController(req, res, 28); // Correct: pass req
  console.log("NOTIFICATION USER:", request.UserID);
  await createNotification(
    {
      UserID: request.UserID,
      ServiceRequestID: requestId,
      message: `Technician ${techUser.FullName} has started work on your request.`,
      ServiceType: "assigned",
      is_read: 0,
      link: null,
    },
    techUser,
  );

  res.status(200).json({ message: "Work Started and Notification Sent" });
}

// TECH RESOLVE REQUEST
export async function resolveRequest(req: AuthRequest, res: Response) {
  const requestId = Number(req.params.id);
  const techUser = req.user;
  if (!techUser) return res.status(401).send("Unauthorized");

  const request = await getServiceRequestDetails(requestId);
  if (!request) return res.status(404).send("Request not found");

  await ServiceRequestStatusTechByController(req, res, 28);

  await createNotification(
    {
      UserID: request.UserID,
      ServiceRequestID: requestId,
      message: `Technician ${techUser.FullName} has resolved your request.`,
      ServiceType: "request_resolved",
      is_read: 0,
      link: null,
    },
    techUser,
  );

  res.status(200).json({ message: "Request Resolved and Notification Sent" });
}
