import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Button, Container, Stack,CardContent } from "@mui/material";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ArrowForward, Bolt, Visibility, InsertChart, Shield } from '@mui/icons-material';

function Header() {
  const [buttonType,setbuttonType] = useState("signup")
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = 5;
    const slideDuration = 5000;
  
    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }, slideDuration);
      return () => clearInterval(timer);
    }, []);
  
    const slides = [
      { label: 'Delivery', badge: 'Efficiency', h2: 'Operational', accent: 'Excellence', desc: 'Streamlining complex workflows with high-precision monitoring and automated recovery protocols.', img: 'public/i58.jpg' },
      { label: 'Strategy', badge: 'Alignment', h2: 'Strategic', accent: 'Partnership', desc: 'Bridging the gap between technical capability and business objectives through synchronized planning.', img: 'public/i52.jpg' },
      { label: 'Culture', badge: 'Leadership', h2: 'Mentorship &', accent: 'Guidance', desc: 'Empowering teams through expert-led sessions and a robust framework for professional growth.', img: 'public/i56.jpg' },
      { label: 'Insights', badge: 'Analytics', h2: 'Data-Driven', accent: 'Intelligence', desc: 'Transforming raw service metrics into actionable executive insights for continuous optimization.', img: 'public/i54.jpg' },
      { label: 'Innovation', badge: 'R&D', h2: 'Transformative', accent: 'Solutions', desc: 'Pioneering next-generation IT architectures to stay ahead of evolving market demands.', img: 'public/i51.jpg' }
    ];

  return (
    <div className="light-theme-wrapper">
      {/* --- HERO SECTION --- */}
      <section className="hero-lite">
        <Container maxWidth="lg">
          <Stack spacing={3} alignItems="center">
            <div className="hero-pill-lite">
              <Sparkles size={16} color="#3b82f6" />
              <span>Smart Solutions for Modern Teams</span>
            </div>
            <h1 className="hero-title-lite">
              Service Management <br />
              <span className="text-highlight-blue">Made Simple</span>
            </h1>
            <p className="hero-subtitle-lite">
              Our service portal helps you raise requests, track status, and get support 
              faster with complete transparency and efficiency.
            </p>
               <div className="hero-cta-group">
              {buttonType == 'signup'?(
                <button
                  className="btn-main"
                  onClick={() => navigate("/SignUp")}
                >
                  Get Started
                </button>
              ):(
                <button
                  className="btn-main"
                  onClick={() => navigate("/Login")}
                >
                  Login
                </button>
              )}
              <button className="btn-ghost">View Demo</button>
            </div>
          </Stack>
        </Container>
      </section>

     <Box className="main">
        <div className="scroll-container">
          <div className="scroll-content">
            <div className="item h-tall">
              <img src="/i46.jpg" alt="Tall" />
            </div>

            <div className="item h-short">
              <video
                src="/video/v1.mp4"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>

            <div className="item h-medium">
              <img src="/i3.jpg" alt="Medium" />
            </div>

            <div className="item h-tall">
              <img src="/i47.jpg" alt="Tall" />
            </div>

            <div className="item h-short">
              <video
                src="/video/v2.mp4"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>

            <div className="item h-medium">
              <img src="/i55.jpg" alt="Medium" />
            </div>
          </div>
        </div>
      </Box>
     <Box>
      <div className="vchenu">
      <h1>The World Works with Service Now.</h1>
         <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 2 }}>
      <img src="/i67.jpg" style={{height:"200px",marginLeft:'200px'}}></img>
      </Grid>
      <Grid size={{ xs: 12, md: 2 }}>
      <img src="/i73.jpg" style={{height:"200px",marginLeft:'200px'}}></img>
</Grid>
   <Grid size={{ xs: 12, md: 2 }}>
      <img src="/i71.jpg" style={{height:"200px",marginLeft:'200px'}}></img>
</Grid>
 <Grid size={{ xs: 12, md: 2 }}>
      <img src="/i74.jpg" style={{height:"200px",marginLeft:'200px'}}></img>
