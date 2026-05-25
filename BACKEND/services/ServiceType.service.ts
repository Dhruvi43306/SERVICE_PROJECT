import { User } from "../type/users.type";

import {
  findAllServiceType,
  findServiceTypeById,
  insertServiceType,
  updateServiceTypeById,
  deletServiceTypeById,
} from "../models/ServiceType.model";
import { ServiceType } from "../type/serviceType.type";
import { ResultSetHeader } from "mysql2";

export async function listServiceType(user: User): Promise<ServiceType[]> {
  let data = await findAllServiceType();
  // if(user.Role === 'STAFF'){
  //     data = data.filter((st:any)=>st.IsForStaff == 1)
  // }
  // if(user.Role == 'REQUESTOR'){
  //     data = data.filter((st:any)=>st.IsForStudent == 1)

  // }
  return data;
}

export async function getServiceTypeDetail(
  id: number,
): Promise<ServiceType | null> {
  return await findServiceTypeById(id);
}

export async function createServiceType(
  formdata: ServiceType,
  user: User,
): Promise<ResultSetHeader> {
  if (user.Role != "ADMIN") {
    throw new Error("Only admin can create service type");
  }
  if (!formdata.ServiceTypeName) {
    throw new Error("ServiceTypeName is required");
  }
  if (!formdata.ServiceDeptID) {
    throw new Error("ServiceDeptID is required");
  }
  if (!formdata.SLAHours || formdata.SLAHours <= 0) {
    throw new Error("SLAHours must be greater than 0");
  }
  return await insertServiceType(formdata);
}

export async function updateServiceType(
  formdata: ServiceType,
  id: number,
  user: User,
): Promise<ResultSetHeader> {
  if (user.Role !== "ADMIN") {
    throw new Error("Only admin can update service type");
  }

  const existing = await findServiceTypeById(id);
  if (!existing) {
    throw new Error("ServiceType not found");
  }

  return await updateServiceTypeById(formdata, id);
}

export async function removeServiceType(
  id: number,
  user: User,
): Promise<ResultSetHeader> {
  if (user.Role !== "ADMIN") {
    throw new Error("Only admin can delete service type");
  }
  return await deletServiceTypeById(id);
}
// When user submits Create Request
// const serviceType = await findServiceTypeById(body.ServiceTypeID)
// function calculateDeadline(slaHours) {
//   const deadline = new Date()
//   deadline.setHours(deadline.getHours() + slaHours)
//   return deadline
// }

// const requestData = {
//   ServiceDeptID: serviceType.ServiceDeptID,
//   SLADeadline: now + serviceType.SLAHours,
//   WorkflowType: serviceType.WorkflowType,
//   Status: "OPEN"
// }
