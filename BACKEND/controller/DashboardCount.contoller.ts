import { Request, Response } from "express";
import { fetchDashboardCounts } from "../services/DashboardCount.service";

export const dashboardCounts = async (req: Request, res: Response) => {
  try {
    const userRole = "ADMIN";

    const data = await fetchDashboardCounts(userRole);

    res.json({
      error: true,
      dashboard: data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
