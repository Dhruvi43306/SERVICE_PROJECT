import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import {
  Box,
  Typography,
  Button,
  Stack,
  Container,
  Divider,
  Paper,
  Fade,
  Avatar,
  Chip
} from '@mui/material';
import {
  AutoGraph,
  West,
  Verified,
  Hub,
  Description,
  HistoryEdu,
  AdminPanelSettings
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000/ServiceRequest';

const AdminApprovePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeReq, setActiveReq] = useState(null);
  const [loading, setLoading] = useState(true);

  const approveId = Number(id);

  useEffect(() => {
    if (!id || isNaN(approveId)) {
      setLoading(false);
      return;
    }
    fetchSerivceRequest();
  }, [id]);

  const fetchSerivceRequest = async () => {
    try {
      const res = await fetch(`${API_URL}`, {
        method: 'GET',
        credentials: 'include',
      });

      const result = await res.json();

      if (result && Array.isArray(result.data)) {
        const filtered = result.data.find(
          (req) => Number(req.ServiceRequestID) === approveId
        );
        setActiveReq(filtered || null);
      }
    } catch (err) {
      console.error('Fetch Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const approveRequest = async () => {
    try {
      const res = await fetch(`${API_URL}/adminApprove/${approveId}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminId: 1 }),
      });

      const result = await res.json();

      if (res.ok) {
        Swal.fire({
          title: 'Verification Complete',
          text: 'The request has been signed and forwarded to the HOD.',
          icon: 'success',
          confirmButtonColor: '#6366f1',
          customClass: {
            popup: 'rounded-3xl',
            confirmButton: 'rounded-xl px-6'
          }
        });
        setActiveReq(null);
      } else {
        Swal.fire({
          title: 'Approval Failed',
          text: result.message || 'Something went wrong.',
          icon: 'error',
        });
      }
    } catch (err) {
      console.error('Approve Error:', err);
    }
  };

  if (loading) return null;

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        py: 6 
      }}
    >
      <Container maxWidth="md">
        {!activeReq ? (
          <Fade in={true}>
            <Stack alignItems="center" justifyContent="center" sx={{ mt: 10 }}>
              <Avatar sx={{ width: 80, height: 80, bgcolor: '#e2e8f0', mb: 2 }}>
                <Description sx={{ fontSize: 40, color: '#94a3b8' }} />
              </Avatar>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#475569' }}>
                Request Not Found
              </Typography>
              <Button 
                startIcon={<West />} 
                onClick={() => navigate(-1)}
                sx={{ mt: 2, textTransform: 'none', fontWeight: 600 }}
              >
                Return to Dashboard
              </Button>
            </Stack>
          </Fade>
        ) : (
          <Fade in={true}>
            <Box>
              {/* Top Navigation */}
              <Button
                startIcon={<West />}
                onClick={() => navigate(-1)}
                sx={{ 
                  mb: 4, 
                  color: '#64748b', 
                  fontWeight: 700, 
                  textTransform: 'none',
                  '&:hover': { background: 'transparent', color: '#1e293b' }
                }}
              >
                Back to Verification Desk
              </Button>

              {/* Main Audit Card */}
              <Paper 
                elevation={0}
                sx={{ 
                  p: { xs: 3, md: 6 }, 
                  borderRadius: '32px',
                  border: '1px solid rgba(255, 255, 255, 0.8)',
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.04)'
                }}
              >
                {/* Header Section */}
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 5 }}>
                  <Box>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                      <AdminPanelSettings sx={{ color: '#6366f1', fontSize: 20 }} />
                      <Typography sx={{ color: '#6366f1', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                        Administrative Audit
                      </Typography>
                    </Stack>
                    <Typography variant="h3" sx={{ fontWeight: 900, color: '#0f172a', lineHeight: 1.2 }}>
                      {activeReq.ServiceRequestTitle}
                    </Typography>
                  </Box>
                  <Box 
                    sx={{ 
                      p: 2, 
                      borderRadius: '20px', 
                      background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                      boxShadow: '0 10px 20px rgba(99, 102, 241, 0.2)'
                    }}
                  >
                    <Hub sx={{ color: '#fff', fontSize: 32 }} />
                  </Box>
                </Stack>

                {/* Content Section */}
                <Box 
                  sx={{ 
                    bgcolor: '#f8fafc', 
                    p: 4, 
                    borderRadius: '24px', 
                    border: '1px solid #e2e8f0',
                    mb: 5,
                    position: 'relative'
                  }}
                >
                  <HistoryEdu sx={{ position: 'absolute', right: 20, top: 20, color: '#e2e8f0', fontSize: 40 }} />
                  <Typography 
                    sx={{ 
                      color: '#94a3b8', 
                      fontWeight: 700, 
                      fontSize: '0.75rem', 
                      textTransform: 'uppercase', 
                      mb: 2,
                      display: 'block' 
                    }}
                  >
                    Request Description
                  </Typography>
                  <Typography 
                    sx={{ 
                      color: '#334155', 
                      lineHeight: 1.8, 
                      fontSize: '1.1rem', 
                      fontWeight: 500 
                    }}
                  >
                    {activeReq.ServiceRequestDescription}
                  </Typography>
                </Box>

                <Divider sx={{ mb: 4, borderStyle: 'dashed' }} />

                {/* Action Section */}
                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  justifyContent="space-between" 
                  alignItems="center"
                  spacing={3}
                >
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box 
                      sx={{ 
                        width: 40, 
                        height: 40, 
                        borderRadius: '50%', 
                        bgcolor: '#ecfdf5', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                      }}
                    >
                      <Verified sx={{ color: '#10b981' }} />
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 700, color: '#1e293b', fontSize: '0.95rem' }}>
                        Ready for HOD Signature
                      </Typography>
                      <Typography sx={{ color: '#64748b', fontSize: '0.8rem' }}>
                        Verified by Admin Panel
                      </Typography>
                    </Box>
                  </Stack>

                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<AutoGraph />}
                    onClick={approveRequest}
                    sx={{ 
                      py: 2, 
                      px: 4, 
                      borderRadius: '16px',
                      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                      textTransform: 'none',
                      fontSize: '1rem',
                      fontWeight: 700,
                      boxShadow: '0 10px 25px rgba(15, 23, 42, 0.2)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 15px 30px rgba(15, 23, 42, 0.3)',
                        background: '#000'
                      }
                    }}
                  >
                    Confirm & Approve to HOD
                  </Button>
                </Stack>
              </Paper>
            </Box>
          </Fade>
        )}
      </Container>
    </Box>
  );
};

export default AdminApprovePage;