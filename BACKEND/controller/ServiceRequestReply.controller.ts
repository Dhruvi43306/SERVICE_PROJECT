import {
  listServcieRequestReply,
  getServcieRequestReplyDetail,
  createServcieRequestReply,
  updateServcieRequestReply,
  deleteServcieRequestReply,
} from "../services/ServiceRequestReply.service";
import { Request, Response } from "express";
import { AuthRequest } from "../type/authRequest.type";
export async function getAllServiceRequestReply(req: Request, res: Response) {
  try {
    const data = await listServcieRequestReply();
    res.status(200).json({
      error: false,
      data,
      message: "All ServiceRequestReply are SuccessFully Feached!",
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "All ServiceRequestReply are Not Feached!",
    });
  }
}

export async function getServiceRequestReplyById(req: Request, res: Response) {
  try {
    const reqreply = Number(req.params.id);
    const data = await getServcieRequestReplyDetail(reqreply);
    res.status(200).json({
      error: false,
      data,
      message: "ServiceRequestReply are SuccessFully Feached ById!",
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "ServiceRequestReply are Not Feached ById!",
    });
  }
}

export async function InsertedServiceRequestReply(
  req: AuthRequest,
  res: Response,
) {
  try {
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }
    const data = await createServcieRequestReply(req.body, req.user);
    res.status(200).json({
      error: false,
      data,
      message: "All ServiceRequestReply are SuccessFully Inserted!",
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "All ServiceRequestReply are Not Inserted!",
    });
  }
}

export async function UpadtedServiceRequestReply(
  req: AuthRequest,
  res: Response,
) {
  try {
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }
    const reqreply = Number(req.params.id);
    const data = await updateServcieRequestReply(req.body, reqreply, req.user);
    res.status(200).json({
      error: false,
      data,
      message: "ServiceRequestReply are SuccessFully Updated!",
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "All ServiceRequestReply are Not Updated!",
    });
  }
}

export async function DeletedServiceRequestReply(
  req: AuthRequest,
  res: Response,
) {
  try {
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }
    const reqreply = Number(req.params.id);
    const data = await deleteServcieRequestReply(reqreply, req.user);
    res.status(200).json({
      error: false,
      data,
      message: "ServiceRequestReply are SuccessFully Deleted!",
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "All ServiceRequestReply are Not Deleted!",
    });
  }
}
