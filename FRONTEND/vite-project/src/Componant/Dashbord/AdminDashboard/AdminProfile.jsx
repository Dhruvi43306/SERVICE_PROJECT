import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Avatar,
  Paper,
  Stack,
  Button,
  Divider,
  Chip,
  TextField,
} from '@mui/material';
import {
  EmailOutlined,
  PhoneOutlined,
  LocationOnOutlined,
  CalendarTodayOutlined,
  BusinessOutlined,
  EditNoteOutlined,
  ShieldOutlined,
  BadgeOutlined,
} from '@mui/icons-material';

const USER_API = 'http://localhost:5000/users/profile';
const UPDATE_API = 'http://localhost:5000/users';

const AdminProfile = () => {
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
    <Box className="adm-root">
      <Box className="adm-header-banner" />

      <Box className="adm-main-container">
        <Grid container spacing={4}>
          {/* LEFT PROFILE */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper className="adm-card adm-sidebar-card" elevation={0}>
              <Box className="adm-avatar-glow">
                <Avatar
                  sx={{
                    width: '100%',
                    height: '100%',
                    bgcolor: '#fff',
                    color: '#0d9488',
                    fontSize: '3rem',
                    fontWeight: 900,
                  }}
                >
                  {user.FullName ? user.FullName.charAt(0) : 'A'}
                </Avatar>
              </Box>

              <Typography variant="h4" sx={{ fontWeight: 900, color: '#1e293b', mb: 1 }}>
                {user.FullName || 'Admin User'}
              </Typography>

              <Chip
                label={`${user.Role || 'Admin'} • Level 5`}
                sx={{ bgcolor: '#f0fdfa', color: '#0d9488', fontWeight: 800, mb: 4 }}
              />

              <Stack spacing={2} sx={{ textAlign: 'left', mb: 4 }}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography className="adm-label">Employee ID</Typography>
                  <Typography className="adm-value">{user.UserCode || 'ADM-0000'}</Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between">
                  <Typography className="adm-label">Status</Typography>
                  <Typography sx={{ color: '#10b981', fontWeight: 800, fontSize: '0.9rem' }}>
                    ● Active
                  </Typography>
                </Stack>
              </Stack>

              <Divider sx={{ mb: 4 }} />

              <Stack spacing={2}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<EditNoteOutlined />}
                  onClick={() => (editMode ? EditUser() : setEditMode(true))}
                  sx={{
                    bgcolor: '#0a042c',
                    borderRadius: '14px',
                    py: 1.5,
                    textTransform: 'none',
                    fontWeight: 800,
                  }}
                >
                  {editMode ? 'Save Profile' : 'Edit Profile'}
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<ShieldOutlined />}
                  sx={{
                    borderRadius: '14px',
                    py: 1.5,
                    textTransform: 'none',
                    fontWeight: 800,
                    color: '#64748b',
                    borderColor: '#e2e8f0',
                  }}
                >
                  Security Settings
                </Button>
              </Stack>
            </Paper>
          </Grid>

          {/* RIGHT SIDE */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Stack spacing={4}>
              <Paper className="adm-card" elevation={0}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, color: '#1e293b' }}>
                  Contact Details
                </Typography>

                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    {editMode ? (
                      <TextField
                        fullWidth
                        label="Email Address"
                        name="Email"
                        value={user.Email}
                        onChange={handleChange}
                      />
                    ) : (
                      <InfoTile
                        icon={<EmailOutlined />}
                        label="Email Address"
                        value={user.Email || '-'}
                      />
                    )}
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    {editMode ? (
                      <TextField
                        fullWidth
                        label="Mobile Number"
                        name="Phone"
                        value={user.Phone}
                        onChange={handleChange}
                      />
                    ) : (
                      <InfoTile
                        icon={<PhoneOutlined />}
                        label="Mobile Number"
                        value={user.Phone || '-'}
                      />
                    )}
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <InfoTile icon={<LocationOnOutlined />} label="Base Location" value="India" />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <InfoTile
                      icon={<CalendarTodayOutlined />}
                      label="Join Date"
                      value={user.Created || '-'}
                    />
                  </Grid>
                </Grid>
              </Paper>

              <Paper className="adm-card" elevation={0}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, color: '#1e293b' }}>
                  Organization Info
                </Typography>

                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <InfoTile
                      icon={<BusinessOutlined />}
                      label="Department"
                      value="IT Support & Infrastructure"
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <InfoTile
                      icon={<BadgeOutlined />}
                      label="Designation"
                      value="System Administrator"
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

/* ----------- HELPER COMPONENT ----------- */

const InfoTile = ({ icon, label, value }) => (
  <Box className="adm-info-tile">
    <Box className="adm-icon-box">{icon}</Box>

    <Box>
      <Typography className="adm-label">{label}</Typography>
      <Typography className="adm-value">{value}</Typography>
    </Box>
  </Box>
);

export default AdminProfile;
