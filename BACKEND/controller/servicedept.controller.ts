import { Request, Response } from "express";
import {
  listServiceDept,
  getServiceDeptDetail,
  createServiceDept,
  updateServiceDept,
  removeServiceDept,
} from "../services/ServiceDept.service";
import { AuthRequest } from "../type/authRequest.type";
export async function getAllServiceDept(req: Request, res: Response) {
  try {
    const data = await listServiceDept();
    res.status(200).json({
      err: false,
      data,
      message: "All Service Departmnet Fetched are SuccessFully!",
    });
  } catch (err: any) {
    console.error("GET ERROR:", err);
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
}

export async function getServiceDept(req: Request, res: Response) {
  try {
    const deptid = Number(req.params.id);
    const data = await getServiceDeptDetail(deptid);
    res.status(200).json({
      err: false,
      data,
      message: "Service Departmnet Fetched are getbyId!",
    });
  } catch (err: any) {
    console.error("GETBYID ERROR:", err);
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
}

export async function InsertedServiceDept(req: AuthRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }
    const data = await createServiceDept(req.body, req.user);
    res.status(200).json({
      err: false,
      data,
      message: "All Service Departmnet Inserted are SuccessFully!",
    });
  } catch (err: any) {
    console.error("INSERT ERROR:", err);
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
}

export async function UpdatedServiceDept(req: AuthRequest, res: Response) {
  try {
    const deptid = Number(req.params.id);
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }
    const data = await updateServiceDept(req.body, deptid, req.user);
    res.status(200).json({
      err: false,
      data,
      message: "All Service Departmnet Updated are SuccessFully!",
    });
  } catch (err: any) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
}

export async function DeletedServiceDept(req: AuthRequest, res: Response) {
  try {
    const deptid = Number(req.params.id);
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }
    const data = await removeServiceDept(deptid, req.user);
    res.status(200).json({
      err: false,
      data,
      message: "Service Departmnet Deleted are SuccessFully!",
    });
  } catch (err: any) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
}
