import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  Grid,
  MenuItem,
  InputAdornment,
  Divider,
  Container,
} from "@mui/material";
import {
  Business,
  Code,
  LocationOn,
  Description,
  AccessTime,
  ToggleOn,
  AddCircleOutline,
} from "@mui/icons-material";

const Campus = () => {
  const [form, setForm] = useState({
    ServiceDeptName: "",
    DeptCode: "",
    CampusID: "",
    Description: "",
    SLA_Hours: "",
    IsActive: "1",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  // Shared styles for a cleaner look
  const fieldStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      transition: "0.3s",
      backgroundColor: "#fcfcfd",
      "&:hover": {
        backgroundColor: "#fff",
        "& fieldset": { borderColor: "#6a5af9" },
      },
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        // Subtle, professional mesh gradient
        background: "radial-gradient(at 0% 0%, rgba(106, 90, 249, 0.05) 0, transparent 50%), radial-gradient(at 100% 100%, rgba(139, 92, 246, 0.1) 0, transparent 50%), #f8fafc",
        p: 3,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 6 },
            borderRadius: "24px",
            border: "1px solid rgba(226, 232, 240, 0.8)",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
            background: "#ffffff",
          }}
        >
          {/* Header Section */}
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <Box
              sx={{
                display: "inline-flex",
                p: 1.5,
                borderRadius: "16px",
                background: "rgba(106, 90, 249, 0.1)",
                color: "#6a5af9",
                mb: 2,
              }}
            >
              <AddCircleOutline fontSize="large" />
            </Box>
            <Typography variant="h4" fontWeight="850" sx={{ color: "#1e293b", letterSpacing: "-0.02em" }}>
              Department Setup
            </Typography>
            <Typography variant="body1" sx={{ color: "#64748b", mt: 1 }}>
              Configure and register a new service department within the campus network.
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              {/* Row 1 */}
              <Grid size={{ xs: 12, md: 6}}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700, color: "#475569", ml: 0.5 }}>
                  Department Name
                </Typography>
                <TextField
                  name="ServiceDeptName"
                  fullWidth
                  required
                  placeholder="e.g. IT Services"
                  sx={fieldStyle}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Business sx={{ color: "#94a3b8" }} />
                      </InputAdornment>
                    ),
                  }}
                  value={form.ServiceDeptName}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6}}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700, color: "#475569", ml: 0.5 }}>
                  Department Code
                </Typography>
                <TextField
                  name="DeptCode"
                  fullWidth
                  required
                  placeholder="e.g. ITS-01"
                  sx={fieldStyle}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Code sx={{ color: "#94a3b8" }} />
                      </InputAdornment>
                    ),
                  }}
                  value={form.DeptCode}
                  onChange={handleChange}
                />
              </Grid>

              {/* Row 2 */}
              <Grid size={{ xs: 12, md: 6}}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700, color: "#475569", ml: 0.5 }}>
                  Campus Location
                </Typography>
                <TextField
                  select
                  name="CampusID"
                  fullWidth
                  required
                  sx={fieldStyle}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOn sx={{ color: "#94a3b8" }} />
                      </InputAdornment>
                    ),
                  }}
                  value={form.CampusID}
                  onChange={handleChange}
                >
                  <MenuItem value="1">Rajkot Campus</MenuItem>
                  <MenuItem value="2">Ahmedabad Campus</MenuItem>
                  <MenuItem value="3">Surat Campus</MenuItem>
                </TextField>
              </Grid>

              <Grid size={{ xs: 12, md: 6}}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700, color: "#475569", ml: 0.5 }}>
                  SLA Hours
                </Typography>
                <TextField
                  name="SLA_Hours"
                  type="number"
                  fullWidth
                  placeholder="24"
                  sx={fieldStyle}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccessTime sx={{ color: "#94a3b8" }} />
                      </InputAdornment>
                    ),
                  }}
                  value={form.SLA_Hours}
                  onChange={handleChange}
                />
              </Grid>

              {/* Row 3 - Full Width Description */}
              <Grid size={{ xs: 12}}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700, color: "#475569", ml: 0.5 }}>
                  Description
                </Typography>
                <TextField
                  name="Description"
                  multiline
                  rows={3}
                  fullWidth
                  placeholder="Describe the department's core functions..."
                  sx={fieldStyle}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{ alignSelf: "flex-start", mt: 1.5 }}>
                        <Description sx={{ color: "#94a3b8" }} />
                      </InputAdornment>
                    ),
                  }}
                  value={form.Description}
                  onChange={handleChange}
                />
              </Grid>

              {/* Row 4 - Status */}
              <Grid size={{ xs: 12, md: 6}}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700, color: "#475569", ml: 0.5 }}>
                  Operation Status
                </Typography>
                <TextField
                  select
                  name="IsActive"
                  fullWidth
                  sx={fieldStyle}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ToggleOn sx={{ color: "#94a3b8" }} />
                      </InputAdornment>
                    ),
                  }}
                  value={form.IsActive}
                  onChange={handleChange}
                >
                  <MenuItem value="1">Active</MenuItem>
                  <MenuItem value="0">Inactive</MenuItem>
                </TextField>
              </Grid>

              {/* Submit Button */}
              <Grid size={{ xs: 12}} sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  disableElevation
                  sx={{
                    py: 2,
                    borderRadius: "12px",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    textTransform: "none",
                    background: "linear-gradient(135deg, #6a5af9 0%, #4f46e5 100%)",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-1px)",
                      boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.4)",
                      background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
                    },
                  }}
                >
                  Register Department
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Campus;