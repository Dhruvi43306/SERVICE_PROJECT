import React, { useState } from 'react';
import { 
  Box, Drawer, List, ListItem, ListItemButton, ListItemText, 
  Typography, Container, Paper, Divider, Chip, Stack, Grid,
  Avatar, Tooltip, IconButton, AppBar, Toolbar, InputBase
} from '@mui/material';
import { 
  Layers, People, AccountTree, Storage, Terminal, Speed, 
  Search, NotificationsNone, Settings, CheckCircleOutline, 
  Group, Construction, Shield, AdminPanelSettings, East, AddCircleOutline,
  VerifiedUser, AssignmentInd, PlayCircleFilled, Lock, EnhancedEncryption,
  FactCheck, SettingsSuggest, Business, Category, Map, Smartphone, Code,
  Dns, Hub, SyncAlt, Description
} from '@mui/icons-material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { shadesOfPurple } from 'react-syntax-highlighter/dist/esm/styles/prism';

const drawerWidth = 280;

const Docs = () => {
  const [activeId, setActiveId] = useState('intro');

  const navItems = [
    { text: 'Overview', id: 'intro', icon: <Speed /> },
    { text: 'Security Protocol', id: 'security', icon: <Lock /> },
    { text: 'Workflow Engine', id: 'workflow', icon: <AccountTree /> },
    { text: 'User Personas', id: 'roles', icon: <People /> },
    { text: 'Technical Stack', id: 'stack', icon: <Terminal /> },
    { text: 'System Architecture', id: 'modules', icon: <Storage /> },
  ];

  const scrollTo = (id) => {
    setActiveId(id);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 100, behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ display: 'flex', bgcolor: '#F8FAFC', minHeight: '100vh' }}>
      {/* --- SIDEBAR --- */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { 
            width: drawerWidth, 
            bgcolor: '#FFFFFF',
            borderRight: '1px solid #E2E8F0',
            boxShadow: '4px 0 24px rgba(0, 0, 0, 0.02)'
          },
        }}
      >
        <Box sx={{ p: 4, mb: 2 }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box sx={{ 
              width: 40, height: 40, bgcolor: '#6366F1', borderRadius: '12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 16px -4px rgba(99, 102, 241, 0.4)'
            }}>
              <Layers sx={{ color: 'white', fontSize: 22 }} />
            </Box>
            <Typography variant="h6" fontWeight={900} letterSpacing="-0.5px" color="#1E293B">
              Service<span style={{ color: '#6366F1' }}>Sync</span>
            </Typography>
          </Stack>
        </Box>

        <List sx={{ px: 2 }}>
          {navItems.map((item) => (
            <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton 
                onClick={() => scrollTo(item.id)}
                selected={activeId === item.id}
                sx={{ 
                  borderRadius: '12px',
                  py: 1.5,
                  transition: '0.2s all ease',
                  '&.Mui-selected': { 
                    bgcolor: '#EEF2FF', 
                    color: '#4F46E5',
                    '& .MuiSvgIcon-root': { color: '#4F46E5' },
                    '&::after': { content: '""', position: 'absolute', right: 12, width: 5, height: 18, bgcolor: '#4F46E5', borderRadius: 4 }
                  },
                  '&:hover': { bgcolor: '#F1F5F9' }
                }}
              >
                <Box sx={{ mr: 2, display: 'flex', color: '#94A3B8' }}>{item.icon}</Box>
                <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: 700, fontSize: '0.85rem' }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'rgba(248, 250, 252, 0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #E2E8F0', zIndex: 10 }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#F1F5F9', px: 2, py: 1, borderRadius: '12px', width: 400 }}>
              <Search sx={{ color: '#64748B', mr: 1, fontSize: 20 }} />
              <InputBase placeholder="Search system logic..." sx={{ fontSize: '0.85rem', width: '100%' }} />
            </Box>
            <Stack direction="row" spacing={2} alignItems="center">
              <Chip label="v1.0.4 - Secure" size="small" icon={<EnhancedEncryption sx={{ fontSize: '14px !important' }} />} sx={{ bgcolor: '#DCFCE7', color: '#166534', fontWeight: 700 }} />
              <Avatar sx={{ width: 36, height: 36, bgcolor: '#6366F1', fontWeight: 700, fontSize: '0.8rem' }}>AD</Avatar>
            </Stack>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ py: 10 }}>
          
          {/* SECTION: OVERVIEW */}
          <DocSection id="intro" title="System Overview" badge="Enterprise Grade">
            <Paper elevation={0} sx={{ p: 4, borderRadius: 6, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', mb: 6 }}>
              <Typography variant="body1" sx={{ color: '#475569', fontSize: '1.1rem', lineHeight: 1.8 }}>
                The <span style={{ color: '#6366F1', fontWeight: 800 }}>ServiceSync (SRMS)</span> is an advanced ticketing ecosystem built for high-scale organizations. It centralizes service management by connecting requestors with specialized technicians through a role-based, cryptographically secure workflow.
              </Typography>
            </Paper>
          </DocSection>

          {/* SECTION: SECURITY */}
          <DocSection id="security" title="🛡️ Security & Validation" badge="Bcrypt + Zod + OTP">
            <Typography variant="body2" color="#64748B" sx={{ mb: 4 }}>
              The system utilizes a "Zero-Trust" approach for data mutation and user authentication.
            </Typography>
            
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {[
                { title: "Bcrypt Hashing", desc: "Adaptive salted hashing for passwords with a cost factor of 12.", icon: <EnhancedEncryption />, color: "#10B981" },
                { title: "Email OTP", desc: "Dual-factor verification for administrative actions and password recovery.", icon: <Smartphone />, color: "#3B82F6" },
                { title: "Zod Integrity", desc: "Strict schema enforcement at the API entry point to block XSS and injection.", icon: <FactCheck />, color: "#F59E0B" }
              ].map((item, i) => (
                <Grid item size={{ xs: 12, md: 4 }} key={i}>
                  <Paper sx={{ p: 3, borderRadius: 5, border: '1px solid #E2E8F0', height: '100%' }}>
                    <Avatar sx={{ bgcolor: `${item.color}15`, color: item.color, mb: 2 }}>{item.icon}</Avatar>
                    <Typography variant="subtitle1" fontWeight={800} gutterBottom>{item.title}</Typography>
                    <Typography variant="caption" color="#64748B" sx={{ lineHeight: 1.5 }}>{item.desc}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </DocSection>

          {/* NEW SECTION: WORKFLOW ENGINE */}
          <DocSection id="workflow" title="⚙️ Workflow Engine" badge="State Machine">
            <Typography variant="body2" color="#64748B" sx={{ mb: 4 }}>
              The ticket lifecycle follows a rigid state machine to ensure accountability and track SLAs.
            </Typography>
            <Paper variant="outlined" sx={{ p: 4, borderRadius: 6, bgcolor: '#FFFFFF' }}>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center" justifyContent="space-between">
                <WorkflowStep label="Draft" icon={<Description />} color="#94A3B8" />
                <SyncAlt sx={{ color: '#E2E8F0', display: { xs: 'none', md: 'block' } }} />
                <WorkflowStep label="Assigned" icon={<AssignmentInd />} color="#6366F1" active />
                <SyncAlt sx={{ color: '#E2E8F0', display: { xs: 'none', md: 'block' } }} />
                <WorkflowStep label="In Progress" icon={<SyncAlt />} color="#3B82F6" />
                <SyncAlt sx={{ color: '#E2E8F0', display: { xs: 'none', md: 'block' } }} />
                <WorkflowStep label="Resolved" icon={<CheckCircleOutline />} color="#10B981" />
              </Stack>
              <Divider sx={{ my: 4 }} />
              <Typography variant="subtitle2" fontWeight={800} gutterBottom>Technical Note on Assignment:</Typography>
              <Typography variant="body2" color="#475569">
                Tickets are routed based on <strong>Department Personnel Mapping</strong>. When a Requestor selects an 'Asset Type', the system queries the <code>stmx_technician_mapping</code> table to find the appropriate handler for that specific department.
              </Typography>
            </Paper>
          </DocSection>

          {/* NEW SECTION: TECHNICAL STACK */}
          <DocSection id="stack" title="💻 Technical Stack" badge="Full Stack">
            <Grid container spacing={3}>
              <Grid item size={{ xs: 12, md: 6 }}>
                <Paper variant="outlined" sx={{ p: 3, borderRadius: 5 }}>
                  <Typography variant="h6" fontWeight={800} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Hub sx={{ color: '#6366F1' }} /> Frontend
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ gap: 1 }}>
                    {['React.js',  'Material UI (MUI)', 'React-Hook-Form'].map(s => (
                      <Chip key={s} label={s} variant="outlined" sx={{ fontWeight: 600 }} />
                    ))}
                  </Stack>
                </Paper>
              </Grid>
              <Grid item size={{ xs: 12, md: 6 }}>
                <Paper variant="outlined" sx={{ p: 3, borderRadius: 5 }}>
                  <Typography variant="h6" fontWeight={800} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Dns sx={{ color: '#10B981' }} /> Backend & DB
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ gap: 1 }}>
                    {['Node.js', 'Express', 'MySQL', 'Bcrypt', 'Zod Validator', 'JWT'].map(s => (
                      <Chip key={s} label={s} variant="outlined" sx={{ fontWeight: 600 }} />
                    ))}
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </DocSection>

          {/* SECTION: ARCHITECTURE */}
          <DocSection id="modules" title="🏗️ System Architecture" badge="Modular Design">
            <Grid container spacing={4}>
              <Grid item size={{ xs: 12, md: 6 }}>
                <ModuleCard 
                  title="Master Configuration" 
                  color="#6366F1" 
                  items={[
                    { t: "Status & Priority Engine", icon: <SettingsSuggest /> },
                    { t: "Department Topology", icon: <Business /> },
                    { t: "Asset & Type Config", icon: <Category /> },
                    { t: "RBAC & User Mapping", icon: <VerifiedUser /> }
                  ]} 
                />
              </Grid>
              <Grid item size={{ xs: 12, md: 6 }}>
                <ModuleCard 
                  title="Operation & Logic" 
                  color="#10B981" 
                  items={[
                    { t: "Service Request Core", icon: <Layers /> },
                    { t: "Intelligent Assignment", icon: <AssignmentInd /> },
                    { t: "Role-based Dashboards", icon: <AdminPanelSettings /> },
                    { t: "Real-time Messaging", icon: <People /> }
                  ]} 
                />
              </Grid>
            </Grid>
          </DocSection>

        </Container>
      </Box>
    </Box>
  );
};

