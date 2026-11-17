import React from "react";
import { motion } from "framer-motion";

import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Database,
  Globe,
  Layers3,
  Mail,
  Sparkles,
} from "lucide-react";

import Navbar from "../../components/Navbar/Navbar";
import About from "../../components/About/About";
import Services from "../../components/Services/Services";
import Skills from "../../components/Skills/Skills";
import Journey from "../../components/Journey/Journey";
import WhyWorkWithMe from "../../components/WhyWorkWithMe/WhyWorkWithMe";
import Projects from "../../components/Projects/Projects";
import Contact from "../../components/Contact/Contact";
import Footer from "../../components/Footer/Footer";

import "./Home.css";

/* =========================================================
   TECHNOLOGY CARDS
========================================================= */

const techItems = [
  {
    label: "REACT",
    icon: Code2,
    position: "tech-card-react",
  },
  {
    label: "NODE.JS",
    icon: Layers3,
    position: "tech-card-node",
  },
  {
    label: "MONGODB",
    icon: Database,
    position: "tech-card-mongo",
  },
];

/* =========================================================
   SOCIAL LINKS
========================================================= */

const socialItems = [
  {
    label: "GitHub",
    type: "github",
    href: "https://github.com/Sufiyan12345",
  },
  {
    label: "LinkedIn",
    type: "linkedin",
    href: "https://www.linkedin.com/in/sufiyan-khan-604a222ab/",
  },
  {
    label: "Instagram",
    type: "instagram",
    href: "https://www.instagram.com/sufiyannn____19/",
  },
  {
    label: "Email",
    type: "email",
    href: "mailto:skhan367227@gmail.com",
  },
];
/* =========================================================
   SOCIAL ICONS
========================================================= */

const GitHubIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.725-4.043-1.61-4.043-1.61-.546-1.385-1.333-1.754-1.333-1.754-1.089-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.045.138 3.003.404 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.62-5.475 5.92.435.375.81 1.11.81 2.235 0 1.61-.015 2.91-.015 3.3 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 24 5.373 18.627 0 12 0Z" />
  </svg>
);

const LinkedInIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V8.98h3.42v1.57h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.34 7.41a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM3.56 20.45h3.56V8.98H3.56v11.47ZM22.22 0H1.78C.8 0 0 .8 0 1.78v20.44C0 23.2.8 24 1.78 24h20.44C23.2 24 24 .8 24 1.78V1.78C24 .8 23.2 0 22.22 0Z" />
  </svg>
);

const InstagramIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="5"
    />

    <circle
      cx="12"
      cy="12"
      r="4"
    />

    <circle
      cx="17.5"
      cy="6.5"
      r="0.8"
      fill="currentColor"
      stroke="none"
    />
  </svg>
);

const SocialIcon = ({ type }) => {
  switch (type) {
    case "github":
      return <GitHubIcon />;

    case "linkedin":
      return <LinkedInIcon />;

    case "instagram":
      return <InstagramIcon />;

    default:
      return <Mail size={18} />;
  }
};

/* =========================================================
   HOME
========================================================= */

