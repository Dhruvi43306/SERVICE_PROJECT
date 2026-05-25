export interface Campus {
  CampusID: number;
  CampusName: string;
  CampusCode: string;
  Address?: string;
  City?: string;
  State?: string;
  Country?: string;
  IsActive: boolean;
  Created: Date;
  Modified: Date;
}