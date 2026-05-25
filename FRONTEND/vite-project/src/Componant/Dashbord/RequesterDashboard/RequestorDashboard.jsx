import React, { useEffect, useState,useRef,useMemo  } from 'react';
import {
  Box,Typography,TextField,Button,Grid,Card,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Chip,IconButton,Tooltip,InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import HourglassTopRoundedIcon from '@mui/icons-material/HourglassTopRounded';
import PublishedWithChangesRoundedIcon from '@mui/icons-material/PublishedWithChangesRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import { socket } from "../../../socket";
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';

const statusStyles = {
  inprogress: {
    backgroundColor: '#ffeee0',
    color: '#9a2812',
  },
  completed: {
    backgroundColor: '#DCFCE7',
    color: '#15803D',
  },
  assigned: {
    backgroundColor: '#FFEDD5',
    color: '#C2410C',
  },
  pending: {
    backgroundColor: '#e7dada',
    color: '#4e0303',
  },
};
const getStatusKey = (id) => {
  switch (Number(id)) {
    case 28:
      return 'inprogress';
    case 19:
      return 'completed';
    case 22:
      return 'assigned';
    default:
      return 'pending';
  }
};

const getStatusLabel = (id) => {
  switch (Number(id)) {
    case 28:
      return 'InProgress';
    case 19:
      return 'Completed';
    case 22:
      return 'Assigned';
    default:
      return 'Pending';
  }
};
const API_URL = 'http://localhost:5000/ServiceRequest';
const NOTIFY_URL = `http://localhost:5000/notify/user`

const RequestorDashboard = () => {
  const navigate = useNavigate()
  const firstMatchRef = useRef(null);

  const rawUser = localStorage.getItem("user");
  const user = rawUser ? JSON.parse(rawUser) : null;
  const isAectiveUser = Number(user?.IsActive) === 1;
  console.log("User:",user)
  console.log("rawUser:",rawUser)
  
  const [listrequest, setreqlist] = useState([]);
  const [search, setSearch] = useState("");
  const [notifications, setNotifications] = useState([]);


  const fetchSerivceRequest = async () => {
    try {
      const res = await fetch(`${API_URL}?search=${search}`, {
        method: 'GET',
        credentials: 'include',
      });

      const result = await res.json();
      console.log('REQ API:', result);
      const safeData = Array.isArray(result.data)
        ? result.data.map((r) => ({
            ...r,
            status: getStatusKey(r.ServiceRequestStatusID),
            priority: r.priority || 'High',
            ServiceRequestTitle: r.ServiceRequestTitle || '-',
            ServiceRequestDescription: r.ServiceRequestDescription || '-',
          }))
        : [];

      setreqlist(safeData);
    } catch (err) {
      console.log(err);
    }
  };

useEffect(() => {
    
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/Login', { replace: true });
    } else {
      fetchSerivceRequest();
      window.history.pushState(null, '', window.location.href);
      window.onpopstate = function () {
        navigate('/', { replace: true }); 
      };
    }

    return () => {
      window.onpopstate = null; 
    };
  }, [navigate]);


useEffect(() => {
    const delay = setTimeout(() => {
    }, 400);

    return () => clearTimeout(delay);
  }, [search]);

  const filteredList = useMemo(() => {
  if (!search) return listrequest;

  return listrequest.filter((r) =>
    r.ServiceRequestNo.toLowerCase().includes(search.toLowerCase()) ||
    r.ServiceRequestTitle.toLowerCase().includes(search.toLowerCase())
  );
}, [listrequest, search]);

   const sortedList = [...filteredList].sort((a, b) => {
    if (!search) return 0;

    const aMatch =
      a.ServiceRequestNo.toLowerCase().includes(search.toLowerCase()) ||
      a.ServiceRequestTitle.toLowerCase().includes(search.toLowerCase());

    const bMatch =
      b.ServiceRequestNo.toLowerCase().includes(search.toLowerCase()) ||
      b.ServiceRequestTitle.toLowerCase().includes(search.toLowerCase());

    return bMatch - aMatch;
  });


  const escapeRegex = (text) => {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};


const highlightText = (text) => {
  if (!search || !text) return text;

  const safeSearch = escapeRegex(search);
  const regex = new RegExp(`(${safeSearch})`, "gi");

  const parts = String(text).split(regex);

  return parts.map((part, i) =>
    part.toLowerCase() === search.toLowerCase() ? (
      <span
        key={i}
        style={{
          backgroundColor: "#ffeb3b",
          fontWeight: "bold",
          padding: "2px 4px",
          borderRadius: "4px",
          animation: "highlightFade 0.6s ease-in-out",
        }}
      >
        {part}
      </span>
    ) : part
  );
};
useEffect(() => {
  if (!search) return;

  const timer = setTimeout(() => {
    firstMatchRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, 200);

  return () => clearTimeout(timer);
}, [sortedList]);



useEffect(() => {
  if (user?.UserID) {
    console.log("JOIN USER:", user.UserID);
    socket.emit("join", user.UserID);
  }
}, [user]);

useEffect(() => {
  const handler = (data) => {
    setNotifications(prev => [data, ...prev]);
  };
  socket.on("newNotification", handler);
  return () => {
    socket.off("newNotification", handler);
  };
}, []);

useEffect(() => {
 fetch(`${NOTIFY_URL}/${user?.UserID}`, {
  credentials: "include",
})
  .then((res) => res.json())
  .then((data) => {
    console.log("OLD NOTIFICATIONS:", data);
    setNotifications(data.data || []);
  });
}, []);



  const total = listrequest.length;
  const pending = listrequest.filter((r) => r.status.toLowerCase() === 'pending').length;
  const inProgress = listrequest.filter((r) => r.status.toLowerCase() === 'inprogress').length;
  const completed = listrequest.filter((r) => r.status.toLowerCase() === 'completed').length;
 
  const stats = [
    { label: 'TOTAL', val: total, icon: <AssessmentRoundedIcon />, theme: 'theme-indigo' },
    { label: 'PENDING', val: pending, icon: <HourglassTopRoundedIcon />, theme: 'theme-amber' },
    {
      label: 'IN PROGRESS',
      val: inProgress,
      icon: <PublishedWithChangesRoundedIcon />,
      theme: 'theme-blue',
    },
    {
      label: 'COMPLETED',
      val: completed,
      icon: <CheckCircleRoundedIcon />,
      theme: 'theme-emerald',
    },
  ];

  const formatDate = (d) => {
    if (!d) return '-';
    return new Date(d).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };



  return (
    <Box className="premium-dashboard">
      <Box className="premium-header">
        <Typography variant="h3" className="premium-title">
          Requester Dashboard
        </Typography>

        <Box className="premium-search-container">
          <TextField
            fullWidth
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            placeholder="Search by Request Number..."
            className="premium-input"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              disableUnderline: true,
            }}
          />

          <Button variant="contained" className="premium-btn-send" onClick={() => setSearch(search)}>
            <SendIcon />
          </Button>
          <Button
          variant="contained"
          className="premium-btn-add"
          startIcon={<AddIcon />}
          onClick={() => {
        if (!isAectiveUser) {
            Swal.fire({
                title: 'Account Required',
                text: 'Please create an account first to proceed.',
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Got it!',
                background: '#fff',
                customClass: {
                    popup: 'premium-swal-popup' 
                }
            });
        } else {
            navigate("/CreateRequest");
        }
    }}>
    New Request
</Button>
  </Box>
    </Box>

      <Box className="premium-content">
        <Grid container spacing={3}>
          {stats.map((stat, i) => (
            <Grid size={{ xs: 12, md: 3, sm: 6 }} key={i}>
              <Card className={`premium-card ${stat.theme}`}>
                <Box className="premium-card-inner">
                  <Box className="premium-icon-box">{stat.icon}</Box>

                  <Box>
                    <Typography className="premium-stat-label">{stat.label}</Typography>

                    <Typography className="premium-stat-value">{stat.val}</Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 0.5,
            px: 0.5,
            mt: 2,
          }}
        >
          <Typography variant="h6" className="sqc-section-title" sx={{ m: 0, fontWeight: 800 }}>
            Active Service Requests
          </Typography>

          {/* <Button
            variant="text"
            size="small"
            className="sqc-btn-view-all"
            startIcon={
              <Link to="/RequestDetail">
                <VisibilityRoundedIcon sx={{ fontSize: '1.1rem !important' }} />
              </Link>
            }
          >
            View All
          </Button> */}
        </Box>

        <TableContainer component={Paper} className="premium-table-container">
          <Table>
            <TableHead>
              <TableRow className="premium-thead-row">
                {[
                  'Request ID',
                  'ServiceRequestTitle',
                  'Description',
                  'Status',
                  'Priority',
                  'Date',
                  
                ].map((h) => (
                  <TableCell key={h} className="premium-th">
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {listrequest.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No Service Requests Found
                  </TableCell>
                </TableRow>
              ) : (
                sortedList.map((row) => {
                   const isMatch =
                  search &&
                  (row.ServiceRequestNo.toLowerCase().includes(search.toLowerCase()) ||
                  row.ServiceRequestTitle.toLowerCase().includes(search.toLowerCase()));
                
                return(
                  <TableRow key={row.ServiceRequestID}
                   ref={isMatch && !firstMatchRef.current ? firstMatchRef : null}
                  sx={{ backgroundColor: isMatch ? "#fffde7" : "inherit" }}
                  className="premium-tr">
                    <TableCell className="premium-id-cell">{highlightText(row.ServiceRequestNo)}</TableCell>

                    <TableCell className="premium-category">
                      <b>{row.ServiceRequestTitle}</b>
                    </TableCell>

                    <TableCell className="premium-desc">{highlightText(row.ServiceRequestDescription)}</TableCell>
                    <TableCell>
                        <Chip
                          label={getStatusLabel(row.ServiceRequestStatusID)}
                          sx={{
                            ...statusStyles[getStatusKey(row.ServiceRequestStatusID)],
                            fontWeight: 600,
                            borderRadius: '8px',
                          }}
                        />
                      </TableCell>


                    <TableCell>
                      <Box className={`premium-priority pr-${row.priority.toLowerCase()}`}>
                        {row.priority}
                      </Box>
                    </TableCell>

                    <TableCell className="premium-date">
                      {formatDate(row.ServiceRequestDateTime)}
                    </TableCell>

                    {/* <TableCell align="right">
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <Tooltip title="View">
                          <IconButton className="premium-icon-btn">
                            <Link to="/RequestDetail">
                              <VisibilityRoundedIcon />
                            </Link>
                          </IconButton>
                        </Tooltip>

                        <Link to="/ChatPage">
                          <Tooltip title="Chat">
                            <IconButton className="premium-icon-btn">
                              <ForumRoundedIcon />
                            </IconButton>
                          </Tooltip>
                        </Link>
                      </Box>
                    </TableCell> */}
                  </TableRow>
                )})
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default RequestorDashboard;
