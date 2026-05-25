import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { 
  Box, Typography, TextField, Button, 
  Stack, InputAdornment, IconButton, Link 
} from "@mui/material";

import { 
  MailOutline, 
  LockOpen, 
  VisibilityOff, 
  Visibility, 
  AutoAwesome 
} from "@mui/icons-material";

function Login() {

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    Email: "",
    Password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault(); 
    setError(""); 

    if (formData.Password.length < 8) {
      setError("Please enter valid password (minimum 8 characters)");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      console.log("Full Response:", data);
      console.log("Error:", data.error);
      console.log("Message:", data.message); 

      if (!data.error) {
        localStorage.setItem("token", data.token); 
        localStorage.setItem("role", data.role);
        localStorage.setItem("user", JSON.stringify(data.user));

        setUser({ role: data.role });

        console.log("Navigating role:", data.role); 

        if (data.role === "ADMIN") navigate("/AdminDashboard");
        else if (data.role === "TECHNICIAN") navigate("/TechnicianDashboard");
        else if (data.role === "STAFF") navigate("/TechnicianDashboard");
        else if (data.role === "HOD") navigate("/HodDashboard");
        else navigate("/RequestorDashboard");

      } else {
        setError(data.message || "Login failed");
      }

    } catch (err) {
      console.log("Login failed:", err.message);
      setError("Server error. Please try again.");
    }
  };

  return (
    <Box className="login-viewport">
      <Box className="crystal-card">

        <Box sx={{ mb: 3 }}>
          <AutoAwesome sx={{ fontSize: 48, color: '#a3c4f3' }} />
        </Box>

        <Typography variant="h4" sx={{ fontWeight: 900, color: '#4f6d7a', mb: 1, letterSpacing: '-1px' }}>
          Portal Access
        </Typography>

        <Typography variant="body2" sx={{ color: '#7a9ba8', mb: 5, fontWeight: 500 }}>
          Manage your assets in a clean workspace
        </Typography>

        <form autoComplete="off" onSubmit={handleLogin}>
          <Stack spacing={2.5}>

            <TextField
              fullWidth
              name="Email"
              autoComplete="off"
              placeholder="Work Email"
              value={formData.Email}
              onChange={handleChange}
              className="light-input-box"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutline className="soft-icon" />
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
            />

            <TextField
              fullWidth
              name="Password"
              autoComplete="new-password"
              type={showPassword ? "text" : "password"}
              placeholder="Secure Password"
              value={formData.Password}
              onChange={handleChange}
              className="light-input-box"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOpen className="soft-icon" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      sx={{ color: '#a3c4f3' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
            />

            {/*  Error message (no UI change, just text) */}
            {error && (
              <Typography sx={{ color: "red", fontSize: "0.8rem" }}>
                {error}
              </Typography>
            )}

            <Box sx={{ textAlign: 'right', pr: 1 }}>
              <Link component={RouterLink} to="/ForgotPassword" underline="none"
                sx={{ color: '#7a9ba8', fontWeight: 700, fontSize: '0.8rem' }}>
                Recover Credentials?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              className="btn-prime-light"
            >
              Authenticate
            </Button>

            <Typography variant="body2" sx={{ color: '#7a9ba8', mt: 4, fontWeight: 600 }}>
              New to the platform?{" "}
              <Link href="#" underline="none" sx={{ color: '#4f6d7a', fontWeight: 800 }}>
                Join Now
              </Link>
            </Typography>

          </Stack>
        </form>

      </Box>
    </Box>
  );
};

export default Login;