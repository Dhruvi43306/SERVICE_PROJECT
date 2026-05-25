export interface ServiceRequestReply {
  ServiceRequestReplyID: number;
  ServiceRequestID: number;
  StaffID: number | null;
  ServiceRequestReplyDateTime: Date;
  ServiceRequestReplyDescription: string;
  ServiceRequestStatusID: number;
  UserID: number;
  Created: Date;
  Modified: Date;
}

export type CreateServiceRequestDto = Omit<ServiceRequestReply,"ServiceRequestReplyID"|"Created"|"Modified">