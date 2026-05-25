import React from 'react';
import { 
  Box, Grid, Typography, Avatar, 
  Paper, Stack, Divider, 
  IconButton, Container, Button 
} from '@mui/material';
import { 
  MailRounded, 
  LocalLibraryRounded, 
  PhonelinkSetupRounded, 
  ExploreRounded, 
  EastRounded, 
  VerifiedUserRounded, 
  AutoAwesome 
} from '@mui/icons-material';

const RequestorHistory = () => {
  const user = {
    name: "Dr. Sarah Jenkins",
    role: "Senior HOD • CS",
    dept: "School of Engineering",
    email: "s.jenkins@university.edu",
    phone: "+91 9000 1122 33",
    total: 14
  };

  const activity = [
    { 
      id: "REQ-9901", 
      title: "High-Performance Computing Node", 
      status: "Approved", 
      date: "09 Feb 2026", 
      priority: "Critical",
      desc: "Request for dedicated GPU cluster access for the AI Research Lab. Budget pre-cleared by the research committee." 
    },
    { 
      id: "REQ-8840", 
      title: "Lab 4 Inventory Audit", 
      status: "Rejected", 
      date: "05 Feb 2026", 
      priority: "Standard",
      desc: "Annual hardware replacement request. Denied due to current inventory lifecycle still being within valid usage period." 
    }
  ];

  return (
    <Box className="ins-root">
      <Container maxWidth="lg">
        <Grid container spacing={8}>
          
          {/* PROFILE SIDEBAR (Soft Champagne Theme) */}
          <Grid size={{ xs: 12, md: 4.5 }}>
            <Paper className="ins-profile-side" elevation={0}>
              <Box className="ins-avatar-wrapper">
                <Avatar sx={{ width: 100, height: 100, bgcolor: '#fff', color: '#d2b496', fontSize: '2.5rem', fontWeight: 900 }}>SJ</Avatar>
              </Box>
              
              <Typography variant="h4" sx={{ fontWeight: 900, color: '#2d2d2d', mb: 1 }}>{user.name}</Typography>
              <Typography sx={{ color: '#d2b496', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: 2, mb: 5 }}>{user.role}</Typography>

              <Stack spacing={4} sx={{ textAlign: 'left' }}>
                <SidebarItem icon={<LocalLibraryRounded />} label="Faculty" value={user.dept} />
                <SidebarItem icon={<MailRounded />} label="Official Email" value={user.email} />
                <SidebarItem icon={<PhonelinkSetupRounded />} label="Direct Line" value={user.phone} />
              </Stack>

              <Box sx={{ mt: 8, p: 4, borderRadius: '35px', background: '#2d2d2d', color: '#fff', textAlign: 'left' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography sx={{ fontSize: '2rem', fontWeight: 900 }}>{user.total}</Typography>
                    <Typography sx={{ fontSize: '0.6rem', fontWeight: 700, opacity: 0.6, textTransform: 'uppercase', letterSpacing: 1.5 }}>Requests Total</Typography>
                  </Box>
                  <AutoAwesome sx={{ color: '#d2b496' }} />
                </Stack>
              </Box>
            </Paper>
          </Grid>

          {/* HISTORY FEED (Ice White Theme) */}
          <Grid size={{ xs: 12, md: 7.5 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ mb: 6 }}>
              <Box>
                <Typography variant="h3" sx={{ fontWeight: 900, color: '#1a1a1a', letterSpacing: '-1.5px' }}>Intelligence Feed</Typography>
                <Typography variant="body1" sx={{ color: '#b0b8c4', fontWeight: 600 }}>Track all historical interactions and audits</Typography>
              </Box>
              <IconButton sx={{ bgcolor: '#f8fafc', p: 2 }}><ExploreRounded sx={{color: '#2d2d2d'}}/></IconButton>
            </Stack>

            {activity.map((item) => (
              <Paper key={item.id} className="ins-history-card" elevation={0}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                  <span className="ins-meta-label">{item.id} • {item.date}</span>
                  <span className={`ins-pill ${item.status === 'Approved' ? 'pill-success' : 'pill-error'}`}>
                    {item.status}
                  </span>
                </Stack>

                <Typography variant="h5" sx={{ fontWeight: 800, color: '#1a1a1a', mb: 2 }}>{item.title}</Typography>
                <Typography className="ins-paragraph">{item.desc}</Typography>

                <Divider sx={{ my: 4, opacity: 0.3 }} />

                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Stack direction="row" spacing={5}>
                    <Box>
                      <Typography className="ins-meta-label">Priority</Typography>
                      <Typography sx={{ fontWeight: 800, color: item.priority === 'Critical' ? '#e11d48' : '#1a1a1a', fontSize: '0.9rem' }}>{item.priority}</Typography>
                    </Box>
                    <Box>
                      <Typography className="ins-meta-label">Audit Log</Typography>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <VerifiedUserRounded sx={{ color: '#2d9d63', fontSize: 16 }} />
                        <Typography sx={{ fontWeight: 800, fontSize: '0.8rem', color: '#1a1a1a' }}>Verified</Typography>
                      </Stack>
                    </Box>
                  </Stack>

                  <Button 
                    className="ins-action-btn"
                    endIcon={<EastRounded />}
                    sx={{ textTransform: 'none', fontWeight: 900, color: '#1a1a1a', borderRadius: '15px', px: 3 }}
                  >
                    View Summary
                  </Button>
                </Stack>
              </Paper>
            ))}
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

// Helper: Sidebar Rows
const SidebarItem = ({ icon, label, value }) => (
  <Stack direction="row" spacing={3} alignItems="center">
    <Box sx={{ color: '#d2b496', bgcolor: '#fff', p: 1.5, borderRadius: '18px', display: 'flex', boxShadow: '0 8px 15px rgba(210,180,150,0.1)' }}>{icon}</Box>
    <Box>
      <Typography className="ins-meta-label">{label}</Typography>
      <Typography className="ins-main-text">{value}</Typography>
    </Box>
  </Stack>
);

export default RequestorHistory;