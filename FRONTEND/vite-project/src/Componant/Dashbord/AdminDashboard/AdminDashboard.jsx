import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Avatar,
  Stack,
  Button,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PeopleIcon from '@mui/icons-material/People';
import EngineeringIcon from '@mui/icons-material/Engineering';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

import { Link } from 'react-router-dom';
const statusStyles = {
  inprogress: {
    backgroundColor: '#ffeee0',
    color: '#9a2812',
  },
  completed: {
    backgroundColor: '#DCFCE7',
    color: '#15803D',
  },
  AdminApproved: {
    backgroundColor: '#FFEDD5',
    color: '#C2410C',
  },
  pending: {
    backgroundColor: '#e7dada',
    color: '#4e0303',
  },
  AdminAssigned: {
    backgroundColor: '#e2e8ee',
    color: '#2c2f4f',
  },
   HODAssigned:{
     backgroundColor:'#eee2e9',
    color:"#4d2c4f"
  },
};

const getStatusKey = (id) => {
  switch (Number(id)) {
    case 28:
      return 'inprogress';
    case 19:
      return 'completed';
    case 21:
      return 'AdminApproved';
    case 35:
      return 'AdminAssigned';
     case 22:
      return 'HODAssigned'  
    default:
      return 'pending';
  }
};

const getStatusLabel = (id) => {
  switch (Number(id)) {
    case 28:
      return 'In Progress';
    case 19:
      return 'Completed';
    case 21:
      return 'Admin Approved';
    case 22:
      return 'HODAssigned'  
    case 35:
      return 'Admin Assigned';
    default:
      return 'Pending';
  }
};
const API_URL = 'http://localhost:5000/ServiceRequest';
const DASH_URL = 'http://localhost:5000/dashboardCounts';

