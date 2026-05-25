import {
  listServiceRequest,
  getServiceRequestDetails,
  createServiceRequest,
  updateServiceRequest,
  removeServiceRequest,
  approveRequestByAdmin,
  assigenTech,
  ResolvetechService,
  startWorkservice,
  assignedRequestByAdmin,
} from "../services/ServiceRequest.service";
import { Request, Response } from "express";
import { AuthRequest } from "../type/authRequest.type";
import { createNotification } from "../services/Notification.servcie";
import { io } from "../server";
import { getByIdUsers } from "../models/users.model";
export async function getAllServiceRequest(req: AuthRequest, res: Response) {
  try {
    const role = req.user?.Role || "";
    const search = (req.query.search as string) || "";
    const data = await listServiceRequest(role, search);
    res.status(200).json({
      error: false,
      data,
      message: "All ServiceRequest are SuccesFully Feached!",
    });
  } catch (err: any) {
    console.error("GETB ERROR:", err);
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
}

export async function getServiceRequestById(req: Request, res: Response) {
  try {
    const reqid = Number(req.params.id);
    const data = await getServiceRequestDetails(reqid);
    res.status(200).json({
      error: false,
      data,
      message: "ServiceRequest are SuccesFully Feached ById!",
    });
  } catch (err: any) {
    console.error("GETBYID ERROR:", err);
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
}

export async function InsertedServiceRequest(req: AuthRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }
    const data = await createServiceRequest(req.body, req.user);
    res.status(200).json({
      error: false,
      data,
      message: "All ServiceRequest are SuccesFully Inserted!",
    });
  } catch (err: any) {
    console.error("INSERT ERROR:", err);
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
}

export async function UpdatedServiceRequest(req: AuthRequest, res: Response) {
  try {
    const reqid = Number(req.params.id);
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }
    const data = await updateServiceRequest(req.body, reqid, req.user);
    res.status(200).json({
      error: false,
      data,
      message: "ServiceRequest are SuccesFully Updated!",
    });
  } catch (err: any) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
}

export async function DeletedServiceRequest(req: AuthRequest, res: Response) {
  try {
    const reqid = Number(req.params.id);
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }
    const data = await removeServiceRequest(reqid, req.user);
    res.status(200).json({
      error: false,
      data,
      message: "ServiceRequest are SuccesFully Deleted!",
    });
  } catch (err: any) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
}

export async function adminApproveController(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const adminId = Number(req.body.adminId);

    const data = await approveRequestByAdmin(id, adminId);

    res.status(200).json({
      error: false,
      data,
      message: "Request approved by admin",
    });
  } catch (err: any) {
    console.error("Approved ERROR:", err);
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
}
export async function adminAssignedController(req: AuthRequest, res: Response) {
  try {
    const id = Number(req.params.id);
    const adminId = req.user?.UserID;
    const technicianID = Number(req.params.id);
    console.log("REQ USER:", req.user);
    if (!adminId) {
      return res.status(401).json({
        message: "Unauthorized: user not found",
      });
    }
    const data = await assignedRequestByAdmin(id, adminId, technicianID);

    res.status(200).json({
      error: false,
      data,
      message: "Request Assigned by admin",
    });
  } catch (err: any) {
    console.error("Assigned ERROR:", err);
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
}
export async function hodassigenByTech(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const hodID = Number(req.body.hodID);
    const technicianID = Number(req.body.technicianID);
    const data = await assigenTech(id, hodID, technicianID);

    res.status(200).json({
      error: false,
      data,
      message: "Request Assigned by admin",
    });
  } catch (err: any) {
    console.error("Assigned ERROR:", err);
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
}

export async function ResolvedByTechnition(req: AuthRequest, res: Response) {
  try {
    const requestId = Number(req.params.id);
    const techUser = req.user;

    //  FIX 1: handle undefined user
    if (!techUser) {
      return res.status(401).send("Unauthorized");
    }

    //  FIX 2: get body values correctly
    const technicianID = techUser.UserID;
    const resolutionSummary = req.body.resolutionSummary;
    const workDone = req.body.workDone;

    //  FIX 3: use correct requestId
    await ResolvetechService(
      technicianID,
      requestId,
      resolutionSummary,
      workDone,
    );

    // FIX 4: get request from ServiceRequest table
    const request = await getServiceRequestDetails(requestId);
    if (!request) {
      return res.status(404).send("Request not found");
    }

    //  FIX 5: send notification
    await createNotification(
      {
        UserID: request.UserID,
        ServiceRequestID: requestId,
        message: `Technician ${techUser.FullName} resolved your request`,
        ServiceType: "request_resolved",
        is_read: 0,
        link: null,
      },
      techUser,
    );

    io.to(request.UserID.toString()).emit("new_notification", {
      message: `Technician ${techUser.FullName} started working on your request`,
    });

    res.status(200).json({
      message: "Resolved + notified ",
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}

export async function startWorkController(req: AuthRequest, res: Response) {
  try {
    const requestId = Number(req.params.id);
    const techUser = req.user;

    if (!techUser) return res.status(401).send("Unauthorized");
    const fullUser = await getByIdUsers(techUser.UserID);
    await startWorkservice(requestId);

    const request = await getServiceRequestDetails(requestId);
    if (!request) return res.status(404).send("Request not found");

    const message = `Technician ${fullUser?.FullName || "Unknown"} started work`;

    const notification = await createNotification(
      {
        UserID: request.UserID,
        ServiceRequestID: requestId,
        message,
        ServiceType: "assigned",
        is_read: 0,
        link: null,
      },
      techUser,
    );

    io.to(request.UserID.toString()).emit("new_notification", {
      message,
      notification,
    });

    res.status(200).json({
      message: "Work started + notification sent",
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}