const Home = () => {
  const scrollToSection = (id) => {
    const element = document.querySelector(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="home-page">
      {/* =================================================
          NAVBAR
      ================================================= */}

      <Navbar />

      <main>
        {/* =================================================
            HERO
        ================================================= */}

        <section
          id="home"
          className="hero-section"
        >
          {/* =================================================
              BACKGROUND
          ================================================= */}

          <div className="hero-background-grid" />
          <div className="hero-noise" />

          <motion.div
            className="hero-blue-glow hero-blue-glow-one"
            animate={{
              x: [0, 40, 0],
              y: [0, -25, 0],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="hero-blue-glow hero-blue-glow-two"
            animate={{
              x: [0, -35, 0],
              y: [0, 30, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* =================================================
              TOP META
          ================================================= */}

          <div className="hero-meta">
            <motion.div
              className="hero-availability"
              initial={{
                opacity: 0,
                y: -15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.25,
              }}
            >
              <span className="availability-dot" />

              <span>
                AVAILABLE FOR PROJECTS
              </span>
            </motion.div>

            <motion.div
              className="hero-location"
              initial={{
                opacity: 0,
                y: -15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.35,
              }}
            >
              <Globe size={13} />

              <span>
                INDIA / 2026
              </span>
            </motion.div>
          </div>

          {/* =================================================
              MAIN HERO CONTAINER
          ================================================= */}

          <div className="hero-container">
            {/* =================================================
                LEFT CONTENT
            ================================================= */}

            <div className="hero-content">
              {/* =================================================
                  EYEBROW
              ================================================= */}

              <motion.div
                className="hero-eyebrow"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.45,
                }}
              >
                <Sparkles size={14} />

                <span>
                  FULL-STACK DEVELOPER
                </span>
              </motion.div>

              {/* =================================================
                  HERO HEADING
              ================================================= */}

              <div className="hero-heading">
                <div className="hero-heading-line">
                  <motion.span
                    initial={{
                      opacity: 0,
                      y: 70,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.95,
                      delay: 0.55,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    I BUILD
                  </motion.span>
                </div>

                <div className="hero-heading-line">
                  <motion.span
                    className="hero-outline-text"
                    initial={{
                      opacity: 0,
                      y: 70,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.95,
                      delay: 0.68,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    DIGITAL
                  </motion.span>
                </div>

                <div className="hero-heading-line hero-heading-last">
                  <motion.span
                    initial={{
                      opacity: 0,
                      y: 70,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.95,
                      delay: 0.81,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    EXPERIENCES.
                  </motion.span>

                  <motion.span
                    className="hero-heading-dot"
                    initial={{
                      scale: 0,
                      opacity: 0,
                    }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                    }}
                    transition={{
                      duration: 0.45,
                      delay: 1.1,
                    }}
                  />
                </div>
              </div>

              {/* =================================================
                  DESCRIPTION + ACTIONS
              ================================================= */}

              <motion.div
                className="hero-lower"
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 1,
                }}
              >
                <div className="hero-description">
                  <p>
                    I design and develop modern websites,
                    applications and digital products where
                    creativity meets technology.
                  </p>
                </div>

                <div className="hero-actions">
                  <motion.button
                    type="button"
                    className="hero-primary-button"
                    onClick={() => scrollToSection("#work")}
                    whileHover={{
                      y: -3,
                      boxShadow:
                        "0 0 45px rgba(55, 135, 255, 0.32)",
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                  >
                    <span>
                      EXPLORE MY WORK
                    </span>

                    <span className="button-icon">
                      <ArrowUpRight size={17} />
                    </span>
                  </motion.button>

                  <motion.button
                    type="button"
                    className="hero-secondary-button"
                    onClick={() => scrollToSection("#contact")}
                    whileHover={{
                      y: -3,
                      borderColor:
                        "rgba(80, 150, 255, 0.45)",
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                  >
                    <span>
                      LET'S TALK
                    </span>
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* =================================================
                RIGHT VISUAL
            ================================================= */}

            <motion.div
              className="hero-visual-area"
              initial={{
                opacity: 0,
                scale: 0.92,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 1.1,
                delay: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="hero-visual">
                {/* =================================================
                    ROTATING RINGS
                ================================================= */}

                <motion.div
                  className="visual-ring visual-ring-one"
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 28,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                <motion.div
                  className="visual-ring visual-ring-two"
                  animate={{
                    rotate: -360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* =================================================
                    CORE
                ================================================= */}

                <div className="visual-core">
                  <div className="code-window">
                    <div className="code-window-top">
                      <div className="window-dots">
                        <span />
                        <span />
                        <span />
                      </div>

                      <span className="window-label">
                        developer.js
                      </span>
                    </div>

                    <div className="code-content">
                      <span className="code-line">
                        <i>const</i>{" "}
                        <b>developer</b> = {"{"}
                      </span>

                      <span className="code-line code-indent">
                        name:{" "}
                        <em>
                          "Sufiyan Khan"
                        </em>
                        ,
                      </span>

                      <span className="code-line code-indent">
                        role:{" "}
                        <em>
                          "Full-Stack Developer"
                        </em>
                        ,
                      </span>

                      <span className="code-line code-indent">
                        passion:{" "}
                        <em>
                          "Building"
                        </em>
                        ,
                      </span>

                      <span className="code-line">
                        {"}"};
                      </span>
                    </div>
                  </div>

                  <div className="visual-glow" />
                </div>

                {/* =================================================
                    FLOATING TECH CARDS
                ================================================= */}

                {techItems.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.label}
                      className={`hero-tech-card ${item.position}`}
                      initial={{
                        opacity: 0,
                        scale: 0.7,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        y:
                          index % 2 === 0
                            ? [0, -10, 0]
                            : [0, 10, 0],
                      }}
                      transition={{
                        opacity: {
                          duration: 0.6,
                          delay:
                            1.15 +
                            index * 0.15,
                        },

                        scale: {
                          duration: 0.6,
                          delay:
                            1.15 +
                            index * 0.15,
                        },

                        y: {
                          duration:
                            4 + index,
                          repeat:
                            Infinity,
                          ease:
                            "easeInOut",
                        },
                      }}
                      whileHover={{
                        scale: 1.08,
                      }}
                    >
                      <div className="tech-card-icon">
                        <Icon size={15} />
                      </div>

                      <span>
                        {item.label}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* =================================================
              SOCIAL DOCK
          ================================================= */}

          <motion.div
            className="hero-social-bar"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 1.25,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="social-intro">
              <span className="social-line" />

              <span>
                CONNECT
              </span>
            </div>

            <div className="social-links">
              {socialItems.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={
                    item.type === "email"
                      ? undefined
                      : "_blank"
                  }
                  rel={
                    item.type === "email"
                      ? undefined
                      : "noreferrer"
                  }
                  className="social-link"
                  aria-label={item.label}
                  whileHover={{
                    y: -3,
                  }}
                >
                  <span className="social-icon">
                    <SocialIcon
                      type={item.type}
                    />
                  </span>

                  <span className="social-name">
                    {item.label}
                  </span>

                  <ArrowUpRight
                    className="social-arrow"
                    size={13}
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* =================================================
              SCROLL INDICATOR
          ================================================= */}

          <motion.button
            type="button"
            className="hero-scroll"
            onClick={() =>
              scrollToSection("#about")
            }
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.8,
              delay: 1.55,
            }}
          >
            <span>
              SCROLL TO EXPLORE
            </span>

            <div className="hero-scroll-line">
              <motion.div
                animate={{
                  y: [0, 18, 0],
                  opacity: [
                    0.25,
                    1,
                    0.25,
                  ],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            <ArrowDown size={14} />
          </motion.button>
        </section>

        {/* =================================================
            ABOUT
        ================================================= */}

        <About />

        {/* =================================================
            SERVICES
        ================================================= */}

        <Services />

        {/* =================================================
            SKILLS
        ================================================= */}

        <Skills />

        {/* =================================================
            JOURNEY
        ================================================= */}

        <Journey />

        {/* =================================================
            WHY WORK WITH ME
        ================================================= */}

        <WhyWorkWithMe />

        {/* =================================================
            PROJECTS
        ================================================= */}

        <Projects />

        {/* =================================================
            CONTACT
        ================================================= */}

        <Contact />

        {/* =================================================
            FOOTER
        ================================================= */}

        <Footer />
      </main>
    </div>
  );
};

export default Home;