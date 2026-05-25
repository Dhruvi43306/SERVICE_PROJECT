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
  Tooltip,
  Dialog,
  Zoom,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  PersonAddAlt1,
  VerifiedUser,
  Engineering,
  MailOutline,
  MoreVert,
  Settings,
  Business,
  DeleteTwoTone,
  DeleteForeverRounded,
} from '@mui/icons-material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
const deptUi = [
  {
    title: 'IT Support Department',
    accent: '#3b82f6',
    icon: <Settings sx={{ fontSize: 18 }} />,
  },
  {
    title: 'HouseKeeping Department',
    accent: '#10b981',
    icon: <Business sx={{ fontSize: 18 }} />,
  },
];
const API_URL = 'http://localhost:5000/ServiceDeptPerson';
const USER_URL = 'http://localhost:5000/users';
const DEPT_URL = 'http://localhost:5000/ServiceDept';

function ServiceDepartmentPersonMaster() {
  const [deleteId, setDeleteId] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [deptpersonlist, setdeptpersonlist] = useState([]);
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [deptperson, setdeptperson] = useState({
    StaffID: '',
    ServiceDeptID: '',
    DeptRole: '',
    Description: '',
  });
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

  const fetchServiceDeptPerson = async () => {
    try {
      const res = await fetch(API_URL, {
        method: 'GET',
        credentials: 'include',
      });
      const result = await res.json();
      console.log('API_DATA:', result);
      setdeptpersonlist(result.data || []);
    } catch (err) {
      console.log('Result ERROR:', result.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setdeptperson((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const submitServiceDeptPerson = async () => {
    try {
      const payload = {
        StaffID: deptperson.StaffID,
        ServiceDeptID: deptperson.ServiceDeptID,
        DeptRole: deptperson.DeptRole,
        Description: deptperson.Description,
      };

      const res = await fetch(API_URL, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      console.log('API_DATA:', result);
      fetchServiceDeptPerson();
      setdeptperson({
        StaffID: '',
        ServiceDeptID: '',
        DeptRole: '',
        Description: '',
      });
    } catch (err) {
      console.log('Result ERROR:', err.message);
    }
  };
  useEffect(() => {
    fetchServiceDeptPerson();
    fetchUsers();
    fetchDepartments();
  }, []);
  const groupedDeptPersons = deptpersonlist.reduce((acc, person) => {
    const deptId = person.ServiceDeptID;

    if (!acc[deptId]) {
      acc[deptId] = [];
    }

    acc[deptId].push(person);

    return acc;
  }, {});

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

      fetchServiceDeptPerson();
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
    <Box className="sdpm-main-wrapper">
      <Box className="sdpm-image-header">
        <Box className="sdpm-header-content">
          <Typography variant="h4" className="sdpm-title-premium" sx={{ mb: 0, lineHeight: 1.2 }}>
            ServiceDepartment Person Master
          </Typography>

          <Typography variant="body2" className="sdpm-subtitle-premium" sx={{ mt: '5px' }}>
            Manage the lifecycle of service tickets and operational stages.
          </Typography>
        </Box>
      </Box>

      {/* Registration Form */}
      <Card className="sdpm-registration-card" elevation={0}>
        <Box className="sdpm-card-label">
          <PersonAddAlt1 sx={{ fontSize: 18 }} />
          <Typography variant="button">Register New Staff Member</Typography>
        </Box>
        <Card
          elevation={0}
          sx={{
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            background: 'linear-gradient(to bottom right, #ffffff, #f1f4f9)', // Soft blue-ish tint
            overflow: 'visible',
          }}
        >
          <CardContent sx={{ p: 4 }}>
            {/* Header Section */}
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <AssignmentIndIcon color="primary" />
              <Typography variant="h6" fontWeight="600" color="text.primary">
                Department Assignment
              </Typography>
            </Box>

            <Divider sx={{ mb: 4, opacity: 0.6 }} />

            <Grid container spacing={2.5} alignItems="center">
              {/* 1. Employee Name */}
              <Grid size={{ xs: 12, md: 6, lg: 2.4 }}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Employee Name"
                  name="StaffID"
                  value={deptperson.StaffID}
                  onChange={handleChange}
                  sx={{ bgcolor: '#fff' }}
                >
                  {users
                    .filter((user) => ['HOD', 'TECHNICIAN', 'STAFF'].includes(user.Role))
                    .map((user) => (
                      <MenuItem key={user.UserID} value={user.UserID}>
                        {user.FullName}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>

              {/* 2. Department */}
              <Grid size={{ xs: 12, md: 6, lg: 2.4 }}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Department"
                  name="ServiceDeptID"
                  value={deptperson.ServiceDeptID}
                  onChange={handleChange}
                  sx={{ bgcolor: '#fff' }}
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

              {/* 3. Designated Role */}
              <Grid size={{ xs: 12, md: 4, lg: 2.4 }}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Designated Role"
                  name="DeptRole"
                  value={deptperson.DeptRole}
                  onChange={handleChange}
                  sx={{ bgcolor: '#fff' }}
                >
                  <MenuItem value="TECHNICIAN">Technician</MenuItem>
                  <MenuItem value="HOD">HOD</MenuItem>
                  <MenuItem value="STAFF">Staff</MenuItem>
                </TextField>
              </Grid>

              {/* 4. Description */}
              <Grid size={{ xs: 12, md: 4, lg: 2.4 }}>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Description"
                  placeholder="Notes..."
                  name="Description"
                  value={deptperson.Description}
                  onChange={handleChange}
                  sx={{ bgcolor: '#fff' }}
                />
              </Grid>

              {/* 5. Submit Button */}
              <Grid size={{ xs: 12, md: 4, lg: 2.4 }}>
                <Button
                  fullWidth
                  variant="contained"
                  disableElevation
                  onClick={submitServiceDeptPerson}
                  sx={{
                    height: '40px', // Matches TextField height
                    borderRadius: 1.5,
                    textTransform: 'none',
                    fontWeight: 600,
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #1976D2 30%, #00BCD4 90%)',
                    },
                  }}
                >
                  Assign to Dept
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Card>
      {/* Department Sections */}
      <Box className="sdpm-mapping-container">
        {deptUi.map((dept, idx) => {
          const matchedDept = departments.find((d) =>
            d.ServiceDeptName.toLowerCase().includes(dept.title.toLowerCase().split(' ')[0])
          );

          const members = matchedDept ? groupedDeptPersons[matchedDept.ServiceDeptID] || [] : [];
          return (
            <Box key={idx} className="sdpm-dept-group">
              <Box className="sdpm-dept-header">
                <Box className="sdpm-dept-title-flex">
                  <Box className="sdpm-dept-icon" sx={{ backgroundColor: dept.accent }}>
                    {dept.icon}
                  </Box>
                  <Typography variant="h6">{dept.title}</Typography>
                </Box>
                <Chip
                  label={`${members.length} Members`}
                  size="small"
                  className="sdpm-count-chip"
                />
              </Box>

              <Grid container spacing={3}>
                {members.map((person, pIdx) => (
                  <Grid size={{ xs: 12, md: 4 }} key={pIdx}>
                    <Card className="sdpm-user-card" elevation={0}>
                      <CardContent>
                        <Box className="sdpm-user-top">
                          <Avatar
                            className={`sdpm-avatar sdm-bg-${pIdx % 2 === 0 ? 'blue' : 'purple'}`}
                          >
                            {person.FullName?.charAt(0)}
                          </Avatar>
                          <Box sx={{ flex: 1 }}>
                            <Typography className="sdpm-user-name">{person.FullName}</Typography>
                            <Box className="sdpm-user-email-flex">
                              <MailOutline sx={{ fontSize: 12 }} />
                              <Typography className="sdpm-user-email">{person.Email}</Typography>
                            </Box>
                          </Box>
                          <IconButton size="small">
                            <MoreVert fontSize="small" />
                          </IconButton>
                        </Box>

                        <Box className="sdpm-tag-row">
                          <Chip
                            icon={person.DeptRole === 'HOD' ? <VerifiedUser /> : <Engineering />}
                            label={person.DeptRole}
                            className={`sdpm-role-tag ${(person.DeptRole || '').toLowerCase()}`}
                          />
                          <Chip label={person.Status} className="sdpm-status-tag" />
                        </Box>

                        <Typography className="sdpm-user-desc">{person.Description}</Typography>

                        <Divider className="sdpm-card-divider" />

                        <Box className="sr-master-node-actions">
                          {/* <Tooltip title="Edit Stage">
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
                          </Tooltip> */}

                          <Tooltip title="Delete Stage">
                            <IconButton
                              size="small"
                              className="btn-delete"
                              onClick={() => handleDeleteClick(person.ServiceDeptPersonID)}
                            >
                              <DeleteTwoTone fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          );
        })}
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
    </Box>
  );
}

export default ServiceDepartmentPersonMaster;
