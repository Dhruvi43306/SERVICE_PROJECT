import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import {
  Box,
  Grid,
  Typography,
  Avatar,
  Button,
  Stack,
  TextField,
  Container,
  Paper,
  Checkbox,
  FormControlLabel,
} from '@mui/material';

import { ShieldCheck, MapPin, User, CheckCircle, HardHat, Send, AlertCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';

const API_URL = 'http://localhost:5000/ServiceRequest';
const USER_URL = 'http://localhost:5000/users';
const HOD_ASSIGN_URL = 'http://localhost:5000/ServiceRequest/hodAssigned';
const ADMIN_ASSIGN_URL = 'http://localhost:5000/ServiceRequest/adminAssigned';

const AssignedTech = () => {
  const { id } = useParams();

  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;

  const [isValidated, setIsValidated] = useState(false);
  const [selectedTech, setSelectedTech] = useState(null);
  const [listrequest, setreqlist] = useState([]);
  const [users, setUsers] = useState([]);

  const reqid = Number(id);

  useEffect(() => {
    if (!id || isNaN(reqid)) {
      console.error('Invalid ServiceRequest ID:', id);
      return;
    }
    fetchSerivceRequest();
    fetchUsers();
  }, [id]);

  const fetchSerivceRequest = async () => {
    try {
      const res = await fetch(`${API_URL}/${reqid}`, {
        method: 'GET',
        credentials: 'include',
      });

      const result = await res.json();

      setreqlist(result.data ? [result.data] : []);
    } catch (err) {
      console.error('Fetch Error:', err);
      setreqlist([]);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch(USER_URL, {
        method: 'GET',
        credentials: 'include',
      });

      const result = await res.json();

      setUsers(result.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const assignedRequest = async (requestID) => {
    if (!selectedTech) {
      Swal.fire('Select Technician first');
      return;
    }

    if (!user) {
      Swal.fire({
        title: 'Session Expired',
        text: 'Please login again.',
        icon: 'error',
      });
      return;
    }
    const token = localStorage.getItem('token');

    if (!token) {
      Swal.fire({
        title: 'Unauthorized',
        text: 'Token missing. Please login again.',
        icon: 'error',
      });
      return;
    }

    try {
      let url = '';
      let bodyData = {};

      if (user.Role === 'HOD') {
        url = `${HOD_ASSIGN_URL}/${requestID}`;
        bodyData = {
          technicianID: selectedTech,
          hodID: user.UserID,
        };
      } else if (user.Role === 'ADMIN') {
        url = `${ADMIN_ASSIGN_URL}/${requestID}`;
        bodyData = {
          technicianID: selectedTech,
        };
      } else {
        Swal.fire({
          title: 'Access Denied',
          text: `Your role (${user?.Role}) is not allowed.`,
          icon: 'error',
        });
        return;
      }

      const res = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bodyData),
      });

      const result = await res.json();

      if (res.status === 401) {
        Swal.fire({
          title: 'Session Expired',
          text: 'Please login again.',
          icon: 'error',
        });
        return;
      }

      if (res.ok) {
        Swal.fire({
          title: 'Assigned!',
          text: 'Technician successfully assigned.',
          icon: 'success',
        });

        fetchSerivceRequest();
      } else {
        Swal.fire({
          title: 'Assignment Failed',
          text: result.message || 'Something went wrong.',
          icon: 'error',
        });
      }
    } catch (err) {
      console.error('Assign Error:', err);

      Swal.fire({
        title: 'Server Error',
        text: 'Please try again later.',
        icon: 'error',
      });
    }
  };
  return (
    <Box className="v-flow-root">
      <Container maxWidth="lg">
        <Box className="v-flow-banner">
          <ShieldCheck color="#10b981" size={20} />
          <Typography variant="body2" fontWeight={600} color="#065f46">
            Managerial Review: Verify details before technician dispatch.
          </Typography>
        </Box>

        {listrequest.map((ticket) => (
          <Grid container spacing={4} key={ticket.ServiceRequestID}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper className="v-flow-review-card" elevation={0}>
                <span className="v-flow-section-header">Request Assessment</span>

                <Typography variant="h5" fontWeight={800} color="#1e293b" gutterBottom>
                  {ticket.ServiceRequestTitle}
                </Typography>

                <Stack spacing={2} sx={{ my: 3 }}>
                  <InfoItem
                    icon={<MapPin size={18} />}
                    label="Location"
                    value={ticket.ServiceDeptName}
                  />
                  <InfoItem icon={<User size={18} />} label="Requested By" value="Admin (IT)" />
                  <InfoItem
                    icon={<AlertCircle size={18} />}
                    label="Urgency"
                    value={ticket.priority}
                  />
                </Stack>

                <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: '12px', mb: 3 }}>
                  <Typography variant="caption" fontWeight={700} color="#94a3b8">
                    PROBLEM DESCRIPTION
                  </Typography>

                  <Typography variant="body2" color="#475569">
                    {ticket.ServiceRequestDescription}
                  </Typography>
                </Box>

                <Divider sx={{ my: 3 }} />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isValidated}
                      onChange={(e) => setIsValidated(e.target.checked)}
                      color="success"
                    />
                  }
                  label={
                    <Typography
                      variant="body2"
                      fontWeight={700}
                      color={isValidated ? '#10b981' : '#64748b'}
                    >
                      I have reviewed these details and confirm they are valid.
                    </Typography>
                  }
                />
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Paper
                className="v-flow-review-card"
                elevation={0}
                style={{
                  opacity: isValidated ? 1 : 0.5,
                  pointerEvents: isValidated ? 'auto' : 'none',
                  transition: '0.3s',
                }}
              >
                <span className="v-flow-section-header">Technician Dispatch</span>

                <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
                  Select Personnel
                </Typography>

                <Stack spacing={2}>
                  {users
                    .filter((t) => t.Role === 'TECHNICIAN')
                    .map((t) => (
                      <Box
                        key={t.UserID}
                        className={`v-flow-tech-box ${selectedTech === t.UserID ? 'v-flow-tech-selected' : ''}`}
                        onClick={() => setSelectedTech(t.UserID)}
                      >
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Avatar sx={{ bgcolor: '#ede9fe', color: '#7c3aed' }}>
                            <HardHat size={20} />
                          </Avatar>

                          <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="body2" fontWeight={700}>
                              {t.FullName}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {t.Role}
                            </Typography>
                          </Box>

                          {selectedTech === t.UserID && <CheckCircle size={20} color="#a855f7" />}
                        </Stack>
                      </Box>
                    ))}
                </Stack>

                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Special Instructions"
                  sx={{ mt: 4 }}
                />

                <Button
                  className="v-flow-dispatch-btn"
                  fullWidth
                  variant="contained"
                  disabled={!isValidated || !selectedTech}
                  startIcon={<Send size={18} />}
                  sx={{ mt: 3 }}
                  onClick={() => assignedRequest(ticket.ServiceRequestID)}
                >
                  Dispatch to Technician
                </Button>
              </Paper>
            </Grid>
          </Grid>
        ))}
      </Container>
    </Box>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <Stack direction="row" justifyContent="space-between">
    <Stack direction="row" spacing={1.5}>
      <Box>{icon}</Box>
      <Typography>{label}</Typography>
    </Stack>
    <Typography>{value}</Typography>
  </Stack>
);

const Divider = ({ sx }) => <Box sx={{ height: '1px', bgcolor: '#e2e8f0', ...sx }} />;

export default AssignedTech;
