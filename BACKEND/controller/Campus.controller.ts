import { Request, Response } from "express";
import { AuthRequest } from "../type/authRequest.type";
import {
  createCampus,
  getCampusDetail,
  listServiceCampus,
  removeCampus,
  updateCampus,
} from "../services/Campus.service";
export async function getAllServiceCampus(req: Request, res: Response) {
  try {
    const data = await listServiceCampus();
    res.status(200).json({
      err: false,
      data,
      message: "All Service Campus Fetched are SuccessFully!",
    });
  } catch (err: any) {
    console.error("GET ERROR:", err);
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
}

export async function getServiceCampus(req: Request, res: Response) {
  try {
    const deptid = Number(req.params.id);
    const data = await getCampusDetail(deptid);
    res.status(200).json({
      err: false,
      data,
      message: "Service Campus Fetched are getbyId!",
    });
  } catch (err: any) {
    console.error("GETBYID ERROR:", err);
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
}

export async function InsertedServiceCampus(req: AuthRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }
    const data = await createCampus(req.body, req.user);
    res.status(200).json({
      err: false,
      data,
      message: "All Service Campus Inserted are SuccessFully!",
    });
  } catch (err: any) {
    console.error("INSERT ERROR:", err);
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
}

export async function UpdatedServiceCampus(req: AuthRequest, res: Response) {
  try {
    const deptid = Number(req.params.id);
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }
    const data = await updateCampus(req.body, deptid, req.user);
    res.status(200).json({
      err: false,
      data,
      message: "All Service Campus Updated are SuccessFully!",
    });
  } catch (err: any) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
}

export async function DeletedServiceCampus(req: AuthRequest, res: Response) {
  try {
    const deptid = Number(req.params.id);
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }
    const data = await removeCampus(deptid, req.user);
    res.status(200).json({
      err: false,
      data,
      message: "Service Campus Deleted are SuccessFully!",
    });
  } catch (err: any) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
}
