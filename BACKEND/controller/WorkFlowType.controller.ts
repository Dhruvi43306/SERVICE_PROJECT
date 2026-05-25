import { Request, Response } from "express";
import { AuthRequest } from "../type/authRequest.type";
import {
  createWorkflowType,
  getWorkflowTypeDetail,
  listServiceWorkflowType,
  removeWorkflowType,
  updateWorkflowType,
} from "../services/WorkFlowType.service";
export async function getAllServiceWorkflowType(req: Request, res: Response) {
  try {
    const data = await listServiceWorkflowType();
    res.status(200).json({
      err: false,
      data,
      message: "All Service WorkflowType Fetched are SuccessFully!",
    });
  } catch (err: any) {
    console.error("GET ERROR:", err);
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
}

export async function getServiceWorkflowType(req: Request, res: Response) {
  try {
    const deptid = Number(req.params.id);
    const data = await getWorkflowTypeDetail(deptid);
    res.status(200).json({
      err: false,
      data,
      message: "Service WorkflowType Fetched are getbyId!",
    });
  } catch (err: any) {
    console.error("GETBYID ERROR:", err);
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
}

export async function InsertedServiceWorkflowType(
  req: AuthRequest,
  res: Response,
) {
  try {
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }
    const data = await createWorkflowType(req.body, req.user);
    res.status(200).json({
      err: false,
      data,
      message: "All Service WorkflowType Inserted are SuccessFully!",
    });
  } catch (err: any) {
    console.error("INSERT ERROR:", err);
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
}

export async function UpdatedServiceWorkflowType(
  req: AuthRequest,
  res: Response,
) {
  try {
    const deptid = Number(req.params.id);
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }
    const data = await updateWorkflowType(req.body, deptid, req.user);
    res.status(200).json({
      err: false,
      data,
      message: "All Service WorkflowType Updated are SuccessFully!",
    });
  } catch (err: any) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
}

export async function DeletedServiceWorkflowType(
  req: AuthRequest,
  res: Response,
) {
  try {
    const deptid = Number(req.params.id);
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }
    const data = await removeWorkflowType(deptid, req.user);
    res.status(200).json({
      err: false,
      data,
      message: "Service WorkflowType Deleted are SuccessFully!",
    });
  } catch (err: any) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
}
