import { ResultSetHeader } from "mysql2";
import { ServiceDept } from "../type/serviceDept.type";
import { db } from "../db/mysql";
import { User } from "../type/users.type";

export async function findAllServiceDept(): Promise<ServiceDept[]> {
  try {
    const [data, field] = await db.query(`
            SELECT 
                s.*,
                c.CampusName,
                c.City,
                c.State
            FROM servicedept s
            LEFT JOIN campus c
            ON s.CampusID = c.CampusID`);
    return data as ServiceDept[];
  } catch (err: any) {
    console.log("MYSQL ERROR:", err.sqlMessage);
    throw err;
  }
}

export async function findServiceDeptgetById(
  id: number,
): Promise<ServiceDept | null> {
  try {
    const [data, field] = await db.query(`
        SELECT 
        s.*,
        c.CampusName,
        c.City,
        c.State
    FROM servicedept s
    LEFT JOIN campus c
    ON s.CampusID = c.CampusID
    WHERE s.ServiceDeptID = ${id}`);
    const user = data as ServiceDept[];
    return user.length > 0 ? user[0] : null;
  } catch (err: any) {
    console.log("MYSQL ERROR:", err.sqlMessage);
    throw err;
  }
}

export async function insertServiceDept(
  formdata: ServiceDept,
  user: User,
): Promise<ResultSetHeader> {
  try {
    const [data] = await db.query<ResultSetHeader>(
      `INSERT INTO servicedept
            (ServiceDeptName, CampusID, Description, Created, Modified, CCEmailToCSV, IsRequestTitleDisable,DeptCode,SLA_Hours)
            VALUES (?, ?, ?, NOW(),NOW(),?, ?,?,?)`,
      [
        formdata.ServiceDeptName,
        formdata.CampusID,
        formdata.Description || null,
        formdata.CCEmailToCSV || null,
        formdata.IsRequestTitleDisable || 0,
        formdata.DeptCode,
        formdata.SLA_Hours,
      ],
    );

    return data;
  } catch (err: any) {
    console.error(err.sqlMessage);
    throw err;
  }
}

export async function updateServiceDeptById(
  formdata: ServiceDept,
  id: number,
  user: User,
): Promise<ResultSetHeader> {
  try {
    const [data] = await db.query<ResultSetHeader>(
      `
        UPDATE servicedept
        SET ServiceDeptName = ?,
            Description = ?,
            CCEmailToCSV = ?,
            DeptCode = ?,
            SLA_Hours = ?
        WHERE ServiceDeptID = ?`,
      [
        formdata.ServiceDeptName,
        formdata.Description || null,
        formdata.CCEmailToCSV || null,
        // formdata.IsRequestTitleDisable || 0,
        formdata.DeptCode,
        formdata.SLA_Hours,
        id,
      ],
    );

    return data;
  } catch (err: any) {
    console.log("MYSQL ERROR:", err.sqlMessage);
    throw err;
  }
}

export async function deleteServiceDeptById(
  id: number,
): Promise<ResultSetHeader> {
  try {
    const [data] = await db.query<ResultSetHeader>(
      `DELETE FROM servicedept where ServiceDeptID = ${id}`,
    );
    return data;
  } catch (err: any) {
    console.error("MYSQL ERROR:", err.sqlMessage);
    throw err;
  }
}
