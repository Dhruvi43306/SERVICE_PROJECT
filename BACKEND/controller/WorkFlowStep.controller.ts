import { Request, Response } from "express";
import { AuthRequest } from "../type/authRequest.type";
import {
  createWorkflowStep,
  getWorkflowStepDetail,
  listServiceWorkflowStep,
  removeWorkflowStep,
  updateWorkflowStep,
} from "../services/WorkFlowStep.service";
export async function getAllServiceWorkflowStep(req: Request, res: Response) {
  try {
    const data = await listServiceWorkflowStep();
    res.status(200).json({
      err: false,
      data,
      message: "All Service WorkflowStep Fetched are SuccessFully!",
    });
  } catch (err: any) {
    console.error("GET ERROR:", err);
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
}

export async function getServiceWorkflowStep(req: Request, res: Response) {
  try {
    const deptid = Number(req.params.id);
    const data = await getWorkflowStepDetail(deptid);
    res.status(200).json({
      err: false,
      data,
      message: "Service WorkflowStep Fetched are getbyId!",
    });
  } catch (err: any) {
    console.error("GETBYID ERROR:", err);
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
}

export async function InsertedServiceWorkflowStep(
  req: AuthRequest,
  res: Response,
) {
  try {
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }
    const data = await createWorkflowStep(req.body, req.user);
    res.status(200).json({
      err: false,
      data,
      message: "All Service WorkflowStep Inserted are SuccessFully!",
    });
  } catch (err: any) {
    console.error("INSERT ERROR:", err);
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
}

export async function UpdatedServiceWorkflowStep(
  req: AuthRequest,
  res: Response,
) {
  try {
    const deptid = Number(req.params.id);
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }
    const data = await updateWorkflowStep(req.body, deptid, req.user);
    res.status(200).json({
      err: false,
      data,
      message: "All Service WorkflowStep Updated are SuccessFully!",
    });
  } catch (err: any) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
}

export async function DeletedServiceWorkflowStep(
  req: AuthRequest,
  res: Response,
) {
  try {
    const deptid = Number(req.params.id);
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }
    const data = await removeWorkflowStep(deptid, req.user);
    res.status(200).json({
      err: false,
      data,
      message: "Service WorkflowStep Deleted are SuccessFully!",
    });
  } catch (err: any) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
}
