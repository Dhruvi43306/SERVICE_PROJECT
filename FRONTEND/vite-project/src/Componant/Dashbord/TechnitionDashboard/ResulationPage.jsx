import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Chip,
  Stack,
  Avatar,
  InputBase,
} from "@mui/material";

import {
  CheckCircle as CheckCircleIcon,
  CloudUpload as CloudUploadIcon,
  Hub as DeptIcon,
  Person as UserIcon,
  Bolt as PriorityIcon,
  TaskAlt as SuccessIcon,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";

const API_URL = "http://localhost:5000/ServiceRequest";
const RESOLVE_URL = "http://localhost:5000/ServiceRequest/resolved";

const ResulationPage = () => {
  const {id} = useParams()
  const [file, setFile] = useState(null);
  const [listrequest, setreqlist] = useState([]);
  const [resolutionSummary, setResolutionSummary] = useState("");
  const [workDone, setWorkDone] = useState("");
  const reqid = Number(id)
  if (isNaN(reqid)) {
      console.error("Invalid ServiceRequest ID:", id);
      return;
    }
  // fetch service request
  const fetchSerivceRequest = async () => {
    try {
      const res = await fetch(`${API_URL}/${reqid}`, {
        method: "GET",
        credentials: "include",
      });

      const result = await res.json();

      setreqlist(result.data ? [result.data] : []);

    } catch (err) {
      console.error("Fetch Error:", err);
      setreqlist([]);
    }
  };

  const resolvedRequest = async (requestID) => {

    if (!resolutionSummary) {
      Swal.fire("Please enter resolution summary");
      return;
    }

    try {

      const res = await fetch(`${RESOLVE_URL}/${requestID}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          technicianID: 1, // normally from login session
          resolutionSummary: resolutionSummary,
          workDone: workDone,
        }),
      });

      const result = await res.json();

      if (res.ok) {

        Swal.fire({
          title: "Success!",
          text: "Request successfully Resolved.",
          icon: "success",
          confirmButtonColor: "#3b82f6",
        });

        setResolutionSummary("");
        setWorkDone("");
        setFile(null);

        fetchSerivceRequest();

      } else {

        Swal.fire({
          title: "Resolve Failed",
          text: result.message || "Something went wrong.",
          icon: "error",
        });

      }

    } catch (err) {

      console.error("Resolve Error:", err);

      Swal.fire({
        title: "Server Error",
        text: "Please try again later.",
        icon: "error",
      });

    }
  };

  useEffect(() => {
    fetchSerivceRequest();
  }, [id]);

  const crystalStyles = {
    wrapper: "crystal-page-root",
    mainBg: {
      minHeight: "100vh",
      background:
        "radial-gradient(circle at top left, #F0FFF4 0%, #EBF8FF 40%, #FFFFFF 100%)",
      py: 10,
    },
    glassCard: {
      borderRadius: "32px",
      background: "rgba(255, 255, 255, 0.7)",
      backdropFilter: "blur(16px) saturate(180%)",
      border: "1px solid rgba(255, 255, 255, 0.4)",
      boxShadow: "0 20px 50px rgba(148, 163, 184, 0.15)",
      overflow: "hidden",
    },
    inputCard: {
      bgcolor: "rgba(255, 255, 255, 0.8)",
      borderRadius: "20px",
      p: 0.5,
      px: 2,
      border: "1px solid #E2E8F0",
    },
    uploadZone: {
      border: "2px dashed #CBD5E0",
      borderRadius: "24px",
      p: 4,
      textAlign: "center",
      cursor: "pointer",
    },
  };

  return (
    <>
      {listrequest.map((req) => (
        <Box
          key={req.ServiceRequestID}
          className={crystalStyles.wrapper}
          sx={crystalStyles.mainBg}
        >
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="stretch">

              {/* LEFT PANEL */}
              <Grid size={{ xs: 12, md: 4 }}>
                <Paper sx={{ ...crystalStyles.glassCard, height: "100%", p: 4 }}>
                  <Stack spacing={4}>
                    <Box>

                      <Chip
                        label="Active Incident"
                        sx={{
                          bgcolor: "#E6FFFA",
                          color: "#2C7A7B",
                          fontWeight: 800,
                          mb: 2,
                        }}
                      />

                      <Typography variant="h4" fontWeight="900">
                        {req.ServiceRequestTitle}
                      </Typography>

                    </Box>

                    <Typography>{req.ServiceDeptName}</Typography>

                    <Typography>{req.ServiceRequestDescription}</Typography>

                  </Stack>
                </Paper>
              </Grid>

              {/* RIGHT PANEL */}
              <Grid size={{ xs: 12, md: 8 }}>
                <Paper sx={{ ...crystalStyles.glassCard, p: { xs: 4, md: 6 } }}>

                  <Stack spacing={4}>

                    <Box>

                      <Typography variant="subtitle2" sx={{ mb: 1, ml: 1, fontWeight: 700, color: '#4A5568' }}>
                        Resolution Summary
                      </Typography>

                      <Box sx={crystalStyles.ResolutionSummary}>

                        <InputBase
                        fullWidth
                        placeholder="e.g., Successfully reset the main router and patched cables..."
                        sx={{ py: 1.5, fontSize: '1rem' }}
                          value={resolutionSummary}
                          onChange={(e) =>
                            setResolutionSummary(e.target.value)
                          }
                        />

                      </Box>
                    </Box>

                    <Box>

                      <Typography variant="subtitle2"sx={{ mb: 1, ml: 1, fontWeight: 700, color: '#4A5568' }}>
                        Step-by-Step Work Done
                      </Typography>

                      <Box sx={crystalStyles.WorkDone }>

                        <InputBase
                         fullWidth
                      multiline
                      rows={4}
                      placeholder="Briefly explain the fix..."
                      sx={{ fontSize: '1rem' }}
                          value={workDone}
                          onChange={(e) => setWorkDone(e.target.value)}
                        />

                      </Box>

                    </Box>

                    <Box>

                      <input
                        accept="image/*"
                        style={{ display: "none" }}
                        id="crystal-upload"
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                      />

                      <label htmlFor="crystal-upload">

                        <Box sx={crystalStyles.uploadZone}>

                          <CloudUploadIcon sx={{ fontSize: 40 }} />

                          <Typography>
                            {file ? file.name : "Upload Evidence Photo"}
                          </Typography>

                        </Box>

                      </label>

                    </Box>

                    <Button
                      fullWidth
                      variant="contained"
                      disableElevation
                      startIcon={<CheckCircleIcon />}
                      sx={{ 
                        py: 2.5, 
                        borderRadius: '20px', 
                        background: 'linear-gradient(90deg, #48BB78 0%, #38A169 100%)',
                        fontSize: '1.1rem',
                        fontWeight: '800',
                        textTransform: 'none',
                        boxShadow: '0 10px 20px rgba(72, 187, 120, 0.2)',
                        '&:hover': {
                          background: 'linear-gradient(90deg, #38A169 0%, #2F855A 100%)',
                          transform: 'translateY(-2px)'
                        }
                      }}
                      onClick={() => resolvedRequest(req.ServiceRequestID)}
                    >
                      Submit Resolution
                    </Button>

                  </Stack>

                </Paper>
              </Grid>

            </Grid>
          </Container>
        </Box>
      ))}
    </>
  );
};

export default ResulationPage;