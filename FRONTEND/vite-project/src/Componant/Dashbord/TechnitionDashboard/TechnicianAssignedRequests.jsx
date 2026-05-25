import React from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton
} from "@mui/material";
import { Link } from "react-router-dom";

import AssignmentIcon from "@mui/icons-material/Assignment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AccessTimeIcon from "@mui/icons-material/AccessTime";


/* ---------- STATIC DATA ---------- */
const requests = [
  {
    id: "SR-1001",
    title: "Email not working",
    priority: "High",
    status: "In Progress",
    sla: "1h 30m"
  },
  {
    id: "SR-1002",
    title: "Printer issue",
    priority: "Medium",
    status: "Pending",
    sla: "3h"
  },
  {
    id: "SR-1003",
    title: "System slow performance",
    priority: "Low",
    status: "Completed",
    sla: "Resolved"
  }
];

const TechnicianAssignedRequests = () => {
  return (
    <Box className="techDash-page">

      {/* ===== HEADER CARD ===== */}
      <Paper className="techDash-headerCard">
        <Box className="techDash-headerContent">
          <AssignmentIcon className="techDash-headerIcon" />
          <Box>
            <Typography className="techDash-title">
              Assigned Requests
            </Typography>
            <Typography className="techDash-subtitle">
              Requests currently assigned to you
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* ===== SUMMARY ===== */}
      <Box className="techDash-summary">

        <Paper className="techDash-summaryCard pending">
          <span className="techDash-accent" />
          <Box>
            <Typography className="techDash-label">Pending</Typography>
            <Typography className="techDash-count">1</Typography>
          </Box>
        </Paper>

        <Paper className="techDash-summaryCard progress">
          <span className="techDash-accent" />
          <Box>
            <Typography className="techDash-label">In Progress</Typography>
            <Typography className="techDash-count">1</Typography>
          </Box>
        </Paper>

        <Paper className="techDash-summaryCard completed">
          <span className="techDash-accent" />
          <Box>
            <Typography className="techDash-label">Completed</Typography>
            <Typography className="techDash-count">1</Typography>
          </Box>
        </Paper>

      </Box>

      {/* ===== TABLE ===== */}
      <Paper className="techDash-tableCard">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow className="techDash-tableHead">
                <TableCell>Request ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>SLA</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {requests.map((r) => (
                <TableRow key={r.id} hover>
                  <TableCell className="techDash-reqId">{r.id}</TableCell>
                  <TableCell className="techDash-reqTitle">{r.title}</TableCell>

                  <TableCell>
                    <Chip
                      label={r.priority}
                      className={`techDash-priority ${r.priority.toLowerCase()}`}
                      size="small"
                    />
                  </TableCell>

                  <TableCell>
                    <Chip label={r.status} size="small" />
                  </TableCell>

                  <TableCell className="techDash-sla">
                    <AccessTimeIcon fontSize="small" />
                    {r.sla}
                  </TableCell>

                  <TableCell align="center">
                    <IconButton>
                      <Link to="/TechnicianRequestDetails"><VisibilityIcon /></Link>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </TableContainer>
      </Paper>

    </Box>
  );
};

export default TechnicianAssignedRequests;
