import { ResultSetHeader } from "mysql2";
import {
  findAllServiceDeptPerson,
  findServiceDeptPersonById,
  insertServiceDeptPerson,
  updateServiceDeptPersonById,
  deleteServiceDeptPersonById,
} from "../models/ServiceDeptPerson.model";
import { ServiceDeptPerson } from "../type/serviceDeptPerson.type";
import { User } from "../type/users.type";

export async function listServiceDeptPerson(): Promise<ServiceDeptPerson[]> {
  return await findAllServiceDeptPerson();
}

export async function getServiceDeptPersonDetails(
  id: number,
): Promise<ServiceDeptPerson | null> {
  if (!id) throw new Error("id is Required");
  const data = await findServiceDeptPersonById(id);
  if (!data) {
    throw new Error("ServiceDeptPerson are not Found");
  }
  return data;
}

export async function createServiceDeptPerson(
  formdata: ServiceDeptPerson,
  user: User,
): Promise<ResultSetHeader> {
  if (!user || !["ADMIN"].includes(user.Role)) {
    throw new Error("Only Admin can Create DepartmentPerson!");
  }
  const { ServiceDeptID, StaffID } = formdata;

  if (!ServiceDeptID || !StaffID) {
    throw new Error("ServiceDeptID and StaffID are required");
  }
  return await insertServiceDeptPerson(formdata);
}

export async function updateServiceDeptPerson(
  formdata: ServiceDeptPerson,
  id: number,
  user: User,
): Promise<ResultSetHeader> {
  if (!user || !["ADMIN"].includes(user.Role)) {
    throw new Error("Only Admin can update DepartmentPerson!");
  }
  return await updateServiceDeptPersonById(formdata, id);
}

export async function deleteServiceDeptPerson(
  id: number,
  user: User,
): Promise<ResultSetHeader> {
  if (!user || !["ADMIN"].includes(user.Role)) {
    throw new Error("Only Admin can Delete DepartmentPerson!");
  }
  return await deleteServiceDeptPersonById(id);
}