// --- Custom Helper Components ---

const WorkflowStep = ({ label, icon, color, active }) => (
  <Stack alignItems="center" sx={{ opacity: active ? 1 : 0.6 }}>
    <Avatar sx={{ 
      bgcolor: active ? color : '#F1F5F9', 
      color: active ? '#FFF' : '#94A3B8',
      width: 50, height: 50, mb: 1,
      border: active ? `4px solid ${color}30` : 'none'
    }}>
      {icon}
    </Avatar>
    <Typography variant="caption" fontWeight={800} color={active ? '#1E293B' : '#94A3B8'}>{label}</Typography>
  </Stack>
);

const DocSection = ({ id, title, badge, children }) => (
  <Box id={id} sx={{ mb: 12 }}>
    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
      <Typography variant="h4" fontWeight={900} sx={{ color: '#0F172A', letterSpacing: '-1px' }}>{title}</Typography>
      {badge && <Chip label={badge} size="small" sx={{ bgcolor: '#EEF2FF', color: '#4F46E5', fontWeight: 800, px: 1, borderRadius: '6px' }} />}
    </Stack>
    {children}
  </Box>
);

const ModuleCard = ({ title, color, items }) => (
  <Paper elevation={0} sx={{ p: 3, height: '100%', borderRadius: 6, border: `1px solid ${color}20`, bgcolor: '#FFFFFF' }}>
    <Typography variant="subtitle1" fontWeight={900} color={color} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
      <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: color }} /> {title}
    </Typography>
    <Stack spacing={2}>
      {items.map((item, i) => (
        <Stack key={i} direction="row" spacing={2} alignItems="center">
          <Box sx={{ color: color, display: 'flex', opacity: 0.8 }}>{item.icon}</Box>
          <Typography variant="body2" fontWeight={700} color="#475569">{item.t}</Typography>
        </Stack>
      ))}
    </Stack>
  </Paper>
);

export default Docs;