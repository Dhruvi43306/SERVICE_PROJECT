import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Chip,
  Divider,
  Tooltip,
  IconButton,
  Dialog,
  Zoom,
  DialogContent,
  DialogActions,
} from '@mui/material';

import {
  AddCircleOutline,
  Business,
  AccessTime,
  EditTwoTone,
  DeleteTwoTone,
  ClosedCaption,
  DeleteForeverRounded,
  CheckCircleRounded,
} from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';
const departments = {
  'IT Supportes': { tag: '24x7 Support', theme: 'blue' },
  Maintenance: { tag: 'On-Site Team', theme: 'orange' },
  Housekeeping: { tag: 'Day Shift', theme: 'pink' },
};

const API_URL = 'http://localhost:5000/ServiceDept';
const CAMPUS_API = 'http://localhost:5000/Campus';

function ServiceDepartmentMaster() {
  const navigate = useNavigate();

  const [deptlist, setDeptList] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const [campus, setCampus] = useState({
    CampusName: '',
    CampusCode: '',
    Country: '',
    City: '',
    State: '',
  });

  const fetchDept = async () => {
    try {
      const res = await fetch(API_URL, {
        method: 'GET',
        credentials: 'include',
      });

      const result = await res.json();

      if (res.ok) {
        setDeptList(result.data || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDept();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCampus((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        CampusName: campus.CampusName,
        CampusCode: campus.CampusCode,
        Country: campus.Country,
        City: campus.City,
        State: campus.State,
      };

      const res = await fetch(CAMPUS_API, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      setCampus({
        CampusName: '',
        CampusCode: '',
        Country: '',
        City: '',
        State: '',
      });

      setSuccessOpen(true);
    } catch (err) {
      console.error('Campus Insert Error', err);
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpenDelete(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(`${API_URL}/${deleteId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      await res.json();

      fetchDept();
    } catch (err) {
      console.error(err);
    }

    setDeleteId(null);
    setOpenDelete(false);
  };

  const cancelDelete = () => {
    setDeleteId(null);
    setOpenDelete(false);
  };

  return (
    <Box className="sdm-page-container">
      <Box className="sdm-header-flex">
        <Box>
          <Typography variant="h4" className="sdm-main-title">
            Department Master
          </Typography>

          <Typography className="sdm-sub-text">
            Configure and monitor organizational service units
          </Typography>
        </Box>
      </Box>

      <Card className="sdm-creation-card" elevation={0}>
        <CardContent>
          <Typography variant="overline" className="sdm-form-label">
            Quick Registration
          </Typography>

          <Grid container spacing={3} alignItems="center">
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                fullWidth
                size="small"
                label="CampusName"
                placeholder="e.g. Finance"
                name="CampusName"
                value={campus.CampusName}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 2 }}>
              <TextField
                fullWidth
                size="small"
                label="CampusCode"
                placeholder="FIN-01"
                name="CampusCode"
                value={campus.CampusCode}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 1 }}>
              <TextField
                fullWidth
                size="small"
                label="City"
                placeholder="City"
                name="City"
                value={campus.City}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <TextField
                fullWidth
                size="small"
                label="Country"
                placeholder="1"
                name="Country"
                value={campus.Country}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 2 }}>
              <TextField
                fullWidth
                size="small"
                label="State"
                name="State"
                value={campus.State}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 2 }}>
              <Button
                fullWidth
                className="sr-master-deploy-btn"
                variant="contained"
                onClick={handleSubmit}
              >
                Add Campus
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box className="sdm-aective-flex">
        <Typography variant="h6" className="sdm-section-header">
          Active Service Departments
        </Typography>

        <Button
          onClick={() => navigate('/Campus')}
          variant="contained"
          startIcon={<AddCircleOutline />}
          className="sdm-primary-btn"
        >
          New Department
        </Button>
      </Box>

      <Grid container spacing={4}>
        {deptlist.map((deptItem, index) => {
          const config = departments[deptItem.ServiceDeptName] || {};

          return (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Card className={`sdm-premium-card sdm-theme-${config.theme}`}>
                <CardContent className="sdm-card-inner">
                  <Box className="sdm-card-header">
                    <Box className="sdm-icon-wrapper">
                      <Business className="sdm-main-icon" />
                    </Box>

                    <Chip label="ACTIVE" className="sdm-status-badge" />
                  </Box>

                  <Box className="sdm-card-body">
                    <Typography className="sdm-dept-name-display">
                      {deptItem.ServiceDeptName}
                    </Typography>

                    <Typography className="sdm-dept-id-display">{deptItem.DeptCode}</Typography>

                    <Typography className="sdm-dept-info-text">{deptItem.Description}</Typography>
                    <Typography> {deptItem.CampusName}</Typography>

                    <Typography variant="caption">
                      {deptItem.City}, {deptItem.State}
                    </Typography>
                  </Box>

                  <Divider className="sdm-card-divider" />

                  <Box className="sdm-card-footer">
                    <Box className="sdm-footer-stats">
                      <Box className="sdm-stat-item">
                        <AccessTime className="sdm-stat-icon" />

                        <Typography variant="caption">{deptItem.SLA_Hours}</Typography>
                      </Box>
                    </Box>

                    <Box className="sr-master-node-actions">
                      <Tooltip title="Edit Stage">
                        <IconButton
                          size="small"
                          className="btn-edit"
                          onClick={() =>
                            navigate(`/Campus`, {
                              state: { deptData: deptItem },
                            })
                          }
                        >
                          <EditTwoTone fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete Stage">
                        <IconButton
                          size="small"
                          className="btn-delete"
                          onClick={() => handleDeleteClick(deptItem.ServiceDeptID)}
                        >
                          <DeleteTwoTone fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Dialog
        open={openDelete}
        onClose={cancelDelete}
        TransitionComponent={Zoom}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '28px',
            padding: '24px',
            boxShadow: '0px 20px 40px rgba(0,0,0,0.1)',
          },
        }}
      >
        <DialogContent sx={{ textAlign: 'center', pb: 1 }}>
          <Box
            sx={{
              backgroundColor: '#fee2e2',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
            }}
          >
            <DeleteForeverRounded sx={{ color: '#dc2626', fontSize: '32px' }} />
          </Box>

          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#1f2937' }}>
            Confirm Deletion
          </Typography>

          <Typography variant="body2" sx={{ color: '#6b7280', px: 2 }}>
            Are you sure you want to delete this department? This action cannot be undone.
          </Typography>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center', gap: 2, pb: 2 }}>
          <Button
            onClick={cancelDelete}
            sx={{
              color: '#4b5563',
              fontWeight: 600,
              px: 4,
              borderRadius: '12px',
              '&:hover': { backgroundColor: '#f3f4f6' },
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={confirmDelete}
            color="error"
            variant="contained"
            disableElevation
            sx={{
              px: 4,
              borderRadius: '12px',
              fontWeight: 600,
              textTransform: 'none',
              backgroundColor: '#dc2626',
              '&:hover': { backgroundColor: '#b91c1c' },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        TransitionComponent={Zoom}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '28px',
            padding: '20px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <DialogContent sx={{ textAlign: 'center', py: 3 }}>
          <Box
            sx={{
              width: '72px',
              height: '72px',
              backgroundColor: '#f0fdf4',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              border: '1px solid #dcfce7',
            }}
          >
            <CheckCircleRounded sx={{ color: '#22c55e', fontSize: '40px' }} />
          </Box>

          <Typography variant="h5" sx={{ fontWeight: 800, color: '#111827', mb: 1 }}>
            Campus Added Successfully
          </Typography>

          <Typography variant="body1" sx={{ color: '#6b7280', px: 2 }}>
            Your campus data has been saved.
          </Typography>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button
            variant="contained"
            onClick={() => setSuccessOpen(false)}
            disableElevation
            sx={{
              px: 8,
              py: 1.5,
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: 700,
              textTransform: 'none',
              backgroundColor: '#111827',
              '&:hover': { backgroundColor: '#374151' },
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ServiceDepartmentMaster;
