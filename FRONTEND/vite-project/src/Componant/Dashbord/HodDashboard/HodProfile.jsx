import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Avatar, Divider, Chip, Paper, IconButton } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { Link } from "react-router-dom";

const USER_API = 'http://localhost:5000/users/profile';

function HodProfile() {

  const [users, setUsers] = useState([]);

  const fetchUser = async () => {
    try {
      const res = await fetch(USER_API, {
        method: "GET",
        credentials: "include"
      });

      const result = await res.json();
      console.log("HOD PROFILE DATA:", result);

      if (!result.error && result.data) {

        // if API returns object convert to array
        if (Array.isArray(result.data)) {
          setUsers(result.data);
        } else {
          setUsers([result.data]);
        }

      }

    } catch (err) {
      console.log("FETCH ERROR:", err.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Box className="hod-profile-page">

      {/* NAVBAR */}
      <Box className="hod-profile-navbar">

        <Box className="hod-profile-navbar-left">
          <Box className="hod-profile-logo">
            <span>S</span>
          </Box>

          <Box className="hod-profile-portal-info">
            <Typography variant="h6" className="hod-navbar-brand">
              ServiceX
            </Typography>
            <Typography variant="caption" className="hod-navbar-subtitle">
              HOD Management Portal
            </Typography>
          </Box>
        </Box>

        <Box className="hod-profile-nav-actions">
          <IconButton sx={{ color: 'white', mx: 0.5 }} component={Link} to="/Notification">
            <NotificationsNoneIcon />
          </IconButton>

          <IconButton sx={{ color: 'white', mx: 0.5 }}>
            <SettingsOutlinedIcon />
          </IconButton>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ bgcolor: 'rgba(255,255,255,0.2)', mx: 2, height: '24px', alignSelf: 'center' }}
          />

          <Avatar className="hod-profile-nav-avatar">RP</Avatar>
        </Box>

      </Box>

      <Box className="hod-profile-profile-banner" />

      <Box className="hod-profile-content">

        {users.map((user) => (

          <Grid container spacing={4} key={user.UserID}>

            {/* LEFT PROFILE */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper className="hod-profile-summary-card" elevation={0}>

                <Box className="hod-profile-avatar-wrapper">
                  <Avatar className="hod-profile-avatar">
                    {user.FullName?.charAt(0)}
                  </Avatar>
                </Box>

                <Typography className="hod-profile-name">
                  {user.FullName}
                </Typography>

                <Typography sx={{ color: '#64748b', mb: 2 }}>
                  IT Support Department
                </Typography>

                <Chip
                  icon={<VerifiedUserIcon style={{ fontSize: '16px', color: 'white' }} />}
                  label="Head of Department"
                  sx={{ bgcolor: '#032d42', color: 'white', fontWeight: 600, px: 1 }}
                />

              </Paper>
            </Grid>

            {/* RIGHT PROFILE */}
            <Grid size={{ xs: 12, md: 8 }}>

              {/* PROFESSIONAL PROFILE */}
              <Paper className="hod-profile-section" elevation={0}>

                <Typography className="hod-profile-section-title">
                  <BadgeOutlinedIcon /> Professional Profile
                </Typography>

                <Grid container spacing={2}>

                  <InfoItem
                    icon={<EmailOutlinedIcon />}
                    label="Email Address"
                    value={user.Email}
                  />

                  <InfoItem
                    icon={<PhoneOutlinedIcon />}
                    label="Contact Number"
                    value={user.Phone}
                  />

                  <InfoItem
                    icon={<BusinessOutlinedIcon />}
                    label="Work Department"
                    value="IT Infrastructure"
                  />

                  <InfoItem
                    icon={<BadgeOutlinedIcon />}
                    label="Employee Designation"
                    value={user.Role}
                  />

                </Grid>

              </Paper>

              {/* METRICS */}
              <Paper className="hod-profile-section" elevation={0}>

                <Typography className="hod-profile-section-title">
                  <PendingActionsIcon /> Decision Metrics
                </Typography>

                <Grid container spacing={3}>

                  <MetricCard icon={<PendingActionsIcon />} value="05" label="Pending" type="pending" />

                  <MetricCard icon={<CheckCircleOutlineIcon />} value="18" label="Approved" type="approved" />

                  <MetricCard icon={<HighlightOffIcon />} value="02" label="Rejected" type="rejected" />

                </Grid>

              </Paper>

              {/* PERMISSIONS */}
              <Paper className="hod-profile-section hod-note-box" elevation={0}>

                <Typography className="hod-profile-section-title" sx={{ color: '#1e3a8a' }}>
                  Authority & Permissions
                </Typography>

                <Box>

                  <PermissionNote text="Final approval authority for department service tickets." />

                  <PermissionNote text="Privilege to re-assign high-priority technicians." />

                  <PermissionNote text="Access to department-wide workload analytics." />

                </Box>

              </Paper>

            </Grid>

          </Grid>

        ))}

      </Box>

      {/* FOOTER */}
      <Box className="hod-profile-footer">
        <Typography variant="caption">
          © 2026 ServiceDesk Portal • Secure HOD Session • v2.4.0
        </Typography>
      </Box>

    </Box>
  );
}

/* COMPONENTS */

const InfoItem = ({ icon, label, value }) => (
  <Grid size={{ xs: 12, sm: 6 }}>
    <Box className="hod-profile-info-box">

      {icon}

      <Box>
        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
          {label}
        </Typography>

        <Typography variant="body2" sx={{ fontWeight: 700, color: '#1e293b' }}>
          {value}
        </Typography>
      </Box>

    </Box>
  </Grid>
);

const MetricCard = ({ icon, value, label, type }) => (
  <Grid size={{ xs: 12, sm: 4 }}>
    <Box className={`hod-profile-metric ${type}`}>

      {icon}

      <Typography className="hod-profile-metric-value">
        {value}
      </Typography>

      <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>
        {label}
      </Typography>

    </Box>
  </Grid>
);

const PermissionNote = ({ text }) => (
  <Typography className="hod-profile-note">
    <CheckCircleOutlineIcon sx={{ fontSize: 16 }} /> {text}
  </Typography>
);

export default HodProfile;