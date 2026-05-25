import React, { useState } from "react";
import { Box, TextField, Button, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const requestReset = async () => {
    try {
      setLoading(true);
      setMessage("");

      const res = await fetch("http://localhost:5000/users/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Email: email })
      });

      const data = await res.json();

      if (data.error) {
        setMessage(data.message || "Email not found");
        return;
      }

      setMessage("OTP sent to email");

      // redirect to OTP page
      setTimeout(() => {
        navigate("/VerifyForgot", { state: { userId: data.userId } });
      }, 800);

    } catch (err) {
      console.error(err);
      setMessage("Server error. Try again.");
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
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button variant="contained" onClick={requestReset} disabled={loading}>
            {loading ? "Sending..." : "Send OTP"}
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

export default ForgotPassword;
