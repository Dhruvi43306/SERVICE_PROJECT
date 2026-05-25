import { ResultSetHeader } from "mysql2";
import { db } from "../db/mysql";
import { ServiceRequestType } from "../type/serviceRequestType";

export async function findAllServiceRequestType(): Promise<
  ServiceRequestType[]
> {
  try {
    const [data, field] = await db.query(
      `SELECT * FROM servicerequesttype ORDER BY Sequence`,
    );
    return data as ServiceRequestType[];
  } catch (err: any) {
    console.error("MYSQL ERROR ", err.sqlMessage || err.message);
    throw err;
  }
}

export async function findServiceRequestTypeById(
  id: number,
): Promise<ServiceRequestType | null> {
  try {
    const [data, field] = await db.query(
      `SELECT * FROM servicerequesttype where ServiceRequestTypeID = ${id} ORDER BY Sequence`,
    );
    const srt = data as ServiceRequestType[];
    return srt.length > 0 ? srt[0] : null;
  } catch (err: any) {
    console.error("MYSQL ERROR ", err.sqlMessage || err.message);
    throw err;
  }
}

export async function insertServiceRequestType(
  formdata: ServiceRequestType,
): Promise<ResultSetHeader> {
  try {
    const [data] = await db.query<ResultSetHeader>(
      `INSERT INTO servicerequesttype (
                    ServiceTypeID,
                    ServiceDeptID,
                    ServiceRequestTypeName,
                    Description,
                    Sequence,
                    UserID,
                    Created,
                    Modified,
                    RequestTotal,
                    RequestPending,
                    RequestClosed,
                    RequestCancelled,
                    IsVisibleResource,
                    DefaultPriorityLevel,
                    ReminderDaysAfterAssignment,
                    IsMandatoryResource,
                    Category,
                    SLA
                ) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW(), ?, ?, ?, ?, ?, ?, ?, ?,?,?)`,
      [
        formdata.ServiceTypeID,
        formdata.ServiceDeptID,
        formdata.ServiceRequestTypeName,
        formdata.Description,
        formdata.Sequence,
        formdata.UserID || 1,
        formdata.RequestTotal || 0,
        formdata.RequestPending || 0,
        formdata.RequestClosed || 0,
        formdata.RequestCancelled || 0,
        formdata.IsVisibleResource || 1,
        formdata.DefaultPriorityLevel || 1,
        formdata.ReminderDaysAfterAssignment || 0,
        formdata.IsMandatoryResource || 0,
        formdata.Category,
        formdata.SLA,
      ],
    );
    return data;
  } catch (err: any) {
    console.error("MYSQL ERROR:", err.sqlMessage || err.message);
    throw err;
  }
}

export async function updateServiceRequestTypeById(
  formdata: ServiceRequestType,
  id: number,
): Promise<ResultSetHeader> {
  try {
    const [data] = await db.query<ResultSetHeader>(
      `UPDATE servicerequesttype SET
                    ServiceTypeID = ?,
                    ServiceDeptID = ?,
                    ServiceRequestTypeName = ?,
                    Description = ?,
                    Sequence = ?,
                    UserID = ?,
                    Modified = NOW(),
                    RequestTotal = ?,
                    RequestPending = ?,
                    RequestClosed = ?,
                    RequestCancelled = ?,
                    IsVisibleResource = ?,
                    DefaultPriorityLevel = ?,
                    ReminderDaysAfterAssignment = ?,
                    IsMandatoryResource = ?
                 WHERE ServiceRequestTypeID = ?`,
      [
        formdata.ServiceTypeID,
        formdata.ServiceDeptID,
        formdata.ServiceRequestTypeName,
        formdata.Description,
        formdata.Sequence,
        formdata.UserID,
        formdata.RequestTotal,
        formdata.RequestPending,
        formdata.RequestClosed,
        formdata.RequestCancelled,
        formdata.IsVisibleResource,
        formdata.DefaultPriorityLevel,
        formdata.ReminderDaysAfterAssignment,
        formdata.IsMandatoryResource,
        [id],
      ],
    );

    return data;
  } catch (err: any) {
    console.error("MYSQL ERROR:", err.sqlMessage || err.message);
    throw err;
  }
}

export async function deleteServiceRequestTypeById(
  id: number,
): Promise<ResultSetHeader> {
  try {
    const [data] = await db.query<ResultSetHeader>(
      `DELETE FROM servicerequesttype where ServiceRequestTypeID = ${id}`,
    );
    return data;
  } catch (err: any) {
    console.error("MYSQL ERROR:", err);
    return err;
  }
}

// module.exports = {findAllServiceRequestType,findServiceRequestTypeById,insertServiceRequestType,updateServiceRequestTypeById,deleteServiceRequestTypeById}
