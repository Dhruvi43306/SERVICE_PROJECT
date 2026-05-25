import { ResultSetHeader } from "mysql2";
import { db } from "../db/mysql";
import { WorkflowType } from "../type/workFlowType.type";
import { User } from "../type/users.type";

export async function findAllWorkFlowType(): Promise<WorkflowType[]> {
  try {
    const [data] = await db.query(`SELECT * FROM workflowtype`);
    return data as WorkflowType[];
  } catch (err: any) {
    console.log("MYSQL ERROR:", err.sqlMessage);
    throw err;
  }
}

export async function findWorkflowTypegetById(
  id: number,
): Promise<WorkflowType | null> {
  try {
    const [data, field] = await db.query(
      `SELECT * FROM workflowtype where WorkflowTypeID = ${id}`,
    );
    const user = data as WorkflowType[];
    return user.length > 0 ? user[0] : null;
  } catch (err: any) {
    console.log("MYSQL ERROR:", err.sqlMessage);
    throw err;
  }
}

export async function insertWorkflowType(
  formdata: WorkflowType,
  user: User,
): Promise<ResultSetHeader> {
  try {
    const [data] = await db.query<ResultSetHeader>(
      `INSERT INTO workflowtype
            (WorkflowName, WorkflowCode,Description,Created,Modified)
            VALUES (?, ?, ?,NOW(),NOW())`,
      [formdata.WorkflowName, formdata.WorkflowCode, formdata.Description],
    );

    return data;
  } catch (err: any) {
    console.error(err.sqlMessage);
    throw err;
  }
}

export async function updateWorkflowTypeById(
  formdata: WorkflowType,
  id: number,
  user: User,
): Promise<ResultSetHeader> {
  try {
    const [data] = await db.query<ResultSetHeader>(
      `
        UPDATE workflowtype
        SET 
        WorkflowName = ?, WorkflowCode = ?,Description = ?,
        WHERE WorkflowTypeID = ?`,
      [formdata.WorkflowName, formdata.WorkflowCode, formdata.Description, id],
    );

    return data;
  } catch (err: any) {
    console.log("MYSQL ERROR:", err.sqlMessage);
    throw err;
  }
}

export async function deleteWorkflowTypeById(
  id: number,
): Promise<ResultSetHeader> {
  try {
    const [data] = await db.query<ResultSetHeader>(
      `DELETE FROM workflowtype where WorkflowTypeID = ${id}`,
    );
    return data;
  } catch (err: any) {
    console.error("MYSQL ERROR:", err.sqlMessage);
    throw err;
  }
}
