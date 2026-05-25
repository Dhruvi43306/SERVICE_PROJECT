import { ResultSetHeader } from "mysql2";
import { db } from "../db/mysql";
import { User } from "../type/users.type";
import { Priority } from "../type/priority.type";

export async function findAllPriority(): Promise<Priority[]> {
  try {
    const [data] = await db.query(`SELECT * FROM priority`);
    return data as Priority[];
  } catch (err: any) {
    console.log("MYSQL ERROR:", err.sqlMessage);
    throw err;
  }
}

export async function findPrioritygetById(
  id: number,
): Promise<Priority | null> {
  try {
    const [data, field] = await db.query(
      `SELECT * FROM priority where PriorityID = ${id}`,
    );
    const user = data as Priority[];
    return user.length > 0 ? user[0] : null;
  } catch (err: any) {
    console.log("MYSQL ERROR:", err.sqlMessage);
    throw err;
  }
}

export async function insertPriority(
  formdata: Priority,
  user: User,
): Promise<ResultSetHeader> {
  try {
    const [data] = await db.query<ResultSetHeader>(
      `INSERT INTO priority
            (PriorityName,Description,Sequence,Created,Modified)
            VALUES (?, ?, ?,NOW(),NOW())`,
      [formdata.PriorityName, formdata.Description, formdata.Sequence],
    );

    return data;
  } catch (err: any) {
    console.error(err.sqlMessage);
    throw err;
  }
}

export async function updatePriorityById(
  formdata: Priority,
  id: number,
  user: User,
): Promise<ResultSetHeader> {
  try {
    const [data] = await db.query<ResultSetHeader>(
      `
        UPDATE priority
        SET 
        PriorityName = ?,Description = ?,Sequence =?,
        WHERE PriorityID = ?`,
      [formdata.PriorityName, formdata.Description, formdata.Sequence, id],
    );

    return data;
  } catch (err: any) {
    console.log("MYSQL ERROR:", err.sqlMessage);
    throw err;
  }
}

export async function deletePriorityById(id: number): Promise<ResultSetHeader> {
  try {
    const [data] = await db.query<ResultSetHeader>(
      `DELETE FROM priority where PriorityID = ${id}`,
    );
    return data;
  } catch (err: any) {
    console.error("MYSQL ERROR:", err.sqlMessage);
    throw err;
  }
}
