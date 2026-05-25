
export interface ServiceRequestType {
  ServiceRequestTypeID: number;
  ServiceTypeID: number;
  ServiceDeptID: number;
  ServiceRequestTypeName: string;

  Description?: string | null;
  Sequence?: number | null;

  UserID: number;
  Created: Date;
  Modified: Date;

  RequestTotal: number;
  RequestPending: number;
  RequestClosed: number;
  RequestCancelled: number;

  IsVisibleResource?: boolean | null;
  DefaultPriorityLevel?: number | null;
  ReminderDaysAfterAssignment?: number | null;
  IsMandatoryResource?: boolean | null;
  Category:string
  SLA:number
}