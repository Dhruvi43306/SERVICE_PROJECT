import { getDashboardCounts } from "../models/DashboardCount.model";
import { DashboardCounts } from "../type/serviceResponse.type";

export async function fetchDashboardCounts(
  role: string,
): Promise<DashboardCounts> {
  return await getDashboardCounts(role);
}
