import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Chip,
  IconButton,
  Tooltip,
  Container,
  Fade,
  Grow,
} from "@mui/material";
import NotificationsActiveTwoToneIcon from "@mui/icons-material/NotificationsActiveTwoTone";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import { socket } from "../socket";

// Premium Light Palette
const themePalette = {
  success: { bg: "#ECFDF5", color: "#10B981", shadow: "rgba(16, 185, 129, 0.2)" },
  warning: { bg: "#FFFBEB", color: "#F59E0B", shadow: "rgba(245, 158, 11, 0.2)" },
  info: { bg: "#EFF6FF", color: "#3B82F6", shadow: "rgba(59, 130, 246, 0.2)" },
  background: "#F8FAFC",
  textPrimary: "#1E293B",
  textSecondary: "#64748B",
};

const getIcon = (type) => {
  if (type === "success") return <CheckCircleRoundedIcon sx={{ fontSize: 22 }} />;
  if (type === "warning") return <ErrorRoundedIcon sx={{ fontSize: 22 }} />;
  return <InfoRoundedIcon sx={{ fontSize: 22 }} />;
};

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  const getUserId = () => {
    let userId = localStorage.getItem("UserID") || "1";
    if (!userId) {
      const user = localStorage.getItem("user");
      if (user) {
        try {
          const parsed = JSON.parse(user);
          userId = parsed?.UserID;
        } catch (e) {
          console.error("Failed to parse user");
        }
      }
    }
    return userId || null;
  };

  const fetchNotifications = async () => {
    const userId = getUserId();
    if (!userId) return;
    try {
      const res = await fetch(`http://localhost:5000/notify/user/${userId}`, {
        credentials: "include",
      });
      const result = await res.json();
      setNotifications(result.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    const userId = getUserId();
    if (!userId) return;

    socket.on("connect", () => {
      socket.emit("join", userId);
    });

    fetchNotifications();

    socket.on("newNotification", (data) => {
      setNotifications((prev) => [data, ...prev]);
    });

    return () => {
      socket.off("connect");
      socket.off("newNotification");
    };
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: themePalette.background, py: 6 }}>
      <Container maxWidth="sm">
        {/* Modern Glass Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 5,
            px: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
            <Avatar
              sx={{
                width: 54,
                height: 54,
                bgcolor: "white",
                color: "#6366F1",
                boxShadow: "0 10px 20px -5px rgba(99, 102, 241, 0.3)",
              }}
            >
              <NotificationsActiveTwoToneIcon fontSize="medium" />
            </Avatar>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: themePalette.textPrimary, letterSpacing: "-0.02em" }}>
                Activity Feed
              </Typography>
              <Typography variant="body2" sx={{ color: themePalette.textSecondary, fontWeight: 500 }}>
                {notifications.length > 0 ? `You have ${notifications.length} new updates` : "No new activities"}
              </Typography>
            </Box>
          </Box>
          <Tooltip title="Mark all read">
            <IconButton sx={{ bgcolor: "white", border: "1px solid #E2E8F0", "&:hover": { bgcolor: "#F1F5F9" } }}>
              <DoneAllRoundedIcon fontSize="small" sx={{ color: themePalette.textSecondary }} />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Notifications Stack */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          {notifications.length === 0 ? (
            <Fade in timeout={800}>
              <Box sx={{ textAlign: "center", py: 12, opacity: 0.5 }}>
                <Typography variant="h6" sx={{ color: themePalette.textSecondary, fontWeight: 400 }}>
                  All clear for now!
                </Typography>
              </Box>
            </Fade>
          ) : (
            notifications.map((item, index) => {
              const config = themePalette[item.ServiceType] || themePalette.info;
              return (
                <Grow in timeout={400 + index * 100} key={item.NotificationId || item.id}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: "20px",
                      bgcolor: "white",
                      border: "1px solid #F1F5F9",
                      position: "relative",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      "&:hover": {
                        transform: "translateY(-3px)",
                        boxShadow: `0 20px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.01)`,
                        borderColor: config.color,
                      },
                      // The "Side-Bar" accent
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        top: "20%",
                        bottom: "20%",
                        width: "4px",
                        borderRadius: "0 4px 4px 0",
                        bgcolor: config.color,
                      }
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 2.5 }}>
                      <Avatar
                        sx={{
                          bgcolor: config.bg,
                          color: config.color,
                          width: 48,
                          height: 48,
                          borderRadius: "14px",
                        }}
                      >
                        {getIcon(item.ServiceType)}
                      </Avatar>

                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
                          <Typography sx={{ fontWeight: 700, fontSize: "0.95rem", color: themePalette.textPrimary }}>
                            {item.ServiceRequestID || "System Update"}
                          </Typography>
                          <IconButton size="small" sx={{ mt: -1, mr: -1 }}>
                            <MoreVertRoundedIcon sx={{ fontSize: 18, color: "#CBD5E1" }} />
                          </IconButton>
                        </Box>

                        <Typography sx={{ fontSize: "0.9rem", color: themePalette.textSecondary, mb: 2, lineHeight: 1.6 }}>
                          {item.message || "Notification received successfully."}
                        </Typography>

                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <Chip
                            label={item.ServiceType || "info"}
                            size="small"
                            sx={{
                              bgcolor: config.bg,
                              color: config.color,
                              fontWeight: 700,
                              fontSize: "0.65rem",
                              textTransform: "uppercase",
                              borderRadius: "8px",
                              border: "none",
                            }}
                          />
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <AccessTimeRoundedIcon sx={{ fontSize: 14, color: "#94A3B8" }} />
                            <Typography sx={{ fontSize: "0.75rem", color: "#94A3B8", fontWeight: 600 }}>
                              {item.created_at || "Just now"}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Paper>
                </Grow>
              );
            })
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Notification;