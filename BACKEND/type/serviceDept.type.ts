export interface ServiceDept {
  ServiceDeptID: number;               
  ServiceDeptName: string;        
  CampusID: number;          
  Description?: string | null;         
  UserID: number;                       
  Created: Date;              
  Modified: Date;             
  CCEmailToCSV?: string | null;        
  IsRequestTitleDisable?: boolean | null;
  DeptCode:string
  SLA_Hours:number
}