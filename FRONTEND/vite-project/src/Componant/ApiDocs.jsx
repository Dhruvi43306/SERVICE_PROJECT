import React, { useState } from 'react';
import {
  Box, Typography, Paper, List, ListItemButton, ListItemText,
  Chip, Grid, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Container, styled, alpha, Divider,
  IconButton, Tooltip, Drawer
} from '@mui/material';
import {
  Storage, Code, Layers, Settings, Description, 
  Security, Dashboard, Menu, ChevronLeft, ChevronRight
} from '@mui/icons-material';

// --- Custom Styled Components ---
const SidebarContainer = styled(Box, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: open ? 320 : 0,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(20px)',
  borderRight: open ? `1px solid ${theme.palette.divider}` : 'none',
  height: '100vh',
  position: 'sticky',
  top: 0,
  overflowY: 'auto',
  overflowX: 'hidden',
  zIndex: 1100,
}));

const CodePanel = styled(Paper)(({ theme }) => ({
  backgroundColor: '#0f172a',
  color: '#e2e8f0',
  borderRadius: '24px',
  padding: theme.spacing(4),
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
  position: 'sticky',
  top: '24px',
}));

// --- Comprehensive Data from 8_Service_Request.docx ---
const FULL_SCHEMA = [
  {
    name: "ServiceRequestStatus",
    type: "Master",
    purpose: "Defines statuses like Pending, In Progress, Completed, and Closed.",
    columns: [
      { name: "ServiceRequestStatusID", type: "int", null: "NO" },
      { name: "ServiceRequestStatusName", type: "varchar(250)", null: "NO" },
      { name: "ServiceRequestStatusSystemName", type: "varchar(100)", null: "NO" },
      { name: "Sequence", type: "decimal", null: "YES" },
      { name: "Description", type: "varchar(250)", null: "YES" },
      { name: "UserID", type: "int", null: "NO" },
      { name: "Created", type: "datetime", null: "NO" },
      { name: "Modified", type: "datetime", null: "NO" },
      { name: "ServiceRequestStatusCssClass", type: "varchar(250)", null: "YES" },
      { name: "IsOpen", type: "bit", null: "YES" },
      { name: "IsNoFurtherActionRequired", type: "bit", null: "YES" },
      { name: "IsAllowedForTechnician", type: "bit", null: "YES" }
    ]
  },
  {
    name: "ServiceDept",
    type: "Master",
    purpose: "Manages departments responsible for handling requests (IT, Maintenance, etc.).",
    columns: [
      { name: "ServiceDeptID", type: "int", null: "NO" },
      { name: "ServiceDeptName", type: "varchar(250)", null: "NO" },
      { name: "CampusID", type: "int", null: "NO" },
      { name: "Description", type: "varchar(250)", null: "YES" },
      { name: "UserID", type: "int", null: "NO" },
      { name: "Created", type: "datetime", null: "NO" },
      { name: "Modified", type: "datetime", null: "NO" },
      { name: "CCEmailToCSV", type: "varchar(250)", null: "YES" },
      { name: "IsRequestTitleDisable", type: "bit", null: "YES" }
    ]
  },
  {
    name: "ServiceDeptPerson",
    type: "Master",
    purpose: "Maps staff to departments with roles like Technician or HOD[cite: 1].",
    columns: [
      { name: "ServiceDeptPersonID", type: "int", null: "NO" },
      { name: "ServiceDeptID", type: "int", null: "NO" },
      { name: "StaffID", type: "int", null: "NO" },
      { name: "FromDate", type: "datetime", null: "NO" },
      { name: "ToDate", type: "datetime", null: "YES" },
      { name: "Description", type: "varchar(250)", null: "YES" },
      { name: "UserID", type: "int", null: "NO" },
      { name: "Created", type: "datetime", null: "NO" },
      { name: "Modified", type: "datetime", null: "NO" },
      { name: "IsHODStaff", type: "bit", null: "YES" }
    ]
  },
  {
    name: "ServiceType",
    type: "Master",
    purpose: "Broad categories like Technical, Facility, or Administrative[cite: 1].",
    columns: [
      { name: "ServiceTypeID", type: "int", null: "NO" },
      { name: "ServiceTypeName", type: "varchar(250)", null: "NO" },
      { name: "Description", type: "varchar(250)", null: "YES" },
      { name: "Sequence", type: "decimal", null: "YES" },
      { name: "UserID", type: "int", null: "NO" },
      { name: "Created", type: "datetime", null: "NO" },
      { name: "Modified", type: "datetime", null: "NO" },
      { name: "IsForStaff", type: "bit", null: "YES" },
      { name: "IsForStudent", type: "bit", null: "YES" }
    ]
  },
  {
    name: "ServiceRequestType",
    type: "Master",
    purpose: "Specific request types like Computer Issue or AC Repair[cite: 1].",
    columns: [
      { name: "ServiceRequestTypeID", type: "int", null: "NO" },
      { name: "ServiceTypeID", type: "int", null: "NO" },
      { name: "ServiceDeptID", type: "int", null: "NO" },
      { name: "ServiceRequestTypeName", type: "varchar(250)", null: "NO" },
      { name: "Description", type: "varchar(250)", null: "YES" },
      { name: "Sequence", type: "decimal", null: "YES" },
      { name: "UserID", type: "int", null: "NO" },
      { name: "Created", type: "datetime", null: "NO" },
      { name: "Modified", type: "datetime", null: "NO" },
      { name: "RequestTotal", type: "int", null: "NO" },
      { name: "RequestPending", type: "int", null: "NO" },
      { name: "RequestClosed", type: "int", null: "NO" },
      { name: "RequestCancelled", type: "int", null: "NO" },
      { name: "IsVisibleResource", type: "bit", null: "YES" },
      { name: "DefaultPriorityLevel", type: "varchar(50)", null: "YES" },
      { name: "ReminderDaysAfterAssignment", type: "int", null: "YES" },
      { name: "IsMandatoryResource", type: "bit", null: "YES" }
    ]
  },
  {
    name: "ServiceRequestTypeWisePerson",
    type: "Master",
    purpose: "Maps specific request types to personnel for assignment/escalation[cite: 1].",
    columns: [
      { name: "ServiceRequestTypeWisePersonID", type: "int", null: "NO" },
      { name: "ServiceRequestTypeID", type: "int", null: "NO" },
      { name: "StaffID", type: "int", null: "NO" },
      { name: "FromDate", type: "datetime", null: "NO" },
      { name: "ToDate", type: "datetime", null: "YES" },
      { name: "Description", type: "varchar(250)", null: "YES" },
      { name: "UserID", type: "int", null: "NO" },
      { name: "Created", type: "datetime", null: "NO" },
      { name: "Modified", type: "datetime", null: "NO" }
    ]
  },
  {
    name: "ServiceRequest",
    type: "Routine",
    purpose: "Holds actual service requests raised by users with full lifecycle data[cite: 1].",
    columns: [
      { name: "ServiceRequestID", type: "int", null: "NO" },
      { name: "ServiceRequestNo", type: "varchar(500)", null: "NO" },
      { name: "ServiceRequestDateTime", type: "datetime", null: "NO" },
      { name: "StaffID", type: "int", null: "YES" },
      { name: "ServiceRequestTypeID", type: "int", null: "NO" },
      { name: "ServiceRequestTitle", type: "varchar(250)", null: "NO" },
      { name: "ServiceRequestDescription", type: "varchar(2000)", null: "NO" },
      { name: "AttachmentPath", type: "varchar(250)", null: "YES" },
      { name: "ServiceRequestStatusID", type: "int", null: "NO" },
      { name: "PriorityLevel", type: "varchar(50)", null: "YES" },
      { name: "AssignedToUserID", type: "int", null: "YES" },
      { name: "Created", type: "datetime", null: "NO" }
    ]
  },
  {
    name: "ServiceRequestReply",
    type: "Routine",
    purpose: "Stores communication, updates, and resolutions related to requests[cite: 1].",
    columns: [
      { name: "ServiceRequestReplyID", type: "int", null: "NO" },
      { name: "ServiceRequestID", type: "int", null: "NO" },
      { name: "StaffID", type: "int", null: "YES" },
      { name: "ServiceRequestReplyDateTime", type: "datetime", null: "NO" },
      { name: "ServiceRequestReplyDescription", type: "varchar(250)", null: "NO" },
      { name: "AttachmentPath", type: "varchar(250)", null: "YES" },
      { name: "ServiceRequestStatusID", type: "int", null: "NO" },
      { name: "UserID", type: "int", null: "NO" },
      { name: "Created", type: "datetime", null: "NO" },
      { name: "Modified", type: "datetime", null: "NO" }
    ]
  }
];

