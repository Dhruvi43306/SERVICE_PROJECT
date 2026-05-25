import { ResultSetHeader } from "mysql2";
import {
  findAllServiceRequestStatus,
  findServiceRequestStatusById,
  insertServiceRequestStatus,
  updateServiceRequestStatusById,
  deleteServiceRequestStatusById,
  findStatusBySystemName,
  updateServiceRequestStatusByTech,
} from "../models/ServiceRequestStatus.model";
import { ServiceRequestStatus } from "../type/serviceRequestStatus";
import { User } from "../type/users.type";

export async function listServiceRequestStatus(): Promise<
  ServiceRequestStatus[]
> {
  return await findAllServiceRequestStatus();
}

export async function getServiceRequestStatusDetail(
  id: number,
): Promise<ServiceRequestStatus | null> {
  const data = await findServiceRequestStatusById(id);
  if (!data) {
    throw new Error("Status not found");
  }

  return data;
}

export async function crateServiceRequestStatus(
  formdata: ServiceRequestStatus,
  user: User,
): Promise<ResultSetHeader> {
  if (!user || user.Role !== "ADMIN") {
    throw new Error("Only ADMIN can manage statuses");
  }
  if (!formdata.ServiceRequestStatusName) {
    throw new Error("Status name are required");
  }
  if (formdata.IsNoFurtherActionRequired == true && formdata.IsOpen == true) {
    throw new Error("Closed status cannot be open");
  }
  const systemname = formdata.ServiceRequestStatusName.replace(
    /\s+/g,
    "_",
  ).toUpperCase();

  const exisiting = await findStatusBySystemName(systemname);
  if (exisiting) {
    throw new Error("Status system name already exists");
  }

  return await insertServiceRequestStatus({
    ...formdata,
    UserID: user?.UserID ?? 1,
    ServiceRequestStatusSystemName: systemname,
  });
}

export async function updateServiceRequestStatus(
  formdata: ServiceRequestStatus,
  id: number,
  user: User,
): Promise<ResultSetHeader> {
  if (!id) throw new Error("Status ID is required");

  if (!user || user.Role !== "ADMIN") {
    throw new Error("Only ADMIN can delete status");
  }
  const existing = await findServiceRequestStatusById(id);
  if (!existing) {
    throw new Error("Status not found");
  }
  return await updateServiceRequestStatusById(formdata, id);
}

export async function removeServiceRequestStatus(
  id: number,
  user: User,
): Promise<ResultSetHeader> {
  if (!id) throw new Error("Status ID is required");

  if (!user || user.Role !== "ADMIN") {
    throw new Error("Only ADMIN can delete status");
  }
  return await deleteServiceRequestStatusById(id);
}

export async function ServiceRequeststatusByTechService(
  requestID: number,
  statusId: number,
): Promise<ResultSetHeader> {
  if (!statusId) throw new Error("Status ID is required");
  if (!requestID) throw new Error("request ID is required");
  return await updateServiceRequestStatusByTech(requestID, statusId);
}