</Grid>
</Grid>
      </div>
     </Box>
      

     <Box className="content-1">
   <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 4 }}>
        <div className="img-box">
        <img src="/i59.jpg" alt="i38" />
           <div className="overlay">
            <h3>What is workflow in service??</h3>
             
          </div>
        <CardContent className="content-header">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            <h1>Smart Workflow & Service Management</h1>
          Empower your teams with a centralized platform to design, manage, and 
          optimize workflows seamlessly. Collaborate in real time, track service requests
          efficiently, and gain actionable insights through visual dashboards—helping your organization deliver faster, smarter, and more reliable services.
            </Typography>
          </CardContent>
          </div>
         
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
          <div className="img-box">
        <img src="/i53.jpg" alt="i53"  />
           <div className="overlay">
            <h3>What is plateform in service??</h3>
          </div>
          <CardContent className="content-header">
          <Typography variant="body2"sx={{ color: 'text.secondary' }}>
            <h1>Intelligent Service Operations Platform</h1>
        service operations with structured workflows, real-time collaboration, and data-driven 
        decision-making. Our platform enables teams to analyze processes,and continuously improve service performance across departments.
        Simplify service management with intelligent workflows and collaboration tools that keep your team focused.
      
            </Typography>
          </CardContent>
          </div>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
           <div className="img-box">
          <img src="/i57.jpg" alt="i41"  />
          <div className="overlay">
            <h3>Why is easy to use??</h3>
          </div>
          <CardContent className="content-header">
          <Typography variant="body2"sx={{ color: 'text.secondary' }}>
            <h1>Work Smarter, Not Harder and Simple & User-Friendly</h1>
             Plan, track, and improve your services in one place. With clear workflows and 
             collaborative tools, your team stays aligned and delivers better results—every time.
             Manage all your services in one place with ease. Clear workflows and collaborative tools help your team stay organized, 
             work faster, and achieve better outcomes with less effort
             </Typography>
          </CardContent>
          </div>
      </Grid>
    </Grid>
    </Box> 
    <div className="lume-premium-viewport">
      {/* Dynamic Ambient Background */}
      <div className="lume-ambient-bg">
        <div className="lume-glow-1"></div>
        <div className="lume-glow-2"></div>
      </div>

      <div className="lume-executive-card">
        <div className="lume-split-layout">
          
          {/* Left: Content with Staggered Animation */}
          <div className="lume-content-section">
            {slides.map((slide, idx) => (
              currentSlide === idx && (
                <div key={idx} className="lume-anim-group">
                  <div className="lume-meta-tag">{slide.badge}</div>
                  <h1 className="lume-main-heading">
                    {slide.h2} <br />
                    <span className="lume-gradient-text">{slide.accent}</span>
                  </h1>
                  <p className="lume-subtext">{slide.desc}</p>
                  <div className="lume-cta-area">
                    <button className="lume-btn-filled">Explore Solution</button>
                    <button className="lume-btn-outline">Documentation</button>
                  </div>
                </div>
              )
            ))}
          </div>

          {/* Right: Immersive Image Layer */}
          <div className="lume-image-section">
            <div className="lume-image-stack">
              {slides.map((slide, idx) => (
                <img 
                  key={idx}
                  src={slide.img} 
                  alt="" 
                  className={`lume-stack-img ${currentSlide === idx ? 'visible' : ''}`} 
                />
              ))}
            </div>
            {/* Geometric Accent */}
            <div className="lume-deco-ring"></div>
          </div>
        </div>

        {/* Global Navigation Stepper */}
        <nav className="lume-stepper">
          {slides.map((slide, idx) => (
            <div 
              key={idx} 
              className={`lume-step ${currentSlide === idx ? 'active' : ''}`}
              onClick={() => setCurrentSlide(idx)}
            >
              <div className="lume-step-info">
                <span className="lume-step-num">0{idx + 1}</span>
                <span className="lume-step-text">{slide.label}</span>
              </div>
              <div className="lume-step-bar">
                <div className="lume-step-progress" style={{ animationDuration: `${slideDuration}ms` }}></div>
              </div>
            </div>
          ))}
        </nav>
      </div>
    </div>
<Grid container spacing={3} alignItems="center"className="feature-section">
  <Grid size={{ xs: 12, md: 6 }}>
    <div className="feature-image">
      <img src="/i27.jpg" alt="Real-time dashboard" />
    </div>
  </Grid>

  <Grid size={{ xs: 12, md: 6 }}>
    <div className="feature-content">
      <h1>Real-Time Dashboards & Analytics</h1>
      <p>
        Get instant visibility into your service operations with dynamic,
        real-time dashboards. <br/>Track live service requests, performance metrics,
        and operational KPIs—all<br/> in one intuitive view.
      </p>
      <p>
        Visual charts and smart analytics transform complex data into clear
        insights,<br/> helping teams identify trends, monitor progress, and make
        faster, data-driven decisions.
      </p>
    </div>
  </Grid>
</Grid>

