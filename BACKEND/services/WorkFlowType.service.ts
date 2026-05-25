import { ResultSetHeader } from "mysql2";
import { User } from "../type/users.type";
import { WorkflowType } from "../type/workFlowType.type";
import {
  deleteWorkflowTypeById,
  findAllWorkFlowType,
  findWorkflowTypegetById,
  insertWorkflowType,
  updateWorkflowTypeById,
} from "../models/WorkFlowType.model";

export async function listServiceWorkflowType(): Promise<WorkflowType[]> {
  return await findAllWorkFlowType();
}

export async function getWorkflowTypeDetail(
  id: number,
): Promise<WorkflowType | null> {
  if (!id) throw new Error("id is Required");
  const data = await findWorkflowTypegetById(id);
  if (!data) {
    throw new Error("WorkflowType Not found!");
  }
  return data;
}

export async function createWorkflowType(
  formdata: WorkflowType,
  user: User,
): Promise<ResultSetHeader> {
  if (!user || !["ADMIN"].includes(user.Role)) {
    throw new Error("Only Admin can Create WorkflowType!");
  }

  return await insertWorkflowType(formdata, user);
}

export async function updateWorkflowType(
  formdata: WorkflowType,
  id: number,
  user: User,
): Promise<ResultSetHeader> {
  if (!user || !["ADMIN"].includes(user.Role)) {
    throw new Error("Only Admin can Update WorkflowType!");
  }
  return await updateWorkflowTypeById(formdata, id, user);
}

export async function removeWorkflowType(
  id: number,
  user: User,
): Promise<ResultSetHeader> {
  if (!id) throw new Error("id is Required");

  if (!user || !["ADMIN"].includes(user.Role)) {
    throw new Error("Only Admin can Delete WorkflowType!");
  }
  return await deleteWorkflowTypeById(id);
}
