import { ResultSetHeader } from "mysql2";
import { db } from "../db/mysql";
import { ServiceRequestStatus } from "../type/serviceRequestStatus";

export async function findAllServiceRequestStatus(): Promise<
  ServiceRequestStatus[]
> {
  try {
    const [data] = await db.query("SELECT * FROM servicerequeststatus");
    return data as ServiceRequestStatus[];
  } catch (err: any) {
    console.error("MYSQL ERROR:", err.sqlmessage);
    throw err;
  }
}

export async function findServiceRequestStatusById(
  id: number,
): Promise<ServiceRequestStatus | null> {
  try {
    const [data] = await db.query(
      `SELECT * FROM servicerequeststatus where ServiceRequestStatusID = ${id}`,
    );
    const srs = data as ServiceRequestStatus[];
    return srs.length > 0 ? srs[0] : null;
  } catch (err: any) {
    console.log("MYSQL ERROR:", err.sqlMessage);
    return err;
  }
}

export async function insertServiceRequestStatus(
  formdata: ServiceRequestStatus,
): Promise<ResultSetHeader> {
  try {
    const [data] = await db.query<ResultSetHeader>(
      `
      INSERT INTO servicerequeststatus (
      
        ServiceRequestStatusName,
        ServiceRequestStatusSystemName,
        Sequence,
        Description,
        UserID,
        Created,
        Modified,
        ServiceRequestStatusCssClass,
        IsOpen,
        IsNoFurtherActionRequired,
        IsAllowedForTechnician
      ) VALUES (?, ?, ?, ?, ?, NOW(), NOW(), ?, ?, ?, ?)
    `,
      [
        formdata.ServiceRequestStatusName,
        formdata.ServiceRequestStatusSystemName,
        formdata.Sequence,
        formdata.Description,
        formdata.UserID,
        formdata.ServiceRequestStatusCssClass,
        formdata.IsOpen,
        formdata.IsNoFurtherActionRequired,
        formdata.IsAllowedForTechnician,
      ],
    );

    return data;
  } catch (err: any) {
    console.error("MYSQL ERROR ", err.sqlMessage || err.message);
    throw err;
  }
}

export async function updateServiceRequestStatusById(
  formdata: ServiceRequestStatus,
  id: number,
): Promise<ResultSetHeader> {
  try {
    const [data] = await db.query<ResultSetHeader>(
      `UPDATE servicerequeststatus
        SET ServiceRequestStatusName = ?,
        ServiceRequestStatusSystemName = ?,
        Sequence = ?,
        Description = ?,
        ServiceRequestStatusCssClass = ?,
        IsOpen = ?,
        IsNoFurtherActionRequired = ?,
        IsAllowedForTechnician = ?

WHERE ServiceRequestStatusID = ?`,
      [
        formdata.ServiceRequestStatusName,
        formdata.ServiceRequestStatusSystemName,
        formdata.Sequence,
        formdata.Description,
        formdata.ServiceRequestStatusCssClass,
        formdata.IsOpen,
        formdata.IsNoFurtherActionRequired,
        formdata.IsAllowedForTechnician,
        id,
      ],
    );

    return data;
  } catch (err: any) {
    console.error("MYSQL ERROR ", err.sqlMessage || err.message);
    throw err;
  }
}

export async function deleteServiceRequestStatusById(
  id: number,
): Promise<ResultSetHeader> {
  try {
    const [data] = await db.query<ResultSetHeader>(
      `DELETE FROM servicerequeststatus where ServiceRequestStatusID = ${id}`,
    );
    return data;
  } catch (err: any) {
    console.error("MYSQL ERROR:", err);
    return err;
  }
}
export async function findStatusBySystemName(
  ServiceRequestStatusSystemName: string,
): Promise<ServiceRequestStatus | null> {
  try {
    const [data] = await db.query(
      `SELECT * FROM servicerequeststatus where ServiceRequestStatusSystemName = ?`,
      [ServiceRequestStatusSystemName],
    );
    const srs = data as ServiceRequestStatus[];
    return srs.length > 0 ? srs[0] : null;
  } catch (err: any) {
    console.error("MYSQL ERROR:", err.sqlMessage);
    return err;
  }
}

export async function updateServiceRequestStatusByTech(
  requestId: number,
  statusId: number,
): Promise<ResultSetHeader> {
  try {
    const data = await db.query<ResultSetHeader>(
      `UPDATE servicerequeststatus SET ServiceRequestStatusID=? WHERE ServiceRequestID=?`,
      [statusId, requestId],
    );
    return data[0];
  } catch (err: any) {
    console.error("MYSQL ERROR:", err.sqlMessage);
    return err;
  }
}
