import { ResultSetHeader } from "mysql2";
import {
  findAllServiceRequest,
  findServiceRequestById,
  insertServiceRequest,
  updateServiceRequestById,
  deleteServiceRequestById,
  adminApproveRequest,
  hodAssigned,
  resolveByTechnician,
  startworkByTech,
  adminAssignedRequest,
} from "../models/ServiceRequest.model";
import { ServiceRequest } from "../type/serviceRequest";
import { User } from "../type/users.type";
import { findServiceRequestTypeById } from "../models/ServiceRequestType.model";

export async function listServiceRequest(
  role: string,
  search: string = "",
): Promise<ServiceRequest[]> {
  return await findAllServiceRequest(role, search);
}

export async function getServiceRequestDetails(
  id: number,
): Promise<ServiceRequest | null> {
  if (!id) {
    throw new Error("ServiceRequest ID is required");
  }
  return await findServiceRequestById(id);
}

export async function createServiceRequest(
  formdata: ServiceRequest,
  user: User,
): Promise<ResultSetHeader> {
  if (user.Role != "REQUESTOR" && user.Role != "ADMIN") {
    throw new Error("Only REQUESTOR or Admin can create request");
  }
  if (!formdata.ServiceRequestTitle || !formdata.ServiceRequestTypeID) {
    throw new Error("Required fields missing");
  }
  const requesttype = await findServiceRequestTypeById(
    formdata.ServiceRequestTypeID,
  );
  if (!requesttype) throw new Error("Invalid Service Request Type");
  const payload = {
    ...formdata,
    StaffID: null,
    ServiceDeptID: requesttype.ServiceDeptID,
    ServiceRequestNo: `SR-${Date.now()}`,
    ServiceRequestDateTime: new Date(),
    ServiceRequestStatusID: 1,
    UserID: user.UserID,
  };
  return await insertServiceRequest(payload);
}

export async function updateServiceRequest(
  formdata: ServiceRequest,
  id: number,
  user: User,
): Promise<ResultSetHeader> {
  if (!user || (user.Role !== "ADMIN" && user.Role !== "REQUESTOR")) {
    throw new Error("Unauthorized update");
  }
  return await updateServiceRequestById(formdata, id);
}

export async function removeServiceRequest(
  id: number,
  user: User,
): Promise<ResultSetHeader> {
  if (!id) {
    throw new Error("ServiceRequest ID is required");
  }
  if (!user || user.Role !== "ADMIN") {
    throw new Error("Only ADMIN can delete service request");
  }
  return await deleteServiceRequestById(id);
}

export async function approveRequestByAdmin(
  id: number,
  adminId: number,
): Promise<ResultSetHeader> {
  return await adminApproveRequest(id, adminId);
}

export async function assignedRequestByAdmin(
  id: number,
  adminId: number,
  technicianID: number,
): Promise<ResultSetHeader> {
  return await adminAssignedRequest(id, technicianID, adminId);
}

export async function assigenTech(
  id: number,
  hodID: number,
  technicianID: number,
): Promise<ResultSetHeader> {
  return await hodAssigned(id, hodID, technicianID);
}

export async function ResolvetechService(
  technicianID: number,
  requestID: number,
  resolutionSummary: string,
  workDone: string,
): Promise<ResultSetHeader> {
  return await resolveByTechnician(
    requestID,
    technicianID,
    resolutionSummary,
    workDone,
  );
}

export async function startWorkservice(requestID: number) {
  if (!requestID) {
    throw new Error("Missing required fields");
  }

  const data = await startworkByTech(requestID);

  return data;
}
