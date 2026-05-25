import { ResultSetHeader } from "mysql2";
import { User } from "../type/users.type";
import { Priority } from "../type/priority.type";
import {
  deletePriorityById,
  findAllPriority,
  findPrioritygetById,
  insertPriority,
  updatePriorityById,
} from "../models/Priority.model";

export async function listServicePriority(): Promise<Priority[]> {
  return await findAllPriority();
}

export async function getPriorityDetail(id: number): Promise<Priority | null> {
  if (!id) throw new Error("id is Required");
  const data = await findPrioritygetById(id);
  if (!data) {
    throw new Error("Priority Not found!");
  }
  return data;
}

export async function createPriority(
  formdata: Priority,
  user: User,
): Promise<ResultSetHeader> {
  if (!user || !["ADMIN"].includes(user.Role)) {
    throw new Error("Only Admin can Create Priority!");
  }

  return await insertPriority(formdata, user);
}

export async function updatePriority(
  formdata: Priority,
  id: number,
  user: User,
): Promise<ResultSetHeader> {
  if (!user || !["ADMIN"].includes(user.Role)) {
    throw new Error("Only Admin can Update Priority!");
  }
  return await updatePriorityById(formdata, id, user);
}

export async function removePriority(
  id: number,
  user: User,
): Promise<ResultSetHeader> {
  if (!id) throw new Error("id is Required");

  if (!user || !["ADMIN"].includes(user.Role)) {
    throw new Error("Only Admin can Delete Priority!");
  }
  return await deletePriorityById(id);
}
