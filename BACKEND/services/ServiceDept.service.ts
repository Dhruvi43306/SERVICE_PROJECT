import {
  insertServiceDept,
  updateServiceDeptById,
  deleteServiceDeptById,
  findAllServiceDept,
  findServiceDeptgetById,
} from "../models/ServiceDept.model";
import { ResultSetHeader } from "mysql2";
import { User } from "../type/users.type";
import { ServiceDept } from "../type/serviceDept.type";

export async function listServiceDept(): Promise<ServiceDept[]> {
  return await findAllServiceDept();
}

export async function getServiceDeptDetail(
  id: number,
): Promise<ServiceDept | null> {
  if (!id) throw new Error("id is Required");
  const data = await findServiceDeptgetById(id);
  if (!data) {
    throw new Error("Departement Not found!");
  }
  return data;
}

export async function createServiceDept(
  formdata: ServiceDept,
  user: User,
): Promise<ResultSetHeader> {
  if (!user || !["ADMIN"].includes(user.Role)) {
    throw new Error("Only Admin can Create Department!");
  }
  //     if (!formdata.ServiceDeptName || !formdata.CampusID) {
  //     throw new Error("ServiceDeptName and CampusID are required");
  //   }
  return await insertServiceDept(formdata, user);
}

export async function updateServiceDept(
  formdata: ServiceDept,
  id: number,
  user: User,
): Promise<ResultSetHeader> {
  if (!user || !["ADMIN"].includes(user.Role)) {
    throw new Error("Only Admin can Update Department!");
  }
  return await updateServiceDeptById(formdata, id, user);
}

export async function removeServiceDept(
  id: number,
  user: User,
): Promise<ResultSetHeader> {
  if (!id) throw new Error("id is Required");

  if (!user || !["ADMIN"].includes(user.Role)) {
    throw new Error("Only Admin can Delete Department!");
  }
  return await deleteServiceDeptById(id);
}
