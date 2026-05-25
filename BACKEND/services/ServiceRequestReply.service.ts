import { ResultSetHeader } from "mysql2";
import {
  findAllServiceRequestReply,
  findServiceRequestReplyById,
  insertServiceRequestReply,
  updateServcieRequestReplyById,
  deleteServcieRequestReplyById,
} from "../models/ServiceRequestReply.model";
import { ServiceRequestReply } from "../type/serviceRequestReply.type";
import { User } from "../type/users.type";

export async function listServcieRequestReply(): Promise<
  ServiceRequestReply[]
> {
  return await findAllServiceRequestReply();
}

export async function getServcieRequestReplyDetail(
  id: number,
): Promise<ServiceRequestReply | null> {
  if (!id) throw new Error("Reply ID is required");
  const data = await findServiceRequestReplyById(id);
  if (!data) throw new Error("ServiceRequestReply not found");

  return data;
}

export async function createServcieRequestReply(
  formdata: ServiceRequestReply,
  user: User,
): Promise<ResultSetHeader> {
  if (!user || !["ADMIN", "TECHNITION", "STFF"].includes(user.Role)) {
    throw new Error("Only Requestor or Admin can create request");
  }
  //     if (!formdata.ServiceRequestTitle || !formdata.ServiceRequestTypeID) {
  //     throw new Error("Required fields missing");
  //   }

  const requesttype = await findServiceRequestReplyById(
    formdata.ServiceRequestID,
  );

  if (!requesttype) throw new Error("Invalid Service Request Type");

  const payload = {
    ...formdata,
    StaffID: null,
    // ServiceDeptID: requesttype.ServiceDeptID,
    ServiceRequestNo: `SR-${Date.now()}`,
    ServiceRequestDateTime: new Date(),
    ServiceRequestStatusID: 1,
    UserID: user.UserID,
  };

  return await insertServiceRequestReply(payload);
}

export async function updateServcieRequestReply(
  formdata: ServiceRequestReply,
  id: number,
  user: User,
): Promise<ResultSetHeader> {
  if (!id) throw new Error("Id is Requitred");
  if (!user || !["ADMIN", "TECHNITION"].includes(user.Role)) {
    throw new Error("You are not allowed to update reply");
  }
  return await updateServcieRequestReplyById(formdata, id);
}

export async function deleteServcieRequestReply(
  id: number,
  user: User,
): Promise<ResultSetHeader> {
  if (!id) throw new Error("Reply ID is required");

  if (!user || user.Role !== "ADMIN") {
    throw new Error("Only ADMIN can delete reply");
  }
  return await deleteServcieRequestReplyById(id);
}
