import { ResultSetHeader, RowDataPacket } from "mysql2";
import { db } from "../db/mysql";
import { ServiceRequest } from "../type/serviceRequest";
import { User } from "../type/users.type";

export async function findAllServiceRequest(
  role: string,
  search: string,
): Promise<ServiceRequest[]> {
  try {
    let conditions: string[] = [];
    let params: any[] = [];

    if (role === "REQUESTOR") {
      conditions.push(`sr.ServiceRequestStatusID IN (1,9,19,20,21,22,28,35)`);
    }
    if (role === "ADMIN ") {
      conditions.push(`sr.ServiceRequestStatusID IN (1,9,19,20,21,22,28,35)`);
    }
    if (role === "TECHNICIAN ") {
      conditions.push(`sr.ServiceRequestStatusID IN (1,9,19,20,21,22,28,35)`);
    }

    if (search && search.trim().length >= 1) {
      conditions.push(`
    (
      sr.ServiceRequestTitle LIKE ?
      OR sr.ServiceRequestNo LIKE ?
    )
  `);
      params.push(`%${search}%`);
      params.push(`%${search}%`);
    }

    let whereClause = "";
    if (conditions.length > 0) {
      whereClause = "WHERE " + conditions.join(" AND ");
    }

    const [data] = await db.query<ServiceRequest[]>(
      `
      SELECT 
        sr.ServiceRequestID,
        sr.ServiceRequestNo,
        sr.ServiceRequestDateTime,
        sr.ServiceRequestTitle,
        sr.ServiceRequestDescription,
        sr.ServiceRequestStatusID, 
        p.PriorityName AS priority,
        s.ServiceRequestStatusName AS status,
        req.UserID, 
        req.FullName AS RequestorName,
        adm.FullName AS AdminName,
        sd.ServiceDeptName

      FROM servicerequest sr

      LEFT JOIN priority p 
      ON sr.PriorityID = p.PriorityID

      LEFT JOIN servicerequeststatus s 
      ON sr.ServiceRequestStatusID = s.ServiceRequestStatusID

      LEFT JOIN users req 
      ON sr.UserID = req.UserID

      LEFT JOIN users adm 
      ON sr.StaffID = adm.UserID

      LEFT JOIN servicedept sd
      ON sr.ServiceDeptID = sd.ServiceDeptID

      ${whereClause}

      ORDER BY sr.ServiceRequestDateTime DESC
    `,
      params,
    );

    return data;
  } catch (err: any) {
    console.error("MYSQL ERROR:", err.message);
    throw err;
  }
}

export async function findServiceRequestById(
  id: number,
): Promise<ServiceRequest | null> {
  try {
    const [data, field] = await db.query(
      `SELECT * FROM servicerequest where ServiceRequestID = ?`,
      [id],
    );
    const sr = data as ServiceRequest[];
    return sr.length > 0 ? sr[0] : null;
  } catch (err: any) {
    console.error("MYSQL ERROR: ", err.sqlMessage);
    throw err;
  }
}

export async function insertServiceRequest(
  formdata: ServiceRequest,
): Promise<ResultSetHeader> {
  try {
    const [data] = await db.query<ResultSetHeader>(
      `
        INSERT INTO servicerequest (
          ServiceRequestNo,
          ServiceRequestDateTime,
          StaffID,
          ServiceRequestTypeID,
          ServiceDeptID,
          PriorityID,
          ServiceRequestTitle,
          ServiceRequestDescription,
          ServiceRequestStatusID,
          UserID,
          ServiceTypeID, 
          Created,
          Modified
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, NOW(), NOW())
      `,
      [
        formdata.ServiceRequestNo,
        formdata.ServiceRequestDateTime,
        formdata.StaffID,
        formdata.ServiceRequestTypeID,
        formdata.ServiceDeptID,
        formdata.PriorityID,
        formdata.ServiceRequestTitle,
        formdata.ServiceRequestDescription,
        9,
        formdata.UserID,
        formdata.ServiceTypeID,
      ],
    );
    return data;
  } catch (err: any) {
    console.error("MYSQL ERROR:", err.sqlMessage || err.message);
    throw err;
  }
}

