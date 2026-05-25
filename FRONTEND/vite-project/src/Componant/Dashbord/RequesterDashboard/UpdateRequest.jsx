// import React from "react";
// import {
//   Box, Typography, Button, Grid, Paper, Stack, TextField, 
//   MenuItem, Select, FormControl, InputLabel, Divider, IconButton, Tooltip
// } from "@mui/material";
// import {
//   Save, Close, History, HelpOutline, 
//   CloudUpload, Update, WarningAmber, ArrowBack
// } from "@mui/icons-material";


// function UpdateRequest() {
//   return (
//     <Box className="edit-page-container">
//       {/* HEADER SECTION */}
//       <Box className="edit-header">
//         <Stack direction="row" alignItems="center" spacing={2}>
//           <IconButton className="back-btn"><ArrowBack /></IconButton>
//           <Box>
//             <Typography variant="caption" className="edit-breadcrumb">
//               TICKETS / #SR-4018 / EDIT
//             </Typography>
//             <Typography variant="h4" className="edit-title">
//               Modify Service Request
//             </Typography>
//           </Box>
//         </Stack>
//         <Stack direction="row" spacing={2}>
//           <Button variant="outlined" className="edit-btn-cancel" startIcon={<Close />}>
//             Discard Changes
//           </Button>
//           <Button variant="contained" className="edit-btn-save" startIcon={<Save />}>
//             Save & Notify Tech
//           </Button>
//         </Stack>
//       </Box>

//       <Grid container spacing={3}>
//         {/* MAIN EDITING FORM */}
//         <Grid size={{ xs: 12, md: 8 }}>
//           <Paper className="edit-main-paper" elevation={0}>
//             <Box className="edit-warning-banner">
//               <WarningAmber sx={{ color: '#b45309', mr: 1.5 }} />
//               <Typography variant="body2" sx={{ color: '#b45309', fontWeight: 500 }}>
//                 Editing critical fields may reset the response SLA timer.
//               </Typography>
//             </Box>

//             <Stack spacing={4} sx={{ mt: 3 }}>
//               {/* Request Subject */}
//               <Box>
//                 <Typography className="edit-field-label">Request Subject</Typography>
//                 <TextField 
//                   fullWidth 
//                   defaultValue="Enterprise Email Sync Error - Office 365"
//                   className="edit-edit-input"
//                 />
//               </Box>

//               {/* Category & Priority Grid */}
//               <Grid container spacing={2}>
//                 <Grid size={{ xs: 12, sm:6 }}>
//                   <Typography className="edit-field-label">Category</Typography>
//                   <FormControl fullWidth className="edit-input">
//                     <Select defaultValue={10}>
//                       <MenuItem value={10}>Enterprise Email Sync</MenuItem>
//                       <MenuItem value={20}>Network Access</MenuItem>
//                       <MenuItem value={30}>Hardware Request</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 <Grid size={{ xs: 12, sm:6 }}>
//                   <Typography className="edit-field-label">Urgency Level</Typography>
//                   <FormControl fullWidth className="edit-input">
//                     <Select defaultValue="high">
//                       <MenuItem value="low">Low - General Inquiry</MenuItem>
//                       <MenuItem value="med">Medium - Impacting Work</MenuItem>
//                       <MenuItem value="high">High - Critical Blocker</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Grid>
//               </Grid>

//               {/* Detailed Description */}
//               <Box>
//                 <Typography className="edit-field-label">Detailed Description</Typography>
//                 <TextField 
//                   fullWidth 
//                   multiline 
//                   rows={8}
//                   defaultValue="I am unable to sync my Outlook folders since the Tuesday update. It affects both my mobile and desktop clients..."
//                   className="edit-input"
//                 />
//               </Box>

//               <Divider />

//               {/* Reason for change (Mandatory for Edits) */}
//               <Box className="edit-reason-box">
//                 <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
//                   <Update sx={{ color: '#6366f1', fontSize: 20 }} />
//                   <Typography className="field-label" sx={{ mb: 0 }}>Reason for this Edit</Typography>
//                 </Stack>
//                 <TextField 
//                   fullWidth 
//                   placeholder="Explain why you are modifying this request (e.g., issue got worse, found new info)..."
//                   multiline
//                   rows={2}
//                   variant="filled"
//                   className="reason-input"
//                 />
//               </Box>
//             </Stack>
//           </Paper>
//         </Grid>

//         {/* SIDEBAR: CONTEXT & HISTORY */}
//         <Grid size={{ xs: 12, md:4 }}>
//           <Stack spacing={3}>
//             {/* Attachment Section */}
//             <Paper className="edit-side-card" elevation={0}>
//               <Typography className="edit-side-card-title">Attachments</Typography>
//               <Box className="edit-dropzone-small">
//                 <CloudUpload sx={{ color: '#94a3b8', mb: 1 }} />
//                 <Typography variant="caption" display="block">Add logs or screenshots</Typography>
//                 <Button size="small" sx={{ textTransform: 'none', mt: 1 }}>Upload File</Button>
//               </Box>
//             </Paper>

//             {/* Audit/History Feed */}
//             <Paper className="edit-side-card" elevation={0}>
//               <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
//                 <Typography className="edit-side-card-title">Revision History</Typography>
//                 <History sx={{ color: '#94a3b8', fontSize: 18 }} />
//               </Stack>
              
//               <Box className="edit-history-timeline">
//                 <HistoryItem 
//                   time="Today, 10:45 AM" 
//                   user="You" 
//                   action="Created Request" 
//                 />
//                 <HistoryItem 
//                   time="Today, 11:15 AM" 
//                   user="Arjun S." 
//                   action="Changed status to 'In Progress'" 
//                 />
//               </Box>
//             </Paper>

//             <Button fullWidth variant="text" sx={{ color: '#64748b', fontSize: 12 }}>
//               Need help? Contact IT Support
//             </Button>
//           </Stack>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }

// const HistoryItem = ({ time, user, action }) => (
//   <Box sx={{ mb: 2, borderLeft: '2px solid #e2e8f0', pl: 2, position: 'relative' }}>
//     <Box className="edit-timeline-dot" />
//     <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>{time}</Typography>
//     <Typography variant="body2" sx={{ fontWeight: 500, color: '#1e293b' }}>
//       <span style={{ color: '#6366f1' }}>{user}</span> {action}
//     </Typography>
//   </Box>
// );

// export default UpdateRequest;