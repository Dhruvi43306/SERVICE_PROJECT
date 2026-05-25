import React from 'react';
import { Box, Typography, Button, Container, Stack, Zoom, keyframes } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBackIosNewRounded, HomeRounded } from '@mui/icons-material';

// Subtle floating animation for the video
const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(1deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const PNF = () => {
  const navigate = useNavigate();

  // HIGH-QUALITY FUNNY VIDEO: Confused Panda
  const videoId = "X21mZ149R7Q"; 
  const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1`;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at 10% 20%, rgba(216, 241, 230, 0.46) 0.1%, rgba(233, 226, 226, 0.28) 90.1%)',
        backgroundColor: '#F8F9FA',
        p: 3,
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 6, md: 12 }}
          alignItems="center"
          justifyContent="center"
        >
          {/* LEFT: The Video Player (The "Visual Hook") */}
          <Zoom in={true} timeout={800}>
            <Box
              sx={{
                flex: 1,
                position: 'relative',
                animation: `${float} 6s ease-in-out infinite`,
                width: '100%',
                maxWidth: '450px',
              }}
            >
              {/* Decorative Glow behind video */}
              <Box 
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '110%',
                  height: '110%',
                  background: 'linear-gradient(45deg, #FF9A9E, #FAD0C4, #A1C4FD)',
                  filter: 'blur(50px)',
                  opacity: 0.3,
                  zIndex: 0,
                }}
              />
              
              <Box
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  borderRadius: '40px',
                  overflow: 'hidden',
                  boxShadow: '0 40px 80px rgba(0,0,0,0.15)',
                  backgroundColor: '#000',
                  aspectRatio: '1/1', // Modern Square Video
                  border: '12px solid #FFF',
                }}
              >
                <video sx={{}}
                  width="100%"
                  height="100%"
                  src="/video/pnf-1.mp4"
                autoPlay
                muted
                loop
                playsInline
                  title="Funny Panda 404"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
               />
              <video/>
            
              </Box>
            </Box>
          </Zoom>

          {/* RIGHT: The Content */}
          <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              variant="h6"
              sx={{
                color: '#5D5DFF',
                fontWeight: 800,
                letterSpacing: 3,
                textTransform: 'uppercase',
                mb: 2,
                fontSize: '0.9rem',
              }}
            >
              Lost your way?
            </Typography>

            <Typography
              variant="h1"
              sx={{
                fontWeight: 900,
                fontSize: { xs: '4rem', md: '6rem' },
                color: '#1A1A1A',
                lineHeight: 1,
                mb: 3,
                letterSpacing: '-2px',
              }}
            >
              404.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: '#666',
                fontSize: '1.2rem',
                lineHeight: 1.6,
                mb: 6,
                maxWidth: '400px',
              }}
            >
              You've reached a page that doesn't exist. Even the wildlife is 
              confused. Let's get you back on track.
            </Typography>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent={{ xs: 'center', md: 'flex-start' }}
            >
              <Button
                variant="contained"
                onClick={() => navigate('/')}
                startIcon={<HomeRounded />}
                sx={{
                  backgroundColor: '#1A1A1A',
                  color: '#FFF',
                  px: 5,
                  py: 2,
                  borderRadius: '16px',
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                  '&:hover': { backgroundColor: '#333', transform: 'translateY(-2px)' },
                  transition: 'all 0.3s ease',
                }}
              >
                Go Home
              </Button>

              <Button
                variant="outlined"
                onClick={() => navigate(-1)}
                startIcon={<ArrowBackIosNewRounded />}
                sx={{
                  borderColor: '#E0E0E0',
                  color: '#1A1A1A',
                  px: 4,
                  py: 2,
                  borderRadius: '16px',
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  '&:hover': { borderColor: '#1A1A1A', backgroundColor: '#F8F9FA' },
                }}
              >
                Go Back
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default PNF;