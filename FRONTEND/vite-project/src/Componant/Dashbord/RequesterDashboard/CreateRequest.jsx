import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Divider,
  Dialog,
  DialogContent,
  Paper,
  Stack,
  MenuItem,
} from '@mui/material';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import AttachmentTwoToneIcon from '@mui/icons-material/AttachmentTwoTone';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000/ServiceRequest';
const TYPE_URL = 'http://localhost:5000/ServiceType';
const PRIORITY_URL = 'http://localhost:5000/Priority';
const REQ_URL = 'http://localhost:5000/ServiceRequestType';
const DEPT_URL = 'http://localhost:5000/ServiceDept';
function CreateRequest() {
  const navigate = useNavigate();
  const [servicetype, setservicetype] = useState([]);
  const [servicepriority, setservicepriority] = useState([]);
  const [servicereqtype, setservicereqtype] = useState([]);
  const [servicedept, setservicedept] = useState([]);
  const [createreq, setreq] = useState({
    ServiceRequestID: '',
    ServiceRequestNo: '',
    ServiceRequestDate: '',
    StaffID: '',
    ServiceTypeID: '',
    ServiceRequestTypeID: '',
    ServiceDeptID: '',
    PriorityID: '',
    ServiceRequestTitle: '',
    ServiceRequestDescription: '',
    UserID: '',
    Description: '',
  });
  const [openSuccess, setOpenSuccess] = useState(false);
  const handleSubmit = async () => {
    const payload = {
      ServiceRequestID: Number(createreq.ServiceRequestID),
      ServiceRequestNo: createreq.ServiceRequestNo,
      ServiceRequestDate: createreq.ServiceRequestDate,
      StaffID: Number(createreq.StaffID),
      ServiceTypeID: Number(createreq.ServiceTypeID),
      ServiceRequestTypeID: Number(createreq.ServiceRequestTypeID),
      ServiceDeptID: Number(createreq.ServiceDeptID),
      PriorityID: Number(createreq.PriorityID),
      ServiceRequestTitle: createreq.ServiceRequestTitle,
      ServiceRequestDescription: createreq.ServiceRequestDescription,
      UserID: Number(createreq.UserID),
    };
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        credentials: 'include',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      console.log('API_DATA:', result);
      setreq(result.data || []);
      navigate('/RequestorDashboard');
    } catch (err) {
      console.log('ERROR:', err.message);
    }
    setOpenSuccess(true);
  };

  const handleClose = () => {
    setOpenSuccess(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'ServiceTypeID') {
      const selectedType = servicetype.find((type) => type.ServiceTypeID == value);
      setreq((prev) => ({
        ...prev,
        ServiceTypeID: value,
        ServiceDeptID: selectedType?.ServiceDeptID || '',
      }));
    } else {
      setreq((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const fetchSerivceRquestType = async () => {
    try {
      const res = await fetch(REQ_URL, {
        method: 'GET',
        credentials: 'include',
      });
      const result = await res.json();
      console.log('REQ API:', result);

      setservicereqtype(result.data || []);
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
  const fetchServiceDept = async () => {
    try {
      const res = await fetch(DEPT_URL, {
        method: 'GET',
        credentials: 'include',
      });
      const result = await res.json();
      console.log('DEPT API:', result);

      setservicedept(result.data || []);
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
    fetchSerivceType();
    fetchSerivceRquestType();
    fetchServiceDept();
    fetchServicePriority();
  }, []);

  return (
    <Box className="csr-svc-page-wrapper">
      <Box className="csr-svc-top-banner">
        <Stack spacing={1}>
          <Typography className="csr-svc-main-title">Create Service Request</Typography>
          <Typography className="csr-svc-main-subtitle">
            Fill the details below to raise a new service request
          </Typography>
        </Stack>
      </Box>

      <Box className="csr-svc-content-container">
        <Paper className="csr-svc-form-card" elevation={0}>
          <Stack direction="row" alignItems="center" spacing={1.5} mb={2}>
            <InfoTwoToneIcon className="csr-svc-section-icon" />
            <Typography className="csr-svc-section-title">Service Information</Typography>
          </Stack>
          <Divider className="csr-svc-divider" />

          <Grid container spacing={4} mt={0.5}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                select
                label="Service Type"
                fullWidth
                className="csr-svc-input"
                name="ServiceTypeID"
                onChange={handleChange}
                value={createreq.ServiceTypeID}
              >
                {servicetype.length > 0 ? (
                  servicetype.map((type) => (
                    <MenuItem key={type.ServiceTypeID} value={type.ServiceTypeID}>
                      {type.ServiceTypeName}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No ServiceTypeName Found</MenuItem>
                )}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                select
                label="Request Type"
                fullWidth
                className="csr-svc-input"
                name="ServiceRequestTypeID"
                value={createreq.ServiceRequestTypeID}
                onChange={handleChange}
              >
                {servicereqtype.length > 0 ? (
                  servicereqtype.map((type) => (
                    <MenuItem key={type.ServiceRequestTypeID} value={type.ServiceRequestTypeID}>
                      {type.ServiceRequestTypeName}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No ServiceRequestTypeName Found</MenuItem>
                )}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Department"
                fullWidth
                className="csr-svc-input disabled"
                value={
                  servicedept.find((dept) => dept.ServiceDeptID == createreq.ServiceDeptID)
                    ?.ServiceDeptName || ''
                }
                // disabled={role === 'Admin' ? false : true}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                select
                label="Priority"
                fullWidth
                className="csr-svc-input"
                name="PriorityID"
                value={createreq.PriorityID}
                onChange={handleChange}
              >
                {servicepriority.length > 0 ? (
                  servicepriority.map((priority) => (
                    <MenuItem key={priority.PriorityID} value={priority.PriorityID}>
                      {priority.PriorityName}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No Priority Found</MenuItem>
                )}
              </TextField>
            </Grid>
          </Grid>
        </Paper>

        <Paper className="csr-svc-form-card" elevation={0}>
          <Stack direction="row" alignItems="center" spacing={1.5} mb={2}>
            <DescriptionTwoToneIcon className="csr-svc-section-icon" />
            <Typography className="csr-svc-section-title">Request Details</Typography>
          </Stack>
          <Divider className="csr-svc-divider" />

          <Grid container spacing={4} mt={0.5}>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Request Title"
                fullWidth
                className="csr-svc-input"
                placeholder="Enter a brief summary of your request"
                name="ServiceRequestTitle"
                value={createreq.ServiceRequestTitle}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={5}
                className="csr-svc-input"
                placeholder="Describe your request in detail..."
                name="ServiceRequestDescription"
                value={createreq.ServiceRequestDescription}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Paper>

        <Paper className="csr-svc-form-card" elevation={0}>
          <Stack direction="row" alignItems="center" spacing={1.5} mb={2}>
            <AttachmentTwoToneIcon className="csr-svc-section-icon" />
            <Typography className="csr-svc-section-title">Attachments</Typography>
          </Stack>
          <Divider className="csr-svc-divider" />

          <Box className="csr-svc-upload-zone">
            <Button
              variant="text"
              startIcon={<CloudUploadTwoToneIcon />}
              component="label"
              className="csr-svc-upload-btn"
            >
              Click to Upload or Drag and Drop
              <input type="file" hidden />
            </Button>
            <Typography className="csr-svc-upload-hint">
              Support for PDF, JPG, PNG (Max 10MB)
            </Typography>
          </Box>
        </Paper>

        <Stack direction="row" spacing={2} justifyContent="flex-end" mt={5}>
          <Button variant="text" className="csr-svc-btn-cancel">
            Cancel
          </Button>
          <Button variant="contained" className="csr-svc-btn-submit" onClick={handleSubmit}>
            Submit Request
          </Button>
        </Stack>
      </Box>

      <Dialog open={openSuccess} onClose={handleClose} PaperProps={{ className: 'csr-svc-modal' }}>
        <DialogContent>
          <Box className="csr-svc-success-content">
            <div className="csr-svc-icon-pulse">
              <CheckCircleTwoToneIcon className="csr-svc-success-icon" />
            </div>
            <Typography className="csr-svc-modal-header">
              Request Submitted Successfully!
            </Typography>
            <Typography className="csr-svc-modal-body">
              Your service request has been created. Our team will start working on it shortly.
            </Typography>
            <Button
              variant="contained"
              onClick={handleClose}
              className="csr-svc-btn-submit full-width"
            >
              OK, Got it
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default CreateRequest;
