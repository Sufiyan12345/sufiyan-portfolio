import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Mail,
  MapPin,
  Send,
  Sparkles,
} from "lucide-react";

import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (status) {
      setStatus("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setStatus("sending");

    try {
      const response = await fetch(
        "http://localhost:5000/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to send message."
        );
      }

      setStatus("success");

      setFormData({
        name: "",
        email: "",
        projectType: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);

      setStatus("error");
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-grid" />

      <div className="contact-glow contact-glow-one" />
      <div className="contact-glow contact-glow-two" />

      <div className="contact-container">

        {/* ============================================
            HEADER
        ============================================ */}

        <motion.div
          className="contact-header"
          initial={{
            opacity: 0,
            y: 40,
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
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="contact-label">
            <span className="contact-label-line" />

            <div>
              <Sparkles size={12} />
              <span>07 / CONTACT</span>
            </div>
          </div>

          <div className="contact-heading-row">
            <div className="contact-title">
              <h2>
                Let's build
                <br />
                <span>something.</span>
              </h2>
            </div>

            <div className="contact-intro">
              <span>START A CONVERSATION</span>

              <p>
                Have an idea, a business requirement or
                a digital product in mind? Let's turn the
                concept into something real.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ============================================
            CONTACT CONTENT
        ============================================ */}

        <div className="contact-content">

          {/* ==========================================
              LEFT SIDE
          ========================================== */}

          <motion.div
            className="contact-info"
            initial={{
              opacity: 0,
              x: -35,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.8,
            }}
          >
            <div className="contact-info-top">
              <span>AVAILABLE FOR PROJECTS</span>

              <div className="availability">
                <span className="availability-dot" />
                <span>OPEN TO DISCUSS</span>
              </div>
            </div>

            <div className="contact-info-main">
              <p>
                Let's talk about what
                you're building.
              </p>

              <a
                href="mailto:skhan367227@gmail.com"
                className="contact-email"
              >
                <span>
                  hello@sufiyankhan.dev
                </span>

                <ArrowUpRight size={18} />
              </a>
            </div>

            <div className="contact-details">

              <div className="contact-detail">
                <div className="contact-detail-icon">
                  <Mail size={16} />
                </div>

                <div>
                  <span>EMAIL</span>
                  <p>
                    skhan367227@gmail.com
                  </p>
                </div>
              </div>

              <div className="contact-detail">
                <div className="contact-detail-icon">
                  <MapPin size={16} />
                </div>

                <div>
                  <span>LOCATION</span>
                  <p>India</p>
                </div>
              </div>

            </div>

            <div className="contact-socials">
              <span>SOCIAL</span>

              <div className="social-links">

                <a
                  href="https://github.com/Sufiyan12345"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                  <ArrowUpRight size={13} />
                </a>

                <a
                  href="https://www.linkedin.com/in/sufiyan-khan-604a222ab/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                  <ArrowUpRight size={13} />
                </a>

                <a
                  href="https://www.instagram.com/sufiyannn____19/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                  <ArrowUpRight size={13} />
                </a>

              </div>
            </div>
          </motion.div>

          {/* ==========================================
              FORM
          ========================================== */}

          <motion.div
            className="contact-form-wrapper"
            initial={{
              opacity: 0,
              x: 35,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.8,
              delay: 0.1,
            }}
          >
            <div className="form-header">
              <div>
                <span>PROJECT INQUIRY</span>

                <h3>
                  Tell me about
                  <br />
                  your project.
                </h3>
              </div>

              <div className="form-number">
                07
              </div>
            </div>

            <form onSubmit={handleSubmit}>

              {/* NAME + EMAIL */}

              <div className="form-row">

                <div className="form-group">
                  <label htmlFor="name">
                    YOUR NAME
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    EMAIL ADDRESS
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                  />
                </div>

              </div>

              {/* PROJECT TYPE */}

              <div className="form-group">
                <label htmlFor="projectType">
                  PROJECT TYPE
                </label>

                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select project type
                  </option>

                  <option value="web-design">
                    Web Design
                  </option>

                  <option value="frontend">
                    Frontend Development
                  </option>

                  <option value="full-stack">
                    Full-Stack Development
                  </option>

                  <option value="business">
                    Business Website
                  </option>

                  <option value="other">
                    Other
                  </option>
                </select>
              </div>

              {/* MESSAGE */}

              <div className="form-group">
                <label htmlFor="message">
                  PROJECT DETAILS
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  placeholder="Tell me a little about your idea..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* SUBMIT */}

              <button
                type="submit"
                className="contact-submit"
                disabled={status === "sending"}
              >
                <span>
                  {status === "sending"
                    ? "SENDING..."
                    : "SEND MESSAGE"}
                </span>

                <div className="submit-icon">
                  <Send size={16} />
                </div>
              </button>

              {/* SUCCESS */}

              {status === "success" && (
                <motion.div
                  className="form-status success"
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                >
                  <CheckCircle2 size={15} />

                  <span>
                    Thanks! Your message has been
                    received successfully.
                  </span>
                </motion.div>
              )}

              {/* ERROR */}

              {status === "error" && (
                <motion.div
                  className="form-status error"
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                >
                  <span>
                    Something went wrong. Please try
                    again in a moment.
                  </span>
                </motion.div>
              )}

            </form>
          </motion.div>

        </div>

        {/* ============================================
            BOTTOM CTA
        ============================================ */}

        <motion.div
          className="contact-bottom"
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
            delay: 0.2,
          }}
        >
          <span>
            HAVE AN IDEA?
          </span>

          <div className="contact-bottom-line" />

          <span>
            LET'S MAKE IT REAL.
          </span>
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;