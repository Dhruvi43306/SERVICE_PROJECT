import { RowDataPacket } from "mysql2";

export type PriorityType = "Low" | "Medium" | "High" | "Urgent";

export interface ServiceRequest extends RowDataPacket{
  ServiceRequestID: number;
  ServiceRequestNo: string;
  ServiceRequestDateTime: Date;
  StaffID: number | null;
  ServiceRequestTypeID: number;
  ServiceDeptID: number;
  Priority: PriorityType;
  ServiceRequestTitle: string;
  ServiceRequestDescription: string;
  AttachmentPath: string | null;
  ServiceRequestStatusID: number;
  UserID: number;
  Created: Date;
  Modified: Date;
  AdminApprovedBy:number
  AdminApprovedDate:Date
  HODApprovedBy:number,
  HODApprovedDate:Date,
  AssignedTechnicianID:number,
  AssignedDate:Date
  ResolutionSummary : string,
 WorkDone :string,
 ResolvedDate: Date 

}