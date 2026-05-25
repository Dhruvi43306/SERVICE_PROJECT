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
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import SpeedIcon from '@mui/icons-material/Speed';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import TuneIcon from '@mui/icons-material/Tune';
import { Link, useNavigate } from 'react-router-dom';
import { Visibility } from '@mui/icons-material';
import { socket } from '../../../socket';

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
 HODAssigned: {
    backgroundColor: '#e2e8ee',
    color: '#2c2f4f',
  },
  AdminAssigned: {
    backgroundColor: '#eee2e9',
    color: '#4d2c4f',
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
    case 22:
      return 'HODAssigned';
    case 35:
      return 'AdminAssigned';
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
      return 'AdminApproved';
    case 22:
      return 'HODAssigned';
    case 35:
      return 'AdminAssigned';
    default:
      return 'Pending';
  }
};
const API_URL = 'http://localhost:5000/ServiceRequest';

const TechnicianDashboard = () => {
  const [listrequest, setreqlist] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [notifications, setNotifications] = useState([]);
  const [alertConfig, setAlertConfig] = useState({
    open: false,
    message: '',
    severity: 'info', // 'success', 'error', 'warning', 'info'
  });

  const showAlert = (message, severity = 'info') => {
    setAlertConfig({ open: true, message, severity });
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') return;
    setAlertConfig({ ...alertConfig, open: false });
  };
  //  JOIN SOCKET
  useEffect(() => {
    if (user?.UserID) {
      console.log('JOIN USER:', user.UserID);
      socket.emit('join', user.UserID);
    }
  }, [user]);

  useEffect(() => {
    socket.on('newNotification', (data) => {
      console.log('REALTIME:', data);
      alert(data.message);
      setNotifications((prev) => [data, ...prev]);
    });
    return () => socket.off('newNotification');
  }, []);

  
  useEffect(() => {
    fetch('http://localhost:5000/notify', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('OLD NOTIFICATIONS:', data);
        setNotifications(data);
      });
  }, []);

  const fetchSerivceRequest = async () => {
    try {
      const res = await fetch(API_URL, {
        method: 'GET',
        credentials: 'include',
      });

      const result = await res.json();
      console.log('REQ API:', result);

      const safeData = Array.isArray(result.data)
        ? result.data.map((r) => ({
            ...r,
            id: r.ServiceRequestID,
            priority: r.priority || 'High',
            ServiceRequestTitle: r.ServiceRequestTitle || '-',
            ServiceRequestDescription: r.ServiceRequestDescription || '-',
          }))
        : [];

      setreqlist(safeData);
    } catch (err) {
      console.log(err);
    }
  };

  const handleStartClick = async (row) => {
    const statusID = row.ServiceRequestStatusID;
    if (statusID === 19) return showAlert('This request is already completed.');
    else if (statusID === 28) return showAlert('Work already started.');
    // else if (statusID == 35) return alert('Admin can not Assign Request.');
    else if (statusID != 22 && statusID != 35) return showAlert('HOD or ADMIN can not Assign Request.');
    try {
      navigate(`/StartWorkPage/${row.id}`);
    } catch (err) {
      console.error(err);
      showAlert('Failed to start work.');
    }
  };

  const handleResolveClick = async (row) => {
    const statusID = row.ServiceRequestStatusID;
    if (statusID === 22) return showAlert('Please start work before resolving.');
    if (statusID === 19) return showAlert('Request already resolved.');

    try {
      console.log('Navigate ID:', row.id);
      showAlert('Request resolved and notification sent!');
      setTimeout(() => navigate(`/ResulationPage/${row.id}`), 1000);
    } catch (err) {
      console.error(err);
      showAlert('Failed to resolve request.');
    }
  };

  useEffect(() => {
    fetchSerivceRequest();
  }, []);

  const inprogress = listrequest.filter((r) => Number(r.ServiceRequestStatusID) === 28).length;
  const completed = listrequest.filter((r) => Number(r.ServiceRequestStatusID) === 19).length;
  const assigned = listrequest.filter((r) => Number(r.ServiceRequestStatusID) === 22).length;

  return (
    <Box className="premium-tech-root">
      <Snackbar
        open={alertConfig.open}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        TransitionComponent={(props) => <Slide {...props} direction="left" />}
      >
        <Alert
            onClose={handleCloseAlert} 
            severity={alertConfig.severity} 
            variant="filled"
            sx={{ 
                width: '100%', 
                borderRadius: '12px',
                fontWeight: 600,
                boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                fontSize: '0.95rem'
            }}
        >
          {alertConfig.message}
        </Alert>
      </Snackbar>
      <Box className="glass-header">
        <Box>
          <Typography variant="h4" className="snc-page-title">
            Technician <span className="title-bold">Workspace</span>
          </Typography>

          <Typography className="snc-page-subtitle">
            Precision management for your service tickets
          </Typography>
        </Box>

        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            variant="standard"
            placeholder="Search tickets..."
            className="modern-search"
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#fff', opacity: 0.8 }} />
                </InputAdornment>
              ),
            }}
          />

          <Tooltip title="Advanced Filters">
            <IconButton className="header-icon-btn">
              <TuneIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>

      <Box className="content-container">
        <Grid container spacing={3} sx={{ mt: -6, mb: 4 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Link to="/TechnicianInProgress" style={{ textDecoration: 'none' }}>
              <StatCard
                title="Inprogress Tickets"
                value={inprogress}
                icon={<AssignmentLateIcon />}
                gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              />
            </Link>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Link to="/TechnitionCompleted" style={{ textDecoration: 'none' }}>
              <StatCard
                title="completed Request"
                value={completed}
                icon={<TaskAltIcon />}
                gradient="linear-gradient(135deg, #11998e 0%, #38ef7d 100%)"
              />
            </Link>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Link to="/TechnicianAssignedRequests" style={{ textDecoration: 'none' }}>
              <StatCard
                title="Assigned Request"
                value={assigned}
                icon={<SpeedIcon />}
                gradient="linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)"
              />
            </Link>
          </Grid>
        </Grid>

        <Box className="table-wrapper">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 2, px: 1 }}
          >
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#2d3748' }}>
              Active Workbench
            </Typography>

            <Link to="/AlltechnitionPage">
              <Button variant="text" size="small" sx={{ fontWeight: 700 }}>
                View All
              </Button>
            </Link>
          </Stack>

          <TableContainer component={Paper} className="modern-table-container">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Client</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Urgency</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Engagement</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {listrequest.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No Requests Found
                    </TableCell>
                  </TableRow>
                ) : (
                  listrequest.map((row) => (
                    <TableRow key={row.id} className="modern-table-row">
                      <TableCell className="id-link">{row.ServiceRequestNo}</TableCell>

                      <TableCell sx={{ fontWeight: 600 }}>
                        {row.RequestorName || 'Client'}
                      </TableCell>

                      <TableCell sx={{ color: '#718096', maxWidth: 250 }}>
                        {row.ServiceRequestDescription}
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={row.priority}
                          size="small"
                          className={`priority-chip ${row.priority.toLowerCase()}`}
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

                      <TableCell align="right">
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          {/* View Button */}
                          {/* <Button
                            startIcon={
                              <Link to="/TechnitionDetail">
                                <Visibility />
                              </Link>
                            }
                            className="btn-reply"
                          /> */}
                          {Number(row.ServiceRequestStatusID) === 19 ? (
                            <Button variant="contained" size="small" disabled className="btn-start">
                              Already Resolved
                            </Button>
                          ) : Number(row.ServiceRequestStatusID) === 28 ? (
                            <Button
                              variant="contained"
                              startIcon={<CheckCircleOutlineIcon />}
                              className="btn-resolve"
                              disableRipple
                              onClick={() => handleResolveClick(row)}
                            >
                              Resolve
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              size="small"
                              startIcon={<SpeedIcon sx={{ fontSize: '12px !important' }} />}
                              className="btn-start"
                              disableRipple
                              onClick={() => handleStartClick(row)}
                            >
                              Start
                            </Button>
                          )}
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

const StatCard = ({ title, value, icon, gradient }) => (
  <Card className="modern-stat-card">
    <CardContent sx={{ p: '0 !important' }}>
      <Box className="stat-flex">
        <Box className="stat-icon-wrap" sx={{ background: gradient }}>
          {icon}
        </Box>

        <Box>
          <Typography className="stat-val">{value}</Typography>

          <Typography className="stat-lbl">{title}</Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

export default TechnicianDashboard;
