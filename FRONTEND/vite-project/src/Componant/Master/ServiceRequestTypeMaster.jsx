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
  LibraryAdd,
  Tune,
  AccessTime,
  AccountTree,
  InfoOutlined,
  Monitor,
  AcUnit,
  Badge,
  MoreVert,
  DeleteSweep,
  DeleteForeverRounded,
} from '@mui/icons-material';

const requestTypes = [
  {
    title: 'Hardware Complaint',
    icon: <Monitor />,
    accent: '#3b82f6',
  },
  {
    title: 'Washroom Cleaning',
    icon: <AcUnit />,
    accent: '#10b981',
  },
  {
    title: 'Computer Issue',
    icon: <Badge />,
    accent: '#8b5cf6',
  },
];

const API_URL = 'http://localhost:5000/ServiceRequestType';
const DEPT_URL = 'http://localhost:5000/ServiceDept';
const TYPE_URL = 'http://localhost:5000/ServiceType';
const PRIORITY_URL = 'http://localhost:5000/Priority';

function ServiceRequestTypeMaster() {
  const [sreqtypelist, setsreqtypelist] = useState([]);
  const [deleteid, setDeleteId] = useState([]);
  const [openDelete, setOpenDelete] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [servicetype, setservicetype] = useState([]);
  const [servicepriority, setservicepriority] = useState([]);
  const [editId, setEditId] = useState(null);

  const [sreqtype, setsreqtype] = useState({
    ServiceRequestTypeID: '',
    ServiceRequestTypeName: '',
    ServiceTypeID: '',
    ServiceDeptID: '',
    Description: '',
    UserID: 1,
    DefaultPriorityLevel: '',
    Category: '',
    SLA: '',
  });

  const fetchServiceRequestType = async () => {
    try {
      const res = await fetch(API_URL, {
        method: 'GET',
        credentials: 'include',
      });
      const result = await res.json();
      console.log('API_DATA:', result);
      setsreqtypelist(result.data || []);
    } catch (err) {
      console.log('ERROR:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setsreqtype((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = (item) => {
    setsreqtype({
      ServiceRequestTypeID: item.ServiceRequestTypeID,
      ServiceRequestTypeName: item.ServiceRequestTypeName,
      ServiceTypeID: item.ServiceTypeID,
      ServiceDeptID: item.ServiceDeptID,
      Description: item.Description,
      UserID: item.UserID || 1,
      DefaultPriorityLevel: Number(item.DefaultPriorityLevel),
      Category: item.Category,
      SLA: item.SLA,
    });
    setEditId(item.ServiceRequestTypeID);
  };

  const handleSubmit = async () => {
    const payload = {
      ServiceRequestTypeID: sreqtype.ServiceRequestTypeID,
      ServiceRequestTypeName: sreqtype.ServiceRequestTypeName,
      ServiceTypeID: sreqtype.ServiceTypeID,
      ServiceDeptID: sreqtype.ServiceDeptID,
      Description: sreqtype.Description,
      UserID: sreqtype.UserID || 1,
      DefaultPriorityLevel: Number(sreqtype.DefaultPriorityLevel),
      Category: sreqtype.Category,
      SLA: sreqtype.SLA,
    };
    try {
      let res;
      if (editId) {
        res = await fetch(`${API_URL}/${editId}`, {
          method: 'PUT',
          credentials: 'include',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(API_URL, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }
      const result = await res.json();
      console.log('INSERT_DATA:', result);
      fetchServiceRequestType();
      setsreqtype({
        ServiceRequestTypeID: '',
        ServiceRequestTypeName: '',
        ServiceTypeID: '',
        ServiceDeptID: '',
        Description: '',
        UserID: 1,
        DefaultPriorityLevel: '',
        Category: '',
        SLA: '',
      });
      setEditId(null);
    } catch (err) {
      console.log('ERROR:', err);
    }
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(`${API_URL}/${deleteid}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const result = await res.json();
      console.log('API_DATA:', result);
      setOpenDelete(false);
      setDeleteId(null);
      fetchServiceRequestType();
    } catch (err) {
      console.log('ERROR:', err);
    }
  };
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpenDelete(true);
  };
  const cancelDelete = (id) => {
    setOpenDelete(false);
    setDeleteId(null);
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
  const fetchSerivceType = async () => {
    try {
      const res = await fetch(TYPE_URL, {
        method: 'GET',
        credentials: 'include',
      });
      const result = await res.json();
      console.log('TYPE API:', result);

      setservicetype(result.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchServicePriority = async () => {
    try {
      const res = await fetch(PRIORITY_URL, {
        method: 'GET',
        credentials: 'include',
      });
      const result = await res.json();
      console.log('PRIORITY API:', result);

      setservicepriority(result.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchServiceRequestType();
    fetchDepartments();
    fetchSerivceType();
    fetchServicePriority();
  }, []);
  return (
    <Box className="srtm-wrapper">
      <Box className="srtm-premium-header">
        <Box>
          <Typography variant="h4" className="srtm-header-title">
            Service Request Type Master
          </Typography>
          <Typography variant="body2" className="srtm-header-subtitle">
            Catalog specific operational issues and define their automated response logic.
          </Typography>
        </Box>
        <Box className="srtm-header-badge">
          <Tune sx={{ fontSize: 18 }} />
          <Typography variant="caption" sx={{ fontWeight: 700 }}>
            SCHEMA MGMT
          </Typography>
        </Box>
      </Box>

      {/* Info Banner */}
      <Box className="srtm-info-banner">
        <InfoOutlined sx={{ fontSize: 20 }} />
        <Typography variant="body2">
          Request types link categories to departments, enforcing specific <b>Approval Workflows</b>
          .
        </Typography>
      </Box>

      {/* Creation Card */}
      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'rgba(200, 210, 220, 0.4)',
          // Elegant soft gradient background
          background: 'linear-gradient(135deg, #ffffff 0%, #f0f4f8 100%)',
          position: 'relative',
          overflow: 'visible',
          boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Header Section */}
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                display: 'flex',
                p: 1,
                borderRadius: 2,
                bgcolor: 'rgba(46, 97, 125, 0.1)',
                color: '#2e617d',
              }}
            >
              <LibraryAdd sx={{ fontSize: 26 }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#1a333f', lineHeight: 1.2 }}>
                Initialize Request Type
              </Typography>
              <Typography variant="caption" sx={{ color: '#78909c', fontWeight: 500 }}>
                Configure service parameters and SLA levels
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={3} alignItems="flex-end">
            {[
              {
                label: 'Request Name',
                name: 'ServiceRequestTypeName',
                placeholder: 'e.g. Printer Jam',
                value: sreqtype.ServiceRequestTypeName,
              },
              {
                label: 'Service Category',
                name: 'Category',
                placeholder: 'Select Parent',
                value: sreqtype.Category,
              },
              {
                label: 'Description',
                name: 'Description',
                placeholder: 'Brief description',
                value: sreqtype.Description,
              },
              {
                label: 'SLA (Hours/Days)',
                name: 'SLA',
                placeholder: 'e.g. 24h',
                value: sreqtype.SLA,
              },
            ].map((field) => (
              <Grid key={field.name} size={{ xs: 12, md: 3 }}>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  label={field.label}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={handleChange}
                  sx={{
                    bgcolor: '#ffffff',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover fieldset': { borderColor: '#2e617d' },
                    },
                    '& .MuiInputLabel-root': { color: '#546e7a' },
                  }}
                />
              </Grid>
            ))}

            {/* Row 2 */}
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                select
                fullWidth
                size="small"
                variant="outlined"
                label="Default Priority"
                name="DefaultPriorityLevel"
                value={sreqtype.DefaultPriorityLevel}
                onChange={handleChange}
                sx={{ bgcolor: '#ffffff', '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              >
                {servicepriority.length > 0 ? (
                  servicepriority.map((p) => (
                    <MenuItem key={p.PriorityID} value={p.PriorityID}>
                      {p.PriorityName}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No Priority Found</MenuItem>
                )}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                select
                fullWidth
                size="small"
                variant="outlined"
                label="Service Type"
                name="ServiceTypeID"
                value={sreqtype.ServiceTypeID}
                onChange={handleChange}
                sx={{ bgcolor: '#ffffff', '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              >
                {servicetype.length > 0 ? (
                  servicetype.map((t) => (
                    <MenuItem key={t.ServiceTypeID} value={t.ServiceTypeID}>
                      {t.ServiceTypeName}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No Service Found</MenuItem>
                )}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                select
                fullWidth
                size="small"
                variant="outlined"
                label="Handling Department"
                name="ServiceDeptID"
                value={sreqtype.ServiceDeptID}
                onChange={handleChange}
                sx={{ bgcolor: '#ffffff', '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              >
                {departments.length > 0 ? (
                  departments.map((d) => (
                    <MenuItem key={d.ServiceDeptID} value={d.ServiceDeptID}>
                      {d.ServiceDeptName}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No Department Found</MenuItem>
                )}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <Button
                fullWidth
                variant="contained"
                disableElevation
                onClick={handleSubmit}
                sx={{
                  height: '40px',
                  textTransform: 'none',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  borderRadius: 2,
                  transition: 'all 0.2s ease-in-out',
                  background: editId
                    ? 'linear-gradient(135deg, #00b4d8 0%, #0077b6 100%)'
                    : 'linear-gradient(135deg, #2e617d 0%, #1a333f 100%)',
                  boxShadow: '0 4px 12px rgba(46, 97, 125, 0.3)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(46, 97, 125, 0.4)',
                    background: editId
                      ? 'linear-gradient(135deg, #0096c7 0%, #023e8a 100%)'
                      : 'linear-gradient(135deg, #3a7a9e 0%, #244655 100%)',
                  },
                  '&:active': { transform: 'translateY(0)' },
                }}
              >
                {editId ? 'Update Request' : 'Initialize Request'}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/* List Section */}
      <Box className="srtm-list-header">
        <AccountTree sx={{ color: '#64748b', fontSize: 20, marginTop: '15px' }} />
        <Typography variant="h6" className="srtm-section-title" sx={{ marginTop: '15px' }}>
          Operational Catalog
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {Array.isArray(sreqtypelist) &&
          sreqtypelist.map((item, index) => {
            const config =
              requestTypes.find((req) => req.title === item.ServiceRequestTypeName) || {};
            return (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <Card className="srtm-item-card" sx={{ '--card-accent': config.accent }}>
                  <CardContent>
                    <Box className="srtm-card-top">
                      <Box className="srtm-icon-wrapper">{config.icon}</Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography className="srtm-item-title">
                          {item.ServiceRequestTypeName}
                        </Typography>
                        {/* <Typography className="srtm-item-dept">{item.dept}</Typography> */}
                      </Box>
                      <IconButton size="small">
                        <MoreVert />
                      </IconButton>
                    </Box>

                    <Typography className="srtm-item-desc">{item.Description}</Typography>

                    <Box className="srtm-tag-container">
                      <Chip label={item.Category} size="small" className="srtm-chip-cat" />
                      <Chip label="ACTIVE" size="small" className="srtm-chip-status" />
                    </Box>

                    <Divider className="srtm-card-divider" />

                    <Box className="srtm-meta-box">
                      <Box className="srtm-meta-row">
                        <AccessTime sx={{ fontSize: 14 }} />
                        <Typography variant="caption">
                          SLA: <b>{item.SLA}</b>
                        </Typography>
                      </Box>
                      <Box className="srtm-meta-row">
                        <AccountTree sx={{ fontSize: 14 }} />
                        <Typography variant="caption">
                          Priority: {item.DefaultPriorityLevel}
                        </Typography>
                      </Box>
                    </Box>

                    <Box className="srtm-card-actions">
                      <Button
                        size="small"
                        variant="text"
                        className="srtm-btn-edit"
                        onClick={() => handleEdit(item)}
                      >
                        EDIT
                      </Button>
                      <IconButton
                        size="small"
                        color="error"
                        className="srtm-btn-del"
                        onClick={() => handleDeleteClick(item.ServiceRequestTypeID)}
                      >
                        <DeleteSweep fontSize="small" />
                      </IconButton>
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
    </Box>
  );
}

export default ServiceRequestTypeMaster;
