import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import {
  Box,
  Grid,
  Card,
  Typography,
  Button,
  Chip,
  TextField,
  Switch,
  IconButton,
  Tooltip,
  InputAdornment,
  Divider,
  Dialog,
  Zoom,
  DialogContent,
  DialogActions,
} from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import LayersIcon from '@mui/icons-material/Layers';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import CloseIcon from '@mui/icons-material/Close';
import { alpha } from '@mui/material/styles';
const STATUS_CONFIG = {
  Pending: {
    tag: 'Initial',
    type: 'pending',
    color: '#f59e0b',
  },
  'In Progress': {
    tag: 'Working',
    type: 'progress',
    color: '#3b82f6',
  },
  AdminApproved: {
    tag: 'AdminApproved',
    type: 'AdminApproved',
    color: '#3f9192',
  },
  HODAssigned: {
    tag: 'HODAssigned',
    type: 'HODAssigned',
    color: '#945e95',
  },
  AdminAssigned: {
    tag: 'HODAssigned',
    type: 'HODAssigned',
    color: '#0c5141',
  },
  Completed: {
    tag: 'Done',
    type: 'success',
    color: '#10b981',
  },
  closed: {
    tag: 'Closed',
    type: 'closed',
    color: '#ef4444',
  },
};
const API_URL = 'http://localhost:5000/ServiceRequestStatus';

