import { ResultSetHeader } from "mysql2";
import { User } from "../type/users.type";
import { WorkflowStep } from "../type/workFlowStep.type";
import {
  deleteWorkflowStepById,
  findAllWorkFlowStep,
  findWorkflowStepgetById,
  insertWorkflowStep,
  updateWorkflowStepById,
} from "../models/WorkFlowsteps.model";

export async function listServiceWorkflowStep(): Promise<WorkflowStep[]> {
  return await findAllWorkFlowStep();
}

export async function getWorkflowStepDetail(
  id: number,
): Promise<WorkflowStep | null> {
  if (!id) throw new Error("id is Required");
  const data = await findWorkflowStepgetById(id);
  if (!data) {
    throw new Error("WorkflowStep Not found!");
  }
  return data;
}

export async function createWorkflowStep(
  formdata: WorkflowStep,
  user: User,
): Promise<ResultSetHeader> {
  if (!user || !["ADMIN"].includes(user.Role)) {
    throw new Error("Only Admin can Create WorkflowStep!");
  }

  return await insertWorkflowStep(formdata, user);
}

export async function updateWorkflowStep(
  formdata: WorkflowStep,
  id: number,
  user: User,
): Promise<ResultSetHeader> {
  if (!user || !["ADMIN"].includes(user.Role)) {
    throw new Error("Only Admin can Update WorkflowStep!");
  }
  return await updateWorkflowStepById(formdata, id, user);
}

export async function removeWorkflowStep(
  id: number,
  user: User,
): Promise<ResultSetHeader> {
  if (!id) throw new Error("id is Required");

  if (!user || !["ADMIN"].includes(user.Role)) {
    throw new Error("Only Admin can Delete WorkflowStep!");
  }
  return await deleteWorkflowStepById(id);
}
