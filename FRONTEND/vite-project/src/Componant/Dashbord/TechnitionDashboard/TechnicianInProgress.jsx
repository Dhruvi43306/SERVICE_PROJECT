import React from "react";
import { Box, Card, CardContent, Typography, Chip, IconButton, Tooltip } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { Link } from "react-router-dom";

function TechnicianInProgress() {
  const technicianInProgressData = [
    { id: "SR-2001", title: "Email server troubleshooting", technician: "Amit Sharma", department: "IT Infrastructure", priority: "High", status: "IN PROGRESS", sla: "1h 20m" },
    { id: "SR-2002", title: "VPN access configuration", technician: "Amit Sharma", department: "Network Support", priority: "Medium", status: "IN PROGRESS", sla: "2h 00m" },
    { id: "SR-2003", title: "System performance optimization", technician: "Amit Sharma", department: "Desktop Support", priority: "Low", status: "IN PROGRESS", sla: "3h 45m" },
  ];

  return (
    <Box className="inp-tech-progress-container">
      {/* Header */}
      <Box className="inp-tech-header-card">
        <Box>
          <Typography className="inp-tech-header-title">
            <EngineeringIcon className="inp-tech-header-icon" />
            Technician In-Progress
          </Typography>
          <Typography className="inp-tech-header-subtitle">
            Manage and track your active service requests in real-time
          </Typography>
        </Box>
      </Box>

      {/* Summary Card */}
      <Card className="inp-tech-summary-card">
        <CardContent>
          <Typography className="inp-summary-label">Active Tasks</Typography>
          <Typography className="inp-summary-count">{technicianInProgressData.length}</Typography>
        </CardContent>
      </Card>

      {/* Table Section */}
      <Card className="inp-tech-table-card">
        <Box sx={{ overflowX: 'auto' }}>
          <table className="inp-tech-table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Title & Assigned To</th>
                <th>Department</th>
                <th>Priority</th>
                <th>Status</th>
                <th>SLA Remaining</th>
                <th style={{ textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {technicianInProgressData.map((item) => (
                <tr key={item.id}>
                  <td style={{ fontWeight: 800, color: '#7172c4' }}>{item.id}</td>
                  <td>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#1e293b' }}>
                      {item.title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 500 }}>
                      {item.technician}
                    </Typography>
                  </td>
                  <td style={{ fontWeight: 500, color: '#64748b' }}>{item.department}</td>
                  <td>
                    <Chip 
                      label={item.priority} 
                      className={`inp-priority-chip ${item.priority.toLowerCase()}`} 
                      size="small"
                    />
                  </td>
                  <td>
                    <Chip 
                      label={item.status} 
                      className="inp-status-chip inprogress" 
                      size="small"
                    />
                  </td>
                  <td>
                    <Box className="inp-sla-box">
                      <AccessTimeIcon className="inp-sla-icon" />
                      {item.sla}
                    </Box>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <Tooltip title="View Request Details" arrow>
                      <IconButton 
                        component={Link} 
                        to="/TechnicianRequestDetails" 
                        className="inp-view-btn"
                        size="small"
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Card>
    </Box>
  );
}

export default TechnicianInProgress;