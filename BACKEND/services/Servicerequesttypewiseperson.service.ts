import { ServiceRequestTypeWisePerson } from "../type/serviceRequestTypeWise.type";

import {
  findAllServiceRequestTypeWisePerson,
  findServiceRequestTypeWisePersonById,
  insertServiceRequestTypeWisePerson,
  updateServiceRequestTypeWisePersonById,
  deleteServiceRequestTypeWisePersonById,
  findActiveByTypeAndStff,
} from "../models/Servicerequesttypewiseperson.model";
import { ResultSetHeader } from "mysql2";
import { User } from "../type/users.type";

export async function listServiceRequestTypeWisePerson(): Promise<
  ServiceRequestTypeWisePerson[]
> {
  return await findAllServiceRequestTypeWisePerson();
}

export async function getServiceRequestTypeWisePersonesDetails(
  id: number,
): Promise<ServiceRequestTypeWisePerson | null> {
  if (!id) {
    throw new Error("ID is required");
  }
  return await findServiceRequestTypeWisePersonById(id);
}

export async function createServiceRequestTypeWisePerson(
  formdata: ServiceRequestTypeWisePerson,
): Promise<ResultSetHeader> {
  const { ServiceRequestTypeID, StaffID, FromDate, Sequence } = formdata;

  if (!ServiceRequestTypeID || !StaffID || !FromDate) {
    throw new Error(
      "ServiceRequestTypeID, StaffID and FromDate and Sequesnce are required",
    );
  }
  const existing = await findActiveByTypeAndStff(
    ServiceRequestTypeID,
    Sequence,
  );
  if (existing) {
    throw new Error("This staff is already assigned to this request type");
  } else {
    formdata.IsActive = true;
    formdata.Sequence = Sequence || 1;
  }
  const dataToInsert = {
    ...formdata,
    IsActive: true,
    Sequence: Sequence || 1,
  };

  return await insertServiceRequestTypeWisePerson(dataToInsert);
}

export async function updateServiceRequestTypeWisePerson(
  formdata: ServiceRequestTypeWisePerson,
  id: number,
  user: User,
): Promise<ResultSetHeader> {
  if (user.Role != "ADMIN") {
    throw new Error("Only admin can update serviceReuestTypwWise Person");
  }
  return await updateServiceRequestTypeWisePersonById(formdata, id);
}

export async function removeServiceRequestTypeWisePerson(
  id: number,
  user: User,
): Promise<ResultSetHeader> {
  if (user.Role != "ADMIN") {
    throw new Error("Only admin can delete serviceReuestTypwWise Person");
  }
  if (!id) {
    throw new Error("ID is required");
  }
  return await deleteServiceRequestTypeWisePersonById(id);
}
