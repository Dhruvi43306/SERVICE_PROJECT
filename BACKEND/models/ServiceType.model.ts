import { ResultSetHeader } from "mysql2";
import { db } from "../db/mysql";
import { ServiceType } from "../type/serviceType.type";

export async function findAllServiceType(): Promise<ServiceType[]> {
  try {
    const [data, fields] = await db.query(`
        SELECT s.*,
        GROUP_CONCAT(w.RoleName ORDER BY w.StepOrder SEPARATOR ' → ') AS WorkflowChain
        FROM ServiceType s
        LEFT JOIN WorkflowSteps w
        ON s.WorkflowTypeID = w.WorkflowTypeID
        GROUP BY s.ServiceTypeID;`);
    return data as ServiceType[];
  } catch (err: any) {
    console.error("MYSQL ERROR:", err.sqlMessage);
    throw err;
  }
}

export async function findServiceTypeById(
  id: number,
): Promise<ServiceType | null> {
  try {
    const [data, fields] = await db.query(
      `SELECT * FROM servicetype where ServiceTypeID = ${id}`,
    );
    const st = data as ServiceType[];
    return st.length > 0 ? st[0] : null;
  } catch (err: any) {
    console.error("MYSQL ERROR:", err.sqlMessage);
    throw err;
  }
}

export async function insertServiceType(
  formdata: ServiceType,
): Promise<ResultSetHeader> {
  try {
    const [data] = await db.query<ResultSetHeader>(
      `INSERT INTO servicetype(
            ServiceTypeName,
            Description,
            Sequence,
            ServiceDeptID,
            SLAHours,
            WorkflowTypeID,
            UserID,
            Created,
            Modified,
            IsForStaff,
            IsForStudent) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), ?,?)`,
      [
        formdata.ServiceTypeName,
        formdata.Description,
        formdata.Sequence,
        formdata.ServiceDeptID,
        formdata.SLAHours,
        formdata.WorkflowTypeID,
        formdata.UserID,
        formdata.IsForStaff,
        formdata.IsForStudent,
      ],
    );
    return data;
  } catch (err: any) {
    console.error("MYSQL ERROR:", err.sqlMessage);
    throw err;
  }
}

export async function updateServiceTypeById(
  formdata: ServiceType,
  id: number,
): Promise<ResultSetHeader> {
  try {
    const [data] = await db.query<ResultSetHeader>(
      `UPDATE servicetype
            SET 
            ServiceTypeName = ?,
            Description = ?,
            Sequence = ?,
            ServiceDeptID  = ?,
            SLAHours = ?,
             WorkflowTypeID = ?,
            UserID = ?,
            IsForStaff = ?,
            IsForStudent = ?
            Where ServiceTypeID = ?`,
      [
        formdata.ServiceTypeName,
        formdata.Description,
        formdata.Sequence,
        formdata.ServiceDeptID,
        formdata.SLAHours,
        formdata.WorkflowTypeID,
        formdata.UserID,
        formdata.IsForStaff,
        formdata.IsForStudent,
        [id],
      ],
    );

    return data;
  } catch (err: any) {
    console.error("MYSQL ERROR:", err.sqlMessage);
    throw err;
  }
}

export async function deletServiceTypeById(
  id: number,
): Promise<ResultSetHeader> {
  try {
    const [data] = await db.query<ResultSetHeader>(
      `DELETE FROM servicetype where ServiceTypeID = ${id}`,
    );
    return data;
  } catch (err: any) {
    console.error("MYSQL ERROR:", err.sqlMessage);
    throw err;
  }
}
