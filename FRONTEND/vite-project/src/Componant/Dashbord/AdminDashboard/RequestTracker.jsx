import React from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Chip,
  Divider,
  Button,
  IconButton,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DoneIcon from "@mui/icons-material/Done";
import ReplayIcon from "@mui/icons-material/Replay";


const serviceRequests = [
  {
    id: 1,
    requester: "John Doe",
    department: "IT",
    assignedTo: "Alice Smith",
    serviceType: "Laptop Not Booting",
    priority: "High",
    status: "In Progress",
    sla: "4 hours",
    createdAt: "2026-01-05 09:00 AM",
    internalNotes: "User reported laptop not booting. Possible hardware failure.",
    timeline: [
      { time: "09:00 AM", action: "Request created by John Doe" },
      { time: "09:30 AM", action: "Assigned to Alice Smith" },
      { time: "10:00 AM", action: "Technician started investigation" },
    ],
  },
  {
    id: 2,
    requester: "Mary Jane",
    department: "Facility",
    assignedTo: "Bob Brown",
    serviceType: "AC Not Cooling",
    priority: "Medium",
    status: "Pending",
    sla: "1 day",
    createdAt: "2026-01-04 02:15 PM",
    internalNotes: "AC not cooling properly in office room 201.",
    timeline: [
      { time: "02:15 PM", action: "Request created by Mary Jane" },
      { time: "02:30 PM", action: "Assigned to Bob Brown" },
    ],
  },
];

const priorityColor = (priority) => {
  if (priority === "High") return "high";
  if (priority === "Medium") return "medium";
  return "low";
};

const statusColor = (status) => {
  if (status === "Completed") return "completed";
  if (status === "In Progress") return "inprogress";
  if (status === "Pending") return "pending";
  return "unknown";
};

const RequestTracker  = () => {
  return (
    <Box className="tracker-page">
      {/* Top Section */}
      <Box className="tracker-header">
        <Typography variant="h4" className="tracker-title">
          Service Request Tracker
        </Typography>
      
      </Box>

      {/* Service Requests */}
      <Box className="request-list">
        {serviceRequests.map((req) => (
          <Paper key={req.id} className="request-card" elevation={5}>
            {/* Header */}
            <Box className="request-card-header">
              <Typography variant="h6" className="request-title">
                {req.serviceType}
              </Typography>
              <Chip
                label={req.status}
                className={`status-chip ${statusColor(req.status)}`}
              />
            </Box>

            <Divider sx={{ my: 1 }} />

            {/* Requester Info */}
            <Box className="request-info">
              <Box className="info-item">
                <PersonIcon className="info-icon" /> {req.requester}
              </Box>
              <Box className="info-item">
                <AssignmentIcon className="info-icon" /> {req.department}
              </Box>
              <Box className="info-item">
                <AccessTimeIcon className="info-icon" /> SLA: {req.sla}
              </Box>
              <Box className="info-item">
                <PriorityHighIcon className="info-icon" />
                <Chip
                  label={req.priority}
                  className={`priority-chip ${priorityColor(req.priority)}`}
                />
              </Box>
            </Box>

            <Divider sx={{ my: 1 }} />

            {/* Assigned & Notes */}
            <Box className="requester-assigned">
              <Typography variant="body2">
                <strong>Assigned To:</strong> {req.assignedTo}
              </Typography>
              <Typography variant="body2">
                <strong>Created At:</strong> {req.createdAt}
              </Typography>
            </Box>

            <Box className="internal-notes">
              <Typography variant="body2">
                <strong>Internal Notes:</strong> {req.internalNotes}
              </Typography>
            </Box>

            <Divider sx={{ my: 1 }} />

            {/* Timeline */}
            <Box className="timeline">
              <Typography variant="subtitle2" className="timeline-title">
                Timeline:
              </Typography>
              {req.timeline.map((t, idx) => (
                <Box key={idx} className="timeline-item">
                  <Typography variant="body2">
                    <strong>{t.time}</strong> - {t.action}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Actions */}
            <Box className="request-actions">
              <Button
                variant="contained"
                color="success"
                startIcon={<DoneIcon />}
              >
                Mark Complete
              </Button>
              <Button
                variant="outlined"
                color="warning"
                startIcon={<ReplayIcon />}
              >
                Reopen
              </Button>
            </Box>
          </Paper>
        ))}
      </Box>

      </Box>
  );
};

export default RequestTracker;
