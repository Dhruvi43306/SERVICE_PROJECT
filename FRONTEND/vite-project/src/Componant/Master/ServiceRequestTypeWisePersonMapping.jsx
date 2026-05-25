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
  Avatar,
  IconButton,
  MenuItem,
  Dialog,
  DialogContent,
  DialogActions,
  Zoom,
} from '@mui/material';
import {
  AssignmentInd,
  GroupAdd,
  EscalatorWarning,
  VerifiedUser,
  InfoOutlined,
  ContactMail,
  Engineering,
  SupportAgent,
  ManageAccounts,
  DeleteOutline,
  DeleteForeverRounded,
} from '@mui/icons-material';
const mappingData = [
  {
    title: 'Computer Issue',
    icon: <SupportAgent />,
    accent: '#3b82f6',
  },
  {
    title: 'Washroom Cleaning',
    icon: <Engineering />,
    accent: '#10b981',
  },
  {
    title: 'Hardware Complaint',
    icon: <VerifiedUser />,
    accent: '#8b5cf6',
  },
];
const API_URL = 'http://localhost:5000/ServiceRequestTypeWise';
const TYPE_URL = 'http://localhost:5000/ServiceRequestType';
const USER_URL = 'http://localhost:5000/users';

function ServiceRequestTypeWisePersonMapping() {
  const [sreqtypewisePersonlist, setsreqtypewisePersonlist] = useState([]);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [servicetype, setservicetype] = useState([]);
  const [users, setUsers] = useState([]);
  const [sreqtypewisePerson, setsreqtypewisePerson] = useState({
    ServiceRequestTypeID: '',
    StaffID: '',
    Sequence: '',
    Description: '',
    FromDate: '',
    UserID: 1,
    EscalationTimeHours: '',
  });
  const fetchServiceRequesttypeWisePerson = async () => {
    try {
      const res = await fetch(API_URL, {
        method: 'GET',
        credentials: 'include',
      });
      const result = await res.json();
      console.log('API_DATA:', result);
      setsreqtypewisePersonlist(result.data || []);
    } catch (err) {
      console.log('ERROR:', err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setsreqtypewisePerson((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleEdit = (item) => {
    setsreqtypewisePerson({
      ServiceRequestTypeWisePersonID: item.ServiceRequestTypeWisePersonID,
      ServiceRequestTypeID: item.ServiceRequestTypeID,
      StaffID: item.StaffID,
      Sequence: item.Sequence,
      Description: item.Description,
      UserID: 1,
      EscalationTimeHours: item.EscalationTimeHours,
    });
    setEditId(item.ServiceRequestTypeWisePersonID);
  };
  const handleSubmit = async () => {
    const payload = {
      ServiceRequestTypeID: sreqtypewisePerson.ServiceRequestTypeID,
      StaffID: sreqtypewisePerson.StaffID,
      Sequence: sreqtypewisePerson.Sequence,
      FromDate: new Date().toISOString().split('T')[0],
      Description: sreqtypewisePerson.Description,
      UserID: 1,
      EscalationTimeHours: sreqtypewisePerson.EscalationTimeHours,
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
      console.log('DATA:', result);
      fetchServiceRequesttypeWisePerson();
      setsreqtypewisePerson({
        ServiceRequestTypeID: '',
        StaffID: '',
        Sequence: '',
        Description: '',
        FromDate: '',
        UserID: 1,
        EscalationTimeHours: '',
      });
      setEditId(null);
    } catch (err) {
      console.log('ERROR:', err.message);
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

  const fetchUsers = async () => {
    try {
      const res = await fetch(USER_URL, {
        method: 'GET',
        credentials: 'include',
      });

      const result = await res.json();
      console.log('User_DATA:', result);

      setUsers(result.data || []);
    } catch (err) {
      console.log(err);
    }
  };
  const confirmDelete = async () => {
    try {
      const res = await fetch(`${API_URL}/${deleteId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const result = await res.json();
      setOpenDelete(false);
      setDeleteId(null);
      fetchServiceRequesttypeWisePerson();
    } catch (err) {
      console.log('ERROR:', err.message);
    }
  };

  const handleDeleteClick = (id) => {
    setOpenDelete(true);
    setDeleteId(id);
  };
  const cancelDelete = () => {
    setOpenDelete(false);
    setDeleteId(null);
  };

  useEffect(() => {
    fetchServiceRequesttypeWisePerson();
    fetchSerivceType();
    fetchUsers();
  }, []);
  return (
    <Box className="pwm-main-wrapper">
      <Box className="pwm-glass-header">
        <Box>
          <Typography variant="h4" className="pwm-header-title">
            Personnel Mapping
          </Typography>
          <Typography variant="body2" className="pwm-header-subtitle">
            Synchronize service request types with specialized personnel and escalation protocols.
          </Typography>
        </Box>
        <Box className="pwm-header-icon-box">
          <AssignmentInd sx={{ fontSize: 32, color: '#1a2e35' }} />
        </Box>
      </Box>

      {/* Modern Info Banner */}
      <Box className="pwm-alert-strip">
        <InfoOutlined sx={{ fontSize: 20 }} />
        <Typography variant="body2">
          Assignments defined here trigger <b>instant notifications</b> and track{' '}
          <b>SLA performance</b> per individual.
        </Typography>
      </Box>

      {/* Mapping Entry Form */}
      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'rgba(59, 130, 246, 0.2)',
          background: 'linear-gradient(145deg, #ffffff 0%, #f8fbff 100%)',
          overflow: 'visible',
          boxShadow: '0 10px 40px rgba(0,0,0,0.03)',
        }}
      >
        <CardContent sx={{ p: 3 }}>
          {/* Header Section */}
          <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                p: 1,
                borderRadius: 2,
                bgcolor: 'rgba(59, 130, 246, 0.1)',
                color: '#3b82f6',
                display: 'flex',
              }}
            >
              <GroupAdd sx={{ fontSize: 22 }} />
            </Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1e293b' }}>
              New Assignment Protocol
            </Typography>
          </Box>

          {/* All items in a single row (lg) or balanced grid (md) */}
          <Grid container spacing={2} alignItems="center">
            {/* 1. Service Type */}
            <Grid size={{ xs: 12, md: 6, lg: 2.3 }}>
              <TextField
                select
                fullWidth
                size="small"
                label="Service Type"
                name="ServiceRequestTypeID"
                value={sreqtypewisePerson.ServiceRequestTypeID}
                onChange={handleChange}
                sx={{ bgcolor: '#fff', '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              >
                {servicetype.length > 0 ? (
                  servicetype.map((type) => (
                    <MenuItem key={type.ServiceRequestTypeID} value={type.ServiceRequestTypeID}>
                      {type.ServiceRequestTypeName}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No Service Found</MenuItem>
                )}
              </TextField>
            </Grid>

            {/* 2. Employee Name */}
            <Grid size={{ xs: 12, md: 6, lg: 2.3 }}>
              <TextField
                select
                fullWidth
                size="small"
                label="Staff Member"
                name="StaffID"
                value={sreqtypewisePerson.StaffID}
                onChange={handleChange}
                sx={{ bgcolor: '#fff', '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              >
                {users
                  .filter((u) => ['HOD', 'TECHNICIAN', 'STAFF'].includes(u.Role))
                  .map((user) => (
                    <MenuItem key={user.UserID} value={user.UserID}>
                      {user.FullName}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>

            {/* 3. Escalation Time */}
            <Grid size={{ xs: 12, md: 4, lg: 2 }}>
              <TextField
                fullWidth
                size="small"
                label="Escalation (Hrs)"
                placeholder="e.g. 4"
                name="EscalationTimeHours"
                value={sreqtypewisePerson.EscalationTimeHours}
                onChange={handleChange}
                sx={{ bgcolor: '#fff', '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>

            {/* 4. Description */}
            <Grid size={{ xs: 12, md: 4, lg: 3 }}>
              <TextField
                fullWidth
                size="small"
                label="Protocol Description"
                placeholder="Notes..."
                name="Description"
                value={sreqtypewisePerson.Description}
                onChange={handleChange}
                sx={{ bgcolor: '#fff', '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>

            {/* 5. The Action Button */}
            <Grid size={{ xs: 12, md: 4, lg: 2.4 }}>
              <Button
                fullWidth
                variant="contained"
                disableElevation
                onClick={handleSubmit}
                startIcon={<ContactMail />}
                sx={{
                  height: '40px',
                  textTransform: 'none',
                  fontWeight: 700,
                  borderRadius: 2,
                  background: editId
                    ? 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)'
                    : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 6px 15px rgba(59, 130, 246, 0.35)',
                  },
                }}
              >
                {editId ? 'Update' : 'Deploy'}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Box className="pwm-section-label">
        <ManageAccounts sx={{ color: '#64748b', fontSize: 22 }} />
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Active Mapping Protocols
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {sreqtypewisePersonlist.map((item, index) => {
          const type = servicetype.find(
            (t) => t.ServiceRequestTypeID === item.ServiceRequestTypeID
          );

          const config = mappingData.find((req) => req.title === type?.ServiceRequestTypeName) || {
            icon: <SupportAgent />,
            accent: '#64748b',
          };
          return (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Card className="pwm-mapping-tile" sx={{ '--pwm-accent': config.accent }}>
                <CardContent className="pwm-tile-body">
                  <Box className="pwm-tile-head">
                    <Box className="pwm-avatar-box">{config.icon}</Box>
                    <Box sx={{ flex: 1 }}></Box>
                  </Box>

                  <Box className="pwm-assignment-details">
                    <Box className="pwm-detail-row">
                      <Typography className="pwm-label">Primary:</Typography>
                      <Typography className="pwm-value">{item.FullName}</Typography>
                    </Box>
                    <Box className="pwm-detail-row">
                      <Typography className="pwm-label">Trigger:</Typography>
                      <Typography className="pwm-value-alt">{item.EscalationTimeHours}</Typography>
                    </Box>
                  </Box>
                  <Typography className="srtm-item-desc">{item.Description}</Typography>

                  <Box className="pwm-status-row">
                    <Chip label={item.IsActive ? 'Active' : 'Inactive'} />
                  </Box>

                  <Divider className="pwm-tile-divider" />

                  <Box className="pwm-tile-actions">
                    <Button size="small" className="pwm-edit-btn" onClick={() => handleEdit(item)}>
                      Edit Mapping
                    </Button>
                    <IconButton
                      size="small"
                      color="error"
                      className="pwm-del-btn"
                      onClick={() => handleDeleteClick(item.ServiceRequestTypeWisePersonID)}
                    >
                      <DeleteOutline fontSize="small" />
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
            Are you sure you want to delete this Mapping? This action cannot be undone.
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

export default ServiceRequestTypeWisePersonMapping;
