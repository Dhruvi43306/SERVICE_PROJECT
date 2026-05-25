import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Stack,
  Paper,
  Divider,
  Container,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  AlternateEmail,
  LockOpen,
  Security,
} from '@mui/icons-material';
import { UserRound } from 'lucide-react';

const SignUp = () => {
  const navigate = useNavigate();

  const [generalError, setGeneralError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    user_name: '',
  });

  const [formData, setFormData] = useState({
    user_name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleAuthorized = async (e) => {
    e.preventDefault();
    if (!formData.user_name || !formData.email || !formData.password) {
      setGeneralError('All fields are required');
      return;
    }
    setGeneralError('');
    setErrors({ email: '', password: '', user_name: '' });

    try {
      setLoading(true);
      const nameParts = formData.user_name.trim().split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ') || 'User';

      const res = await fetch('http://localhost:5000/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          FirstName: firstName,
          LastName: lastName,
          FullName: formData.user_name,
          Email: formData.email,
          Password: formData.password,
          Phone: '',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        const newErrors = { email: '', password: '', user_name: '' };
        if (Array.isArray(data.message)) {
          data.message.forEach((err) => {
            const field = err.path?.[0];
            if (field === 'Email') newErrors.email = err.message;
            if (field === 'Password') newErrors.password += err.message + '\n';
            if (field === 'FirstName' || field === 'LastName') newErrors.user_name = err.message;
          });
          setErrors(newErrors);
          return;
        }
        if (typeof data.message === 'string') {
          setGeneralError(data.message);
          return;
        }
        setGeneralError('Something went wrong');
        return;
      }
      alert('OTP sent to your email');
      navigate('/VerifyOtp', { state: { userId: data.userId } });
    } catch (err) {
      setGeneralError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await fetch('http://localhost:5000/users/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ idToken: credentialResponse.credential }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || 'Google login failed');
        return;
      }
      alert('Login Success');
      navigate('/RequestorDashboard');
    } catch (error) {
      alert('Network error');
    }
  };

  return (
    <Box className="sys-viewport">
      {/* Soft Background Accents */}
      <div className="sys-bg-orb orb-1"></div>
      <div className="sys-bg-orb orb-2"></div>

      <Container maxWidth="xs" className="sys-auth-container">
        <Paper elevation={0} className="sys-auth-card">
          {/* Condensed Header Section */}
          <Box className="sys-card-header">
            <div className="sys-logo-hex">
              <Security sx={{ fontSize: 24, color: '#00b894' }} />
            </div>
            <Typography variant="h5" className="sys-title">System Master</Typography>
            <Typography variant="body2" className="sys-subtitle">Register to authorize access</Typography>
          </Box>

          {generalError && (
            <Box className="sys-error-alert">
              <Typography variant="caption">{generalError}</Typography>
            </Box>
          )}

          <form onSubmit={handleAuthorized}>
            <Stack spacing={2.2}>
              {/* Condensed TextFields using size="small" */}
              <TextField
                fullWidth
                size="small"
                name="user_name"
                label="Full Name"
                variant="outlined"
                value={formData.user_name}
                onChange={handleChange}
                error={!!errors.user_name}
                helperText={errors.user_name}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <UserRound size={16} color="#0984e3" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                size="small"
                name="email"
                type="email"
                label="Work Email"
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AlternateEmail fontSize="small" sx={{ color: '#0984e3' }} />
                    </InputAdornment>
                  ),
                }}
              />

              <Box>
                <TextField
                  fullWidth
                  size="small"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  label="Access Key"
                  variant="outlined"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  FormHelperTextProps={{ sx: { whiteSpace: 'pre-line', fontSize: '0.65rem' } }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOpen fontSize="small" sx={{ color: '#0984e3' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton size="small" onClick={() => setShowPassword((prev) => !prev)}>
                          {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Box sx={{ textAlign: 'right', mt: 0.5 }}>
                  <Link to="/ForgotPassword" style={{ textDecoration: 'none', color: '#0984e3', fontWeight: 600, fontSize: '0.7rem' }}>
                    Recover Credentials?
                  </Link>
                </Box>
              </Box>

              <Button 
                type="submit" 
                variant="contained" 
                className="sys-submit-btn"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Authorize Access'}
              </Button>
            </Stack>
          </form>

          <Divider sx={{ my: 3, color: '#b2bec3', fontSize: '0.7rem', fontWeight: 600 }}>OR</Divider>

          {/* Centered Google Button */}
          <Box className="sys-google-wrapper">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => alert('Google Login Failed')}
              theme="outline"
              shape="pill" // Pill shape is more modern
              width="280px" // Consolidated width
            />
          </Box>
          
          <Typography className="sys-card-footer">
            Already registered? <Link to="/login" style={{ color: '#00b894', fontWeight: 700 }}>Login</Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignUp;