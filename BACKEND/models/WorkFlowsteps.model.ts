import { ResultSetHeader } from "mysql2";
import { db } from "../db/mysql";
import { WorkflowStep } from "../type/workFlowStep.type";
import { User } from "../type/users.type";

export async function findAllWorkFlowStep(): Promise<WorkflowStep[]> {
  try {
    const [data] = await db.query(`SELECT * FROM workflowsteps`);
    return data as WorkflowStep[];
  } catch (err: any) {
    console.log("MYSQL ERROR:", err.sqlMessage);
    throw err;
  }
}

export async function findWorkflowStepgetById(
  id: number,
): Promise<WorkflowStep | null> {
  try {
    const [data, field] = await db.query(
      `SELECT * FROM workflowsteps where WorkflowStepID = ${id}`,
    );
    const user = data as WorkflowStep[];
    return user.length > 0 ? user[0] : null;
  } catch (err: any) {
    console.log("MYSQL ERROR:", err.sqlMessage);
    throw err;
  }
}

export async function insertWorkflowStep(
  formdata: WorkflowStep,
  user: User,
): Promise<ResultSetHeader> {
  try {
    const [data] = await db.query<ResultSetHeader>(
      `INSERT INTO workflowsteps
            (WorkflowTypeID, RoleName,StepOrder,Created,Modified)
            VALUES (?, ?, ?,NOW(),NOW())`,
      [formdata.WorkflowTypeID, formdata.RoleName, formdata.StepOrder],
    );

    return data;
  } catch (err: any) {
    console.error(err.sqlMessage);
    throw err;
  }
}

export async function updateWorkflowStepById(
  formdata: WorkflowStep,
  id: number,
  user: User,
): Promise<ResultSetHeader> {
  try {
    const [data] = await db.query<ResultSetHeader>(
      `
        UPDATE workflowsteps
        SET 
        WorkflowTypeID = ?, RoleName = ?,StepOrder = ?,
        WHERE WorkflowStepID = ?`,
      [formdata.WorkflowTypeID, formdata.RoleName, formdata.StepOrder, id],
    );

    return data;
  } catch (err: any) {
    console.log("MYSQL ERROR:", err.sqlMessage);
    throw err;
  }
}

export async function deleteWorkflowStepById(
  id: number,
): Promise<ResultSetHeader> {
  try {
    const [data] = await db.query<ResultSetHeader>(
      `DELETE FROM workflowsteps where WorkflowStepID = ${id}`,
    );
    return data;
  } catch (err: any) {
    console.error("MYSQL ERROR:", err.sqlMessage);
    throw err;
  }
}
