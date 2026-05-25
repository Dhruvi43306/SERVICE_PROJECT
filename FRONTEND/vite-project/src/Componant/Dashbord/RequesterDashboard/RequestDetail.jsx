// import React, { useState, useEffect } from 'react';
// import {
//   Box, Typography, Stack, Container, Avatar,
//   IconButton, Fade, Chip, Grid, Button, Paper, 
//   Divider, LinearProgress, List, ListItem, ListItemIcon, ListItemText
// } from '@mui/material';
// import {
//   Memory, Speed, AutoAwesome, Close, VerifiedUser,
//   Fingerprint, ArrowForwardIos, NotificationsNone, 
//   Hub, GppGood, Biotech, Shield,
//   CheckCircleOutline, Psychology, Radar, Description,
//   AssignmentInd, AlternateEmail
// } from '@mui/icons-material';

// const RequestDetail = () => {
//   const [activeReq, setActiveReq] = useState(null);
//   const [isScanning, setIsScanning] = useState(false);

//   const listrequest = [
//     { 
//       id: 1, 
//       title: "Neural Network Scaling", 
//       desc: "Upgrading the current transformer model from 7B to 70B parameters to handle increased throughput for the Q3 linguistic analysis project. This requires horizontal scaling across 4 additional GPU nodes.",
//       dept: "AI Labs", 
//       time: "12m ago", 
//       user: "Alex Rivera", 
//       email: "a.rivera@corp.ai",
//       role: "Sr. Research Lead", 
//       code: "PROV-882", 
//       color: '#6366f1', 
//       icon: <Biotech /> 
//     },
//     { 
//       id: 2, 
//       title: "L3 Firewall Rule Update", 
//       desc: "Updating ingress/egress rules for the production DMZ. This change whitelist's the new Singapore data center IP range (192.168.1.0/24) for encrypted tunnel communication.",
//       dept: "CyberSec", 
//       time: "1h ago", 
//       user: "Sarah Kong", 
//       email: "s.kong@security.net",
//       role: "Security Architect", 
//       code: "SEC-401", 
//       color: '#f43f5e', 
//       icon: <GppGood /> 
//     },
//     { 
//       id: 3, 
//       title: "Asset Procurement: M3 Max", 
//       desc: "Emergency hardware replacement for the lead developer in the DevOps team. Current machine is suffering from thermal throttling during container builds.",
//       dept: "Logistics", 
//       time: "3h ago", 
//       user: "John Doe", 
//       email: "j.doe@logistics.co",
//       role: "Ops Manager", 
//       code: "OPS-112", 
//       color: '#10b981', 
//       icon: <Hub /> 
//     },
//   ];

//   useEffect(() => {
//     if (activeReq) {
//       setIsScanning(true);
//       const timer = setTimeout(() => setIsScanning(false), 1200);
//       return () => clearTimeout(timer);
//     }
//   }, [activeReq]);

//   // Main Return
//   return (
//     <Box sx={{ 
//       bgcolor: !activeReq ? '#F8FAFC' : `${activeReq.color}05`,
//       minHeight: '100vh', 
//       fontFamily: '"Plus Jakarta Sans", sans-serif',
//       p: { xs: 2, md: 6 },
//       transition: 'background-color 0.5s ease',
//       display: 'flex', justifyContent: 'center'
//     }}>
      
//       {!activeReq ? (
//         <Container maxWidth="sm" sx={{ mt: 8 }}>
//           <Box sx={{ mb: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Box>
//               <Typography variant="h4" sx={{ fontWeight: 800, color: '#1E293B', letterSpacing: '-1.5px' }}>
//                 System Requests
//               </Typography>
//               <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 600 }}>
//                 {listrequest.length} PENDING DOCUMENTATION
//               </Typography>
//             </Box>
//             <IconButton sx={{ bgcolor: '#FFF', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', '&:hover': { bgcolor: '#F1F5F9'} }}>
//                <NotificationsNone />
//             </IconButton>
//           </Box>

