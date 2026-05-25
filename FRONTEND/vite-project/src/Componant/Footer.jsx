import React from "react";
import { Box, Grid, Typography, Link, Divider, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";


const Footer = () => {
  return (
    <Box className="mega-footer-root">

      {/* ===== TOP INTRO SECTION ===== */}
      <Box className="mega-footer-intro">
        <Typography className="mega-footer-brand">
          Service Management System
        </Typography>
        <Typography className="mega-footer-desc">
          Powerful customer support software built for modern businesses.
          Trusted by teams worldwide to deliver fast, reliable service.
        </Typography>
      </Box>

      {/* ===== LINK GRID SECTION ===== */}
      <Grid container spacing={6} className="mega-footer-grid">

        <Grid size={{ xs: 12, md: 2,sm:6 }}>
          <Typography className="mega-footer-title">Products</Typography>
          <Link className="mega-footer-link">Support Desk</Link>
          <Link className="mega-footer-link">Live Chat</Link>
          <Link className="mega-footer-link">AI Bots</Link>
          <Link className="mega-footer-link">Analytics</Link>
          <Link className="mega-footer-link">Integrations</Link>
        </Grid>

        <Grid size={{ xs: 12, md: 2,sm:6 }}>
          <Typography className="mega-footer-title">Solutions</Typography>
          <Link className="mega-footer-link">Enterprise</Link>
          <Link className="mega-footer-link">Startups</Link>
          <Link className="mega-footer-link">Education</Link>
          <Link className="mega-footer-link">Healthcare</Link>
          <Link className="mega-footer-link">E-commerce</Link>
        </Grid>

        <Grid size={{ xs: 12, md: 2,sm:6 }}>
          <Typography className="mega-footer-title">Developers</Typography>
          <Link className="mega-footer-link">API Docs</Link>
          <Link className="mega-footer-link">SDKs</Link>
          <Link className="mega-footer-link">Webhooks</Link>
          <Link className="mega-footer-link">Open Source</Link>
          <Link className="mega-footer-link">Status</Link>
        </Grid>

        <Grid size={{ xs: 12, md: 2,sm:6 }}>
          <Typography className="mega-footer-title">Resources</Typography>
          <Link className="mega-footer-link">Help Center</Link>
          <Link className="mega-footer-link">Community</Link>
          <Link className="mega-footer-link">Guides</Link>
          <Link className="mega-footer-link">Webinars</Link>
          <Link className="mega-footer-link">Blog</Link>
        </Grid>

        <Grid size={{ xs: 12, md: 2,sm:6 }}>
          <Typography className="mega-footer-title">Company</Typography>
          <Link className="mega-footer-link">About</Link>
          <Link className="mega-footer-link">Careers</Link>
          <Link className="mega-footer-link">Partners</Link>
          <Link className="mega-footer-link">Press</Link>
          <Link className="mega-footer-link">Contact</Link>
          <Link className="mega-footer-link">Location</Link>
          {/* <Link className="mega-footer-link">Newsroom</Link>
          <Link className="mega-footer-link">Blog</Link>
          <Link className="mega-footer-link">Artifical Intelligence</Link>
          <Link className="mega-footer-link">code of ethics</Link>
          <Link className="mega-footer-link">Supplier</Link> */}

        </Grid>

        <Grid size={{ xs: 12, md: 2,sm:6 }}>
          <Typography className="mega-footer-title">Connect</Typography>
          <Typography className="mega-footer-small">
            Available 24/7 worldwide
          </Typography>

          <Box className="mega-footer-socials">
            <IconButton><FacebookIcon /></IconButton>
            <IconButton><TwitterIcon /></IconButton>
            <IconButton><LinkedInIcon /></IconButton>
            <IconButton><InstagramIcon /></IconButton>
          </Box>
        </Grid>

      </Grid>

      <Divider className="mega-footer-divider" />

      {/* ===== BOTTOM BAR ===== */}
      <br/>
      <Box className="mega-footer-bottom">
        <Typography className="mega-footer-copy">
          © 2025 Service Management System. All rights reserved.
        </Typography>

        <Box className="mega-footer-policy">
          <Link className="mega-footer-policy-link">Privacy Policy</Link>
          <Link className="mega-footer-policy-link">Terms</Link>
          <Link className="mega-footer-policy-link">Security</Link>
          <Link className="mega-footer-policy-link">Accessibility</Link>
        </Box>
      </Box>

    </Box>
  );
};

export default Footer;
