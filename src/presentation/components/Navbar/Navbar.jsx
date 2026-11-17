import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

import "./Navbar.css";

/* =========================================================
   NAVIGATION ITEMS
========================================================= */

const navItems = [
  {
    label: "Work",
    href: "#work",
  },
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Services",
    href: "#services",
  },
  {
    label: "Contact",
    href: "#contact",
  },
];

/* =========================================================
   NAVBAR
========================================================= */

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = (id) => {
    const element = document.querySelector(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setMenuOpen(false);
  };

  return (
    <motion.header
      className="navbar"
      initial={{
        y: -40,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* =================================================
          NAVBAR INNER
      ================================================= */}

      <div className="navbar-inner">
        {/* =================================================
            LOGO
        ================================================= */}

        <button
          type="button"
          className="navbar-logo"
          onClick={() => handleScroll("#home")}
          aria-label="Go to home"
        >
          <span className="logo-mark">S</span>

          <span className="logo-name">
            SUFIYAN
          </span>
        </button>

        {/* =================================================
            DESKTOP NAVIGATION
        ================================================= */}

        <nav className="navbar-nav">
          {navItems.map((item) => (
            <button
              type="button"
              key={item.label}
              className="nav-link"
              onClick={() => handleScroll(item.href)}
            >
              <span>{item.label}</span>

              <ArrowUpRight size={14} />
            </button>
          ))}
        </nav>

        {/* =================================================
            DESKTOP CTA
        ================================================= */}

        <button
          type="button"
          className="navbar-cta"
          onClick={() => handleScroll("#contact")}
        >
          <span>Let's talk</span>

          <ArrowUpRight size={16} />
        </button>

        {/* =================================================
            MOBILE MENU BUTTON
        ================================================= */}

        <button
          type="button"
          className="mobile-menu-button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <X size={22} />
          ) : (
            <Menu size={22} />
          )}
        </button>
      </div>

      {/* =================================================
          MOBILE MENU
      ================================================= */}

      <motion.div
        className={`mobile-menu ${
          menuOpen ? "mobile-menu-open" : ""
        }`}
        initial={false}
        animate={{
          height: menuOpen ? "auto" : 0,
          opacity: menuOpen ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <div className="mobile-menu-inner">
          {navItems.map((item) => (
            <button
              type="button"
              key={item.label}
              className="mobile-nav-link"
              onClick={() => handleScroll(item.href)}
            >
              <span>{item.label}</span>

              <ArrowUpRight size={17} />
            </button>
          ))}

          <button
            type="button"
            className="mobile-contact"
            onClick={() => handleScroll("#contact")}
          >
            Let's talk
          </button>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Navbar;