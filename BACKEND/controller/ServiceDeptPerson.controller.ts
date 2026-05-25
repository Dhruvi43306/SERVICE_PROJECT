import {
  listServiceDeptPerson,
  getServiceDeptPersonDetails,
  createServiceDeptPerson,
  updateServiceDeptPerson,
  deleteServiceDeptPerson,
} from "../services/ServiceDeptPerson.service";
import { Request, Response } from "express";
import { AuthRequest } from "../type/authRequest.type";
export async function getAllServiceDeptPerson(req: Request, res: Response) {
  try {
    const data = await listServiceDeptPerson();
    res.status(200).json({
      error: false,
      data,
      message: "All ServiceDept Person are SuccesFully Feached!",
    });
  } catch (err: any) {
    console.error("GET ERROR:", err);
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
}

export async function getServiceDeptPerson(req: Request, res: Response) {
  try {
    const deptid = Number(req.params.id);
    const data = await getServiceDeptPersonDetails(deptid);
    res.status(200).json({
      error: false,
      data,
      message: "ServiceDept Person are SuccesFully Feached By id!",
    });
  } catch (err: any) {
    console.error("GETBYID ERROR:", err);
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
}

export async function InsertedServiceDeptPerson(
  req: AuthRequest,
  res: Response,
) {
  try {
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }
    const data = await createServiceDeptPerson(req.body, req.user);
    res.status(200).json({
      error: false,
      data,
      message: "All ServiceDept Person are SuccesFully Inserted!",
    });
  } catch (err: any) {
    console.error("INSERT ERROR:", err);
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
}

export async function UpdatedServiceDeptPerson(
  req: AuthRequest,
  res: Response,
) {
  try {
    const deptid = Number(req.params.id);
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }
    const data = await updateServiceDeptPerson(req.body, deptid, req.user);
    res.status(200).json({
      error: false,
      data,
      message: "ServiceDept Person are SuccesFully Updated!",
    });
  } catch (err: any) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
}

export async function DeletedServiceDeptPerson(
  req: AuthRequest,
  res: Response,
) {
  const deptid = Number(req.params.id);
  if (!req.user) {
    return res.status(401).send("Unauthorized");
  }
  const data = await deleteServiceDeptPerson(deptid, req.user);
  try {
    res.status(200).json({
      error: false,
      data,
      message: "ServiceDept Person are SuccesFully Deleted!",
    });
  } catch (err: any) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
}
