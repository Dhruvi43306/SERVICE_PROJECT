import { ResultSetHeader } from "mysql2";
import { db } from "../db/mysql";
import { User } from "../type/users.type";
import { Notification } from "../type/notification.type";

export async function findAllServiceNotification(): Promise<Notification[]> {
  try {
    const [data, field] = await db.query(`SELECT * FROM notification`);
    return data as Notification[];
  } catch (err: any) {
    console.log("MYSQL ERROR:", err.sqlMessage);
    throw err;
  }
}

export async function findNotificationgetById(
  id: number,
): Promise<Notification | null> {
  try {
    const [data, field] = await db.query(
      `SELECT * FROM notification where NotificationId  = ${id}`,
    );
    const user = data as Notification[];
    return user.length > 0 ? user[0] : null;
  } catch (err: any) {
    console.log("MYSQL ERROR:", err.sqlMessage);
    throw err;
  }
}

export async function insertNotification(
  formdata: Notification,
  user: User,
): Promise<ResultSetHeader> {
  try {
    const [data] = await db.query<ResultSetHeader>(
      `INSERT INTO notification
            (UserID,ServiceRequestID, message, ServiceType, is_read, link,created_at,updated_at)
            VALUES (?, ?, ?, ?,?, ?,NOW(),NOW())`,
      [
        formdata.UserID,
        formdata.ServiceRequestID,
        formdata.message,
        formdata.ServiceType,
        formdata.is_read,
        formdata.link,
      ],
    );

    return data;
  } catch (err: any) {
    console.error(err.sqlMessage);
    throw err;
  }
}

export async function updateNotificationById(
  formdata: Notification,
  id: number,
  user: User,
): Promise<ResultSetHeader> {
  try {
    const [data] = await db.query<ResultSetHeader>(
      `
        UPDATE notification
        SET 
        UserID = ?,
        ServiceRequestID = ?, 
        message = ?, 
        ServiceType = ?,
        is_read = ?,
        link = ?
        WHERE NotificationID = ?`,
      [
        formdata.UserID,
        formdata.ServiceRequestID,
        formdata.message,
        formdata.ServiceType,
        formdata.is_read,
        formdata.link,
        id,
      ],
    );

    return data;
  } catch (err: any) {
    console.log("MYSQL ERROR:", err.sqlMessage);
    throw err;
  }
}

export async function deleteNotificationById(
  id: number,
): Promise<ResultSetHeader> {
  try {
    const [data] = await db.query<ResultSetHeader>(
      `DELETE FROM notification where NotificationId  = ${id}`,
    );
    return data;
  } catch (err: any) {
    console.error("MYSQL ERROR:", err.sqlMessage);
    throw err;
  }
}

export async function findNotificationByUserId(
  userId: number,
): Promise<Notification[]> {
  try {
    const [data] = await db.query(
      `SELECT * FROM notification WHERE UserID = ? ORDER BY created_at DESC`,
      [userId],
    );
    return data as Notification[];
  } catch (err: any) {
    console.log("MYSQL ERROR:", err.sqlMessage);
    throw err;
  }
}