//           <Stack spacing={2}>
//             {listrequest.map((req, index) => (
//               <Fade in timeout={300 + (index * 100)} key={req.id}>
//                 <Paper 
//                   elevation={0}
//                   onClick={() => setActiveReq(req)}
//                   sx={{ 
//                     p: 3, borderRadius: '24px', bgcolor: '#FFFFFF', border: '1px solid #F1F5F9',
//                     cursor: 'pointer', transition: '0.3s', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//                     '&:hover': { transform: 'translateY(-4px)', boxShadow: `0 15px 30px ${req.color}15`, borderColor: req.color }
//                   }}
//                 >
//                   <Stack direction="row" spacing={2.5} alignItems="center">
//                     <Avatar sx={{ bgcolor: `${req.color}15`, color: req.color, width: 50, height: 50, borderRadius: '14px' }}>
//                       {req.icon}
//                     </Avatar>
//                     <Box>
//                       <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>{req.title}</Typography>
//                       <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 700 }}>{req.code} • {req.dept}</Typography>
//                     </Box>
//                   </Stack>
//                   <ArrowForwardIos sx={{ fontSize: 14, color: '#CBD5E1' }} />
//                 </Paper>
//               </Fade>
//             ))}
//           </Stack>
//         </Container>
//       ) : (
//         <Fade in={true}>
//           <Container maxWidth="lg">
//             {/* Nav Header */}
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 5 }}>
//               <Box>
//                 <Button 
//                     onClick={() => setActiveReq(null)}
//                     startIcon={<Close />}
//                     sx={{ mb: 2, borderRadius: '12px', bgcolor: '#FFF', color: '#1E293B', fontWeight: 800, boxShadow: '0 4px 12px rgba(0,0,0,0.03)', px: 2 }}
//                 >
//                     Close Record
//                 </Button>
//                 <Typography variant="caption" display="block" sx={{ color: activeReq.color, fontWeight: 900, letterSpacing: '2px', textTransform: 'uppercase' }}>
//                     Archive / {activeReq.code}
//                 </Typography>
//                 <Typography variant="h3" sx={{ fontWeight: 900, color: '#0F172A', letterSpacing: '-2px', mt: 1 }}>
//                     {activeReq.title}
//                 </Typography>
//               </Box>
              
//               <Stack direction="column" spacing={1} alignItems="flex-end">
//                 <Chip icon={<Fingerprint />} label={activeReq.code} sx={{ fontWeight: 800, bgcolor: '#FFF', border: '1px solid #E2E8F0' }} />
//                 <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Log Date: {activeReq.time}</Typography>
//               </Stack>
//             </Box>

//             <Grid container spacing={4}>
//               {/* Left Column */}
//               <Grid size={{ xs: 12, md: 8 }}>
//                 <Stack spacing={4}>
//                   <Paper sx={{ p: 4, borderRadius: '32px', border: '1px solid #F1F5F9', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
//                     <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2.5 }}>
//                         <Description sx={{ color: activeReq.color }} />
//                         <Typography variant="h6" sx={{ fontWeight: 800 }}>Description</Typography>
//                     </Stack>
//                     <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.8 }}>
//                         {activeReq.desc}
//                     </Typography>
//                   </Paper>

//                   <Grid container spacing={2}>
//                     {[
//                       { label: 'Security Class', val: 'Proprietary', icon: <VerifiedUser /> },
//                       { label: 'Integrity', val: 'Verified', icon: <Radar /> },
//                       { label: 'System Delta', val: '+4.2%', icon: <Speed /> },
//                     ].map((m, i) => (
//                       <Grid size={{ xs: 4 }} key={i}>
//                         <Paper sx={{ p: 2.5, borderRadius: '24px', textAlign: 'center', border: '1px solid #F1F5F9' }}>
//                           <Box sx={{ color: activeReq.color, mb: 1 }}>{m.icon}</Box>
//                           <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{m.val}</Typography>
//                           <Typography variant="caption" sx={{ color: '#94A3B8' }}>{m.label}</Typography>
//                         </Paper>
//                       </Grid>
//                     ))}
//                   </Grid>

//                   <Paper sx={{ p: 4, borderRadius: '32px', bgcolor: '#0F172A', color: '#FFF', overflow: 'hidden' }}>
//                     <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
//                         <Stack direction="row" spacing={1.5} alignItems="center">
//                             <Avatar sx={{ bgcolor: activeReq.color, color: '#FFF' }}><Psychology /></Avatar>
//                             <Typography variant="h6" sx={{ fontWeight: 800 }}>AI Analysis Engine</Typography>
//                         </Stack>
//                         <Chip label={isScanning ? "PROCESSING" : "READY"} size="small" sx={{ bgcolor: isScanning ? '#334155' : activeReq.color, color: '#FFF', fontWeight: 900 }} />
//                     </Stack>
                    
