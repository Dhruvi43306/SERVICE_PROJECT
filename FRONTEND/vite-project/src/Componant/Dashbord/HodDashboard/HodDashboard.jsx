import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  Stack,
  Tooltip,
} from '@mui/material';
import { Link } from 'react-router-dom';

// Icons
import BoltIcon from '@mui/icons-material/Bolt';
import ReplayIcon from '@mui/icons-material/Replay';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Swal from 'sweetalert2';

const statusStyles = {
  inprogress: { backgroundColor: '#ffeee0', color: '#9a2812' },
  completed: { backgroundColor: '#DCFCE7', color: '#15803D' },
  AdminApproved: { backgroundColor: '#FFEDD5', color: '#C2410C' },
  pending: { backgroundColor: '#e7dada', color: '#4e0303' },
  HODAssigned: { backgroundColor: '#e2e8ee', color: '#2c2f4f' },
  AdminAssigned: { backgroundColor: '#eee2e9', color: '#4d2c4f' },
};

const getStatusKey = (id) => {
  switch (Number(id)) {
    case 28: return 'inprogress';
    case 19: return 'completed';
    case 21: return 'AdminApproved';
    case 22: return 'HODAssigned';
    case 35: return 'AdminAssigned';
    default: return 'pending';
  }
};

const getStatusLabel = (id) => {
  switch (Number(id)) {
    case 28: return 'In Progress';
    case 19: return 'Completed';
    case 21: return 'Admin Approved';
    case 22: return 'HOD Assigned';
    case 35: return 'Admin Assigned';
    default: return 'Pending';
  }
};

const API_URL = 'http://localhost:5000/ServiceRequest';

const HodDashboard = () => {
  const [requests, setRequests] = useState([]);

  const fetchServiceRequests = async () => {
    try {
      const res = await fetch(API_URL, {
        method: 'GET',
        credentials: 'include',
      });
      const result = await res.json();
      const safeData = Array.isArray(result.data)
        ? result.data.map((r) => ({
            ...r,
            ServiceRequestTitle: r.ServiceRequestTitle || '-',
            ServiceRequestDescription: r.ServiceRequestDescription || '-',
          }))
        : [];
      setRequests(safeData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchServiceRequests();
  }, []);

  const inprogress = requests.filter((r) => Number(r.ServiceRequestStatusID) === 28).length;
  const completed = requests.filter((r) => Number(r.ServiceRequestStatusID) === 19).length;

  const showToast = (title, icon) => {
    Swal.fire({
      icon: icon,
      title: title,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: '#fff',
      color: '#000',
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });
  };

  const showModal = (title, text, icon) => {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonColor: '#3085d6',
      background: '#ffffff',
      backdrop: `rgba(0,0,123,0.1)`,
      showClass: { popup: 'animate__animated animate__fadeInDown' },
      hideClass: { popup: 'animate__animated animate__fadeOutUp' }
    });
  };

  return (
    <Box className="svc-premium-dashboard-root">
      <header className="svc-dashboard-header-modern">
        <Box className="svc-header-content">
          <Box className="brand-group">
            <Box className="svc-logo-orb"><BoltIcon /></Box>
            <Box>
              <Typography variant="h1" className="svc-header-title-modern">
                HOD <span className="bold">Intelligence</span>
              </Typography>
              <Typography className="svc-header-subtitle-modern">
                Enterprise Service Management
              </Typography>
            </Box>
          </Box>
        </Box>
      </header>

      <Box className="svc-main-content-overlap">
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <StatCard title="Completed" value={completed} icon={<TaskAltIcon />} iconBg="#6366f1" />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <StatCard title="In Progress" value={inprogress} icon={<PendingActionsIcon />} iconBg="#f59e0b" />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <StatCard title="Efficiency" value="94%" icon={<CheckCircleOutlineIcon />} iconBg="#10b981" />
          </Grid>
        </Grid>

        <Box className="svc-table-section-wrapper">
          <Box className="svc-table-action-bar">
            <Typography variant="h6" className="svc-section-title">Active Service Requests</Typography>
            <Typography className="svc-row-counter">Total: {requests.length} Items</Typography>
          </Box>

          <TableContainer component={Paper} className="svc-premium-table-container">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Request ID</TableCell>
                  <TableCell>Requester</TableCell>
                  <TableCell>Issue Description</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">No Requests Found</TableCell>
                  </TableRow>
                ) : (
                  requests.map((row) => {
                    const isAdminApproved = Number(row.AdminAssignedBy) === 1;
                    const isAlreadyAssigned = Number(row.HODApprovedBy) === 1 || Number(row.AdminAssignedBy) === 1;

                    return (
                      <TableRow key={row.ServiceRequestID} className="svc-premium-table-row">
                        <TableCell className="svc-id-cell">{row.ServiceRequestNo}</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>{row.FullName || 'Requester'}</TableCell>
                        <TableCell className="svc-desc-cell">{row.ServiceRequestDescription}</TableCell>
                        <TableCell>
                          <Chip
                            label={getStatusLabel(row.ServiceRequestStatusID)}
                            sx={{
                              ...statusStyles[getStatusKey(row.ServiceRequestStatusID || 21)],
                              fontWeight: 600,
                              borderRadius: '8px',
                            }}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Stack direction="row" spacing={1} justifyContent="flex-end">
                            {isAdminApproved ? (
                              <Tooltip title="Awaiting Admin approval" arrow>
                                <span>
                                  <Button
                                    size="large"
                                    variant="contained"
                                    className="btn-assign-mini"
                                    sx={{ filter: 'grayscale(1)', opacity: 0.7 }}
                                    // onClick={() => showModal('Assignment Locked', 'HOD cannot assign this task until it is Assigned by the Admin.', 'warning')}
                                  >
                                    Assign
                                  </Button>
                                </span>
                              </Tooltip>
                            ) : isAlreadyAssigned ? (
                              <Tooltip title="Task is already in progress" arrow>
                                <span>
                                  <Button
                                    size="large"
                                    variant="contained"
                                    className="btn-assign-mini"
                                    color="success"
                                    onClick={() => showToast('Request is already assigned successfully.', 'info')}
                                  >
                                    Assign
                                  </Button>
                                </span>
                              </Tooltip>
                            ) : (
                              <Link to={`/AssignedTech/${row.ServiceRequestID}`} style={{ textDecoration: 'none' }}>
                                <Button size="large" variant="contained" className="btn-assign-mini" color="primary">
                                  Assign
                                </Button>
                              </Link>
                            )}
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

const StatCard = ({ title, value, icon, iconBg }) => (
  <Card className="svc-modern-stat-card-v2">
    <CardContent sx={{ p: '24px !important' }}>
      <Stack direction="row" alignItems="center" spacing={3}>
        <Box className="svc-stat-icon-square" sx={{ backgroundColor: iconBg }}>{icon}</Box>
        <Box>
          <Typography className="svc-stat-val-v2">{value}</Typography>
          <Typography className="svc-stat-label-v2">{title}</Typography>
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

export default HodDashboard;