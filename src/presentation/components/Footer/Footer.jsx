import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowUp,
  Mail,
} from "lucide-react";

import "./Footer.css";

/* =========================================================
   SOCIAL ICONS
========================================================= */

const GitHubIcon = ({ size = 17 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M15 22V18.87C15.04 17.9 14.7 16.95 14.05 16.25C18.05 15.8 22 14.29 22 8.3C21.9997 6.76 21.42 5.28 20.38 4.15C20.89 2.86 20.85 1.42 20.27 0.16C20.27 0.16 18.91 -0.27 15.5 2.06C12.64 1.3 9.36 1.3 6.5 2.06C3.09 -0.27 1.73 0.16 1.73 0.16C1.15 1.42 1.11 2.86 1.62 4.15C0.58 5.28 0 6.76 0 8.3C0 14.28 3.95 15.79 7.95 16.25C7.3 16.94 6.96 17.89 7 18.87V22"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <path
      d="M7 19C3.67 20 3.33 17.5 2 17"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LinkedInIcon = ({ size = 17 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M16 8C18.76 8 21 10.24 21 13V21H17V13C17 12.45 16.55 12 16 12C15.45 12 15 12.45 15 13V21H11V13C11 10.24 13.24 8 16 8Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <path
      d="M3 9H7V21H3V9Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <path
      d="M5 6C6.1 6 7 5.1 7 4C7 2.9 6.1 2 5 2C3.9 2 3 2.9 3 4C3 5.1 3.9 6 5 6Z"
      stroke="currentColor"
      strokeWidth="1.7"
    />
  </svg>
);

const InstagramIcon = ({ size = 17 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="5"
      stroke="currentColor"
      strokeWidth="1.7"
    />

    <circle
      cx="12"
      cy="12"
      r="4"
      stroke="currentColor"
      strokeWidth="1.7"
    />

    <circle
      cx="17.5"
      cy="6.5"
      r="1"
      fill="currentColor"
    />
  </svg>
);

/* =========================================================
   FOOTER
========================================================= */

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const navLinks = [
    {
      label: "About",
      href: "#about",
    },
    {
      label: "Services",
      href: "#services",
    },
    {
      label: "Skills",
      href: "#skills",
    },
    {
      label: "Work",
      href: "#work",
    },
    {
      label: "Contact",
      href: "#contact",
    },
  ];

  const socials = [
    {
      label: "GitHub",
      href: "https://github.com/Sufiyan12345",
      icon: GitHubIcon,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/sufiyan-khan-604a222ab/",
      icon: LinkedInIcon,
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/sufiyannn____19/",
      icon: InstagramIcon,
    },
    {
      label: "Email",
      href: "mailto:skhan367227@gmail.com",
      icon: Mail,
    },
  ];

  return (
    <footer className="footer-section">

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="footer-glow footer-glow-one" />
      <div className="footer-glow footer-glow-two" />
      <div className="footer-grid" />

      <div className="footer-container">

        {/* ===================================================
            MAIN FOOTER
        =================================================== */}

        <div className="footer-main">

          {/* BRAND */}

          <motion.div
            className="footer-brand"
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <a
              href="#home"
              className="footer-logo"
            >
              SUFIYAN<span>.</span>
            </a>

            <p className="footer-description">
              Developer focused on building modern,
              scalable and meaningful digital experiences.
            </p>

            <a
              href="mailto:hello@sufiyankhan.dev"
              className="footer-email"
            >
              hello@sufiyankhan.dev

              <ArrowUpRight size={16} />
            </a>
          </motion.div>

          {/* NAVIGATION */}

          <motion.div
            className="footer-column"
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.7,
              delay: 0.1,
            }}
          >
            <span className="footer-label">
              NAVIGATION
            </span>

            <nav className="footer-nav">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                >
                  <span>
                    {link.label}
                  </span>

                  <ArrowUpRight size={14} />
                </a>
              ))}
            </nav>
          </motion.div>

          {/* SOCIALS */}

          <motion.div
            className="footer-column"
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.7,
              delay: 0.2,
            }}
          >
            <span className="footer-label">
              CONNECT
            </span>

            <div className="footer-socials">
              {socials.map((social) => {
                const Icon = social.icon;

                const isExternal =
                  social.href.startsWith("http");

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={
                      isExternal
                        ? "_blank"
                        : undefined
                    }
                    rel={
                      isExternal
                        ? "noopener noreferrer"
                        : undefined
                    }
                    aria-label={social.label}
                  >
                    <Icon size={17} />

                    <span>
                      {social.label}
                    </span>

                    <ArrowUpRight size={13} />
                  </a>
                );
              })}
            </div>
          </motion.div>

        </div>

        {/* ===================================================
            BIG STATEMENT
        =================================================== */}

        <motion.div
          className="footer-statement"
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.8,
            delay: 0.15,
          }}
        >
          <span>
            LET'S CREATE
          </span>

          <h2>
            SOMETHING
            <br />

            <span>
              MEANINGFUL.
            </span>
          </h2>
        </motion.div>

        {/* ===================================================
            BOTTOM BAR
        =================================================== */}

        <div className="footer-bottom">

          {/* COPYRIGHT */}

          <div className="footer-copyright">
            <span>
              © 2026 Sufiyan Khan
            </span>

            <span className="footer-dot" />

            <span>
              All rights reserved.
            </span>
          </div>

          {/* TECHNOLOGY */}

          <div className="footer-tech">
            <span>
              BUILT WITH
            </span>

            <span className="footer-tech-value">
              REACT.JS
            </span>

            <span className="footer-dot" />

            <span className="footer-tech-value">
              FRAMER MOTION
            </span>
          </div>

          {/* BACK TO TOP */}

          <motion.button
            className="back-to-top"
            onClick={scrollToTop}
            whileHover={{
              y: -4,
            }}
            whileTap={{
              scale: 0.94,
            }}
            aria-label="Back to top"
          >
            <span>
              BACK TO TOP
            </span>

            <ArrowUp size={15} />
          </motion.button>

        </div>

      </div>
    </footer>
  );
};

export default Footer;