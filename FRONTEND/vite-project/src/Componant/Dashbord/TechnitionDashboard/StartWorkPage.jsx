import React, { useEffect, useState } from 'react';
import { 
  Box, Button, Typography, Chip, Stack, Container, 
  Avatar, Divider, Paper, Breadcrumbs, Link
} from '@mui/material';
import SpeedIcon from '@mui/icons-material/Speed';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const API_URL = 'http://localhost:5000/ServiceRequest';
const USER_URL = 'http://localhost:5000/users';
const START_URL = 'http://localhost:5000/ServiceRequest/startWork';
const DEPT_URL = 'http://localhost:5000/ServiceDept';

const StartWorkPage = () => {

  const { id } = useParams();

  const [selectedTech, setSelectedTech] = useState(null);
  const [listrequest, setreqlist] = useState([]);
  const [users, setUsers] = useState([]);
  const [servicedept, setservicedept] = useState([]);

  const reqid = Number(id);

  const CustomSwal = Swal.mixin({
    background: "#ffffff",
    color: "#1e293b",
    confirmButtonColor: "#2563eb",
    cancelButtonColor: "#ef4444",
    customClass: {
      popup: "tp-alert-popup",
      title: "tp-alert-title",
      confirmButton: "tp-alert-confirm",
    },
  });

  const fetchSerivceRequest = async () => {
    if (isNaN(reqid)) {
      console.error("Invalid ServiceRequest ID:", id);
      return;
    }

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

  const fetchServiceDept = async () => {
    try {
      const res = await fetch(DEPT_URL, {
        method: 'GET',
        credentials: 'include',
      });

      const result = await res.json();
      setservicedept(result.data || []);

    } catch (err) {
      console.log(err);
    }
  };

 const startWork = async (requestID) => {

  const req = listrequest.find(r => r.ServiceRequestID === requestID);

  if (!req) {
    CustomSwal.fire({
      icon: "error",
      title: "Request not found",
      text: "Unable to start work for this request."
    });
    return;
  }

  const technicianID = req.AssignedTechnicianID;

  if (!technicianID) {
    CustomSwal.fire({
      icon: "error",
      title: "Technician Not Assigned",
      text: "HOD must assign a technician before starting work."
    });
    return;
  }

  try {

    const res = await fetch(`${START_URL}/${requestID}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        technicianID: technicianID,
        hodID: req.HODApprovedBy || 2
      }),
    });

    const result = await res.json();

    if (res.ok) {

      CustomSwal.fire({
        icon: "success",
        title: "Work Initialized",
        text: "Technician successfully started the service request."
      });

      fetchSerivceRequest();
      alert("Work started and notification sent!");
    } else {

      CustomSwal.fire({
        icon: "error",
        title: "Start Work Failed",
        text: result.message || "Something went wrong."
      });

    }

  } catch (err) {

    console.error("StartWork Error:", err);

    CustomSwal.fire({
      icon: "error",
      title: "Server Error",
      text: "Please try again later."
    });

  }
};

  useEffect(() => {
    fetchSerivceRequest();
    fetchUsers();
    fetchServiceDept();
  }, [id]);

  return (
    <>
      {listrequest.map((req) => {

        const requestUser = users.find(u => u.UserID === req.UserID);
        const requestDept = servicedept.find(d => d.ServiceDeptID === req.ServiceDeptID);

        return (
        <Box key={req.ServiceRequestID} className="tp-page-wrapper">
          <Container maxWidth="md">

            <Breadcrumbs 
              separator={<ChevronRightIcon sx={{ fontSize: 14 }} />} 
              sx={{ mb: 2 }}
            >
              <Link className="tp-breadcrumb-link" href="#">
                DASHBOARD
              </Link>
              <Typography className="tp-breadcrumb-active">
                SERVICE REQUEST
              </Typography>
            </Breadcrumbs>

            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
              <Box>
                <Typography variant="h4" className="tp-main-title">
                  {req.ServiceRequestNo}
                </Typography>
                <Typography variant="body2" className="tp-sub-title">
                  Review the details below before initiating the service protocol.
                </Typography>
              </Box>
              <Chip label={req.ServiceRequestNo} className="tp-id-chip" />
            </Stack>

            <Paper elevation={0} className="tp-glass-card">
              <Box className="tp-card-accent" />
              
              <Box className="tp-card-content">
                <Stack spacing={4}>
                  
                  <Stack direction="row" spacing={3} alignItems="center">
                    <Avatar className="tp-subject-avatar">
                      <AssignmentOutlinedIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="h5" className="tp-subject-title">
                        {req.ServiceRequestTitle}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#64748b' }}>
                        {req.ServiceRequestDescription}
                      </Typography>
                    </Box>
                  </Stack>

                  <Divider sx={{ opacity: 0.6 }} />

                  <Box className="tp-info-grid">

                    <InfoItem
                      icon={<PersonOutlineIcon />}
                      label="Requestor"
                      value={requestUser?.FullName || "N/A"}
                    />

                    <InfoItem
                      icon={<LocationOnOutlinedIcon />}
                      label="Location"
                      value={requestDept?.ServiceDeptName || "N/A"}
                    />

                  </Box>

                  <Box className="tp-action-footer">
                    <Typography variant="body2" sx={{ mb: 3, color: '#475569', fontWeight: 600 }}>
                      Ensure you have all required tools before starting the timer.
                    </Typography>
                    
                    <Button
                      variant="contained"
                      disableRipple
                      className="tp-init-button"
                      onClick={() => startWork(req.ServiceRequestID)}
                      startIcon={<SpeedIcon sx={{ fontSize: '20px !important' }} />}
                    >
                      Initialize Work
                    </Button>
                  </Box>

                </Stack>
              </Box>
            </Paper>

            <Typography variant="caption" className="tp-support-text">
              Need assistance? Contact the IT Service Desk at ext. 404
            </Typography>

          </Container>
        </Box>
      )})}
    </>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <Stack direction="row" spacing={2} alignItems="center">
    <Box className="tp-icon-box">
      {React.cloneElement(icon, { fontSize: 'small' })}
    </Box>
    <Box>
      <Typography variant="caption" className="tp-info-label">
        {label}
      </Typography>
      <Typography variant="body1" className="tp-info-value">
        {value}
      </Typography>
    </Box>
  </Stack>
);

export default StartWorkPage;