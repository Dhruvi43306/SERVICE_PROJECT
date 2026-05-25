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
  IconButton,
  Tooltip,
  MenuItem,
  Dialog,
  DialogContent,
  DialogActions,
  Zoom,
} from '@mui/material';
import {
  SettingsSuggest,
  Speed,
  Layers,
  InfoOutlined,
  AddCircleOutline,
  AutoGraph,
  Construction,
  BusinessCenter,
  EditNote,
  PowerSettingsNew,
  DeleteForeverRounded,
} from '@mui/icons-material';

const API_URL = 'http://localhost:5000/ServiceType';
const DEPT_URL = 'http://localhost:5000/ServiceDept';
const WORK_URL = 'http://localhost:5000/WorkFlowType';

const serviceTypes = [
  {
    title: 'Technical',
    icon: <Construction />,
    accent: '#3b82f6',
  },
  {
    title: 'Facility',
    icon: <SettingsSuggest />,
    accent: '#10b981',
  },
  {
    title: 'Administrative',
    icon: <BusinessCenter />,
    accent: '#8b5cf6',
  },
];

function ServiceTypeMaster() {
  const [serviceTypelist, setserviceTypelist] = useState([]);
  const [editId, setEditId] = useState(null);
  const [deleteid, setdeleteid] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [workflowtype, setworkflowtype] = useState([]);
  const [servicetype, setservicetype] = useState({
    ServiceTypeID: '',
    ServiceTypeName: '',
    Description: '',
    ServiceDeptID: '',
    SLAHours: '',
    WorkflowTypeID: '',
    UserID: 1,
  });

  const fetchServiceType = async () => {
    try {
      const res = await fetch(API_URL, {
        method: 'GET',
        credentials: 'include',
      });

      const result = await res.json();
      console.log('API_DATA:', result);
      setserviceTypelist(Array.isArray(result) ? result : result.data || []);
    } catch (err) {
      console.error('ERROR:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setservicetype((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = (item) => {
    setservicetype({
      ServiceTypeName: item.ServiceTypeName,
      Description: item.Description,
      ServiceDeptID: Number(item.ServiceDeptID),
      SLAHours: Number(item.SLAHours),
      WorkflowTypeID: Number(item.WorkflowTypeID),
      UserID: item.UserID || 1,
    });
    setEditId(item.ServiceTypeID);
  };

  const handleSubmit = async () => {
    const payload = {
      ServiceTypeID: servicetype.ServiceTypeID,
      ServiceTypeName: servicetype.ServiceTypeName,
      Description: servicetype.Description,
      ServiceDeptID: Number(servicetype.ServiceDeptID),
      SLAHours: Number(servicetype.SLAHours),
      WorkflowTypeID: Number(servicetype.WorkflowTypeID),
      UserID: servicetype.UserID,
    };
    try {
      let res;
      if (editId) {
        res = await fetch(`${API_URL}/${editId}`, {
          method: 'PUT',
          credentials: 'include',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(API_URL, {
          method: 'POST',
          credentials: 'include',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }
      const result = await res.json();
      if (!res.ok) {
        console.error(result.message);
        return;
      }
      fetchServiceType();

      setservicetype({
        ServiceTypeID: '',
        ServiceTypeName: '',
        Description: '',
        ServiceDeptID: '',
        SLAHours: '',
        WorkflowTypeID: '',
        UserID: 1,
      });
      setEditId(null);
    } catch (err) {
      console.log('ERROR:');
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await fetch(DEPT_URL, {
        method: 'GET',
        credentials: 'include',
      });
      const result = await res.json();
      console.log('DEPT API:', result);

      setDepartments(result.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchWorkFlowType = async () => {
    try {
      const res = await fetch(WORK_URL, {
        method: 'GET',
        credentials: 'include',
      });
      const result = await res.json();
      console.log('WORK API:', result);

      setworkflowtype(result.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(`${API_URL}/${deleteid}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const result = await res.json();
      console.log('DELETE API:', result);
      fetchServiceType();
    } catch (err) {
      console.log(err);
    }
    setdeleteid(null);
    setOpenDelete(false);
  };

  const cancelDelete = () => {
    setdeleteid(null);
    setOpenDelete(false);
  };

  const handleDeleteClick = (id) => {
    setdeleteid(id);
    setOpenDelete(true);
  };

  useEffect(() => {
    fetchServiceType();
    fetchDepartments();
    fetchWorkFlowType();
  }, []);

  return (
    <Box className="stmx-main-container">
      <Box className="stmx-glass-header">
        <Box className="stmx-header-info">
          <Typography variant="h4" className="stmx-main-title">
            Service Type Master
          </Typography>
          <Typography variant="body2" className="stmx-main-subtitle">
            Orchestrate high-level service logic, routing behaviors, and SLA commitments.
          </Typography>
        </Box>

        <Box className="stmx-header-stats">
          <Box className="stmx-stat-item">
            <Typography className="stmx-stat-val">{serviceTypelist.length}</Typography>
            <Typography className="stmx-stat-lab">Total Types</Typography>
          </Box>
        </Box>
      </Box>

      <Box className="stmx-alert-banner">
        <InfoOutlined sx={{ fontSize: 20 }} />
        <Typography variant="body2">
          <b>Operational Tip:</b> Service Types determine automated routing and SLA calculation for
          all incoming tickets.
        </Typography>
      </Box>
      <Card
        elevation={0}
        sx={{
          borderRadius: 5,
          border: '1px solid',
          borderColor: 'rgba(226, 232, 240, 0.8)',
          background: 'linear-gradient(145deg, #ffffff 0%, #fbfcfe 100%)',
          position: 'relative',
          overflow: 'visible',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.04)',
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 5 } }}>
          {/* Header with Glassmorphic Icon Box */}
          <Box sx={{ mb: 5, display: 'flex', alignItems: 'center', gap: 2.5 }}>
            <Box>
              <AddCircleOutline sx={{ fontSize: 28 }} />
            </Box>
            <Box>
              <Typography
                variant="h5"
                sx={{ fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px' }}
              >
                Define New Category
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                Configure service type logic and operational parameters.
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={3.5} alignItems="flex-end">
            {/* Row 1: The Core Info */}
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                name="ServiceTypeName"
                size="small"
                variant="outlined"
                label="Service Name"
                placeholder="e.g. Logistics"
                value={servicetype.ServiceTypeName}
                onChange={handleChange}
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: 3, bgcolor: '#fff' },
                  '& .MuiInputLabel-root': { fontWeight: 500 },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
              <TextField
                fullWidth
                name="Description"
                size="small"
                variant="outlined"
                label="Description"
                placeholder="Short category description..."
                value={servicetype.Description}
                onChange={handleChange}
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: 3, bgcolor: '#fff' },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                fullWidth
                name="SLAHours"
                size="small"
                variant="outlined"
                label="SLA (Hours)"
                value={servicetype.SLAHours}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <Speed sx={{ mr: 1, color: '#6366f1', fontSize: 20 }} />,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: 3, bgcolor: '#fff' },
                }}
              />
            </Grid>

            {/* Row 2: Logic & Action */}
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                select
                fullWidth
                size="small"
                variant="outlined"
                label="Department"
                name="ServiceDeptID"
                value={servicetype.ServiceDeptID}
                onChange={handleChange}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3, bgcolor: '#fff' } }}
              >
                {departments.length > 0 ? (
                  departments.map((dept) => (
                    <MenuItem key={dept.ServiceDeptID} value={dept.ServiceDeptID}>
                      {dept.ServiceDeptName}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No Department Found</MenuItem>
                )}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                select
                name="WorkflowTypeID"
                label="Workflow"
                size="small"
                variant="outlined"
                fullWidth
                value={servicetype.WorkflowTypeID}
                onChange={handleChange}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3, bgcolor: '#fff' } }}
              >
                <MenuItem value="">Select Workflow</MenuItem>
                {workflowtype.map((wf) => (
                  <MenuItem key={wf.WorkflowTypeID} value={wf.WorkflowTypeID}>
                    {wf.WorkflowName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Button
                fullWidth
                variant="contained"
                disableElevation
                onClick={handleSubmit}
                startIcon={<Layers />}
                sx={{
                  height: '42px',
                  textTransform: 'none',
                  fontWeight: 700,
                  borderRadius: 3,
                  fontSize: '0.95rem',
                  background: editId
                    ? 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)'
                    : 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: editId
                      ? '0 10px 25px rgba(14, 165, 233, 0.4)'
                      : '0 10px 25px rgba(99, 102, 241, 0.4)',
                    filter: 'brightness(1.1)',
                  },
                  '&:active': { transform: 'translateY(0)' },
                }}
              >
                {editId ? 'Update Service Category' : 'Create Service Category'}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Box className="stmx-list-section">
        <Box className="stmx-section-header">
          <AutoGraph sx={{ color: '#64748b', marginTop: '15px' }} />
          <Typography variant="h6" sx={{ marginTop: '15px' }}>
            Configured Architectures
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {serviceTypelist.map((item, index) => {
            const ui = serviceTypes[index % serviceTypes.length];

            return (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <Card className="stmx-type-tile" sx={{ '--accent': ui.accent }}>
                  <CardContent className="stmx-tile-content">
                    <Box className="stmx-tile-top">
                      <Box className="stmx-icon-box">{ui.icon}</Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography className="stmx-tile-name">{item.ServiceTypeName}</Typography>
                      </Box>
                      <Tooltip title="Status: Active">
                        <div className="stmx-status-dot" />
                      </Tooltip>
                    </Box>
                    <Typography className="stmx-tile-desc">{item.Description}</Typography>

                    <Box className="stmx-tile-badges">
                      <Chip
                        icon={<Speed style={{ fontSize: 14 }} />}
                        label={`${item.SLAHours} Hours`}
                        size="small"
                        className="stmx-chip-sla"
                      />
                    </Box>

                    <Box className="stmx-flow-preview">
                      <Typography className="stmx-flow-label">Workflow Chain:</Typography>
                      <Typography className="stmx-flow-path">{item.WorkflowChain}</Typography>
                    </Box>

                    <Divider className="stmx-tile-divider" />
                    <Box className="stmx-tile-footer">
                      <Button
                        startIcon={<EditNote />}
                        className="stmx-edit-link"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </Button>
                      <IconButton
                        size="small"
                        color="error"
                        className="stmx-power-btn"
                        onClick={() => handleDeleteClick(item.ServiceTypeID)}
                      >
                        <PowerSettingsNew fontSize="small" />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
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
    </Box>
  );
}

export default ServiceTypeMaster;
