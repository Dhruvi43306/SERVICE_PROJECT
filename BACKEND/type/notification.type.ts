// Notification.ts
export interface Notification {
NotificationId: number;            
  UserID: number;      
  ServiceRequestID?: number;    
  message: string;        
  ServiceType: 'request_resolved' | 'assigned' | 'general'; 
is_read: number;        
  link?: string | null;          
  created_at: Date;       
  updated_at?: Date;       
}