export async function updateServiceRequestById(
  formdata: ServiceRequest,
  id: number,
): Promise<ResultSetHeader> {
  try {
    const [data] = await db.query<ResultSetHeader>(
      `UPDATE servicerequest
            SET
            ServiceRequestDateTime = ?,
            StaffID = ?,
            ServiceRequestTypeID = ?,
            ServiceDeptID = ?,
            Priority = ?,
            ServiceRequestTitle = ?,
            ServiceRequestDescription = ?,
            ServiceRequestStatusID = ?
         
          WHERE ServiceRequestID = ?
      `,
      [
        formdata.ServiceRequestDateTime,
        formdata.StaffID,
        formdata.ServiceRequestTypeID,
        formdata.ServiceDeptID,
        formdata.Priority,
        formdata.ServiceRequestTitle,
        formdata.ServiceRequestDescription,
        formdata.ServiceRequestStatusID,
        [id],
      ],
    );

    return data;
  } catch (err: any) {
    console.error("MYSQL ERROR:", err.sqlMessage || err.message);
    throw err;
  }
}

export async function deleteServiceRequestById(
  id: number,
): Promise<ResultSetHeader> {
  try {
    const [data] = await db.query<ResultSetHeader>(
      `DELETE FROM servicerequest where ServiceRequestID = ${id}`,
    );
    return data;
  } catch (err: any) {
    console.error("MYSQL ERROR:", err.sqlMessage);
    return err;
  }
}

export async function adminApproveRequest(
  id: number,
  adminId: number,
): Promise<ResultSetHeader> {
  try {
    const [data] = await db.query<ResultSetHeader>(
      `
      UPDATE servicerequest
      SET
        ServiceRequestStatusID = 21,
        AdminApprovedBy = ?,
        AdminApprovedDate = NOW()
      WHERE ServiceRequestID = ?
    `,
      [adminId, id],
    );

    return data;
  } catch (err: any) {
    console.error("MYSQL ERROR:", err.sqlMessage || err.message);
    throw err;
  }
}
export async function adminAssignedRequest(
  id: number,
  adminId: number,
  technicianID: number,
): Promise<ResultSetHeader> {
  try {
    const [data] = await db.query<ResultSetHeader>(
      `
      UPDATE servicerequest
      SET
        ServiceRequestStatusID = 35,
        AdminAssignedBy = ?,
        AssignedDate = NOW(),
        AssignedTechnicianID = ?
      WHERE ServiceRequestID = ?
    `,
      [adminId, technicianID, id],
    );

    return data;
  } catch (err: any) {
    console.error("MYSQL ERROR:", err.sqlMessage || err.message);
    throw err;
  }
}

export async function hodAssigned(
  id: number,
  hodID: number,
  technicianID: number,
): Promise<ResultSetHeader> {
  try {
    const [data] = await db.query<ResultSetHeader>(
      `
      UPDATE servicerequest
      SET
        ServiceRequestStatusID = 22,
        HODApprovedBy = ?,
        AssignedTechnicianID = ?,
        HODApprovedDate = NOW(),
        AssignedDate = NOW()
      WHERE ServiceRequestID = ?
    `,
      [hodID, technicianID, id],
    );

    return data;
  } catch (err: any) {
    console.error("MYSQL ERROR:", err.sqlMessage || err.message);
    throw err;
  }
}

export async function resolveByTechnician(
  requestID: number,
  technicianID: number,
  resolutionSummary: string,
  workDone: string,
): Promise<ResultSetHeader> {
  try {
    const [data] = await db.query<ResultSetHeader>(
      `
      UPDATE servicerequest
      SET
        ServiceRequestStatusID = 19,
        ResolvedBy = ?,
        ResolutionSummary = ?,
        WorkDone = ?,
        CompletedDate = NOW()
      WHERE ServiceRequestID  = ?
    `,
      [technicianID, resolutionSummary, workDone, requestID],
    );

    return data;
  } catch (err: any) {
    console.error("MYSQL ERROR:", err.sqlMessage || err.message);
    throw err;
  }
}

export async function startworkByTech(requestID: number) {
  try {
    const [data] = await db.query<ResultSetHeader>(
      ` UPDATE servicerequest
      SET
        ServiceRequestStatusID = 28, 
         ResolvedDate = NOW()    
        WHERE ServiceRequestID = ?`,
      [requestID],
    );
    return data;
  } catch (err: any) {
    console.error("MYSQL ERROR:", err.sqlMessage || err.message);
    throw err;
  }
}
