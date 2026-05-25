export interface ServiceDeptPerson {
  ServiceDeptPersonID: number;
  ServiceDeptID: number;
  DeptRole:string,
  StaffID: number;
  FromDate: Date;
  ToDate: Date | null;
  Description: string | null;
  UserID: number;
  Created: Date;
  Modified: Date;
  IsHODStaff: boolean | null;
}