import React, { useState } from "react";
import { Box, TextField, Button, Typography, Stack } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userId = location.state?.userId;

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    if (!password || password.length < 6) {
      return setMessage("Password must be at least 6 characters");
    }

    if (password !== confirm) {
      return setMessage("Passwords do not match");
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/users/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId,
          password
        })
      });

      const data = await res.json();

      if (!data.error) {
        alert("Password updated successfully");

        navigate("/Login");
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="login-viewport">
      <Box className="crystal-card">
        <Typography variant="h5">Reset Password</Typography>

        <Stack spacing={2} mt={3}>
          <TextField
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextField
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />

          <Button variant="contained" onClick={handleReset} disabled={loading}>
            {loading ? "Updating..." : "Update Password"}
          </Button>

          {message && (
            <Typography color="error" variant="body2">
              {message}
            </Typography>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default ResetPassword;
