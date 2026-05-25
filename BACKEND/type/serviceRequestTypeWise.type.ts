export interface ServiceRequestTypeWisePerson {
  ServiceRequestTypeWisePersonID: number;
  ServiceRequestTypeID: number;
  StaffID: number;
  Sequence: number;
  FromDate: Date;
  ToDate?: Date | null;
  IsActive: boolean;
  Description?: string | null;
  UserID: number;
  Created: Date;
  Modified: Date;
  EscalationTimeHours:number
}