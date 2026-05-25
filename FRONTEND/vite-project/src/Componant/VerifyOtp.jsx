import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Stack } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userId = location.state?.userId;

  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  // countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // verify OTP
  const handleVerify = async () => {
    if (!otp) return alert("Enter OTP");

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/users/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, otp }),
      });

      const data = await res.json();

      if (!data.error) {
        navigate("/RequestorDashboard");
      } else {
        alert(data.message);
    console.log("Error", data.message);      
}
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // resend OTP
  const handleResend = async () => {
    setResendLoading(true);

    try {
      const res = await fetch("http://localhost:5000/users/resend-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();

      if (data.error) {
        alert(data.message || "Failed to send OTP");
        return;
      }
      alert("New OTP sent to email");

      // reset timer
      setTimeLeft(60);
      setOtp("");
    } catch (err) {
      console.error(err);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <Box
      className="login-viewport"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg,#1e3c72,#2a5298)",
      }}
    >
      <Box
        className="crystal-card"
        sx={{
          width: 400,
          padding: 4,
          borderRadius: 3,
          background: "#ffffff",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        <Typography variant="h5" fontWeight="bold" textAlign="center">
          Verify Email
        </Typography>

        <Typography
          variant="body2"
          sx={{ mt: 1, mb: 3 }}
          textAlign="center"
          color="text.secondary"
        >
          Enter the OTP sent to your email
        </Typography>

        <Stack spacing={2}>
        <TextField
  fullWidth
  type="text"
  label="Enter OTP"
  value={otp}
  onChange={(e) => setOtp(e.target.value.trim())}
  inputProps={{ maxLength: 6 }}
/>
          {/* TIMER */}
          <Typography
            textAlign="center"
            sx={{
              fontWeight: 600,
              color: timeLeft < 60 ? "red" : "green",
            }}
          >
            OTP expires in {Math.floor(timeLeft / 60)}:
            {String(timeLeft % 60).padStart(2, "0")}
          </Typography>

          {/* VERIFY BUTTON */}
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleVerify}
            disabled={loading}
            sx={{
              background: "#061422",
              fontWeight: "bold",
              padding: "12px",
            }}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>

          {/* RESEND BUTTON */}
          <Button
            fullWidth
            variant="outlined"
            size="large"
            onClick={handleResend}
            disabled={timeLeft > 0 || resendLoading}
            sx={{
              fontWeight: "bold",
              padding: "12px",
            }}
          >
            {resendLoading
              ? "Sending..."
              : timeLeft > 0
                ? "Resend available after timer"
                : "Resend OTP"}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default VerifyOtp;
