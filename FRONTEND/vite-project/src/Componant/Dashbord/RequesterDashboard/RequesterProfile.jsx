import React, { useEffect, useState } from 'react';

import { Box, Grid, Paper, Avatar, Typography, Button, Chip, Divider, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

const USER_API = 'http://localhost:5000/users/profile';
const UPDATE_API = 'http://localhost:5000/users';


const RequesterProfile = () => {
const [editMode, setEditMode] = useState(false);
  const [user, setuser] = useState({
    UserID: '',
    UserCode: '',
    FullName: '',
    Email: '',
    Password: '',
    Role: '',
    Phone: '',
    Created: '',
  });

  const fecthuser = async () => {
    try {
      const res = await fetch(USER_API, {
        method: 'GET',
        credentials: 'include',
      });

      const result = await res.json();
      console.log('ADMIN DATA:', result);
      if (!result.error && result.data) {
        setuser(result.data);
      }
    } catch (err) {
      console.log('ERROR:', err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setuser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const EditUser = async () => {
    try {
      const payload = {
        FullName: user.FullName,
        Email: user.Email,
        Role: user.Role,
        Phone: user.Phone,
      };

      const res = await fetch(`${UPDATE_API}/${user.UserID}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      console.log('UPDATE RESULT:', result);

      setEditMode(false);
      fecthuser();
    } catch (err) {
      console.log('UPDATE ERROR:', err.message);
    }
  };

  useEffect(() => {
    fecthuser();
  }, []);

  return (
    
    <Box className="rp-page">
      <Box className="rp-navbar">
        <Box className="rp-logo">
          <span>S</span>
          <Box sx={{ ml: 1.5 }}>
            {/* <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.2 }}>ServiceDesk</Typography> */}
            {/* <Typography variant="caption" sx={{ color: 'black' }}>Employee Portal</Typography> */}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton sx={{ color: 'white' }} component={Link} to='/Notification'>
            <NotificationsNoneIcon />
          </IconButton>
          <IconButton sx={{ color: 'white' }}>
            <SettingsOutlinedIcon />
          </IconButton>
          {/* <Avatar sx={{ ml: 1, bgcolor: '#10b981', width: 38, height: 38, fontWeight: 700 }}>DS</Avatar> */}
        </Box>
      </Box>

      <Box className="rp-banner" />

      <Box className="rp-content">
        <Grid container spacing={4}>
             <Grid size={{ xs: 12, md:4 }}>
            <Paper className="rp-left-card" elevation={0}>
              <Avatar className="rp-avatar">{user.Avatar}</Avatar>
              <Typography className="rp-name">{user.FullName}</Typography>
              
              <Box sx={{ mt: 1, mb: 3 }}>
                <Chip 
                  icon={<VerifiedUserIcon style={{ fontSize: '14px', color: '#16a34a' }} />}
                  label={user.Role} 
                  sx={{ bgcolor: '#f0fdf4', color: '#16a34a', fontWeight: 700, px: 1 }} 
                />
              </Box>

              <Box sx={{ mb: 4, textAlign: 'left' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                  <Typography variant="body2" color="textSecondary">Employee ID</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>{user.UserCode}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                  <Typography variant="body2" color="textSecondary">Status</Typography>
                  <Typography variant="body2" sx={{ color: '#10b981', fontWeight: 700 }}>● Active</Typography>
                </Box>
              </Box>

              <Divider sx={{ mb: 3 }} />

              <Button 
                fullWidth variant="contained" 
                className="rp-btn-primary" 
                startIcon={<EditOutlinedIcon />}
                onClick={() => (editMode ? EditUser() : setEditMode(true))}
                sx={{ mb: 2 }}
              >
                 {editMode ? 'Save Profile' : 'Edit Profile'}
              </Button>
              <Button 
                fullWidth variant="outlined" 
                className="rp-btn-secondary"
                startIcon={<LockOutlinedIcon />}
              >
                Security Settings
              </Button>
            </Paper>
          </Grid>

          {/* RIGHT SIDE: INFORMATION HUB */}
          <Grid size={{ xs: 12, md:8 }}>
            <Paper sx={{ p: 4, borderRadius: '24px', minHeight: '100%' }} elevation={0}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 4, color: '#0f172a' }}>
                Account Information
              </Typography>
              
              <Grid container spacing={3}>
                <InfoTile icon={<PersonOutlineIcon />} label="Full Name" value={user.FullName} />
                <InfoTile icon={<EmailOutlinedIcon />} label="Email Address" value={user.Email} />
                <InfoTile icon={<PhoneOutlinedIcon />} label="Mobile Number" value={user.Phone} />
                <InfoTile icon={<BusinessOutlinedIcon />} label="Role" value={user.Role} />
                <InfoTile icon={<CalendarMonthOutlinedIcon />} label="Joined Date" value={user.Created} />
                <InfoTile icon={<VerifiedUserIcon />} label="Access Level" value="Standard Employee" />
              </Grid>

              {/* ADDITIONAL SECTION (Visual Placeholder) */}
              <Box sx={{ mt: 6, p: 3, bgcolor: '#eff6ff', borderRadius: '20px', border: '1px dashed #bfdbfe' }}>
                <Typography variant="subtitle2" sx={{ color: '#1e40af', fontWeight: 700 }}>
                  Need Assistance?
                </Typography>
                <Typography variant="caption" sx={{ color: '#60a5fa' }}>
                  If your department or role information is incorrect, please contact the IT Helpdesk.
                </Typography>
              </Box>
            </Paper>
          </Grid>

        </Grid>
      </Box>
    </Box>
  );
};

const InfoTile = ({ icon, label, value }) => (
  <Grid size={{ xs: 12, sm:6 }}>
    <Box className="rp-info-tile">
      <Box className="rp-icon-box">
        {icon}
      </Box>
      <Box>
        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600, display: 'block', mb: 0.5 }}>
          {label}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 700, color: '#1e293b' }}>
          {value}
        </Typography>
      </Box>
    </Box>
  </Grid>
);

export default RequesterProfile;