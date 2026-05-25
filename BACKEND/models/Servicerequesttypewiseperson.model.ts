import { ResultSetHeader, RowDataPacket } from "mysql2";
import { db } from "../db/mysql";
import { ServiceRequestTypeWisePerson } from "../type/serviceRequestTypeWise.type";

export async function findAllServiceRequestTypeWisePerson(): Promise<
  ServiceRequestTypeWisePerson[]
> {
  try {
    const [data] = await db.query<RowDataPacket[]>(`
      SELECT 
        srp.ServiceRequestTypeWisePersonID,
        srp.ServiceRequestTypeID,
        srt.ServiceRequestTypeName,
        srp.Sequence,
        srp.EscalationTimeHours,
        srp.FromDate,
        srp.ToDate,
        srp.IsActive,
        srp.Description,
        srp.IsActive,
        u.Role,
        u.FullName
      FROM servicerequesttypewiseperson srp
      LEFT JOIN servicerequesttype srt 
        ON srt.ServiceRequestTypeID = srp.ServiceRequestTypeID
      LEFT JOIN users u
        ON u.UserID = srp.StaffID
      ORDER BY srp.ServiceRequestTypeID, srp.Sequence ASC
    `);

    return data as ServiceRequestTypeWisePerson[];
  } catch (err: any) {
    console.error("GET ALL ERROR:", err.message);
    throw err;
  }
}

export async function findServiceRequestTypeWisePersonById(
  id: number,
): Promise<ServiceRequestTypeWisePerson | null> {
  try {
    const [data] = await db.query<RowDataPacket[]>(
      `SELECT * 
       FROM servicerequesttypewiseperson 
       WHERE ServiceRequestTypeWisePersonID = ?`,
      [id],
    );

    const srp = data as ServiceRequestTypeWisePerson[];

    return srp.length > 0 ? srp[0] : null;
  } catch (err: any) {
    console.error("GET BY ID ERROR:", err.message);
    throw err;
  }
}

export async function insertServiceRequestTypeWisePerson(
  formdata: ServiceRequestTypeWisePerson,
): Promise<ResultSetHeader> {
  try {
    // 🔹 Get next sequence automatically
    const [seq]: any = await db.query(
      `SELECT IFNULL(MAX(Sequence),0)+1 AS nextSequence
       FROM servicerequesttypewiseperson
       WHERE ServiceRequestTypeID = ?`,
      [formdata.ServiceRequestTypeID],
    );

    const nextSequence = seq[0].nextSequence;

    const [data] = await db.query<ResultSetHeader>(
      `
      INSERT INTO servicerequesttypewiseperson
      (
        ServiceRequestTypeID,
        StaffID,
        Sequence,
        FromDate,
        ToDate,
        IsActive,
        Description,
        UserID,
        EscalationTimeHours,
        Created,
        Modified
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `,
      [
        formdata.ServiceRequestTypeID,
        formdata.StaffID,
        nextSequence,
        formdata.FromDate,
        formdata.ToDate || null,
        formdata.IsActive ? 1 : 0,
        formdata.Description || null,
        formdata.UserID,
        formdata.EscalationTimeHours || 0,
      ],
    );

    return data;
  } catch (err: any) {
    console.error("MYSQL INSERT ERROR:", err.sqlMessage || err.message);
    throw err;
  }
}

export async function updateServiceRequestTypeWisePersonById(
  formdata: ServiceRequestTypeWisePerson,
  id: number,
): Promise<ResultSetHeader> {
  try {
    const [data] = await db.query<ResultSetHeader>(
      `
      UPDATE servicerequesttypewiseperson
      SET
        StaffID = COALESCE(?, StaffID),
        Sequence = COALESCE(?, Sequence),
        Description = ?,
        EscalationTimeHours = COALESCE(?, EscalationTimeHours),
        IsActive = 1,
        Modified = NOW()
      WHERE ServiceRequestTypeWisePersonID = ?
    `,
      [
        formdata.StaffID || null,
        formdata.Sequence || null,
        formdata.Description || null,
        formdata.EscalationTimeHours || null,
        id,
      ],
    );

    return data;
  } catch (err: any) {
    console.error("MYSQL UPDATE ERROR:", err.sqlMessage || err.message);
    throw err;
  }
}

export async function deleteServiceRequestTypeWisePersonById(
  id: number,
): Promise<ResultSetHeader> {
  try {
    const [data] = await db.query<ResultSetHeader>(
      `DELETE FROM servicerequesttypewiseperson 
       WHERE ServiceRequestTypeWisePersonID = ?`,
      [id],
    );

    return data;
  } catch (err: any) {
    console.error("DELETE ERROR:", err.message);
    throw err;
  }
}

export async function findActiveByTypeAndStff(
  ServiceRequestTypeID: number,
  Sequence: number,
): Promise<ServiceRequestTypeWisePerson | null> {
  const [data] = await db.query<RowDataPacket[]>(
    `SELECT * 
     FROM servicerequesttypewiseperson
     WHERE ServiceRequestTypeID = ?
     AND Sequence = ?
     AND IsActive = 1`,
    [ServiceRequestTypeID, Sequence],
  );

  const srs = data as ServiceRequestTypeWisePerson[];

  return srs.length > 0 ? srs[0] : null;
}
