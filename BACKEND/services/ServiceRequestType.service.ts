import { ResultSetHeader } from "mysql2";
import {
  findServiceRequestTypeById,
  findAllServiceRequestType,
  insertServiceRequestType,
  updateServiceRequestTypeById,
  deleteServiceRequestTypeById,
} from "../models/ServiceRequestType.model";
import { ServiceRequestType } from "../type/serviceRequestType";
import { User } from "../type/users.type";

export async function listServiceRequestType(): Promise<ServiceRequestType[]> {
  return await findAllServiceRequestType();
}

export async function getServiceRequestTypeDetails(
  id: number,
): Promise<ServiceRequestType | null> {
  return await findServiceRequestTypeById(id);
}

export async function createServiceRequestType(
  formdata: ServiceRequestType,
  user: User,
): Promise<ResultSetHeader> {
  if (user.Role != "ADMIN") {
    throw new Error("Only admin can create serviceReuest type");
  }
  if (!formdata.ServiceRequestTypeName) {
    throw new Error("ServiceRequestTypeName is required");
  }
  if (!formdata.ServiceDeptID) {
    throw new Error("ServiceDeptID is required");
  }
  return await insertServiceRequestType(formdata);
}

export async function updateServiceRequestType(
  formdata: ServiceRequestType,
  id: number,
  user: User,
): Promise<ResultSetHeader> {
  if (user.Role != "ADMIN") {
    throw new Error("Only admin can Update serviceReuest type");
  }
  return await updateServiceRequestTypeById(formdata, id);
}

export async function removeServiceRequestType(
  id: number,
  user: User,
): Promise<ResultSetHeader> {
  if (user.Role != "ADMIN") {
    throw new Error("Only admin can delete serviceReuest type");
  }
  return await deleteServiceRequestTypeById(id);
}

module.exports = {
  listServiceRequestType,
  getServiceRequestTypeDetails,
  createServiceRequestType,
  insertServiceRequestType,
  removeServiceRequestType,
  updateServiceRequestType,
};
