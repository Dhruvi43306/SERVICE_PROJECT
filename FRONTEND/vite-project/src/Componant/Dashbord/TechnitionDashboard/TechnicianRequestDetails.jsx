import React, { Component } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import TimelineIcon from "@mui/icons-material/Timeline";

class TechnicianRequestDetails extends Component {
  state = { showConfirm: false };

  render() {
    return (
      <Box className="urs3-container">
        <Typography className="urs3-page-heading">
          Technician Request Details
        </Typography>

        <Paper className="urs3-main-card">
          <Grid container spacing={5}>
            {/* LEFT SECTION */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Box className="urs3-left-panel">
                {/* HEADER */}
                <Box className="urs3-header-block">
                  <Typography className="urs3-request-id">
                    <AssignmentIcon fontSize="small" /> SR-10245
                  </Typography>

                  <Typography className="urs3-request-title">
                    Email Service Not Working
                  </Typography>

                  <Box className="urs3-chip-row">
                    <Chip label="High Priority" className="urs3-chip-priority" />
                    <Chip label="Impact: Business Critical" />
                    <Chip label="IT Support" />
                  </Box>
                </Box>

                <Divider className="urs3-divider" />

                {/* DETAILS */}
                <Grid container spacing={4} className="urs3-details-block">
                  <Grid size={{ xs: 6}}>
                    <Typography className="urs3-label">Requester</Typography>
                    <Typography className="urs3-value">
                      <PersonIcon fontSize="small" /> Ankit Sharma
                    </Typography>
                  </Grid>

                  <Grid size={{ xs: 6}}>
                    <Typography className="urs3-label">Assigned To</Typography>
                    <Typography className="urs3-value">
                      Rahul (Technician)
                    </Typography>
                  </Grid>

                  <Grid size={{ xs: 6}}>
                    <Typography className="urs3-label">Created On</Typography>
                    <Typography className="urs3-value">
                      02 Jan 2026
                    </Typography>
                  </Grid>

                  <Grid size={{ xs: 6}}>
                    <Typography className="urs3-label">SLA Due</Typography>
                    <Typography className="urs3-value urs3-sla">
                      04 Jan 2026 – 5:00 PM
                    </Typography>
                  </Grid>
                </Grid>

                <Divider className="urs3-divider" />

                {/* DESCRIPTION */}
                <Box className="urs3-description-block">
                  <Typography className="urs3-section-title">
                    Issue Description
                  </Typography>
                  <Typography className="urs3-description-text">
                    User is unable to send or receive emails using Outlook.
                    Issue impacts daily business communication.
                  </Typography>
                </Box>

                {/* TIMELINE */}
                <Box className="urs3-timeline-block">
                  <Typography className="urs3-section-title">
                    <TimelineIcon fontSize="small" /> Status Timeline
                  </Typography>

                  <Box className="urs3-timeline-row">
                    <span className="urs3-step done">Requested</span>
                    <span className="urs3-step active">In Progress</span>
                    <span className="urs3-step">Completed</span>
                  </Box>
                </Box>
              </Box>
            </Grid>

            {/* RIGHT SECTION */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Box className="urs3-action-panel">
                <Typography className="urs3-action-title">
                  Technician Actions
                </Typography>

                <Box className="urs3-status-box">
                  <Typography className="urs3-label">
                    Current Status
                  </Typography>
                  <Chip
                    label="In Progress"
                    className="urs3-status-chip"
                  />
                </Box>

                <Box className="urs3-notes-box">
                  <TextField
                    label="Internal Notes (Technician Only)"
                    multiline
                    rows={4}
                    fullWidth
                    disabled
                    placeholder="Diagnosis, actions taken, next steps..."
                  />
                </Box>

                {/* DIFFERENT COLOR BUTTON */}
                <Button
                  fullWidth
                  className="urs3-action-btn"
                  onClick={() => this.setState({ showConfirm: true })}
                >
                  Change Request Status
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* CONFIRM MODAL */}
        <Dialog
          open={this.state.showConfirm}
          onClose={() => this.setState({ showConfirm: false })}
        >
          <DialogTitle>Confirm Status Change</DialogTitle>
          <DialogContent>
            <Typography>
              Do you want to mark this request as <b>Completed</b>?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({ showConfirm: false })}>
              Cancel
            </Button>
            <Button variant="contained" color="success">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }
}

export default TechnicianRequestDetails;