//                     {isScanning ? (
//                         <Box sx={{ py: 4 }}>
//                             <LinearProgress sx={{ height: 4, borderRadius: 2, bgcolor: '#1E293B', '& .MuiLinearProgress-bar': { bgcolor: activeReq.color } }} />
//                             <Typography variant="caption" sx={{ mt: 2, display: 'block', color: '#94A3B8' }}>Scanning request metadata against policy framework...</Typography>
//                         </Box>
//                     ) : (
//                         <Grid container spacing={3}>
//                             <Grid size={{ xs: 12, sm: 7 }}>
//                                 <Typography variant="body2" sx={{ color: '#94A3B8', mb: 3, lineHeight: 1.6 }}>
//                                     Neural analysis suggests this request is a **{activeReq.dept} Routine Operation**. 
//                                     Identity has been confirmed via biometric token hash. No escalation required.
//                                 </Typography>
//                                 <Stack direction="row" spacing={3}>
//                                     <Box>
//                                         <Typography variant="h6" sx={{ color: activeReq.color, fontWeight: 900 }}>LOW</Typography>
//                                         <Typography variant="caption" sx={{ color: '#64748B' }}>Threat Level</Typography>
//                                     </Box>
//                                     <Box>
//                                         <Typography variant="h6" sx={{ color: '#10b981', fontWeight: 900 }}>100%</Typography>
//                                         <Typography variant="caption" sx={{ color: '#64748B' }}>Policy Match</Typography>
//                                     </Box>
//                                 </Stack>
//                             </Grid>
//                             <Grid size={{ xs: 12, sm: 5 }}>
//                                 <Box sx={{ p: 2, bgcolor: '#1E293B', borderRadius: '20px', border: '1px solid #334155' }}>
//                                     <Typography variant="caption" sx={{ fontWeight: 900, color: activeReq.color, mb: 1.5, display: 'block' }}>AUTOMATED CHECKS</Typography>
//                                     <Stack spacing={1}>
//                                         {['Signature Valid', 'Quota Check', 'Logic Audit'].map(item => (
//                                             <Stack key={item} direction="row" alignItems="center" spacing={1}>
//                                                 <CheckCircleOutline sx={{ fontSize: 14, color: '#10b981' }} />
//                                                 <Typography variant="caption" sx={{ color: '#CBD5E1' }}>{item}</Typography>
//                                             </Stack>
//                                         ))}
//                                     </Stack>
//                                 </Box>
//                             </Grid>
//                         </Grid>
//                     )}
//                   </Paper>
//                 </Stack>
//               </Grid>

//               <Grid size={{ xs: 12, md: 4 }}>
//                 <Stack spacing={3}>
//                   <Paper sx={{ p: 3.5, borderRadius: '32px', border: '1px solid #F1F5F9' }}>
//                     <Typography variant="overline" sx={{ fontWeight: 900, color: '#94A3B8' }}>Request Originator</Typography>
//                     <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2.5, mb: 3 }}>
//                         <Avatar sx={{ width: 64, height: 64, border: `3px solid ${activeReq.color}20` }} src={`https://i.pravatar.cc/150?u=${activeReq.id}`} />
//                         <Box>
//                             <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>{activeReq.user}</Typography>
//                             <Typography variant="body2" sx={{ color: '#64748B', fontSize: '0.85rem' }}>{activeReq.role}</Typography>
//                         </Box>
//                     </Stack>
                    
//                     <Divider sx={{ my: 2, borderStyle: 'dashed' }} />
                    
//                     <List disablePadding>
//                         <ListItem disableGutters>
//                             <ListItemIcon sx={{ minWidth: 36, color: activeReq.color }}><AlternateEmail fontSize="small" /></ListItemIcon>
//                             <ListItemText primary="Email" secondary={activeReq.email} primaryTypographyProps={{ variant: 'caption', fontWeight: 800 }} secondaryTypographyProps={{ variant: 'body2' }} />
//                         </ListItem>
//                         <ListItem disableGutters>
//                             <ListItemIcon sx={{ minWidth: 36, color: activeReq.color }}><AssignmentInd fontSize="small" /></ListItemIcon>
//                             <ListItemText primary="Department" secondary={activeReq.dept} primaryTypographyProps={{ variant: 'caption', fontWeight: 800 }} secondaryTypographyProps={{ variant: 'body2' }} />
//                         </ListItem>
//                     </List>
//                   </Paper>

//                   <Paper sx={{ p: 3.5, borderRadius: '32px', border: '1px solid #F1F5F9', bgcolor: '#F8FAFC' }}>
//                     <Typography variant="overline" sx={{ fontWeight: 900, color: '#94A3B8' }}>Metadata</Typography>
//                     <Stack spacing={2.5} sx={{ mt: 2 }}>
//                         <Box>
//                             <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700 }}>SYSTEM TOKEN</Typography>
//                             <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 700, bgcolor: '#FFF', p: 1, mt: 0.5, borderRadius: '8px', border: '1px solid #E2E8F0' }}>
//                                 {activeReq.code}_VERIFIED_2026
//                             </Typography>
//                         </Box>
//                         <Box>
//                             <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700 }}>COMPLIANCE SCORE</Typography>
//                             <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
//                                 <Shield sx={{ color: '#10b981', mr: 1, fontSize: 18 }} />
//                                 <Typography variant="body2" sx={{ fontWeight: 800 }}>High Trust Tier</Typography>
//                             </Box>
//                         </Box>
//                     </Stack>
//                   </Paper>
//                 </Stack>
//               </Grid>
//             </Grid>
//           </Container>
//         </Fade>
//       )}
//     </Box>
//   );
// };

// export default RequestDetail;