<Grid container spacing={3} alignItems="center"className="feature-section">
<Grid size={{ xs: 12, md: 6 }}>
    <div className="feature-content">
      <h1>Visual Analytics for Performance Tracking</h1>
      <p>Visual analytics transform service data into clear, interactive charts 
    and dashboards that make performance easy to understand.<br/> Instead of scanning 
    raw numbers, teams can instantly see trends,<br/> progress, and problem areas through 
    intuitive visual representations.
      </p>
      <p>
    Real-time graphs, KPIs, and comparative insights help monitor service efficiency,<br/>
    identify bottlenecks, and measure team performance across departments.
      </p>
    </div>
  </Grid>
    <Grid size={{ xs: 12, md: 6 }}>
    <div className="feature-image">
      <img src="/i18.jpg" alt="Real-time dashboard" />
    </div>
  </Grid>
</Grid>

       <Box className="lume-wrapper">
         {/* Texture Overlay for that premium paper feel */}
         <div className="lume-noise"></div>
         
         {/* Advanced Ambient Background */}
         <div className="lume-bg-container">
           <div className="lume-blob blob-cyan"></div>
           <div className="lume-blob blob-purple"></div>
           <div className="lume-blob blob-orange"></div>
         </div>
   
         <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10 }}>
           {/* Animated Hero Header */}
           <Box textAlign="center" mb={12} className="lume-hero-reveal">
             <h1 className="lume-main-title">
               The Intelligence <br /> 
               <span className="lume-gradient-text">Behind Every Ticket.</span>
             </h1>
             <p className="lume-main-subtitle">
               Move beyond manual triage. Our autonomous engine fulfillment 
               system handles the chaos so your team can focus on the solution.
             </p>
           </Box>
   
           <Grid container spacing={4}>
             {/* Feature 1: The Power Card */}
             <Grid size={{ xs: 12, md: 8 }}>
               <div className="lume-glass-card lume-card-hero">
                 <div className="card-shine"></div>
                 <div className="lume-card-inner">
                   <div className="lume-row">
                     <div className="lume-col">
                       <div className="lume-icon-halo mint">
                         <Bolt fontSize="large" />
                       </div>
                       <span className="lume-label">Core Engine</span>
                       <h2 className="lume-h2">Smart <span className="text-mint">Ticketing</span></h2>
                       <p className="lume-p">
                         Using neural NLP to categorize, prioritize, and assign 
                         requests in under 400ms.
                       </p>
                       <Button variant="contained" endIcon={<ArrowForward />} className="lume-btn-solid">
                         Launch Dashboard
                       </Button>
                     </div>
                     <div className="lume-visual-element">
                        {/* Floating UI simulation */}
                        <div className="ui-float-card">99% Accuracy</div>
                        <div className="ui-float-card-2">4.2m saved</div>
                     </div>
                   </div>
                 </div>
               </div>
             </Grid>
   
             {/* Feature 2: High Visibility */}
             <Grid size={{ xs: 12, md: 4 }}>
               <div className="lume-glass-card">
                 <div className="lume-card-inner center">
                   <div className="lume-icon-halo blue">
                     <Visibility fontSize="medium" />
                   </div>
                   <h3 className="lume-h3">Global Asset View</h3>
                   <p className="lume-p-sm">Every device. Every license. One pane of glass.</p>
                   <div className="lume-graph-bars">
                     <div className="bar" style={{height: '40%'}}></div>
                     <div className="bar" style={{height: '70%'}}></div>
                     <div className="bar" style={{height: '55%'}}></div>
                     <div className="bar" style={{height: '90%'}}></div>
                   </div>
                 </div>
               </div>
             </Grid>
   
             {/* Feature 3: Analytics */}
             <Grid size={{ xs: 12, md: 4 }}>
               <div className="lume-glass-card">
                 <div className="lume-card-inner">
                   <div className="lume-icon-halo amber">
                     <InsertChart fontSize="medium" />
                   </div>
                   <h3 className="lume-h3">SLA Predictions</h3>
                   <p className="lume-p-sm">Predictive analytics that stop bottlenecks before they happen.</p>
                 </div>
               </div>
             </Grid>
   
             {/* Feature 4: Security (Modern Stripe-Style Card) */}
             <Grid size={{ xs: 12, md: 8 }}>
               <div className="lume-glass-card lume-security-card">
                 <div className="lume-card-inner split">
                   <div>
                      <div className="lume-icon-halo purple">
                         <Shield />
                      </div>
                      <h3 className="lume-h3">Security-First Infrastructure</h3>
                      <p className="lume-p-sm">Bank-grade encryption for all service fulfillment data.</p>
                   </div>
                   <div className="lume-cert-grid">
                      <div className="cert-tag">ISO 27001</div>
                      <div className="cert-tag">SOC2 Type II</div>
                      <div className="cert-tag">GDPR</div>
                   </div>
                 </div>
               </div>
             </Grid>
           </Grid>
         </Container>
       </Box>
     

<div className="recognize">
  <img src="/i42.jpg"/>
</div>
</div>
  );
}

export default Header;