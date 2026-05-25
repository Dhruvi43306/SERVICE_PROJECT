import { Request, Response } from "express";
import { AuthRequest } from "../type/authRequest.type";
import {
  createPriority,
  getPriorityDetail,
  listServicePriority,
  removePriority,
  updatePriority,
} from "../services/Priority.service";
export async function getAllServicePriority(req: Request, res: Response) {
  try {
    const data = await listServicePriority();
    res.status(200).json({
      err: false,
      data,
      message: "All Service Priority Fetched are SuccessFully!",
    });
  } catch (err: any) {
    console.error("GET ERROR:", err);
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
}

export async function getServicePriority(req: Request, res: Response) {
  try {
    const deptid = Number(req.params.id);
    const data = await getPriorityDetail(deptid);
    res.status(200).json({
      err: false,
      data,
      message: "Service Priority Fetched are getbyId!",
    });
  } catch (err: any) {
    console.error("GETBYID ERROR:", err);
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
}

export async function InsertedServicePriority(req: AuthRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }
    const data = await createPriority(req.body, req.user);
    res.status(200).json({
      err: false,
      data,
      message: "All Service Priority Inserted are SuccessFully!",
    });
  } catch (err: any) {
    console.error("INSERT ERROR:", err);
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
}

export async function UpdatedServicePriority(req: AuthRequest, res: Response) {
  try {
    const deptid = Number(req.params.id);
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }
    const data = await updatePriority(req.body, deptid, req.user);
    res.status(200).json({
      err: false,
      data,
      message: "All Service Priority Updated are SuccessFully!",
    });
  } catch (err: any) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
}

export async function DeletedServicePriority(req: AuthRequest, res: Response) {
  try {
    const deptid = Number(req.params.id);
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }
    const data = await removePriority(deptid, req.user);
    res.status(200).json({
      err: false,
      data,
      message: "Service Priority Deleted are SuccessFully!",
    });
  } catch (err: any) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
}
