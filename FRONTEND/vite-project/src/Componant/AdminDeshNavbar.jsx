import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Stack,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Fade,
  Divider,
  Avatar,
} from '@mui/material';
import {
  ChevronDown,
  Layout,
  Settings,
  LogOut,
  User,
  Bell,
  ShieldCheck,
  Zap,
  BarChart3,
  Briefcase,
  Rocket,
  ShoppingBag,
  HeartPulse,
  Globe2,
  Shield,
} from 'lucide-react';
import { AssignmentAdd, Details, RequestPage, RequestPageSharp } from '@mui/icons-material';

const PROFILE_URL = 'http://localhost:5000/users/profile';
const LOGOUT_URL = 'http://localhost:5000/users/logout';

const AdminDeshNavbar = () => {
  const navigate = useNavigate();
  const [anchors, setAnchors] = useState({ dashboard: null, master: null, profile: null });

  const handleOpen = (key) => (e) => setAnchors({ ...anchors, [key]: e.currentTarget });
  const handleClose = () =>
    setAnchors({ dashboard: null, master: null, profile: null, progress: null });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [buttonType, setButtonType] = useState('signup');
  const handleLogout = async () => {
    try {
      await fetch(LOGOUT_URL, {
        method: 'POST',
        credentials: 'include',
      });

      setIsLoggedIn(false);
      navigate('/Login', { replace: true });
    } catch (err) {
      console.log('Logout error:', err);
    }
  };

  useEffect(() => {
    fetch(PROFILE_URL, {
      credentials: 'include',
    })
      .then((res) => {
        if (res.status === 401) {
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
        }
      })
      .catch(() => setLoggedIn(false));
  }, []);

  return (
    <AppBar position="sticky" elevation={0} className="dual-tone-navbar">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ height: 72, justifyContent: 'space-between' }}>
          <Stack direction="row" alignItems="center" spacing={4}>
            <Link
              to="/"
              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}
            >
              <Box
                sx={{
                  bgcolor: '#6366f1',
                  p: 0.8,
                  borderRadius: '10px',
                  display: 'flex',
                  boxShadow: '0 0 15px rgba(99, 102, 241, 0.4)',
                }}
              >
                <Zap size={20} color="#fff" fill="#fff" />
              </Box>
              <Typography variant="h6" fontWeight={800} color="#fff" sx={{ letterSpacing: -0.5 }}>
                SERVICE<span style={{ color: '#818cf8' }}>PRO</span>
              </Typography>
            </Link>

            <Stack direction="row" spacing={1} sx={{ display: { xs: 'none', lg: 'flex' } }}>
              <Link to="/Docs">
              <Button className="dual-tone-nav-btn">Docs</Button></Link>              <Button
                className="dual-tone-nav-btn"
                onClick={handleOpen('dashboard')}
                endIcon={<ChevronDown size={14} />}
              >
                Dashboard
              </Button>
              <Button
                className="dual-tone-nav-btn"
                onClick={handleOpen('master')}
                endIcon={<ChevronDown size={14} />}
              >
                Master Config
              </Button>
              {/* <Button
                className="dual-tone-nav-btn"
                onClick={handleOpen('progress')}
                endIcon={<ChevronDown size={14} />}
              >
                Report
              </Button> */}
            </Stack>
          </Stack>

          {/* RIGHT SIDE: TOOLS */}
          <Stack direction="row" alignItems="center" spacing={2}>
            <Link to="/Notification">
              <IconButton sx={{ color: '#94a3b8' }}>
                <Bell size={20} />
              </IconButton>
            </Link>

            {/* {!isLoggedIn ? (
  buttonType === 'signup' ? (
    <Link to="/SignUp">
      <Button variant="contained" className="dual-tone-action-btn">
        Signup
      </Button>
    </Link>
  ) : (
    <Link to="/Login">
      <Button variant="contained" className="dual-tone-action-btn">
        Login
      </Button>
    </Link>
  )
) : null} */}
            {!isLoggedIn && (
              <Link to="/Login">
                <Button variant="contained" className="dual-tone-action-btn">
                  Login
                </Button>
              </Link>
            )}

            <IconButton onClick={handleOpen('profile')} sx={{ p: 0.5 }}>
              <Avatar
                sx={{
                  width: 38,
                  height: 38,
                  bgcolor: '#334155',
                  border: '2px solid #475569',
                  color: '#818cf8',
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                JD
              </Avatar>
            </IconButton>
          </Stack>
        </Toolbar>
      </Container>

      <Menu
        anchorEl={anchors.dashboard}
        open={Boolean(anchors.dashboard)}
        onClose={handleClose}
        TransitionComponent={Fade}
        PaperProps={{ className: 'dual-tone-dropdown', sx: { width: 440, p: 2 } }}
      >
        <Typography
          variant="caption"
          sx={{
            color: '#94a3b8',
            fontWeight: 800,
            px: 1.5,
            mb: 1,
            display: 'block',
            letterSpacing: 1,
          }}
        >
          MODULES
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
          <MegaItem
            to="/AdminDashboard"
            icon={<Layout color="#6366f1" />}
            title="Admin Panel"
            desc="System Control"
          />
          <MegaItem
            to="/HodDashboard"
            icon={<ShieldCheck color="#10b981" />}
            title="HOD Desk"
            desc="Approvals"
          />
          <MegaItem
            to="/TechnicianDashboard"
            icon={<BarChart3 color="#f59e0b" />}
            title="Ops Center"
            desc="SLA Tracking"
          />
          <MegaItem
            to="/RequestorDashboard"
            icon={<User color="#8b5cf6" />}
            title="Employee"
            desc="My Requests"
          />
        </Box>
      </Menu>

      <Menu
        anchorEl={anchors.progress}
        open={Boolean(anchors.progress)}
        onClose={handleClose}
        TransitionComponent={Fade}
        PaperProps={{ className: 'dual-tone-dropdown', sx: { width: 440, p: 2 } }}
      >
        <Typography
          variant="caption"
          sx={{
            color: '#94a3b8',
            fontWeight: 800,
            px: 1.5,
            mb: 1,
            display: 'block',
            letterSpacing: 1,
          }}
        >
          MODULES
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
          <MegaItem
            to="/AdminApprovePage"
            icon={<Layout color="#6366f1" />}
            title="AdminApprove"
            desc="System Control"
          />
          <MegaItem
            to="/AlltechnitionPage"
            icon={<ShieldCheck color="#10b981" />}
            title="Alltechnition"
            desc="Approvals"
          />
          <MegaItem
            to="/RequestDetail"
            icon={<RequestPage color="#f59e0b" />}
            title="RequestDetail"
            desc="System Control"
          />
          <MegaItem
            to="/ReportPage"
            icon={<BarChart3 color="#f50be5" />}
            title="ReportPage"
            desc="SLA Tracking"
          />
          <MegaItem
            to="/RequestTracker"
            icon={<RequestPageSharp color="#0bf5ce" />}
            title="RequestTracker"
            desc="SLA Tracking"
          />
          <MegaItem
            to="/TechnicianAssignedRequests"
            icon={<AssignmentAdd color="#6366f1" />}
            title="Tech Assign"
            desc="Approvals"
          />
          <MegaItem
            to="/TechnicianRequestDetails"
            icon={<Details color="#6b0a0a" />}
            title="Tech Detail"
            desc="System Control"
          />

          {/* <MegaItem to="/TechnicianAssignedRequests" icon={<BarChart3 color="#f59e0b" />} title="TechnicianAssignedRequest" desc="SLA Tracking" /> */}
        </Box>
      </Menu>

      {/* --- DROPDOWN: MASTERS (FIXED SYNTAX) --- */}
      <Menu
        anchorEl={anchors.master}
        open={Boolean(anchors.master)}
        onClose={handleClose}
        TransitionComponent={Fade}
        PaperProps={{ className: 'dual-tone-dropdown', sx: { width: 550, p: 3 } }}
      >
        <Box sx={{ display: 'flex', gap: 3 }}>
          {/* Column 1: Masters */}
          <Box sx={{ flex: 1 }}>
            <SectionLabel>MASTERS</SectionLabel>
            <Stack spacing={0.5}>
              <SolutionLink
                to="/ServiceDepartmentMaster"
                icon={<Rocket size={18} />}
                label="Service Dept Master"
              />
              <SolutionLink
                to="/ServiceDepartmentPersonMaster"
                icon={<Briefcase size={18} />}
                label="Person Master"
              />
              <SolutionLink
                to="/ServiceRequestStatusMaster"
                icon={<Shield size={18} />}
                label="Status Master"
              />
            </Stack>
          </Box>

          <Divider orientation="vertical" flexItem />

          {/* Column 2: Configurations */}
          <Box sx={{ flex: 1 }}>
            <SectionLabel>CONFIGURATIONS</SectionLabel>
            <Stack spacing={0.5}>
              <SolutionLink
                to="/ServiceRequestTypeMaster"
                icon={<ShoppingBag size={18} />}
                label="Request Type"
              />
              <SolutionLink
                to="/ServiceRequestTypeWisePersonMapping"
                icon={<HeartPulse size={18} />}
                label="TypeWise Master"
              />
              <SolutionLink
                to="/ServiceTypeMaster"
                icon={<Globe2 size={18} />}
                label="Service Type"
              />
            </Stack>
          </Box>
        </Box>
      </Menu>

      {/* --- PROFILE MENU --- */}
      <Menu
        anchorEl={anchors.profile}
        open={Boolean(anchors.profile)}
        onClose={handleClose}
        PaperProps={{ className: 'dual-tone-dropdown', sx: { width: 220, p: 1 } }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="subtitle2" fontWeight={800} color="#0f172a">
            Dhruvi Savaliya
          </Typography>
          <Typography variant="caption" color="#64748b">
            Super Admin
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Link to="/AdminProfile">
          <ProfileItem icon={<User size={16} />} label="My Profile" />
        </Link>
        <ProfileItem icon={<Settings size={16} />} label="Preferences" />
        <Divider sx={{ my: 1 }} />
        <MenuItem onClick={handleLogout}>
          <ProfileItem icon={<LogOut size={16} />} label="Sign Out" color="#ef4444" />
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

// --- HELPER SUB-COMPONENTS ---

const SectionLabel = ({ children }) => (
  <Typography
    variant="caption"
    sx={{
      fontWeight: 800,
      color: '#6366f1',
      mb: 1.5,
      display: 'block',
      letterSpacing: 1.2,
    }}
  >
    {children}
  </Typography>
);

const SolutionLink = ({ to, icon, label }) => (
  <Link to={to} style={{ textDecoration: 'none' }}>
    <MenuItem
      sx={{
        borderRadius: '8px',
        gap: 1.5,
        py: 1.2,
        '&:hover': { bgcolor: '#f1f5f9', color: '#6366f1' },
      }}
    >
      <Box sx={{ color: '#94a3b8', display: 'flex' }}>{icon}</Box>
      <Typography variant="body2" fontWeight={600} color="#475569">
        {label}
      </Typography>
    </MenuItem>
  </Link>
);

const MegaItem = ({ icon, title, desc, to }) => (
  <Link to={to} style={{ textDecoration: 'none' }}>
    <MenuItem
      sx={{
        p: 1.5,
        borderRadius: '12px',
        display: 'flex',
        gap: 2,
        '&:hover': { bgcolor: '#f8fafc' },
      }}
    >
      <Box sx={{ p: 1, bgcolor: '#f1f5f9', borderRadius: '8px', display: 'flex' }}>{icon}</Box>
      <Box>
        <Typography variant="body2" fontWeight={700} color="#1e293b">
          {title}
        </Typography>
        <Typography variant="caption" color="#64748b">
          {desc}
        </Typography>
      </Box>
    </MenuItem>
  </Link>
);

const ProfileItem = ({ icon, label, color = '#475569' }) => (
  <MenuItem sx={{ borderRadius: '8px', gap: 1.5, py: 1, color: color }}>
    {icon}{' '}
    <Typography variant="body2" fontWeight={600}>
      {label}
    </Typography>
  </MenuItem>
);

export default AdminDeshNavbar;
