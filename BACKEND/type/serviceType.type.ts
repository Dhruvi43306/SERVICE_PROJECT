
export interface ServiceType {
  ServiceTypeID: number;
  ServiceTypeName: string;
  Description?: string | null;
  Sequence?: number | null;
  ServiceDeptID: number;
  SLAHours: number;
  WorkflowTypeID: number;
  UserID: number;
  Created: Date;
  Modified: Date;
  IsForStaff?: boolean | null;
  IsForStudent?: boolean | null;
}