const AdminDashboard = () => {
  const [listrequest, setreqlist] = useState([]);
  const [dashboard, setDashboard] = useState({
    totalRequests: 0,
    totalTechnicians: 0,
    totalHOD: 0,
  });
  const fetchSerivceRequest = async () => {
    try {
      const res = await fetch(API_URL, {
        method: 'GET',
        credentials: 'include',
      });

      const result = await res.json();
      console.log('REQ API:', result);
      if (!result || !Array.isArray(result.data)) {
        setreqlist([]);
        return;
      }
      const formattedData = result.data.map(mapServiceRequest);
      setreqlist(formattedData);
    } catch (err) {
      console.error('Fetch Error:', err);
      setreqlist([]);
    }
  };

  const fetchDashboard = async () => {
    try {
      const res = await fetch(DASH_URL, {
        method: 'GET',
        credentials: 'include',
      });
      const result = await res.json();
      setDashboard(result.dashboard);
    } catch (err) {
      console.error(err);
    }
  };
  const mapServiceRequest = (r) => {
    const date = r.ServiceRequestDateTime
      ? new Date(r.ServiceRequestDateTime).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
        })
      : '';

    return {
      id: Number(r.ServiceRequestID),
      no: r.ServiceRequestNo ?? 'N/A',
      name: r.AdminName ?? r.RequestorName ?? 'Unknown',
      ServiceDeptName: r.ServiceDeptName ?? '',
      status: r.status ?? 'Pending',
      priority: r.priority || 'High',
      PriorityID: r.PriorityID,
      ServiceRequestStatusID: r.ServiceRequestStatusID,
      AdminApprovedBy: Number(r.AdminApprovedBy),
      AdminAssignedBy: Number(r.AdminAssignedBy),
      HODApprovedBy: Number(r.HODApprovedBy),
      date,
    };
  };

  useEffect(() => {
    fetchSerivceRequest();
    fetchDashboard();
  }, []);

  return (
    <Box className="asc-core-container">
      <Box className="asc-core-header-banner">
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" alignItems="center" spacing={2.5}>
            <Box className="asc-core-logo-box">
              <CheckCircleIcon sx={{ fontSize: 30 }} />
            </Box>
            <Box>
              <Typography className="asc-core-main-title">SYSTEM MASTER</Typography>
              <Typography className="asc-core-sub-title">Admin Service Command Centre</Typography>
            </Box>
          </Stack>
        </Stack>
      </Box>

      <Box className="asc-core-content-wrapper">
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card className="asc-core-stat-card">
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box className="asc-core-icon-bg asc-core-blue">
                    <PeopleIcon />
                  </Box>

                  <Box>
                    <Typography className="asc-core-metric-val">
                      {dashboard.totalRequests}
                    </Typography>
                    <Typography className="asc-core-metric-label">REQUESTERS</Typography>
                  </Box>
                </Stack>
              </Stack>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card className="asc-core-stat-card">
              <Stack direction="row" spacing={2} alignItems="center">
                <Box className="asc-core-icon-bg asc-core-indigo">
                  <EngineeringIcon />
                </Box>

                <Box>
                  <Typography className="asc-core-metric-val">
                    {dashboard.totalTechnicians}
                  </Typography>
                  <Typography className="asc-core-metric-label">TECHNICIANS</Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card className="asc-core-stat-card">
              <Stack direction="row" spacing={2} alignItems="center">
                <Box className="asc-core-icon-bg asc-core-purple">
                  <SupervisorAccountIcon />
                </Box>
                <Box>
                  <Typography className="asc-core-metric-val">{dashboard.totalHOD}</Typography>
                  <Typography className="asc-core-metric-label">HODs</Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>

        <TableContainer component={Paper} className="modern-pipeline-container" elevation={0}>
          <Table sx={{ minWidth: 800, marginBottom: '25px' }}>
            <TableHead className="glass-thead">
              <TableRow>
                <TableCell>IDENTIFIER</TableCell>
                <TableCell>PRIMARY STAKEHOLDER</TableCell>
                <TableCell>DEPARTMENT</TableCell>
                <TableCell>WORKFLOW STATUS</TableCell>
                <TableCell>PRIORITY</TableCell>
                <TableCell align="right">OPERATIONS</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {listrequest.map((row) => (
                <TableRow key={row.id} className="modern-table-row">
                  <TableCell>
                    <Box className="id-badge">
                      <Typography className="id-text">{row.no}</Typography>

                      <Typography className="date-sub-text">{row.date}</Typography>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar
                        className="stakeholder-avatar"
                        sx={{
                          bgcolor: row.status === 'Pending' ? '#ff9800' : '#6366f1',
                        }}
                      >
                        {row.name?.charAt(0)}
                      </Avatar>

                      <Box>
                        <Typography className="stakeholder-name">{row.name}</Typography>

                        {/* <Typography className="assigned-sub-text">Lead: {row.name}</Typography> */}
                      </Box>
                    </Stack>
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={row.ServiceDeptName}
                      variant="outlined"
                      className="dept-tag-modern"
                    />
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={getStatusLabel(row.ServiceRequestStatusID)}
                      sx={{
                        ...statusStyles[getStatusKey(row.ServiceRequestStatusID)],
                        fontWeight: 600,
                        borderRadius: '8px',
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={row.priority}
                      size="small"
                      className={`priority-chip ${row.priority.toLowerCase()}`}
                    />
                  </TableCell>

                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      {Number(row.AdminApprovedBy) === 1 ? (
                        <Chip
                          icon={<CheckCircleIcon sx={{ fontSize: 16 }} />}
                          label="Approved"
                          sx={{
                            backgroundColor: '#DCFCE7',
                            color: '#15803D',
                            fontWeight: 600,
                            borderRadius: '8px',
                          }}
                        />
                      ) : (
                        <Link to={`/AdminApprovePage/${row.id}`}>
                          <Button size="small" variant="contained" className="btn-approve-mini">
                            Approve
                          </Button>
                        </Link>
                      )}
                      {Number(row.AdminAssignedBy) === 1 ? (
                        <Chip
                          icon={<CheckCircleIcon sx={{ fontSize: 16 }} />}
                          label="Assigned"
                          sx={{
                            backgroundColor: '#E0F2FE',
                            color: '#0369A1',
                            fontWeight: 600,
                            borderRadius: '8px',
                          }}
                        />
                      ) : (
                        <>
                          {Number(row.HODApprovedBy) != 71 ? (
                            <Link to={`/AssignedTech/${row.id}`}>
                              <Button size="small" variant="contained" className="btn-assign-mini">
                                Assign
                              </Button>
                            </Link>
                          ) : (
                            <Button
                              size="small"
                              variant="contained"
                              className="btn-assign-mini"
                              onClick={() =>
                                alert('Admin has not approved this request. HOD cannot assign.')
                              }
                            >
                              Assign
                            </Button>
                          )}
                        </>
                      )}
                      {/* <IconButton className="btn-more-mini">
                        <MoreHorizIcon fontSize="small" />
                      </IconButton> */}
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
