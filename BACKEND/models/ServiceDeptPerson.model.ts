import { ResultSetHeader } from "mysql2";
import { db } from "../db/mysql";
import { ServiceDeptPerson } from "../type/serviceDeptPerson.type";
export async function findAllServiceDeptPerson(): Promise<ServiceDeptPerson[]> {
  try {
    const [data] = await db.query(`
        SELECT 
            sp.ServiceDeptPersonID,
            sp.ServiceDeptID,
            sp.StaffID,
            sp.DeptRole,
            sp.Description,
            sp.FromDate,
            sp.ToDate,

            sd.ServiceDeptName,

            u.FullName,
            u.Email,
            u.Phone,

            CASE 
                WHEN sp.ToDate IS NULL THEN 'Active'
                ELSE 'Inactive'
            END AS Status

        FROM servicedeptperson sp

        LEFT JOIN servicedept sd
            ON sp.ServiceDeptID = sd.ServiceDeptID

        LEFT JOIN users u
            ON sp.StaffID = u.UserID
        `);

    return data as ServiceDeptPerson[];
  } catch (err: any) {
    console.log("MYSQL ERROR:", err.sqlMessage);
    throw err;
  }
}

export async function findServiceDeptPersonById(
  id: number,
): Promise<ServiceDeptPerson | null> {
  try {
    const [data] = await db.query(
      `SELECT * FROM ServiceDeptPerson WHERE ServiceDeptPersonID  = ${id}`,
    );
    const sdp = data as ServiceDeptPerson[];
    return sdp.length > 0 ? sdp[0] : null;
  } catch (err: any) {
    console.log("MYSQL ERROR:", err.sqlMessage);
    return err;
  }
}

export async function insertServiceDeptPerson(
  formdata: ServiceDeptPerson,
): Promise<ResultSetHeader> {
  try {
    const [data] = await db.query<ResultSetHeader>(
      `INSERT INTO ServiceDeptPerson
    (ServiceDeptID,StaffID,DeptRole,Description,FromDate,Created,Modified,IsHODStaff)
    VALUES (?, ?, ?, ?, NOW(), NOW(), NOW(), 0)`,
      [
        formdata.ServiceDeptID,
        formdata.StaffID,
        formdata.DeptRole,
        formdata.Description ?? null,
      ],
    );
    return data;
  } catch (err: any) {
    console.error("MYSQL ERROR:", err.sqlMessage);
    throw err;
  }
}

export async function updateServiceDeptPersonById(
  formdata: ServiceDeptPerson,
  id: number,
): Promise<ResultSetHeader> {
  try {
    const [data] = await db.query<ResultSetHeader>(
      `
                UPDATE ServiceDeptPerson
                SET
                    ServiceDeptID = ?,
                    StaffID = ?,
                    FromDate = ?,
                    ToDate = ?,
                    Description = ?,
                    UserID = ?,
                    IsHODStaff = ?
                WHERE ServiceDeptPersonID = ?
            `,
      [
        formdata.ServiceDeptID,
        formdata.StaffID,
        formdata.FromDate,
        formdata.ToDate,
        formdata.Description ?? null,
        formdata.UserID,
        formdata.IsHODStaff,
        [id],
      ],
    );
    return data;
  } catch (err: any) {
    console.error("MySQL Error:", err.sqlMessage);
    throw err;
  }
}

export async function deleteServiceDeptPersonById(
  id: number,
): Promise<ResultSetHeader> {
  try {
    const [data] = await db.query<ResultSetHeader>(
      `DELETE FROM ServiceDeptPerson WHERE ServiceDeptPersonID = ?`,
      [id],
    );
    return data;
  } catch (err: any) {
    console.error("MSQL Error:", err.sqlMessage);
    throw err;
  }
}
