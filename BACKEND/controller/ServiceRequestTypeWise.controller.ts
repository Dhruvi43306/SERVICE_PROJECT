import {
  listServiceRequestTypeWisePerson,
  getServiceRequestTypeWisePersonesDetails,
  createServiceRequestTypeWisePerson,
  updateServiceRequestTypeWisePerson,
  removeServiceRequestTypeWisePerson,
} from "../services/Servicerequesttypewiseperson.service";
import { Request, Response } from "express";
import { AuthRequest } from "../type/authRequest.type";
export async function getAllServiceRequestTypeWisePerson(
  req: Request,
  res: Response,
) {
  try {
    const data = await listServiceRequestTypeWisePerson();
    res.status(200).json({
      error: false,
      data,
      message: "All ServiceRequestTypeWisePerson are SuccesFully Feached!",
    });
  } catch (err: any) {
    console.error("GET ERROR:", err);
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
}

export async function getServiceRequestTypeWisePersonById(
  req: Request,
  res: Response,
) {
  try {
    const personid = Number(req.params.id);
    const data = await getServiceRequestTypeWisePersonesDetails(personid);
    res.status(200).json({
      error: false,
      data,
      message: "ServiceRequestTypeWisePerson are SuccesFully Feached By Id!",
    });
  } catch (err: any) {
    console.error("GETBYID ERROR:", err);
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
}

export async function InsertedServiceRequestTypeWisePerson(
  req: Request,
  res: Response,
) {
  try {
    const data = await createServiceRequestTypeWisePerson(req.body);
    res.status(200).json({
      error: false,
      data,
      message: "All ServiceRequestTypeWisePerson are SuccesFully Inserted!",
    });
  } catch (err: any) {
    console.error("INSERT ERROR:", err);
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
}

export async function UpdatedServiceRequestTypeWisePerson(
  req: AuthRequest,
  res: Response,
) {
  try {
    const personid = Number(req.params.id);
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }
    const data = await updateServiceRequestTypeWisePerson(
      req.body,
      personid,
      req.user,
    );
    res.status(200).json({
      error: false,
      data,
      message: "ServiceRequestTypeWisePerson are SuccesFully Updated!",
    });
  } catch (err: any) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
}

export async function DeletedServiceRequestTypeWisePerson(
  req: AuthRequest,
  res: Response,
) {
  try {
    const personid = Number(req.params.id);
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }
    const data = await removeServiceRequestTypeWisePerson(personid, req.user);
    res.status(200).json({
      error: false,
      data,
      message: "ServiceRequestTypeWisePerson are SuccesFully Deleted!",
    });
  } catch (err: any) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
}
