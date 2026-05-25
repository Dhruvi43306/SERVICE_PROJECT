import {
  listServiceType,
  getServiceTypeDetail,
  createServiceType,
  updateServiceType,
  removeServiceType,
} from "../services/ServiceType.service";
import { Request, Response } from "express";
import { AuthRequest } from "../type/authRequest.type";
export async function getAllServiceType(req: AuthRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }
    const data = await listServiceType(req.user);
    res.status(200).json({
      error: false,
      data,
      message: "All ServiceType are SuccesFully Feached!",
    });
  } catch (err: any) {
    console.error("GET ERROR:", err);
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
}

export async function getServiceTypeById(req: Request, res: Response) {
  try {
    const typeid = Number(req.params.id);
    const data = await getServiceTypeDetail(typeid);
    res.status(200).json({
      error: false,
      data,
      message: "ServiceType are SuccesFully Feached GetById!",
    });
  } catch (err: any) {
    console.error("GETBYID ERROR:", err);
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
}

export async function InsertedServiceType(req: AuthRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }
    const data = await createServiceType(req.body, req.user);
    res.status(200).json({
      error: false,
      data,
      message: "ServiceType are SuccesFully Inserted!",
    });
  } catch (err: any) {
    console.error("INSERT ERROR:", err);
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
}

export async function UpdatedServiceType(req: AuthRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }
    const typeid = Number(req.params.id);
    const data = await updateServiceType(req.body, typeid, req.user);
    res.status(200).json({
      error: false,
      data,
      message: "ServiceType are SuccesFully Updated!",
    });
  } catch (err: any) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
}

export async function DeletedServiceType(req: AuthRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }
    const typeid = Number(req.params.id);
    const data = await removeServiceType(typeid, req.user);
    res.status(200).json({
      error: false,
      data,
      message: "ServiceType are SuccesFully Deleted!",
    });
  } catch (err: any) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
}