function ServiceRequestStatusMaster() {
  const [status, setStatus] = useState({
    ServiceRequestStatusName: '',
    Description: '',
  });

  const [statusList, setStatusList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      const res = await fetch(API_URL, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      const result = await res.json();

      if (!res.ok) {
        console.error(result.message);
        setStatusList([]);
        return;
      }

      setStatusList(result.data || []);
    } catch (err) {
      console.error('FETCH ERROR:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStatus((status) => ({
      ...status,
      [name]: value,
    }));
  };

  const handleEdit = (item) => {
    setStatus({
      ServiceRequestStatusName: item.ServiceRequestStatusName,
      Description: item.Description,
    });

    setEditId(item.ServiceRequestStatusID);
  };

  const handleSubmit = async () => {
    const statusName = status.ServiceRequestStatusName.trim().toLowerCase();

    const isDuplicate = statusList.some(
      (s) =>
        s.ServiceRequestStatusName.toLowerCase() === statusName &&
        s.ServiceRequestStatusID !== editId
    );

    if (isDuplicate) {
      Swal.fire({
        icon: 'error',
        title: 'Duplicate Status',
        text: 'Status already exists. Please use a different name.',
        confirmButtonColor: '#ef4444',
      });
      return;
    }
    try {
      const payload = {
        ServiceRequestStatusName: status.ServiceRequestStatusName,
        Description: status.Description,
      };

      let res;

      if (editId) {
        res = await fetch(`${API_URL}/${editId}`, {
          method: 'PUT',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(API_URL, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      const result = await res.json();

      if (!res.ok) {
        console.error(result.message);
        return;
      }

      fetchStatus();

      setStatus({
        ServiceRequestStatusName: '',
        Description: '',
      });

      setEditId(null);
    } catch (err) {
      console.error('SUBMIT ERROR:', err);
    }
    Swal.fire({
      icon: 'success',
      title: editId ? 'Status Updated' : 'Status Created',
      text: 'Operation completed successfully.',
      confirmButtonColor: '#10b981',
    });
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const result = await res.json();

      if (!res.ok) {
        console.error(result.message);
        return;
      }

      fetchStatus();
    } catch (err) {
      console.error('DELETE ERROR:', err);
    }
  };
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpenDelete(true);
  };
  const confirmDelete = async () => {
    if (!deleteId) return;

    await handleDelete(deleteId);
    setOpenDelete(false);
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setOpenDelete(false);
    setDeleteId(null);
  };

  return (
    <Box className="sr-master-wrapper">
      <Box className="sr-master-header-panel">
        <Box>
          <Typography variant="h4" className="sr-master-main-title">
            ServiceRequest Status Master
          </Typography>

          <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500, marginTop: '5px' }}>
            Manage the lifecycle of service tickets and operational stages.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            size="small"
            placeholder="Search stages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" sx={{ color: '#94a3b8' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>

      <Box className="sr-master-content">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, lg: 3.5 }}>
            <Card className="sr-master-config-card" elevation={0}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1.5 }}>
                <Box className="sr-master-icon-wrap">
                  <LayersIcon sx={{ fontSize: 20 }} />
                </Box>

                <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a' }}>
                  Stage Editor
                </Typography>
              </Box>

              <Divider sx={{ mb: 3, opacity: 0.6 }} />

              <Box className="sr-master-field-group">
                <Typography className="sr-master-label">Status Name</Typography>

                <TextField
                  fullWidth
                  name="ServiceRequestStatusName"
                  placeholder="e.g. Parts Requested"
                  value={status.ServiceRequestStatusName}
                  onChange={handleChange}
                />
              </Box>

              <Box className="sr-master-field-group">
                <Typography className="sr-master-label">Internal Description</Typography>

                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  name="Description"
                  value={status.Description}
                  onChange={handleChange}
                />
              </Box>

              <Box className="sr-master-toggle-card">
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: '14px' }}>
                    Public Visibility
                  </Typography>

                  <Typography variant="caption">Show this status to end-users</Typography>
                </Box>

                <Switch defaultChecked color="success" />
              </Box>

              <Button
                fullWidth
                className="sr-master-deploy-btn"
                variant="contained"
                onClick={handleSubmit}
              >
                {editId ? 'Update Stage' : 'Deploy New Stage'}
              </Button>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, lg: 8.5 }}>
            <Box
              sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b' }}>
                Active Lifecycle Stages
              </Typography>

              <Chip label={`${statusList.length} Active`} className="sr-master-count-chip" />
            </Box>

            <Grid container spacing={2.5}>
              {statusList.map((item) => {
                const config = STATUS_CONFIG[item.ServiceRequestStatusName] || {};
                const filteredStatusList = statusList.filter((item) =>
                  item.ServiceRequestStatusName.toLowerCase().includes(searchQuery.toLowerCase())
                );
                return (
                  <StatusItem
                    key={item.ServiceRequestStatusID}
                    item={item}
                    title={item.ServiceRequestStatusName}
                    desc={item.Description}
                    tag={config.tag || item.ServiceRequestStatusName}
                    type={config.type || 'default'}
                    color={config.color || '#2563eb'}
                    onDelete={handleDeleteClick}
                    onEdit={handleEdit}
                  />
                );
              })}
            </Grid>
          </Grid>
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
            borderRadius: '24px',
            padding: '12px',
            backgroundImage: 'none',
            boxShadow: (theme) => `0 24px 48px ${alpha(theme.palette.common.black, 0.2)}`,
          },
        }}
      >
        <IconButton
          onClick={cancelDelete}
          sx={{ position: 'absolute', right: 16, top: 16, color: 'text.disabled' }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 3, px: 2 }}>
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: (theme) => alpha(theme.palette.error.main, 0.1),
              color: 'error.main',
              mb: 2,
            }}
          >
            <DeleteTwoToneIcon sx={{ fontSize: 32 }} />
          </Box>

          <Typography
            variant="h6"
            sx={{ fontWeight: 800, color: 'text.primary', textAlign: 'center' }}
          >
            Confirm Delete
          </Typography>
        </Box>

        <DialogContent sx={{ textAlign: 'center', pb: 1 }}>
          <Typography sx={{ color: 'text.secondary', fontSize: '0.95rem', px: 2 }}>
            Are you sure you want to delete this status? <br />
            <Box component="span" sx={{ color: 'error.light', fontWeight: 600 }}>
              This action cannot be undone.
            </Box>
          </Typography>
        </DialogContent>

        <DialogActions sx={{ p: 3, gap: 1.5 }}>
          <Button
            onClick={cancelDelete}
            fullWidth
            variant="outlined"
            sx={{
              borderRadius: '12px',
              py: 1.5,
              borderColor: 'divider',
              color: 'text.primary',
              textTransform: 'none',
              fontWeight: 700,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            fullWidth
            variant="contained"
            color="error"
            disableElevation
            sx={{
              borderRadius: '12px',
              py: 1.5,
              textTransform: 'none',
              fontWeight: 700,
              boxShadow: (theme) => `0 8px 16px ${alpha(theme.palette.error.main, 0.3)}`,
              '&:hover': {
                backgroundColor: 'error.dark',
                boxShadow: 'none',
              },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

const StatusItem = ({ item, title, desc, tag, type, color, onDelete, onEdit }) => (
  <Grid size={{ xs: 12, sm: 6 }}>
    <Card
      className={`sr-master-status-node node-${type}`}
      elevation={0}
      style={{ '--status-color': color }}
    >
      <Box className="sr-master-node-top">
        <Box className="sr-master-status-indicator">
          <Box className="indicator-dot" />

          <Typography className="indicator-tag">{tag}</Typography>
        </Box>

        <Typography className="sr-master-node-title">{title}</Typography>

        <Typography className="sr-master-node-desc">{desc}</Typography>
      </Box>

      <Box className="sr-master-node-actions">
        <Tooltip title="Edit Stage">
          <IconButton size="small" className="btn-edit" onClick={() => onEdit(item)}>
            <EditTwoToneIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete Stage">
          <IconButton
            size="small"
            className="btn-delete"
            onClick={() => onDelete(item.ServiceRequestStatusID)}
          >
            <DeleteTwoToneIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Card>
  </Grid>
);

export default ServiceRequestStatusMaster;