const ApiDocs = () => {
  const [selectedTable, setSelectedTable] = useState(FULL_SCHEMA[0]);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f1f5f9' }}>
      
      {/* Dynamic Collapsible Sidebar */}
      <SidebarContainer open={isSidebarOpen}>
        <Box sx={{ p: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 900, color: '#1e293b', display: 'flex', alignItems: 'center', gap: 1 }}>
              <Dashboard sx={{ color: '#3b82f6' }} /> SRMS
            </Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800 }}>API DOCS[cite: 1]</Typography>
          </Box>
          <IconButton onClick={toggleSidebar}>
            <ChevronLeft />
          </IconButton>
        </Box>

        <List sx={{ px: 2 }}>
          {FULL_SCHEMA.map((table) => (
            <ListItemButton
              key={table.name}
              selected={selectedTable.name === table.name}
              onClick={() => setSelectedTable(table)}
              sx={{
                borderRadius: '12px', mb: 0.5,
                '&.Mui-selected': { bgcolor: alpha('#3b82f6', 0.1), color: '#2563eb' }
              }}
            >
              <ListItemText 
                primary={table.name} 
                primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: selectedTable.name === table.name ? 700 : 500 }} 
              />
              {/* <Chip label={table.type[0]} size="small" sx={{ fontSize: '10px', height: 18 }} color={table.type === 'Master' ? 'primary' : 'secondary'} /> */}
            </ListItemButton>
          ))}
        </List>
      </SidebarContainer>

      {/* Toggle Button when sidebar is closed */}
      {!isSidebarOpen && (
        <Tooltip title="Open Menu">
          <IconButton 
            onClick={toggleSidebar} 
            sx={{ position: 'fixed', top: 16, left: 16, bgcolor: 'white', border: '1px solid #e2e8f0', zIndex: 1200 }}
          >
            <Menu />
          </IconButton>
          </Tooltip>
        )}

      {/* Main Content Area */}
      <Container maxWidth="xl" sx={{ py: 8, px: { md: 8 }, transition: 'margin 0.3s ease' }}>
        <Box sx={{ mb: 6 }}>
          <Chip label={selectedTable.type} sx={{ mb: 2, fontWeight: 700 }} color="primary" variant="outlined" />
          <Typography variant="h3" sx={{ fontWeight: 900, color: '#0f172a', mb: 2 }}>{selectedTable.name}</Typography>
          <Typography variant="h6" sx={{ color: '#64748b', fontWeight: 400 }}>{selectedTable.purpose}</Typography>
        </Box>

        <Grid container spacing={5}>
          <Grid size={{ xs: 12, lg: 7 }}>
            <TableContainer component={Paper} sx={{ borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <Box sx={{ p: 3, borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 2 }}>
                <Layers sx={{ color: '#3b82f6' }} />
                <Typography sx={{ fontWeight: 800 }}>Database Column Details</Typography>
              </Box>
              <Table>
                <TableHead sx={{ bgcolor: '#f8fafc' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, color: '#64748b', fontSize: '0.75rem' }}>COLUMN</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#64748b', fontSize: '0.75rem' }}>DATA TYPE</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 700, color: '#64748b', fontSize: '0.75rem' }}>NULLABLE</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedTable.columns.map((col) => (
                    <TableRow key={col.name} hover>
                      <TableCell sx={{ fontFamily: 'monospace', fontWeight: 700, color: '#2563eb' }}>{col.name}</TableCell>
                      <TableCell sx={{ color: '#475569' }}>{col.type}</TableCell>
                      <TableCell align="center">
                        <Chip label={col.null} size="small" sx={{ fontWeight: 800, fontSize: '10px', bgcolor: col.null === 'NO' ? '#fee2e2' : '#f1f5f9', color: col.null === 'NO' ? '#ef4444' : '#94a3b8' }} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid size={{ xs: 12, lg: 5 }}>
            <CodePanel>
              <Typography sx={{ color: '#94a3b8', fontWeight: 800, fontSize: '0.75rem', mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Code fontSize="small" /> ENDPOINT PREVIEW
              </Typography>
              <Box sx={{ p: 2, bgcolor: '#1e293b', borderRadius: '12px', mb: 3 }}>
                <Typography variant="caption" sx={{ color: '#4ade80', fontWeight: 900 }}>GET</Typography>
                <Typography variant="caption" sx={{ color: 'white', ml: 1, fontFamily: 'monospace' }}>/api/v1/{selectedTable.name.toLowerCase()}</Typography>
              </Box>
              <pre style={{ fontSize: '12px', color: '#93c5fd' }}>
{`{
  "status": "success",
  "data": [
    {
      "${selectedTable.columns[0].name}": 1,
      "metadata": "SRMS Live Data"
    }
  ]
}`}
              </pre>
              <Divider sx={{ my: 3, borderColor: '#334155' }} />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Security sx={{ color: '#64748b', fontSize: 18 }} />
                <Typography variant="caption" sx={{ color: '#64748b', fontStyle: 'italic' }}>
                  Restricted to Requestor, HOD, and Technician roles[cite: 1].
                </Typography>
              </Box>
            </CodePanel>
          </Grid>
        </Grid>
      </Container>
    </Box>
    
  );
}

export default ApiDocs;