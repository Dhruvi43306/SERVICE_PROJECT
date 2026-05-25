import { ResultSetHeader } from "mysql2";
import { User } from "../type/users.type";
import { Notification } from "../type/notification.type";
import {
  deleteNotificationById,
  findAllServiceNotification,
  findNotificationByUserId,
  findNotificationgetById,
  insertNotification,
  updateNotificationById,
} from "../models/Notification.model";
import { io } from "../server";
export async function listServiceNotification(): Promise<Notification[]> {
  return await findAllServiceNotification();
}

export async function getNotificationDetail(
  id: number,
): Promise<Notification | null> {
  if (!id) throw new Error("id is Required");
  const data = await findNotificationgetById(id);
  if (!data) {
    throw new Error("Notification Not found!");
  }
  return data;
}

export async function getNotificationByUser(
  userId: number,
): Promise<Notification[]> {
  if (!userId) {
    throw new Error("UserId is Required");
  }

  return await findNotificationByUserId(userId);
}

export async function createNotification(
  formdata: Omit<Notification, "NotificationId" | "created_at" | "updated_at">,
  user: User,
): Promise<ResultSetHeader> {
  if (!user || !["ADMIN", "TECHNITION"].includes(user.Role)) {
    throw new Error("Only Admin or Technician can Create Notification!");
  }
  const result = await insertNotification(formdata as Notification, user);

  // Emit socket event to the specific user
  io.to(formdata.UserID.toString()).emit("newNotification", {
    ...formdata,
    created_at: new Date().toISOString(),
  });

  return result;
  // return await insertNotification(formdata,user)
}

export async function updateNotification(
  formdata: Notification,
  id: number,
  user: User,
): Promise<ResultSetHeader> {
  if (!user || !["ADMIN"].includes(user.Role)) {
    throw new Error("Only Admin can Update Notification!");
  }
  return await updateNotificationById(formdata, id, user);
}

export async function removeNotification(
  id: number,
  user: User,
): Promise<ResultSetHeader> {
  if (!id) throw new Error("id is Required");

  if (!user || !["ADMIN"].includes(user.Role)) {
    throw new Error("Only Admin can Delete Notification!");
  }
  return await deleteNotificationById(id);
}
