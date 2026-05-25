export interface ServiceRequestStatus {
  ServiceRequestStatusID: number;
  ServiceRequestStatusName: string;
  ServiceRequestStatusSystemName: string;
  Sequence: number | null; // decimal(10,2)
  Description: string | null;
  UserID: number;
  Created: Date;
  Modified: Date;
  ServiceRequestStatusCssClass: string | null;
  IsOpen: boolean | null;
  IsNoFurtherActionRequired: boolean | null;
  IsAllowedForTechnician: boolean | null;
  ServiceRequestID:number
}