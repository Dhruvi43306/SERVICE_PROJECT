import { ResultSetHeader } from "mysql2";
import { db } from "../db/mysql";
import { ServiceRequestReply } from "../type/serviceRequestReply.type";

export async function findAllServiceRequestReply(): Promise<
  ServiceRequestReply[]
> {
  try {
    const [data] = await db.query(`SELECT * FROM servicerequestreply`);
    return data as ServiceRequestReply[];
  } catch (err: any) {
    console.error("MSQL Error:", err.message);
    throw err;
  }
}

export async function findServiceRequestReplyById(
  id: number,
): Promise<ServiceRequestReply | null> {
  try {
    const [data] = await db.query(
      `SELECT * FROM servicerequestreply where ServiceRequestReplyID = ?`,
      [id],
    );
    const sr = data as ServiceRequestReply[];
    return sr.length > 0 ? sr[0] : null;
  } catch (err: any) {
    console.error("MYSQL Error:", err.message);
    throw err;
  }
}

export async function insertServiceRequestReply(
  formdata: ServiceRequestReply,
): Promise<ResultSetHeader> {
  try {
    const [data] = await db.query<ResultSetHeader>(
      ` 
        INSERT INTO servicerequestreply (
          ServiceRequestID,
          StaffID,
          ServiceRequestReplyDateTime,
          ServiceRequestReplyDescription,
          ServiceRequestStatusID,
          UserID,
          Created,
          Modified
        ) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
      `,
      [
        formdata.ServiceRequestID,
        formdata.StaffID || null,
        formdata.ServiceRequestReplyDateTime,
        formdata.ServiceRequestReplyDescription,
        formdata.ServiceRequestStatusID,
        formdata.UserID,
      ],
    );
    return data;
  } catch (err: any) {
    console.error("MYSQL ERROR:", err.sqlMessage || err.message);
    throw err;
  }
}

export async function updateServcieRequestReplyById(
  formdata: ServiceRequestReply,
  id: number,
): Promise<ResultSetHeader> {
  try {
    const [data] = await db.query<ResultSetHeader>(
      `UPDATE servicerequestreply
         SET
           StaffID = ?,
           ServiceRequestReplyDateTime = ?,
           ServiceRequestReplyDescription = ?,
           ServiceRequestStatusID = ?,
           Modified = NOW()
         WHERE ServiceRequestReplyID = ?`,
      [
        formdata.StaffID || null,
        formdata.ServiceRequestReplyDateTime,
        formdata.ServiceRequestReplyDescription,
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

export async function deleteServcieRequestReplyById(
  id: number,
): Promise<ResultSetHeader> {
  try {
    const [data] = await db.query<ResultSetHeader>(
      `DELETE FROM servicerequestreply where ServiceRequestReplyID = ${id}`,
    );
    return data;
  } catch (err: any) {
    console.error("MYSQL ERROR:", err);
    return err;
  }
}
