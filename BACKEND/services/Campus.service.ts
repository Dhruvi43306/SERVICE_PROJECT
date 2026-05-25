import { ResultSetHeader } from "mysql2";
import { User } from "../type/users.type";
import {
  deleteCampusById,
  findAllServiceCampus,
  findCampusgetById,
  insertCampus,
  updateCampusById,
} from "../models/Campus.model";
import { Campus } from "../type/campus.type";

export async function listServiceCampus(): Promise<Campus[]> {
  return await findAllServiceCampus();
}

export async function getCampusDetail(id: number): Promise<Campus | null> {
  if (!id) throw new Error("id is Required");
  const data = await findCampusgetById(id);
  if (!data) {
    throw new Error("Campus Not found!");
  }
  return data;
}

export async function createCampus(
  formdata: Campus,
  user: User,
): Promise<ResultSetHeader> {
  if (!user || !["ADMIN"].includes(user.Role)) {
    throw new Error("Only Admin can Create Campus!");
  }
  //     if (!formdata.CampusName || !formdata.CampusID) {
  //     throw new Error("CampusName and CampusID are required");
  //   }
  return await insertCampus(formdata, user);
}

export async function updateCampus(
  formdata: Campus,
  id: number,
  user: User,
): Promise<ResultSetHeader> {
  if (!user || !["ADMIN"].includes(user.Role)) {
    throw new Error("Only Admin can Update Campus!");
  }
  return await updateCampusById(formdata, id, user);
}

export async function removeCampus(
  id: number,
  user: User,
): Promise<ResultSetHeader> {
  if (!id) throw new Error("id is Required");

  if (!user || !["ADMIN"].includes(user.Role)) {
    throw new Error("Only Admin can Delete Campus!");
  }
  return await deleteCampusById(id);
}
