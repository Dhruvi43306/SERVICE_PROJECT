import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  Grid,
  MenuItem,
  InputAdornment,
  Container,
  FormControlLabel,
  Switch,
} from '@mui/material';
import {
  Business,
  Code,
  Description,
  AccessTime,
  AddCircleOutline,
  Email,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const API_URL = 'http://localhost:5000/ServiceDept';
const CAMPUS_API = 'http://localhost:5000/Campus';

const Campus = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editData = location.state?.deptData || null;
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    ServiceDeptName: '',
    DeptCode: '',
    CampusID: '',
    Description: '',
    SLA_Hours: '',
    IsActive: '1',
    CCEmailToCSV: '',
    IsRequestTitleDisable: false,
  });

  useEffect(() => {
    if (editData) {
      setForm({
        ServiceDeptName: editData.ServiceDeptName || '',
        DeptCode: editData.DeptCode || '',
        CampusID: editData.CampusID || '',
        Description: editData.Description || '',
        SLA_Hours: editData.SLA_Hours || '',
        IsActive: editData.IsActive || '1',
        CCEmailToCSV: editData.CCEmailToCSV || '',
        IsRequestTitleDisable: editData.IsRequestTitleDisable || false,
      });

      setEditMode(true);
      window.history.replaceState({}, document.title);
    } else {
      setEditMode(false);
    }
  }, [editData]);

  const [campusList, setCampusList] = useState([]);

  useEffect(() => {
    const fetchCampus = async () => {
      try {
        const res = await fetch(CAMPUS_API, {
          credentials: 'include',
        });
        const result = await res.json();
        if (res.ok && result.data) setCampusList(result.data);
      } catch (err) {
        console.error('Error fetching campus:', err);
      }
    };
    fetchCampus();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = editMode ? `${API_URL}/${editData.ServiceDeptID}` : `${API_URL}`;

      const method = editMode ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method: method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      navigate('/ServiceDepartmentMaster');
    } catch (err) {
      console.error(err);
    }
  };

  const fieldStyle = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      transition: '0.3s',
      backgroundColor: '#fcfcfd',
      '&:hover': {
        backgroundColor: '#fff',
        '& fieldset': { borderColor: '#6a5af9' },
      },
    },
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background:
          'radial-gradient(at 0% 0%, rgba(106, 90, 249, 0.05) 0, transparent 50%), radial-gradient(at 100% 100%, rgba(139, 92, 246, 0.1) 0, transparent 50%), #f8fafc',
        p: 3,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 6 },
            borderRadius: '24px',
            border: '1px solid rgba(226, 232, 240, 0.8)',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
            background: '#ffffff',
          }}
        >
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Box
              sx={{
                display: 'inline-flex',
                p: 1.5,
                borderRadius: '16px',
                background: 'rgba(106, 90, 249, 0.1)',
                color: '#6a5af9',
                mb: 2,
              }}
            >
              <AddCircleOutline fontSize="large" />
            </Box>
            <Typography
              variant="h4"
              fontWeight="850"
              sx={{ color: '#1e293b', letterSpacing: '-0.02em' }}
            >
              Department Setup
            </Typography>
            <Typography variant="body1" sx={{ color: '#64748b', mt: 1 }}>
              Configure and register a new service department within the campus network.
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              {/* Row 1 */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 1, fontWeight: 700, color: '#475569', ml: 0.5 }}
                >
                  Department Name
                </Typography>
                <TextField
                  name="ServiceDeptName"
                  fullWidth
                  required
                  placeholder="e.g. IT Services"
                  sx={fieldStyle}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Business sx={{ color: '#94a3b8' }} />
                      </InputAdornment>
                    ),
                  }}
                  value={form.ServiceDeptName}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 1, fontWeight: 700, color: '#475569', ml: 0.5 }}
                >
                  Department Code
                </Typography>
                <TextField
                  name="DeptCode"
                  fullWidth
                  required
                  placeholder="e.g. ITS-01"
                  sx={fieldStyle}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Code sx={{ color: '#94a3b8' }} />
                      </InputAdornment>
                    ),
                  }}
                  value={form.DeptCode}
                  onChange={handleChange}
                />
              </Grid>

              {/* Row 2 */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 1, fontWeight: 700, color: '#475569', ml: 0.5 }}
                >
                  Campus Location
                </Typography>
                <TextField
                  select
                  name="CampusID"
                  fullWidth
                  required
                  sx={fieldStyle}
                  value={form.CampusID}
                  onChange={handleChange}
                >
                  {campusList.map((c) => (
                    <MenuItem key={c.CampusID} value={c.CampusID}>
                      {c.CampusName} ({c.City})
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 1, fontWeight: 700, color: '#475569', ml: 0.5 }}
                >
                  SLA Hours
                </Typography>
                <TextField
                  name="SLA_Hours"
                  type="number"
                  fullWidth
                  placeholder="24"
                  sx={fieldStyle}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccessTime sx={{ color: '#94a3b8' }} />
                      </InputAdornment>
                    ),
                  }}
                  value={form.SLA_Hours}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 1, fontWeight: 700, color: '#475569', ml: 0.5 }}
                >
                  Description
                </Typography>
                <TextField
                  name="Description"
                  multiline
                  rows={3}
                  fullWidth
                  placeholder="Describe the department's core functions..."
                  sx={fieldStyle}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                        <Description sx={{ color: '#94a3b8' }} />
                      </InputAdornment>
                    ),
                  }}
                  value={form.Description}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 1, fontWeight: 700, color: '#475569', ml: 0.5 }}
                >
                  CC Emails (Optional)
                </Typography>
                <TextField
                  name="CCEmailToCSV"
                  placeholder="email1@example.com,email2@example.com"
                  fullWidth
                  sx={fieldStyle}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: '#94a3b8' }} />
                      </InputAdornment>
                    ),
                  }}
                  value={form.CCEmailToCSV}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 3 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 1, fontWeight: 700, color: '#475569', ml: 0.5 }}
                >
                  Operation Status
                </Typography>
                <TextField
                  select
                  name="IsActive"
                  fullWidth
                  sx={fieldStyle}
                  value={form.IsActive}
                  onChange={handleChange}
                >
                  <MenuItem value="1">Active</MenuItem>
                  <MenuItem value="0">Inactive</MenuItem>
                </TextField>
              </Grid>

              <Grid size={{ xs: 12, md: 3 }} sx={{ display: 'flex', alignItems: 'center' }}>
                <FormControlLabel
                  control={
                    <Switch
                      name="IsRequestTitleDisable"
                      checked={form.IsRequestTitleDisable}
                      onChange={handleChange}
                      color="primary"
                    />
                  }
                  label="Disable Request Title"
                  sx={{ ml: 1 }}
                />
              </Grid>

              <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  disableElevation
                  sx={{
                    py: 2,
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    background: 'linear-gradient(135deg, #6a5af9 0%, #4f46e5 100%)',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-1px)',
                      boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.4)',
                      background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
                    },
                  }}
                >
                  {editMode ? 'Update Department' : 'Register Department'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Campus;
