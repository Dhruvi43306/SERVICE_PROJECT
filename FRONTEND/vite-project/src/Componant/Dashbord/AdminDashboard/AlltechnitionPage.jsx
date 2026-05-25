import React, { useState } from "react";
import { 
  Box, Typography, Grid, Card, CardContent, Avatar, 
  Chip, Divider, InputAdornment, TextField, Stack, IconButton, Badge 
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import EngineeringIcon from '@mui/icons-material/Engineering';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import BoltIcon from '@mui/icons-material/Bolt';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CircleIcon from '@mui/icons-material/Circle';



const AlltechnitionPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const technicians = [
    { id: 1, name: "Alex Rivera", department: "IT", specialty: "Network Security", status: "Available", avatar: "A", theme: "#6366f1" },
    { id: 2, name: "Jordan Smith", department: "IT", specialty: "Hardware Repair", status: "On Task", avatar: "J", theme: "#6366f1" },
    { id: 3, name: "Maria Garcia", department: "Housekeeping", specialty: "Sanitization", status: "Available", avatar: "M", theme: "#ec4899" },
    { id: 4, name: "Steve Chen", department: "Housekeeping", specialty: "Floor Care", status: "Offline", avatar: "S", theme: "#ec4899" },
    { id: 5, name: "Robert Fox", department: "Maintenance", specialty: "HVAC", status: "Available", avatar: "R", theme: "#10b981" },
    { id: 6, name: "Elena Rose", department: "Electrical", specialty: "Wiring", status: "On Task", avatar: "E", theme: "#f59e0b" },
  ];

  const departments = ["IT", "Housekeeping", "Maintenance", "Electrical"];

  const getStatusColor = (status) => {
    switch (status) {
      case "Available": return "#10b981";
      case "On Task": return "#f59e0b";
      default: return "#94a3b8";
    }
  };

  const getDeptIcon = (dept) => {
    const iconStyle = { fontSize: 20, color: 'white' };
    switch (dept) {
      case "IT": return <BusinessCenterIcon sx={iconStyle} />;
      case "Housekeeping": return <CleaningServicesIcon sx={iconStyle} />;
      case "Electrical": return <BoltIcon sx={iconStyle} />;
      default: return <EngineeringIcon sx={iconStyle} />;
    }
  };

  return (
    <Box className="Atp-directory-wrapper">
      {/* 1. FLOATING GLASS HEADER */}
      <Card className="Atp-glass-header">
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" spacing={3}>
          <Box>
            <Typography variant="h3" className="Atp-directory-title">Technicians</Typography>
            <Typography variant="body1" sx={{ color: "#64748b", fontWeight: 500 }}>
              Live workforce availability and department directory.
            </Typography>
          </Box>
          <TextField
            variant="outlined"
            placeholder="Search by name, role or skill..."
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ 
              width: { xs: '100%', md: 400 },
              "& .MuiOutlinedInput-root": { borderRadius: "20px", bgcolor: 'white' } 
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#6366f1' }} />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Card>

      {/* 2. DYNAMIC DEPARTMENTS */}
      {departments.map((dept) => {
        const list = technicians.filter(t => 
          t.department === dept && 
          (t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           t.specialty.toLowerCase().includes(searchTerm.toLowerCase()))
        );

        if (list.length === 0) return null;

        return (
          <Box key={dept} sx={{ mb: 8 }}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
              <Box sx={{ bgcolor: '#0f172a', p: 1.5, borderRadius: '15px', display: 'flex' }}>
                {getDeptIcon(dept)}
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#1e293b', textTransform: 'uppercase', letterSpacing: 1 }}>
                {dept} Section
              </Typography>
              <Box sx={{ flexGrow: 1, height: '1px', bgcolor: '#e2e8f0', ml: 2 }} />
            </Stack>
            
            <Grid container spacing={4}>
              {list.map((tech) => (
                <Grid size={{ xs: 12, md:4 ,sm:6 }} key={tech.id}>
                  <Card className="Atp-tech-card">
                    <CardContent sx={{ p: 4 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={3}>
                        <Badge
                          overlap="circular"
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                          badgeContent={
                            <CircleIcon className={`dot-${tech.status.toLowerCase().replace(' ', '')}`} sx={{ fontSize: 14, border: '3px solid white', borderRadius: '50%' }} />
                          }
                        >
                          <Avatar 
                            sx={{ 
                              width: 70, height: 70, 
                              bgcolor: `${tech.theme}15`, 
                              color: tech.theme,
                              fontWeight: 800, fontSize: '1.5rem',
                              border: `2px solid ${tech.theme}30`
                            }}
                          >
                            {tech.avatar}
                          </Avatar>
                        </Badge>
                        <IconButton size="small"><MoreVertIcon sx={{ color: '#cbd5e1' }} /></IconButton>
                      </Stack>

                      <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', mb: 0.5 }}>
                        {tech.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600, mb: 3 }}>
                        {tech.specialty}
                      </Typography>
                      
                      <Divider sx={{ mb: 3 }} />
                      
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Chip 
                          label={tech.status} 
                          className="Atp-status-pill"
                          sx={{ 
                            bgcolor: `${getStatusColor(tech.status)}15`, 
                            color: getStatusColor(tech.status),
                          }} 
                        />
                        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800 }}>
                          REF: {tech.id}00X
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        );
      })}
    </Box>
  );
};

export default AlltechnitionPage;