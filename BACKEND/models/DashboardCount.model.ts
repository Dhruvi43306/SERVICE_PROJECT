import { RowDataPacket } from "mysql2";
import { db } from "../db/mysql";
import { DashboardCounts } from "../type/serviceResponse.type";

export async function getDashboardCounts(
  userRole: string,
): Promise<DashboardCounts> {
  const [requestRows] = await db.query<RowDataPacket[]>(`
    SELECT COUNT(*) AS totalRequests FROM ServiceRequest`);

  let totalTechnicians = 0;
  let totalHOD = 0;

  if (userRole === "ADMIN") {
    const [techRows] = await db.query<RowDataPacket[]>(`
        SELECT COUNT(*) AS totalTechnicians 
        FROM users 
        WHERE Role='TECHNICIAN'
    `);

    const [hodRows] = await db.query<RowDataPacket[]>(`
        SELECT COUNT(*) AS totalHOD 
        FROM users 
        WHERE Role='HOD'
    `);

    totalTechnicians = techRows[0].totalTechnicians;
    totalHOD = hodRows[0].totalHOD;
  }

  return {
    totalRequests: requestRows[0].totalRequests,
    totalTechnicians,
    totalHOD,
  };
}
