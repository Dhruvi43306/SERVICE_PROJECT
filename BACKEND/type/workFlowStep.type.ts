export type WorkflowType = 'TECHNICIAN'| 'FACILITY'| 'ADMIN'| 'STAFF'| 'HOD' ;
export interface WorkflowStep {
  WorkflowStepID: number;
  WorkflowTypeID: number;
  RoleName: string;
  StepOrder: number;
  Created?: string;
  Modified?: string;
}