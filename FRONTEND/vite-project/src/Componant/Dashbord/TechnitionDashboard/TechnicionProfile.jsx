import React from "react";
import { Box, Grid, Typography, Avatar, Chip, Paper, IconButton, Button, Divider } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import { Link } from "react-router-dom";


const TechnicionProfile = () => {
  return (
    <Box className="tp-page">
      <Box className="tp-navbar">
        <Box className="tp-logo">
          <span>S</span>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton sx={{ color: 'white' }} component={Link} to="/Notification">
            <NotificationsNoneIcon />
          </IconButton>
          <IconButton sx={{ color: 'white' }}>
            <SettingsOutlinedIcon />
          </IconButton>
          <Avatar sx={{ ml: 1, bgcolor: '#10b981', width: 35, height: 35, fontSize: 14 }}>DS</Avatar>
        </Box>
      </Box>
      <Box className="tp-banner" />
      <Box className="tp-container">
        <Grid container spacing={4}>
           <Grid size={{ xs: 12, md:4 }}>
            <Paper className="tp-left-card" elevation={0}>
              <Avatar className="tp-avatar">DS</Avatar>
              <Typography className="tp-name">Dhruvi Savaliya</Typography>
              <Chip label="Level 2 Technician" className="tp-role-chip" />
              
              <Box sx={{ mt: 4, mb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                  <Typography variant="body2" color="textSecondary">Employee ID</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>EMP-1023</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                  <Typography variant="body2" color="textSecondary">Status</Typography>
                  <Typography variant="body2" sx={{ color: '#10b981', fontWeight: 700 }}>● Active</Typography>
                </Box>
              </Box>

              <Divider sx={{ mb: 3 }} />

              <Button fullWidth variant="contained" className="tp-btn-primary" startIcon={<EditOutlinedIcon />}>
                Edit Profile
              </Button>
              <Button fullWidth variant="outlined" className="tp-btn-secondary" sx={{ mt: 2 }} startIcon={<LockOutlinedIcon />}>
                Security Settings
              </Button>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md:8 }}>
               <Paper sx={{ p: 4, borderRadius: '24px', mb: 3 }} elevation={0}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Contact Details</Typography>
              <Grid container spacing={2}>
                <ProfileTile icon={<EmailOutlinedIcon />} label="Email Address" value="dhruvi@gmail.com" />
                <ProfileTile icon={<PhoneOutlinedIcon />} label="Mobile Number" value="+91 98765 43210" />
                <ProfileTile icon={<FmdGoodOutlinedIcon />} label="Base Location" value="Mumbai, Maharashtra" />
                <ProfileTile icon={<CalendarMonthIcon />} label="Join Date" value="March 15, 2023" />
              </Grid>
            </Paper>

            <Paper sx={{ p: 4, borderRadius: '24px' }} elevation={0}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Organization Info</Typography>
              <Grid container spacing={2}>
                <ProfileTile icon={<BusinessOutlinedIcon />} label="Department" value="IT Support & Infrastructure" />
                <ProfileTile icon={<BadgeOutlinedIcon />} label="Designation" value="Service Desk Technician" />
                <ProfileTile icon={<BadgeOutlinedIcon />} label="Reporting Manager" value="Rahul Sharma" />
                <ProfileTile icon={<BadgeOutlinedIcon />} label="Shift" value="Morning (09 AM - 06 PM)" />
              </Grid>
            </Paper>

          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

const ProfileTile = ({ icon, label, value }) => (
  <Grid size={{ xs: 12, sm:6 }}>
    <Box className="tp-info-tile">
      <Box className="tp-icon-wrapper">{icon}</Box>
      <Box>
        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>{label}</Typography>
        <Typography variant="body1" sx={{ fontWeight: 700, color: '#1e293b', display: 'block' }}>{value}</Typography>
      </Box>
    </Box>
  </Grid>
);

export default TechnicionProfile;