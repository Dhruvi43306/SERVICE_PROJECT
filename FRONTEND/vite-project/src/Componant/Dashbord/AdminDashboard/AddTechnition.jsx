import React, { useState } from 'react';
import { 
  Box, Typography, TextField, Button, 
  Paper, Stack, Grid, InputAdornment, IconButton 
} from '@mui/material';
import { 
  Fingerprint, 
  Mail, 
  PhoneIphone, 
  SettingsSuggest, 
  ChevronRight,
  AddModerator 
} from '@mui/icons-material';


const AddTechnition = () => {
  const [role, setRole] = useState('Hardware');

  return (
    <Box className="t-root">
      <Paper className="t-glass-panel" elevation={0}>
        
        {/* Header Section */}
        <Box sx={{ mb: 8 }}>
          <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
            <span className="t-accent-dot"></span>
            <Typography variant="caption" sx={{ fontWeight: 800, color: '#10b981', letterSpacing: 2 }}>
              RESOURCE MANAGEMENT
            </Typography>
          </Stack>
          <Typography variant="h3" sx={{ fontWeight: 900, color: '#0f172a', letterSpacing: '-1.5px' }}>
            Onboard Expert
          </Typography>
          <Typography sx={{ color: '#94a3b8', mt: 1, fontWeight: 500, maxWidth: '400px' }}>
            Enter details to register a new technician into the central maintenance network.
          </Typography>
        </Box>

        {/* Form Body */}
        <Grid container spacing={4}>
          
          <Grid item xs={12}>
            <Box className="t-input-group">
              <span className="t-label-text">Technician Name</span>
              <TextField 
                fullWidth 
                variant="outlined" 
                placeholder="Full Legal Name" 
                className="t-field"
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Fingerprint sx={{color: '#10b981'}}/></InputAdornment>,
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box className="t-input-group">
              <span className="t-label-text">Email Address</span>
              <TextField 
                fullWidth 
                placeholder="tech@university.edu" 
                className="t-field"
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Mail sx={{color: '#10b981'}}/></InputAdornment>,
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box className="t-input-group">
              <span className="t-label-text">Mobile Access</span>
              <TextField 
                fullWidth 
                placeholder="+91 0000 0000" 
                className="t-field"
                InputProps={{
                  startAdornment: <InputAdornment position="start"><PhoneIphone sx={{color: '#10b981'}}/></InputAdornment>,
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <span className="t-label-text">Specialized Department</span>
            <Stack direction="row" spacing={2} sx={{ mt: 1, mb: 4 }}>
              {['Hardware', 'Network', 'Software', 'Electrical'].map((cat) => (
                <Button 
                  key={cat}
                  onClick={() => setRole(cat)}
                  className={`t-category-btn ${role === cat ? 'active' : ''}`}
                >
                  {cat}
                </Button>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 4 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <AddModerator sx={{ color: '#cbd5e1' }} />
                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700 }}>
                  Subject to Admin Audit
                </Typography>
              </Stack>
              
              <Button 
                variant="contained" 
                className="t-submit-btn"
                endIcon={<ChevronRight />}
              >
                Register Technician
              </Button>
            </Stack>
          </Grid>

        </Grid>

        {/* Footer Detail */}
        <Box sx={{ mt: 8, pt: 4, borderTop: '1px solid #f1f5f9', textAlign: 'center' }}>
          <Typography variant="caption" sx={{ color: '#cbd5e1', fontWeight: 700, letterSpacing: 3 }}>
            INSTITUTIONAL MAINTENANCE SYSTEM • 2026
          </Typography>
        </Box>

      </Paper>
    </Box>
  );
};

export default AddTechnition;